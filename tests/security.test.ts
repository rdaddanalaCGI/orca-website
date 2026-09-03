import { describe, expect, it } from 'vitest'

import { createSecurityHeaders } from '@/lib/security-headers'

function csp(headers: ReturnType<typeof createSecurityHeaders>) {
  return headers.find((h) => h.key.toLowerCase() === 'content-security-policy')?.value
}

describe('createSecurityHeaders', () => {
  it('production CSP contains required hardening directives', () => {
    const headers = createSecurityHeaders({ isDev: false })
    const policy = csp(headers)!

    expect(policy).toContain("frame-ancestors 'none'")
    expect(policy).toContain("object-src 'none'")
    expect(policy).toContain("base-uri 'self'")
    expect(policy).toContain("form-action 'self'")
    expect(policy).toContain('upgrade-insecure-requests')
  })

  it('production CSP omits unsafe-eval', () => {
    const headers = createSecurityHeaders({ isDev: false })
    const policy = csp(headers)!

    expect(policy).not.toContain("'unsafe-eval'")
  })

  it('dev CSP allows unsafe-eval', () => {
    const headers = createSecurityHeaders({ isDev: true })
    const policy = csp(headers)!

    expect(policy).toContain("'unsafe-eval'")
  })

  it('dev CSP omits upgrade-insecure-requests', () => {
    const headers = createSecurityHeaders({ isDev: true })
    const policy = csp(headers)!

    expect(policy).not.toContain('upgrade-insecure-requests')
  })

  it.each([
    'Content-Security-Policy',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Referrer-Policy',
    'Permissions-Policy',
    'Strict-Transport-Security',
  ])('includes %s', (key) => {
    const headers = createSecurityHeaders({ isDev: false })
    expect(headers.find((h) => h.key === key)?.value).toBeTruthy()
  })
})
