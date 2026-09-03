export type SecurityHeader = {
  key: string
  value: string
}

/**
 * Build the security header set for a given environment.
 *
 * The CSP is deliberately permissive enough for local development and the
 * Payload admin UI (which needs inline styles), while still blocking the
 * high-value attack surface in production: framing, plugins, and arbitrary
 * form/base targets. `unsafe-eval` is only allowed in development so Next.js
 * dev overlay and React refresh work.
 */
export function createSecurityHeaders({ isDev }: { isDev: boolean }): SecurityHeader[] {
  const scriptSrc = [
    "'self'",
    // Payload admin and Next.js both rely on inline scripts. In development we
    // also need eval for the React refresh runtime.
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ]

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(' ')}`,
    // Tailwind and the Payload admin inject inline styles.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ')

  return [
    { key: 'Content-Security-Policy', value: csp },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    },
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
  ]
}

export const securityHeaders = createSecurityHeaders({
  isDev: process.env.NODE_ENV !== 'production',
})
