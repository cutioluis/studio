import { describe, expect, it } from "vitest";
import { corsHeaders, parseAllowedOrigins, parseBearerToken } from "./revalidate-auth";

describe("parseBearerToken", () => {
  it("extracts the token", () => expect(parseBearerToken("Bearer abc.def")).toBe("abc.def"));
  it("is case-insensitive on the scheme", () => expect(parseBearerToken("bearer abc")).toBe("abc"));
  it.each([null, "", "Bearer", "Bearer ", "Basic abc", "abc", "Bearer a b"])("rejects %j", (value) =>
    expect(parseBearerToken(value)).toBeNull(),
  );
});

describe("parseAllowedOrigins", () => {
  it("splits, trims and drops empties", () =>
    expect(parseAllowedOrigins(" https://a.dev , http://localhost:5173,, ")).toEqual(["https://a.dev", "http://localhost:5173"]));
  it("strips trailing slashes", () => expect(parseAllowedOrigins("https://a.dev/")).toEqual(["https://a.dev"]));
  it("ignores wildcards", () => expect(parseAllowedOrigins("*,https://a.dev")).toEqual(["https://a.dev"]));
  it("returns an empty list when unset", () => {
    expect(parseAllowedOrigins(undefined)).toEqual([]);
    expect(parseAllowedOrigins("")).toEqual([]);
  });
});

describe("corsHeaders", () => {
  const allowed = ["https://a.dev"];

  it("returns the CORS headers for an allowed origin", () =>
    expect(corsHeaders("https://a.dev", allowed)).toEqual({
      "Access-Control-Allow-Origin": "https://a.dev",
      Vary: "Origin",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization",
      "Access-Control-Max-Age": "600",
    }));
  it("returns nothing for a disallowed or missing origin", () => {
    expect(corsHeaders("https://evil.dev", allowed)).toEqual({});
    expect(corsHeaders(null, allowed)).toEqual({});
  });
});
