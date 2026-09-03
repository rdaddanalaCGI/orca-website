import type { CollectionConfig } from 'payload'

import { authenticated } from './access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'workEmail',
    defaultColumns: ['workEmail', 'firstName', 'company', 'firstResourceId', 'createdAt'],
  },
  access: {
    // Public creates are not allowed through the REST/GraphQL API.
    // The server action bypasses collection access after its own validation,
    // honeypot and rate limiting.
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'workEmail',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'firstResourceId',
      type: 'text',
    },
    {
      name: 'firstResourceType',
      type: 'text',
    },
    {
      name: 'firstSourcePath',
      type: 'text',
    },
    {
      name: 'referrer',
      type: 'text',
    },
    {
      name: 'utmSource',
      type: 'text',
    },
    {
      name: 'utmMedium',
      type: 'text',
    },
    {
      name: 'utmCampaign',
      type: 'text',
    },
    {
      name: 'utmContent',
      type: 'text',
    },
    {
      name: 'submissionCount',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'lastResourceId',
      type: 'text',
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
