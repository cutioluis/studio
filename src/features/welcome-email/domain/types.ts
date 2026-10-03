export type ScheduleSlot = {
  /** ISO weekday as stored in `horarios_modalidad.dia_semana`: 1 = Monday ... 7 = Sunday. */
  day: number;
  /** "HH:MM" or "HH:MM:SS". */
  start: string;
  end: string;
};

export type WelcomeOrder = {
  id: string;
  /** Raw `ordenes.estado`. */
  status: string;
  /** ISO timestamp of `ordenes.bienvenida_enviada_at`, or null. */
  welcomeSentAt: string | null;
  student: { firstName: string; email: string | null };
  programName: string;
  modalityName: string;
  cohort: { name: string; startDate: string } | null;
  schedule: ScheduleSlot[];
};

export type WelcomeEmailContent = { subject: string; html: string; text: string };

export type SendWelcomeEmailResult =
  | { status: "sent"; sentAt: string; email: string }
  | { status: "already_sent"; sentAt: string }
  | { status: "not_found" }
  | { status: "not_paid" }
  | { status: "no_email" }
  | { status: "send_failed" };

export interface WelcomeEmailRepository {
  findOrder(ordenId: string): Promise<WelcomeOrder | null>;
  markWelcomeSent(ordenId: string, sentAt: Date): Promise<void>;
}

export interface EmailSender {
  send(message: WelcomeEmailContent & { to: string; idempotencyKey: string }): Promise<{ ok: boolean }>;
}
