import type { Block } from 'payload'

/**
 * Call-to-action banner embeddable at any position inside a post body.
 * Replaces the WordPress `impact-cta-strip` markup carried over in the
 * migration; rendered by `src/components/blog/cta-banner.tsx`.
 */
export const CtaBanner: Block = {
  slug: 'ctaBanner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'buttonLabel', type: 'text', required: true },
    {
      name: 'buttonHref',
      type: 'text',
      required: true,
      admin: { description: 'Internal path (e.g. /contact) or absolute https URL.' },
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'teal',
      required: true,
      options: [
        { label: 'Teal', value: 'teal' },
        { label: 'Orange', value: 'orange' },
        { label: 'Dark', value: 'dark' },
      ],
    },
  ],
}
