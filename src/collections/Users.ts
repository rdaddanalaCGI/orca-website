import type { CollectionConfig } from 'payload'
import { allowFirstUser, authenticated } from './access'

/**
 * CMS login accounts. This is the Payload auth collection and is never public.
 * Content authorship is modelled separately in `Authors`.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: authenticated,
    create: allowFirstUser,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
