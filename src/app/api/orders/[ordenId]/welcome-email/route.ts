import { adminCors as cors, authorizeAdmin } from "@/lib/admin-request";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/features/welcome-email/actions/send-welcome-email";
import { UUID_RE, toHttpResponse } from "@/features/welcome-email/domain/http-status";
import { createResendSender, isEmailConfigured } from "@/features/welcome-email/infrastructure/resend-sender";
import { welcomeEmailRepository } from "@/features/welcome-email/infrastructure/welcome-email-repository";

// Other methods are rejected with 405 by Next, since only POST and OPTIONS are exported.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const respond = (request: Request, body: unknown, status: number) =>
  Response.json(body, { status, headers: cors(request) });

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: cors(request) });
}

/** Sends the course welcome email for a paid order. Called by the admin app; the user must be listed in `admins`. */
export async function POST(request: Request, { params }: { params: Promise<{ ordenId: string }> }) {
  if (!isSupabaseConfigured() || !isEmailConfigured()) return respond(request, { error: "unavailable" }, 503);

  const denial = await authorizeAdmin(request, "welcome-email");
  if (denial) return respond(request, { error: denial.error }, denial.status);

  const { ordenId } = await params;
  if (!UUID_RE.test(ordenId)) return respond(request, { error: "invalid_order_id" }, 400);

  try {
    const result = await sendWelcomeEmail(ordenId, {
      repository: welcomeEmailRepository,
      sender: createResendSender(),
      clock: () => new Date(),
    });
    const { status, body } = toHttpResponse(result);
    return respond(request, body, status);
  } catch (error) {
    console.error("[welcome-email] unexpected failure", error instanceof Error ? error.name : "UnknownError");
    return respond(request, { status: "error" }, 500);
  }
}
