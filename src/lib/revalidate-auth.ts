/** Extracts the token from an `Authorization: Bearer <token>` header, or null when malformed. */
export function parseBearerToken(header: string | null): string | null {
  const match = header?.match(/^Bearer ([^\s]+)$/i);
  return match ? match[1] : null;
}

/** Parses the comma-separated `ADMIN_ORIGINS` env value. Wildcards are never allowed. */
export function parseAllowedOrigins(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter((origin) => origin !== "" && origin !== "*");
}

/** CORS headers for an allowed origin; empty for a missing or disallowed one. */
export function corsHeaders(origin: string | null, allowed: string[]): Record<string, string> {
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    Vary: "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Max-Age": "600",
  };
}
