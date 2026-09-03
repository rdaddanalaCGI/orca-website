import type { CollectionConfig } from 'payload'
import { authenticated, publicRead } from './access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        crop: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        crop: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    // Explicit allowlist rather than a wildcard, so SVG (a script vector) and
    // arbitrary binaries cannot be uploaded.
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describes the image for screen readers. Required for accessibility.',
      },
    },
  ],
}
