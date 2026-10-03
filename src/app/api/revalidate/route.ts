import { revalidatePath } from "next/cache";
import { safeError } from "@/lib/log-error";
import { corsHeaders, parseAllowedOrigins, parseBearerToken } from "@/lib/revalidate-auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

// Other methods are rejected with 405 by Next, since only POST and OPTIONS are exported.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const cors = (request: Request) =>
  corsHeaders(request.headers.get("origin"), parseAllowedOrigins(process.env.ADMIN_ORIGINS));

const respond = (request: Request, body: unknown, status: number) =>
  Response.json(body, { status, headers: cors(request) });

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: cors(request) });
}

/** Called by the admin app after saving catalog data; the user must be listed in `admins`. */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return respond(request, { error: "unavailable" }, 503);

  const token = parseBearerToken(request.headers.get("authorization"));
  if (!token) return respond(request, { error: "unauthorized" }, 401);

  const { data, error } = await getSupabaseAdmin().auth.getUser(token);
  if (error || !data.user) return respond(request, { error: "unauthorized" }, 401);

  const admin = await getSupabaseAdmin().from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (admin.error) {
    console.error("[revalidate] admin lookup failed", safeError(admin.error));
    return respond(request, { error: "unavailable" }, 503);
  }
  if (!admin.data) return respond(request, { error: "forbidden" }, 403);

  revalidatePath("/");
  revalidatePath("/programs/[id]", "page");
  revalidatePath("/sitemap.xml");
  return respond(request, { revalidated: true }, 200);
}
