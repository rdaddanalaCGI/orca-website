import { describe, expect, it } from 'vitest'

import { createUnlockCookieValue, UNLOCK_MAX_AGE_SECONDS, verifyUnlockCookieValue } from '@/lib/unlock-cookie'

describe('unlock cookie', () => {
  it('signs and verifies a value', () => {
    const value = createUnlockCookieValue()
    expect(verifyUnlockCookieValue(value)).toBe(true)
  })

  it('rejects a tampered signature', () => {
    const value = createUnlockCookieValue()
    const last = value.at(-1)
    const swap = last === 'a' ? 'b' : 'a'
    const tampered = value.slice(0, -1) + swap
    expect(verifyUnlockCookieValue(tampered)).toBe(false)
  })

  it('rejects an expired cookie', () => {
    const expiredAt = Math.floor(Date.now() / 1000) - UNLOCK_MAX_AGE_SECONDS - 1
    const value = createUnlockCookieValue(expiredAt)
    expect(verifyUnlockCookieValue(value)).toBe(false)
  })

  it('rejects malformed values', () => {
    expect(verifyUnlockCookieValue('')).toBe(false)
    expect(verifyUnlockCookieValue('not.enough.parts')).toBe(false)
    expect(verifyUnlockCookieValue('v2.123.abc')).toBe(false)
    expect(verifyUnlockCookieValue('v1.not-a-number.abc')).toBe(false)
    expect(verifyUnlockCookieValue('v1.123.tooshort')).toBe(false)
  })

  it('rejects a cookie with an invalid version', () => {
    const value = createUnlockCookieValue()
    const parts = value.split('.')
    parts[0] = 'v0'
    expect(verifyUnlockCookieValue(parts.join('.'))).toBe(false)
  })
})
