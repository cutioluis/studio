import { buildWelcomeEmail } from "../domain/build-welcome-email";
import type { EmailSender, SendWelcomeEmailResult, WelcomeEmailRepository } from "../domain/types";

type Deps = { repository: WelcomeEmailRepository; sender: EmailSender; clock: () => Date };

export async function sendWelcomeEmail(
  ordenId: string,
  { repository, sender, clock }: Deps,
): Promise<SendWelcomeEmailResult> {
  const order = await repository.findOrder(ordenId);
  if (!order) return { status: "not_found" };
  if (order.status !== "pagada") return { status: "not_paid" };
  if (order.welcomeSentAt) return { status: "already_sent", sentAt: order.welcomeSentAt };
  const to = order.student.email?.trim();
  if (!to) return { status: "no_email" };

  const { ok } = await sender.send({ ...buildWelcomeEmail(order), to, idempotencyKey: `welcome-email/${order.id}` });
  if (!ok) return { status: "send_failed" };

  const sentAt = clock();
  await repository.markWelcomeSent(order.id, sentAt);
  return { status: "sent", sentAt: sentAt.toISOString(), email: to };
}
