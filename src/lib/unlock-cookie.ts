import { createHmac, timingSafeEqual } from 'node:crypto'

import { env } from './env'

export const UNLOCK_MAX_AGE_SECONDS = 180 * 24 * 60 * 60

const VERSION = 'v1'

function unlockSecret(): string {
  return env.UNLOCK_COOKIE_SECRET ?? env.PAYLOAD_SECRET ?? 'local-dev-unlock-secret-do-not-use-in-production'
}

export function createUnlockCookieValue(issuedAtSeconds: number = Math.floor(Date.now() / 1000)): string {
  const payload = `${VERSION}.${issuedAtSeconds}`
  const hmac = createHmac('sha256', unlockSecret()).update(payload).digest('hex')
  return `${payload}.${hmac}`
}

export function verifyUnlockCookieValue(value: string, nowSeconds: number = Math.floor(Date.now() / 1000)): boolean {
  const parts = value.split('.')
  if (parts.length !== 3) return false

  const [version, issuedAtRaw, hmac] = parts
  if (version !== VERSION) return false

  const issuedAt = Number(issuedAtRaw)
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return false
  if (nowSeconds - issuedAt > UNLOCK_MAX_AGE_SECONDS) return false

  const payload = `${version}.${issuedAt}`
  const expected = createHmac('sha256', unlockSecret()).update(payload).digest('hex')

  if (hmac.length !== expected.length) return false

  const expectedBuf = Buffer.from(expected, 'hex')
  const hmacBuf = Buffer.from(hmac, 'hex')
  if (hmacBuf.length !== expectedBuf.length) return false

  return timingSafeEqual(expectedBuf, hmacBuf)
}
