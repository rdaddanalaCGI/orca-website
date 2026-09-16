import type { MetadataRoute } from 'next'

import { isIndexable, siteUrl } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  // Staging/preview/local must never be indexable. Crawling stays open so
  // search engines can read the noindex directives emitted by page metadata.
  if (!isIndexable) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
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
