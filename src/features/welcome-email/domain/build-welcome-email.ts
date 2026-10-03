import { siteConfig } from "@/config/site";
import type { ScheduleSlot, WelcomeEmailContent, WelcomeOrder } from "./types";

export const CONTACT_EMAIL = "hola@ceciglam.com";
export const SITE_URL = "https://ceciglam.com";

const PREHEADER = "Tu lugar está confirmado. Aquí tienes los detalles de tu curso.";

// "+593979390630" -> "+593 97 939 0630"
const formatPhone = (phone: string) => phone.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4");

const PHONE_LABEL = formatPhone(siteConfig.telephone);
const WHATSAPP_URL = `https://wa.me/${siteConfig.telephone.replace(/\D/g, "")}`;
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`;

const INK = "#0F0F12";
const MUTED = "#52525B";
const ACCENT = "#D4A4A4";
const SANS = "Arial,Helvetica,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

const DAYS = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})/;
const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const HTML_ESCAPE_RE = /[&<>"']/g;
const NEWLINE_RE = /\n/g;

/** "lunes 3 de noviembre de 2026" from a calendar date. Cohort dates carry no timezone, so nothing is shifted. */
export function formatLongDate(value: string): string | null {
  const match = value.match(DATE_RE);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCMonth() !== month - 1) return null;
  return `${WEEKDAYS[date.getUTCDay()]} ${day} de ${MONTHS[month - 1]} de ${year}`;
}

const hhmm = (value: string) => value.slice(0, 5);

export function formatScheduleLine(slot: ScheduleSlot): string | null {
  const day = DAYS[slot.day];
  if (!day) return null;
  return `${day} de ${hhmm(slot.start)} a ${hhmm(slot.end)}`;
}

const escapeHtml = (value: string) => value.replace(HTML_ESCAPE_RE, (char) => HTML_ESCAPES[char]);

// ---- HTML building blocks: nested presentation tables, inline styles only (Outlook/Word safe) ----

const TABLE = 'role="presentation" border="0" cellpadding="0" cellspacing="0"';

const style = (size: number, line: number, color: string, font = SANS, extra = "") =>
  `font-family:${font};font-size:${size}px;line-height:${line}px;mso-line-height-rule:exactly;color:${color};${extra}`;

const link = (href: string, label: string) =>
  `<a href="${escapeHtml(href)}" style="color:${INK};text-decoration:underline">${escapeHtml(label)}</a>`;

const row = (inner: string, padding: string) => `<tr><td style="padding:${padding};${style(15, 24, INK)}">${inner}</td></tr>`;

const paragraph = (inner: string, padding = "0 0 12px") =>
  row(`<p style="margin:0;${style(15, 24, INK)}">${inner}</p>`, padding);

/** 1px rose-gold rule built from a cell border (no <hr>), with `after` px of space below it. */
const rule = (before: number, after: number) =>
  `<tr><td height="${before}" style="height:${before}px;font-size:1px;line-height:1px;mso-line-height-rule:exactly">&nbsp;</td></tr>` +
  `<tr><td height="1" style="height:1px;border-top:1px solid ${ACCENT};font-size:1px;line-height:1px;mso-line-height-rule:exactly">&nbsp;</td></tr>` +
  `<tr><td height="${after}" style="height:${after}px;font-size:1px;line-height:1px;mso-line-height-rule:exactly">&nbsp;</td></tr>`;

const sectionHeader = (title: string) =>
  rule(8, 16) +
  row(
    `<h2 style="margin:0;${style(12, 18, INK, SANS, "font-weight:bold;letter-spacing:2px;text-transform:uppercase")}">${escapeHtml(title)}</h2>`,
    "0 0 12px",
  );

const labelValueRow = (label: string, valueHtml: string) =>
  `<tr><td width="110" valign="top" style="width:110px;padding:0 12px 8px 0;${style(14, 22, MUTED)}">${escapeHtml(label)}</td>` +
  `<td valign="top" style="padding:0 0 8px 0;${style(14, 22, INK)}">${valueHtml}</td></tr>`;

const labelValueTable = (rows: string) => row(`<table ${TABLE} width="100%" style="width:100%">${rows}</table>`, "0 0 8px");

export function buildWelcomeEmail(order: WelcomeOrder): WelcomeEmailContent {
  const { firstName } = order.student;
  const details: [string, string][] = [
    ["Programa", order.programName],
    ["Modalidad", order.modalityName],
  ];
  if (order.cohort?.name) details.push(["Grupo", order.cohort.name]);
  const start = order.cohort ? formatLongDate(order.cohort.startDate) : null;
  if (start) details.push(["Inicio", start]);

  const schedule = [...order.schedule]
    .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start))
    .map(formatScheduleLine)
    .filter((line): line is string => line !== null);
  if (schedule.length > 0) details.push(["Horario", schedule.join("\n")]);

  const subject = `${firstName}, tu lugar en ${order.programName} está confirmado`;
  const greeting = `Te damos la bienvenida, ${firstName}`;
  const intro = [
    `Confirmamos tu pago y tu lugar en ${order.programName} ya está reservado. Nos alegra mucho tenerte en Ceciglam Academia.`,
    start ? `Empiezas el ${start}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const practice = "Aprenderás con práctica real y el acompañamiento de nuestro equipo docente.";
  const firstDay = ["Lleva tu documento de identidad.", "Antes del inicio te contactaremos con los detalles finales."];
  const doubts = "Escríbenos por WhatsApp, a nuestro correo o simplemente responde a este mensaje.";
  const footer = "Recibes este correo porque te inscribiste en un curso de Ceciglam Academia.";

  const text = [
    `${greeting}.`,
    "",
    intro,
    practice,
    "",
    "DETALLES DE TU CURSO",
    ...details.map(([label, value]) =>
      value.includes("\n")
        ? `${label}:\n${value.split("\n").map((line) => `  - ${line}`).join("\n")}`
        : `${label}: ${value}`,
    ),
    "",
    "PARA TU PRIMER DÍA",
    `Lugar: Quito · Ver ubicación en Google Maps: ${MAP_URL}`,
    ...firstDay,
    "",
    "¿TIENES DUDAS?",
    doubts,
    `WhatsApp: ${PHONE_LABEL} · ${WHATSAPP_URL}`,
    `Correo: ${CONTACT_EMAIL}`,
    "",
    "¡Nos vemos pronto!",
    "",
    "Con cariño,",
    "Equipo Ceciglam Academia",
    SITE_URL,
    "",
    "--",
    footer,
  ].join("\n");

  const detailRows = details
    .map(([label, value]) => labelValueRow(label, escapeHtml(value).replace(NEWLINE_RE, "<br>")))
    .join("");

  const content =
    `<tr><td align="center" style="padding:0 0 24px"><h1 style="margin:0;${style(26, 34, INK, SERIF, "font-weight:normal;text-align:center")}">${escapeHtml(greeting)}</h1></td></tr>` +
    rule(0, 24) +
    paragraph(escapeHtml(intro)) +
    paragraph(escapeHtml(practice), "0 0 24px") +
    sectionHeader("Detalles de tu curso") +
    labelValueTable(detailRows) +
    sectionHeader("Para tu primer día") +
    labelValueTable(labelValueRow("Lugar", `Quito · ${link(MAP_URL, "Ver ubicación en Google Maps")}`)) +
    firstDay.map((line) => paragraph(escapeHtml(line), "0 0 8px")).join("") +
    `<tr><td height="16" style="height:16px;font-size:1px;line-height:1px;mso-line-height-rule:exactly">&nbsp;</td></tr>` +
    sectionHeader("¿Tienes dudas?") +
    paragraph(escapeHtml(doubts), "0 0 8px") +
    labelValueTable(
      labelValueRow("WhatsApp", link(WHATSAPP_URL, PHONE_LABEL)) + labelValueRow("Correo", link(`mailto:${CONTACT_EMAIL}`, CONTACT_EMAIL)),
    ) +
    rule(16, 24) +
    paragraph("¡Nos vemos pronto!", "0 0 16px") +
    row(
      `<p style="margin:0;${style(15, 24, INK)}">Con cariño,<br><strong>Equipo Ceciglam Academia</strong><br>${link(SITE_URL, "ceciglam.com")}</p>`,
      "0 0 24px",
    ) +
    row(`<p style="margin:0;${style(12, 18, MUTED)}">${escapeHtml(footer)}</p>`, "0");

  const html =
    `<!DOCTYPE html>` +
    `<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">` +
    `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="x-apple-disable-message-reformatting">` +
    `<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">` +
    `<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->` +
    `<title>${escapeHtml(subject)}</title></head>` +
    `<body bgcolor="#ffffff" style="margin:0;padding:0;width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">` +
    `<span style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#ffffff;opacity:0">${escapeHtml(PREHEADER)}</span>` +
    `<table ${TABLE} width="100%" bgcolor="#ffffff" style="width:100%"><tr><td align="center" style="padding:32px 16px">` +
    `<!--[if mso]><table ${TABLE} width="600"><tr><td><![endif]-->` +
    `<table ${TABLE} width="600" style="width:100%;max-width:600px">${content}</table>` +
    `<!--[if mso]></td></tr></table><![endif]-->` +
    `</td></tr></table></body></html>`;

  return { subject, html, text };
}
