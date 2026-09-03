import { beforeEach, describe, expect, it } from 'vitest'

import { rateLimit, resetRateLimitStore } from '@/lib/rate-limit'
import { contactSchema, demoSchema, isSubmissionType, partnerSchema } from '@/lib/schemas'

const validContact = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello there.',
}

describe('form validation', () => {
  it('accepts a valid contact submission', () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true)
  })

  it('rejects a malformed email', () => {
    const result = contactSchema.safeParse({ ...validContact, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('rejects an empty message', () => {
    expect(contactSchema.safeParse({ ...validContact, message: '   ' }).success).toBe(false)
  })

  it('enforces field length limits', () => {
    expect(contactSchema.safeParse({ ...validContact, name: 'a'.repeat(129) }).success).toBe(false)
    expect(contactSchema.safeParse({ ...validContact, message: 'a'.repeat(5001) }).success).toBe(false)
  })

  it('requires a company for demo and partner enquiries', () => {
    expect(demoSchema.safeParse({ name: 'Ada', email: 'ada@example.com' }).success).toBe(false)
    expect(partnerSchema.safeParse(validContact).success).toBe(false)
  })

  it('rejects absolute URLs in sourcePage to prevent open-redirect style storage', () => {
    const result = contactSchema.safeParse({ ...validContact, sourcePage: 'https://evil.example.com' })
    expect(result.success).toBe(false)
  })

  it('accepts a relative sourcePage', () => {
    expect(contactSchema.safeParse({ ...validContact, sourcePage: '/contact' }).success).toBe(true)
  })

  it('guards submission types', () => {
    expect(isSubmissionType('contact')).toBe(true)
    expect(isSubmissionType('arbitrary')).toBe(false)
  })
})

describe('rate limiting', () => {
  beforeEach(() => resetRateLimitStore())

  it('allows submissions up to the limit', () => {
    for (let i = 0; i < 3; i++) {
      expect(rateLimit({ key: 'test', limit: 3, windowMs: 1000 }).ok).toBe(true)
    }
  })

  it('blocks submissions beyond the limit', () => {
    for (let i = 0; i < 3; i++) rateLimit({ key: 'test', limit: 3, windowMs: 1000 })
    const blocked = rateLimit({ key: 'test', limit: 3, windowMs: 1000 })
    expect(blocked.ok).toBe(false)
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
  })

  it('tracks keys independently', () => {
    for (let i = 0; i < 3; i++) rateLimit({ key: 'a', limit: 3, windowMs: 1000 })
    expect(rateLimit({ key: 'b', limit: 3, windowMs: 1000 }).ok).toBe(true)
  })
})
