import { describe, expect, it } from "vitest";
import { buildWelcomeEmail, formatLongDate, formatScheduleLine } from "./build-welcome-email";
import type { WelcomeOrder } from "./types";

const order: WelcomeOrder = {
  id: "o1",
  status: "pagada",
  welcomeSentAt: null,
  student: { firstName: "María", email: "maria@example.com" },
  programName: "Maquillaje Profesional",
  modalityName: "Regular",
  cohort: { name: "Grupo Noviembre", startDate: "2026-11-03" },
  schedule: [
    { day: 6, start: "09:00:00", end: "13:00:00" },
    { day: 1, start: "18:30:00", end: "20:00:00" },
  ],
};

describe("formatLongDate", () => {
  it("formats in Spanish", () => expect(formatLongDate("2026-11-03")).toBe("martes 3 de noviembre de 2026"));
  it("accepts timestamps", () => expect(formatLongDate("2026-11-02T00:00:00+00:00")).toBe("lunes 2 de noviembre de 2026"));
  it("returns null for garbage", () => expect(formatLongDate("nope")).toBeNull());
  it("returns null for impossible dates", () => expect(formatLongDate("2026-02-31")).toBeNull());
});

describe("formatScheduleLine", () => {
  it("formats day and hours", () =>
    expect(formatScheduleLine({ day: 1, start: "18:30:00", end: "20:00" })).toBe("Lunes de 18:30 a 20:00"));
  it("returns null for an unknown day", () => expect(formatScheduleLine({ day: 9, start: "09:00", end: "10:00" })).toBeNull());
});

describe("buildWelcomeEmail", () => {
  const email = buildWelcomeEmail(order);

  it("builds a subject with the program", () => expect(email.subject).toContain("Maquillaje Profesional"));
  it("greets by first name", () => {
    expect(email.html).toContain("María");
    expect(email.text).toContain("Te damos la bienvenida, María");
  });
  it("includes course details in both versions", () => {
    for (const body of [email.html, email.text]) {
      expect(body).toContain("Regular");
      expect(body).toContain("Grupo Noviembre");
      expect(body).toContain("martes 3 de noviembre de 2026");
      expect(body).toContain("Lunes de 18:30 a 20:00");
      expect(body).toContain("Sábado de 09:00 a 13:00");
      expect(body).toContain("hola@ceciglam.com");
      expect(body).toContain("Equipo Ceciglam Academia");
    }
  });
  it("uses a gender-neutral greeting", () => {
    expect(email.html).toContain("Te damos la bienvenida, María");
    expect(email.text).toContain("Te damos la bienvenida, María");
    for (const body of [email.subject, email.html, email.text]) {
      expect(body).not.toMatch(/Bienvenida a|Bienvenido/);
    }
  });
  it("includes map, whatsapp and mailto links", () => {
    expect(email.html).toContain("https://www.google.com/maps/search/?api=1&amp;query=-0.147463,-78.493432");
    expect(email.html).toContain("https://wa.me/593979390630");
    expect(email.html).toContain("mailto:hola@ceciglam.com");
    expect(email.html).toContain("+593 97 939 0630");
    expect(email.text).toContain("https://wa.me/593979390630");
    expect(email.text).toContain("https://www.google.com/maps/search/?api=1&query=-0.147463,-78.493432");
  });
  it("mentions the start date only when known", () => {
    expect(email.html).toContain("Empiezas el martes 3 de noviembre de 2026.");
    expect(email.text).toContain("Empiezas el martes 3 de noviembre de 2026.");
    const bare = buildWelcomeEmail({ ...order, cohort: null });
    expect(bare.html).not.toContain("Empiezas el");
    expect(bare.text).not.toContain("Empiezas el");
  });
  it("sorts the schedule by day", () => expect(email.text.indexOf("Lunes")).toBeLessThan(email.text.indexOf("Sábado")));
  it("escapes interpolated values in html only", () => {
    const evil = buildWelcomeEmail({ ...order, student: { firstName: "<b>Ana</b>", email: "a@b.c" }, programName: 'A & "B"' });
    expect(evil.html).not.toContain("<b>Ana</b>");
    expect(evil.html).toContain("&lt;b&gt;Ana&lt;/b&gt;");
    expect(evil.html).toContain("A &amp; &quot;B&quot;");
    expect(evil.text).toContain('A & "B"');
  });
  it("omits cohort and schedule lines when missing", () => {
    const bare = buildWelcomeEmail({ ...order, cohort: null, schedule: [] });
    for (const body of [bare.html, bare.text]) {
      expect(body).not.toContain("Grupo Noviembre");
      expect(body).not.toContain("Inicio");
      expect(body).not.toContain("Horario");
    }
    expect(bare.text).toContain("Regular");
  });
});

describe("email client safety", () => {
  const html = buildWelcomeEmail(order).html;
  const minimal = buildWelcomeEmail({ ...order, cohort: null, schedule: [] }).html;

  it.each([["full", html], ["minimal", minimal]])("is Outlook-safe (%s)", (_n, h) => {
    expect(h).not.toMatch(/display:\s*(flex|grid)/i);
    expect(h).not.toMatch(/position:/i);
    expect(h).not.toContain("var(--");
    expect(h).not.toMatch(/background(-image|-color)?\s*:/i);
    expect(h).not.toMatch(/\d(rem|em)\b/);
    expect(h).not.toContain("<div");
    expect(h).not.toContain("<svg");
    expect(h).not.toMatch(/box-shadow|border-radius|<hr/i);
    expect(h.length).toBeLessThan(100_000);
  });
  it("has no images, so nothing is blocked by default in Outlook", () => expect(html).not.toContain("<img"));
  it("centers the greeting", () => expect(html).toMatch(/<td align="center"[^>]*><h1 style="[^"]*text-align:center/));
  it("every table is presentational", () => {
    const tables = html.match(/<table\b[^>]*>/g) ?? [];
    expect(tables.length).toBeGreaterThan(0);
    for (const t of tables) expect(t).toContain('role="presentation"');
  });
  it("has MSO ghost table, document settings and preheader", () => {
    expect(html).toContain("<!--[if mso]><table");
    expect(html).toContain("<![endif]-->");
    expect(html).toContain("o:OfficeDocumentSettings");
    expect(html).toContain("mso-hide:all");
    expect(html).toContain("Tu lugar está confirmado. Aquí tienes los detalles de tu curso.");
  });
  it("every link has an inline color", () => {
    const links = html.match(/<a\b[^>]*>/g) ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) {
      expect(a).toMatch(/style="[^"]*color:#/);
      expect(a).toContain("text-decoration:underline");
    }
  });
});
