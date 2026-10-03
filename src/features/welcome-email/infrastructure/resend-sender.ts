import "server-only";
import type { EmailSender } from "../domain/types";

const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Ceciglam <hola@ceciglam.com>";
const REPLY_TO = "hola@ceciglam.com";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Plain-fetch Resend client. Provider errors are logged server-side and never surfaced to callers. */
export function createResendSender(): EmailSender {
  return {
    async send({ to, subject, html, text, idempotencyKey }) {
      try {
        const res = await fetch(RESEND_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || DEFAULT_FROM,
            to: [to],
            reply_to: REPLY_TO,
            subject,
            html,
            text,
          }),
        });
        if (!res.ok) {
          console.error("[welcome-email] resend rejected the message", res.status, (await res.text()).slice(0, 300));
          return { ok: false };
        }
        return { ok: true };
      } catch (error) {
        console.error("[welcome-email] resend request failed", error instanceof Error ? error.name : "UnknownError");
        return { ok: false };
      }
    },
  };
}
