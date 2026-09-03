import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { processFormSubmission } from '@/lib/forms/submit-form'
import { getPayloadClient } from '@/lib/payload'
import { resetRateLimitStore } from '@/lib/rate-limit'

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

describe('form submission integration', () => {
  let payload: Awaited<ReturnType<typeof getPayloadClient>>

  beforeAll(async () => {
    payload = await getPayloadClient()
  })

  beforeEach(() => {
    resetRateLimitStore()
  })

  afterAll(async () => {
    await payload.destroy()
  })

  it('persists a valid contact form', async () => {
    const email = 'contact+test@orcaworks.ai'
    const form = buildFormData({
      submissionType: 'contact',
      name: 'Integration Test',
      email,
      message: 'Hello from the integration suite',
    })

    const result = await processFormSubmission('contact', form, ip)
    expect(result).toEqual({ status: 'success' })

    const { docs } = await payload.find({
      collection: 'form-submissions',
      where: { email: { equals: email } },
      limit: 1,
    })

    expect(docs.length).toBe(1)
    const doc = docs[0]
    expect(doc.submissionType).toBe('contact')
    expect(doc.name).toBe('Integration Test')
    expect(doc.email).toBe(email)

    await payload.delete({
      collection: 'form-submissions',
      id: doc.id,
      overrideAccess: true,
    })
  })

  it('rejects an invalid email without persisting', async () => {
    const email = 'not-an-email'
    const form = buildFormData({
      submissionType: 'contact',
      name: 'Bad Email',
      email,
      message: 'I have no valid email',
    })

    const result = await processFormSubmission('contact', form, ip)
    expect(result?.status).toBe('error')

    const { totalDocs } = await payload.count({
      collection: 'form-submissions',
      where: { email: { equals: email } },
      overrideAccess: true,
    })

    expect(totalDocs).toBe(0)
  })

  it('accepts a honeypot submission but does not persist', async () => {
    const email = 'honeypot@orcaworks.ai'
    const form = buildFormData({
      submissionType: 'contact',
      name: 'Honeypot',
      email,
      message: 'I am a bot',
      website: 'i-am-a-bot',
    })

    const result = await processFormSubmission('contact', form, ip)
    expect(result).toEqual({ status: 'success' })

    const { totalDocs } = await payload.count({
      collection: 'form-submissions',
      where: { email: { equals: email } },
      overrideAccess: true,
    })

    expect(totalDocs).toBe(0)
  })

  it('rejects a rate-limited submission', async () => {
    for (let i = 0; i < 5; i++) {
      const form = buildFormData({
        submissionType: 'contact',
        name: 'Rate',
        email: `rate${i}@orcaworks.ai`,
        message: 'Rate limit probe',
      })
      const r = await processFormSubmission('contact', form, ip)
      expect(r?.status).toBe('success')
    }

    const form = buildFormData({
      submissionType: 'contact',
      name: 'Rate Limited',
      email: 'rate-limited@orcaworks.ai',
      message: 'Should be blocked',
    })

    const result = await processFormSubmission('contact', form, ip)
    expect(result).toMatchObject({
      status: 'error',
      message: expect.stringMatching(/too many submissions/i),
    })
  })
})
