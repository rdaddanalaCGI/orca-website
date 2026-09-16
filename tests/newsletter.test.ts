import { beforeEach, describe, expect, it, vi } from 'vitest'

import { resetRateLimitStore } from '@/lib/rate-limit'

const getPayloadClient = vi.hoisted(() => vi.fn())
vi.mock('@/lib/payload', () => ({ getPayloadClient }))

import { processNewsletterSubscription } from '@/lib/forms/subscribe-newsletter'

const ip = '127.0.0.1'

function buildFormData(fields: Record<string, string | undefined>): FormData {
  const form = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      form.append(key, value)
    }
  }
  return form
}

function mockPayload() {
  return {
    create: vi.fn(),
  }
}

const validSubscription = {
  email: 'ada@example.com',
  sourcePage: '/',
}

describe('newsletter subscription', () => {
  beforeEach(() => {
    resetRateLimitStore()
    getPayloadClient.mockClear()
    getPayloadClient.mockResolvedValue(mockPayload())
  })

  it('creates a subscriber on valid submission', async () => {
    const payload = await getPayloadClient()
    payload.create.mockResolvedValue({})

    const result = await processNewsletterSubscription(buildFormData(validSubscription), ip)

    expect(result).toEqual({ status: 'success' })
    expect(payload.create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'newsletter-subscribers',
        overrideAccess: true,
        data: expect.objectContaining({
          email: 'ada@example.com',
          sourcePage: '/',
          status: 'active',
          ip,
        }),
      }),
    )
  })

  it('normalises email to lowercase', async () => {
    const payload = await getPayloadClient()
    payload.create.mockResolvedValue({})

    await processNewsletterSubscription(buildFormData({ ...validSubscription, email: 'Ada@EXAMPLE.COM' }), ip)

    expect(payload.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: 'ada@example.com' }),
      }),
    )
  })

  it('rejects invalid and missing email', async () => {
    const payload = await getPayloadClient()
    const result = await processNewsletterSubscription(buildFormData({ email: 'not-an-email' }), ip)

    expect(result?.status).toBe('error')
    expect(payload.create).not.toHaveBeenCalled()
  })

  it('returns success without persisting for honeypot', async () => {
    const result = await processNewsletterSubscription(
      buildFormData({ ...validSubscription, website: 'i-am-a-bot' }),
      ip,
    )

    expect(result).toEqual({ status: 'success' })
    expect(getPayloadClient).not.toHaveBeenCalled()
  })

  it('rejects rate-limited submissions', async () => {
    const payload = await getPayloadClient()
    payload.create.mockResolvedValue({})

    for (let i = 0; i < 5; i++) {
      const r = await processNewsletterSubscription(
        buildFormData({ ...validSubscription, email: `rate${i}@example.com` }),
        ip,
      )
      expect(r?.status).toBe('success')
    }

    const result = await processNewsletterSubscription(
      buildFormData({ ...validSubscription, email: 'rate-limited@example.com' }),
      ip,
    )

    expect(result).toMatchObject({
      status: 'error',
      message: expect.stringMatching(/too many submissions/i),
    })
    expect(payload.create).toHaveBeenCalledTimes(5)
  })
})
