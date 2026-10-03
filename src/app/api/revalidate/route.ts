import { revalidatePath } from "next/cache";
import { adminCors as cors, authorizeAdmin } from "@/lib/admin-request";
import { isSupabaseConfigured } from "@/lib/supabase/server";

// Other methods are rejected with 405 by Next, since only POST and OPTIONS are exported.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const respond = (request: Request, body: unknown, status: number) =>
  Response.json(body, { status, headers: cors(request) });

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: cors(request) });
}

/** Called by the admin app after saving catalog data; the user must be listed in `admins`. */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return respond(request, { error: "unavailable" }, 503);

  const denial = await authorizeAdmin(request, "revalidate");
  if (denial) return respond(request, { error: denial.error }, denial.status);

  revalidatePath("/");
  revalidatePath("/programs/[id]", "page");
  revalidatePath("/sitemap.xml");
  return respond(request, { revalidated: true }, 200);
}
