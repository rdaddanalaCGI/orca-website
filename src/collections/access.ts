import type { Access } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const publicRead: Access = () => true

export const publishedOrAuthenticated: Access = ({ req }) => (req.user ? true : { status: { equals: 'published' } })

/**
 * Allows the very first user to be created without authentication,
 * which is required for Payload's `create-first-user` bootstrap flow.
 * After that, writes require a logged-in user.
 */
export const allowFirstUser: Access = async ({ req }) => {
  if (req.user) return true
  const { totalDocs } = await req.payload.count({ collection: 'users' })
  return totalDocs === 0
}
