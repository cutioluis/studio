import { describe, expect, it } from "vitest";
import {
  detectFileType,
  isValidCedula,
  isValidEmail,
  isValidPassport,
  isValidRuc,
  normalizeEcuadorMobile,
} from "./validators";

describe("isValidCedula", () => {
  it("accepts a valid cedula", () => expect(isValidCedula("1710034065")).toBe(true));
  it("rejects a wrong check digit", () => expect(isValidCedula("1710034066")).toBe(false));
  it("rejects wrong length", () => {
    expect(isValidCedula("171003406")).toBe(false);
    expect(isValidCedula("17100340655")).toBe(false);
  });
  it("rejects non digits", () => expect(isValidCedula("17100340a5")).toBe(false));
  it("rejects an invalid province", () => {
    expect(isValidCedula("2510034065")).toBe(false);
    expect(isValidCedula("0010034065")).toBe(false);
  });
  it("rejects a third digit >= 6", () => expect(isValidCedula("1760034065")).toBe(false));
});

describe("normalizeEcuadorMobile", () => {
  it.each(["0991234567", "991234567", "+593991234567", "099 123 4567", "99-123-4567", "593991234567"])(
    "normalizes %s",
    (input) => expect(normalizeEcuadorMobile(input)).toBe("+593991234567"),
  );
  it.each(["", "0881234567", "09912345", "+593 2 123 4567", "abc"])("rejects %s", (input) =>
    expect(normalizeEcuadorMobile(input)).toBeNull(),
  );
});

describe("isValidRuc", () => {
  it("accepts 10 digits + 001", () => expect(isValidRuc("1710034065001")).toBe(true));
  it("rejects other suffixes or length", () => {
    expect(isValidRuc("1710034065002")).toBe(false);
    expect(isValidRuc("1710034065")).toBe(false);
  });
});

describe("isValidPassport", () => {
  it("accepts alphanumeric 5-20", () => expect(isValidPassport("AB12345")).toBe(true));
  it("rejects short, long and symbols", () => {
    expect(isValidPassport("AB12")).toBe(false);
    expect(isValidPassport("A".repeat(21))).toBe(false);
    expect(isValidPassport("AB-12345")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("accepts a normal email", () => expect(isValidEmail("a@b.co")).toBe(true));
  it("rejects malformed emails", () => {
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail("a b@c.com")).toBe(false);
    expect(isValidEmail("abc")).toBe(false);
  });
});

describe("detectFileType", () => {
  const bytes = (...n: number[]) => new Uint8Array(n);
  const ascii = (s: string) => Array.from(s).map((c) => c.charCodeAt(0));

  it("detects JPEG", () => expect(detectFileType(bytes(0xff, 0xd8, 0xff, 0xe0, 0, 0))).toEqual({ mime: "image/jpeg", ext: "jpg" }));
  it("detects PNG", () =>
    expect(detectFileType(bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0))).toEqual({ mime: "image/png", ext: "png" }));
  it("detects WebP", () =>
    expect(detectFileType(bytes(...ascii("RIFF"), 1, 2, 3, 4, ...ascii("WEBP")))).toEqual({ mime: "image/webp", ext: "webp" }));
  it("detects PDF", () =>
    expect(detectFileType(bytes(...ascii("%PDF-1.7")))).toEqual({ mime: "application/pdf", ext: "pdf" }));
  it("rejects RIFF that is not WebP", () =>
    expect(detectFileType(bytes(...ascii("RIFF"), 1, 2, 3, 4, ...ascii("WAVE")))).toBeNull());
  it("rejects unknown and empty", () => {
    expect(detectFileType(bytes(0x47, 0x49, 0x46, 0x38))).toBeNull();
    expect(detectFileType(bytes())).toBeNull();
  });
});
