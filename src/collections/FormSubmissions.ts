import type { CollectionConfig } from 'payload'
import { authenticated } from './access'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'submissionType',
    defaultColumns: ['submissionType', 'name', 'email', 'createdAt', 'status'],
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
      name: 'submissionType',
      type: 'select',
      options: [
        { label: 'Contact Us', value: 'contact' },
        { label: 'Request a Demo', value: 'demo' },
        { label: 'Partner enquiry', value: 'partner' },
      ],
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'sourcePage',
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
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Processing', value: 'processing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Spam', value: 'spam' },
      ],
      defaultValue: 'new',
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
