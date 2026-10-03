import type { SendWelcomeEmailResult } from "./types";

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const STATUS: Record<SendWelcomeEmailResult["status"], number> = {
  sent: 200,
  already_sent: 200,
  not_found: 404,
  not_paid: 409,
  no_email: 422,
  send_failed: 502,
};

/** HTTP response (status code and JSON body) for a use-case result. */
export function toHttpResponse(result: SendWelcomeEmailResult): { status: number; body: Record<string, string> } {
  const body: Record<string, string> = { status: result.status };
  if ("sentAt" in result) body.sentAt = result.sentAt;
  if ("email" in result) body.email = result.email;
  return { status: STATUS[result.status], body };
}
