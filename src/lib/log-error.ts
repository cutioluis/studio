/**
 * Reduces an error to a shape that is safe to log. Supabase/Postgres errors carry `details` and `hint`
 * with row values (document numbers, emails), so only `code` and `message` are kept.
 */
export function safeError(error: unknown): { code: string; message: string } | { name: string } {
  if (typeof error === "object" && error !== null) {
    const { code, message } = error as { code?: unknown; message?: unknown };
    if (typeof code === "string" && typeof message === "string") return { code, message };
  }
  if (error instanceof Error) return { name: error.name };
  return { name: "UnknownError" };
}
