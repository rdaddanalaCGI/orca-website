import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

import { CtaBanner } from '@/blocks/cta-banner'
import { authenticated, publishedOrAuthenticated } from './access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedDate', 'status'],
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'readingTime',
      type: 'number',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, BlocksFeature({ blocks: [CtaBanner] })],
      }),
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
    },
    { name: 'canonical', type: 'text' },
    {
      name: 'robots',
      type: 'select',
      defaultValue: 'index-follow',
      options: [
        { label: 'Index, Follow', value: 'index-follow' },
        { label: 'Noindex, Follow', value: 'noindex-follow' },
        { label: 'Index, Nofollow', value: 'index-nofollow' },
        { label: 'Noindex, Nofollow', value: 'noindex-nofollow' },
      ],
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
