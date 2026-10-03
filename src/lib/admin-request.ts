import { safeError } from "@/lib/log-error";
import { corsHeaders, parseAllowedOrigins, parseBearerToken } from "@/lib/revalidate-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/** CORS headers for the admin app origins listed in `ADMIN_ORIGINS`. */
export const adminCors = (request: Request) =>
  corsHeaders(request.headers.get("origin"), parseAllowedOrigins(process.env.ADMIN_ORIGINS));

export type AdminDenial = { status: 401 | 403 | 503; error: "unauthorized" | "forbidden" | "unavailable" };

/**
 * Verifies the bearer token belongs to a Supabase user listed in `admins`.
 * Returns null when authorized, or the denial to send back. Callers must check `isSupabaseConfigured()` first.
 */
export async function authorizeAdmin(request: Request, logTag: string): Promise<AdminDenial | null> {
  const token = parseBearerToken(request.headers.get("authorization"));
  if (!token) return { status: 401, error: "unauthorized" };

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return { status: 401, error: "unauthorized" };

  const admin = await supabase.from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (admin.error) {
    console.error(`[${logTag}] admin lookup failed`, safeError(admin.error));
    return { status: 503, error: "unavailable" };
  }
  if (!admin.data) return { status: 403, error: "forbidden" };
  return null;
}
