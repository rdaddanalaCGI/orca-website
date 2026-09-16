import type { CollectionConfig } from 'payload'

import { authenticated } from './access'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'sourcePath', 'createdAt'],
  },
  access: {
    // Public creates are not allowed through the REST/GraphQL API.
    // Use the server action, which bypasses collection access after its own
    // validation, honeypot and rate limiting.
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'sourcePage',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'ip',
      type: 'text',
      admin: {
        description: 'Captured for rate limiting and abuse investigation.',
      },
    },
  ],
}
