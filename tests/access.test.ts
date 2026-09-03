import { describe, expect, it, vi } from 'vitest'

import { allowFirstUser, authenticated, publicRead, publishedOrAuthenticated } from '@/collections/access'
import type { AccessArgs } from 'payload'

const userReq = { user: { id: '1' } } as unknown as AccessArgs['req']
const anonReq = { user: undefined } as unknown as AccessArgs['req']

function buildAllowFirstUserArgs(overrides: { user?: unknown; totalDocs: number }): AccessArgs {
  return {
    req: {
      user: overrides.user,
      payload: {
        count: vi.fn().mockResolvedValue({ totalDocs: overrides.totalDocs }),
      },
    },
  } as unknown as AccessArgs
}

describe('collection access helpers', () => {
  it('authenticated allows logged-in users', () => {
    expect(authenticated({ req: userReq })).toBe(true)
  })

  it('authenticated blocks anonymous users', () => {
    expect(authenticated({ req: anonReq })).toBe(false)
  })

  it('publicRead is always true', () => {
    expect(publicRead({ req: anonReq })).toBe(true)
  })

  it('publishedOrAuthenticated allows all documents for logged-in users', () => {
    expect(publishedOrAuthenticated({ req: userReq })).toBe(true)
  })

  it('publishedOrAuthenticated filters to published status for anonymous users', () => {
    expect(publishedOrAuthenticated({ req: anonReq })).toEqual({
      status: { equals: 'published' },
    })
  })

  it('allowFirstUser permits the first unauthenticated user', async () => {
    const args = buildAllowFirstUserArgs({ totalDocs: 0 })
    expect(await allowFirstUser(args)).toBe(true)
    expect(args.req.payload.count).toHaveBeenCalledWith({ collection: 'users' })
  })

  it('allowFirstUser blocks anonymous user creation once a user exists', async () => {
    const args = buildAllowFirstUserArgs({ totalDocs: 1 })
    expect(await allowFirstUser(args)).toBe(false)
  })

  it('allowFirstUser allows authenticated users regardless of count', async () => {
    const args = buildAllowFirstUserArgs({ totalDocs: 5, user: { id: '1' } })
    expect(await allowFirstUser(args)).toBe(true)
  })
})
