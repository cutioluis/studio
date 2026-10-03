import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Third parties actually used by the site: Calendly (widget), Google Maps (embed).
// 'unsafe-inline' is required for Next.js inline bootstrap scripts on statically rendered pages (no nonce).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://assets.calendly.com${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "img-src 'self' data: blob: https://assets.calendly.com",
  "font-src 'self' data:",
  "connect-src 'self' https://calendly.com",
  "frame-src https://calendly.com https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Receipts are compressed client-side (<= 2 MB); the default 1 MB server action limit is too small.
  experimental: { serverActions: { bodySizeLimit: '3mb' } },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
