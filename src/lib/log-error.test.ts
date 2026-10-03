import { describe, expect, it } from "vitest";
import { safeError } from "./log-error";

describe("safeError", () => {
  it("keeps only code and message of a Postgres-style error", () => {
    expect(
      safeError({ code: "23505", message: "duplicate key", details: "Key (numero_documento)=(1710034065) exists", hint: "x" }),
    ).toEqual({ code: "23505", message: "duplicate key" });
  });

  it("keeps only the name of a plain Error", () => {
    expect(safeError(new TypeError("fetch failed for user@mail.com"))).toEqual({ name: "TypeError" });
  });

  it("handles unknown values", () => {
    expect(safeError("boom")).toEqual({ name: "UnknownError" });
    expect(safeError(null)).toEqual({ name: "UnknownError" });
  });
});
