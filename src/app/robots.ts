import type { MetadataRoute } from 'next'

import { isIndexable, siteUrl } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  // Staging/preview/local must never be indexable.
  if (!isIndexable) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
