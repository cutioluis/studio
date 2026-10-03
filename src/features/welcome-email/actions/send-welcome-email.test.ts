import { describe, expect, it, vi } from "vitest";
import type { EmailSender, WelcomeEmailRepository, WelcomeOrder } from "../domain/types";
import { sendWelcomeEmail } from "./send-welcome-email";

const base: WelcomeOrder = {
  id: "o1",
  status: "pagada",
  welcomeSentAt: null,
  student: { firstName: "Ana", email: "ana@example.com" },
  programName: "Curso",
  modalityName: "Regular",
  cohort: null,
  schedule: [],
};
const now = new Date("2026-11-01T10:00:00.000Z");

function setup(order: WelcomeOrder | null, sendResult: { ok: boolean } = { ok: true }) {
  const repo: WelcomeEmailRepository = {
    findOrder: vi.fn(async () => order),
    markWelcomeSent: vi.fn(async () => {}),
  };
  const sender: EmailSender = { send: vi.fn(async () => sendResult) };
  const run = () => sendWelcomeEmail("o1", { repository: repo, sender, clock: () => now });
  return { repo, sender, run };
}

describe("sendWelcomeEmail", () => {
  it("returns not_found", async () => {
    const t = setup(null);
    expect(await t.run()).toEqual({ status: "not_found" });
    expect(t.sender.send).not.toHaveBeenCalled();
  });
  it("returns not_paid when the order is not pagada", async () => {
    const t = setup({ ...base, status: "en_revision" });
    expect(await t.run()).toEqual({ status: "not_paid" });
    expect(t.sender.send).not.toHaveBeenCalled();
  });
  it("returns already_sent without sending", async () => {
    const t = setup({ ...base, welcomeSentAt: "2026-10-30T00:00:00Z" });
    expect(await t.run()).toEqual({ status: "already_sent", sentAt: "2026-10-30T00:00:00Z" });
    expect(t.sender.send).not.toHaveBeenCalled();
  });
  it("returns no_email", async () => {
    const t = setup({ ...base, student: { firstName: "Ana", email: null } });
    expect(await t.run()).toEqual({ status: "no_email" });
    expect(t.sender.send).not.toHaveBeenCalled();
  });
  it("returns send_failed and does not mark as sent", async () => {
    const t = setup(base, { ok: false });
    expect(await t.run()).toEqual({ status: "send_failed" });
    expect(t.repo.markWelcomeSent).not.toHaveBeenCalled();
  });
  it("sends, marks and returns sent", async () => {
    const t = setup(base);
    expect(await t.run()).toEqual({ status: "sent", sentAt: now.toISOString(), email: "ana@example.com" });
    expect(t.sender.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: "ana@example.com", idempotencyKey: "welcome-email/o1" }),
    );
    expect(t.repo.markWelcomeSent).toHaveBeenCalledWith("o1", now);
  });
});
