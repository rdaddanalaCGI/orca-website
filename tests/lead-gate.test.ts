import { beforeEach, describe, expect, it, vi } from 'vitest'

import { resetRateLimitStore } from '@/lib/rate-limit'

const getPayloadClient = vi.hoisted(() => vi.fn())
vi.mock('@/lib/payload', () => ({ getPayloadClient }))

import { processLeadGateSubmission } from '@/lib/forms/submit-lead-gate'

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

const validLead = {
  firstName: 'Ada',
  workEmail: 'ada@example.com',
  company: 'Lovelace Labs',
  resourceId: 'ai-agent-handbook',
  sourcePath: '/ai-agent-handbook/build/anatomy',
}

function mockPayload() {
  return {
    find: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  }
}

describe('lead gate submission', () => {
  beforeEach(() => {
    resetRateLimitStore()
    getPayloadClient.mockClear()
    getPayloadClient.mockResolvedValue(mockPayload())
  })

  it('creates a lead on the first submission', async () => {
    const payload = await getPayloadClient()
    payload.find.mockResolvedValue({ docs: [] })
    payload.create.mockResolvedValue({})

    const result = await processLeadGateSubmission(buildFormData(validLead), ip)

    expect(result).toEqual({ status: 'success', setCookie: true })
    expect(payload.create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'leads',
        overrideAccess: true,
        data: expect.objectContaining({
          firstName: 'Ada',
          workEmail: 'ada@example.com',
          company: 'Lovelace Labs',
          firstResourceId: 'ai-agent-handbook',
          firstResourceType: 'handbook',
          firstSourcePath: '/ai-agent-handbook/build/anatomy',
          submissionCount: 1,
          lastResourceId: 'ai-agent-handbook',
          ip,
        }),
      }),
    )
  })

  it('updates an existing lead and preserves first attribution fields', async () => {
    const payload = await getPayloadClient()
    payload.find.mockResolvedValue({
      docs: [
        {
          id: 7,
          firstName: 'Ada',
          company: 'Old Co',
          workEmail: 'ada@example.com',
          firstResourceId: 'enterprise-ai-safety-handbook',
          firstResourceType: 'handbook',
          firstSourcePath: '/enterprise-ai-safety-handbook',
          submissionCount: 3,
          lastResourceId: 'enterprise-ai-safety-handbook',
        },
      ],
    })
    payload.update.mockResolvedValue({})

    const result = await processLeadGateSubmission(
      buildFormData({ ...validLead, firstName: 'New', company: 'New Co' }),
      ip,
    )

    expect(result).toEqual({ status: 'success', setCookie: true })
    expect(payload.update).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'leads',
        id: 7,
        overrideAccess: true,
        data: expect.objectContaining({
          submissionCount: 4,
          lastResourceId: 'ai-agent-handbook',
          firstName: 'New',
          company: 'New Co',
        }),
      }),
    )
    expect(payload.update.mock.calls[0][0].data).not.toHaveProperty('firstResourceId')
    expect(payload.update.mock.calls[0][0].data).not.toHaveProperty('firstSourcePath')
  })

  it('normalises work email to lowercase', async () => {
    const payload = await getPayloadClient()
    payload.find.mockResolvedValue({ docs: [] })
    payload.create.mockResolvedValue({})

    await processLeadGateSubmission(buildFormData({ ...validLead, workEmail: 'Ada@EXAMPLE.COM' }), ip)

    expect(payload.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ workEmail: 'ada@example.com' }),
      }),
    )
  })

  it('rejects unknown resource ids', async () => {
    const payload = await getPayloadClient()
    const result = await processLeadGateSubmission(buildFormData({ ...validLead, resourceId: 'unknown' }), ip)

    expect(result).toMatchObject({
      status: 'error',
      fieldErrors: expect.objectContaining({ resourceId: expect.any(String) }),
    })
    expect(payload.find).not.toHaveBeenCalled()
    expect(payload.create).not.toHaveBeenCalled()
  })

  it('rejects invalid and missing fields', async () => {
    const payload = await getPayloadClient()
    const result = await processLeadGateSubmission(
      buildFormData({
        firstName: '',
        workEmail: 'not-an-email',
        company: '',
        resourceId: 'ai-agent-handbook',
      }),
      ip,
    )

    expect(result?.status).toBe('error')
    expect(payload.find).not.toHaveBeenCalled()
  })

  it('returns success without persisting or unlocking for honeypot', async () => {
    const result = await processLeadGateSubmission(buildFormData({ ...validLead, website: 'i-am-a-bot' }), ip)

    expect(result).toEqual({ status: 'success', setCookie: false })
    expect(getPayloadClient).not.toHaveBeenCalled()
  })

  it('rejects rate-limited submissions', async () => {
    const payload = await getPayloadClient()
    payload.find.mockResolvedValue({ docs: [] })
    payload.create.mockResolvedValue({})

    for (let i = 0; i < 5; i++) {
      const r = await processLeadGateSubmission(buildFormData({ ...validLead, workEmail: `rate${i}@example.com` }), ip)
      expect(r?.status).toBe('success')
    }

    const result = await processLeadGateSubmission(
      buildFormData({ ...validLead, workEmail: 'rate-limited@example.com' }),
      ip,
    )

    expect(result).toMatchObject({
      status: 'error',
      message: expect.stringMatching(/too many submissions/i),
    })
    expect(payload.create).toHaveBeenCalledTimes(5)
  })
})
