import { describe, expect, it } from "vitest";
import { UUID_RE, toHttpResponse } from "./http-status";

describe("toHttpResponse", () => {
  it("maps sent with sentAt and email", () =>
    expect(toHttpResponse({ status: "sent", sentAt: "t", email: "a@b.c" })).toEqual({
      status: 200,
      body: { status: "sent", sentAt: "t", email: "a@b.c" },
    }));
  it("maps already_sent", () =>
    expect(toHttpResponse({ status: "already_sent", sentAt: "t" })).toEqual({ status: 200, body: { status: "already_sent", sentAt: "t" } }));
  it.each([
    ["not_found", 404],
    ["not_paid", 409],
    ["no_email", 422],
    ["send_failed", 502],
  ] as const)("maps %s to %i", (status, code) => expect(toHttpResponse({ status })).toEqual({ status: code, body: { status } }));
});

describe("UUID_RE", () => {
  it("accepts a uuid", () => expect(UUID_RE.test("123e4567-e89b-12d3-a456-426614174000")).toBe(true));
  it.each(["", "abc", "123e4567-e89b-12d3-a456-42661417400", "../etc"])("rejects %j", (v) => expect(UUID_RE.test(v)).toBe(false));
});
