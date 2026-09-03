import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/env'
import { getSitemapCmsEntries } from '@/lib/payload'
import { staticRoutes } from '@/lib/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const cmsEntries = await getSitemapCmsEntries()

  return [...staticEntries, ...cmsEntries]
}
