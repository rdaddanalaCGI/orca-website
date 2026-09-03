import type { MetadataRoute } from 'next'

import { env, siteUrl } from '@/lib/env'
import config from '@/payload.config'
import { getPayload, type Where } from 'payload'

let payloadPromise: ReturnType<typeof getPayload> | undefined

export async function getPayloadClient() {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config })
  }
  return payloadPromise
}

export interface CmsAuthor {
  id: number | string
  name: string
}

export interface CmsCategory {
  id: number | string
  name: string
  slug: string
}

export interface CmsMedia {
  id: number | string
  url: string
  alt?: string | null
}

export interface CmsPost {
  id: number | string
  title: string
  slug: string
  excerpt?: string | null
  categories?: (CmsCategory | number | string)[] | null
  heroImage?: CmsMedia | number | string | null
  author?: CmsAuthor | number | string | null
  publishedDate: string
  readingTime?: number | null
  body?: unknown
  status: 'draft' | 'published'
  seoTitle?: string | null
  seoDescription?: string | null
  ogImage?: CmsMedia | number | string | null
  updatedAt: string
  createdAt: string
}

export interface CmsPressRelease {
  id: number | string
  title: string
  slug: string
  excerpt?: string | null
  publishedDate: string
  source?: string | null
  sourceUrl?: string | null
  heroImage?: CmsMedia | number | string | null
  body?: unknown
  status: 'draft' | 'published'
  seoTitle?: string | null
  seoDescription?: string | null
  ogImage?: CmsMedia | number | string | null
  updatedAt: string
  createdAt: string
}

function isCmsMedia(value: unknown): value is CmsMedia {
  return typeof value === 'object' && value !== null && 'url' in value && typeof (value as CmsMedia).url === 'string'
}

function isCmsAuthor(value: unknown): value is CmsAuthor {
  return typeof value === 'object' && value !== null && 'name' in value && typeof (value as CmsAuthor).name === 'string'
}

export function cmsImageUrl(value: CmsMedia | number | string | null | undefined): string | undefined {
  if (value && isCmsMedia(value)) return value.url
  return undefined
}

export function cmsAuthorName(value: CmsAuthor | number | string | null | undefined): string | undefined {
  if (value && isCmsAuthor(value)) return value.name
  return typeof value === 'string' ? value : undefined
}

export async function getLatestPosts(limit = 3) {
  if (!env.DATABASE_URL) return []
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit,
    depth: 1,
  })
  return docs as CmsPost[]
}

export async function getLatestPressReleases(limit = 3) {
  if (!env.DATABASE_URL) return []
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'press-releases',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit,
    depth: 1,
  })
  return docs as CmsPressRelease[]
}

export async function getCategories(): Promise<CmsCategory[]> {
  if (!env.DATABASE_URL) return []
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    sort: 'name',
    limit: 100,
    depth: 0,
  })
  return docs as CmsCategory[]
}

export async function getPublishedPosts({
  limit = 10,
  page = 1,
  categorySlug,
  search,
}: { limit?: number; page?: number; categorySlug?: string; search?: string } = {}) {
  if (!env.DATABASE_URL) return { docs: [] as CmsPost[], totalDocs: 0, totalPages: 0, page: 1 }
  const payload = await getPayloadClient()

  const where: Where = { status: { equals: 'published' } }

  if (categorySlug) {
    const { docs } = await payload.find({
      collection: 'categories',
      where: { slug: { equals: categorySlug } },
      limit: 1,
      depth: 0,
    })
    if (docs[0]) {
      where.categories = { contains: docs[0].id }
    } else {
      return { docs: [] as CmsPost[], totalDocs: 0, totalPages: 0, page: 1 }
    }
  }

  if (search) {
    const term = `%${search.replace(/[%_]/g, '\\$&')}%`
    where.or = [{ title: { like: term } }, { excerpt: { like: term } }]
  }

  const result = await payload.find({
    collection: 'posts',
    where,
    sort: '-publishedDate',
    limit,
    page,
    depth: 1,
  })
  return { ...result, docs: result.docs as CmsPost[] }
}

export async function getPublishedPressReleases({ limit = 10, page = 1 }: { limit?: number; page?: number } = {}) {
  if (!env.DATABASE_URL) return { docs: [] as CmsPressRelease[], totalDocs: 0, totalPages: 0, page: 1 }
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'press-releases',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit,
    page,
    depth: 1,
  })
  return { ...result, docs: result.docs as CmsPressRelease[] }
}

export async function getPostBySlug(slug: string) {
  if (!env.DATABASE_URL) return null
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  return (docs[0] as CmsPost | undefined) ?? null
}

export async function getPressReleaseBySlug(slug: string) {
  if (!env.DATABASE_URL) return null
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'press-releases',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  return (docs[0] as CmsPressRelease | undefined) ?? null
}

export async function getSitemapCmsEntries(): Promise<MetadataRoute.Sitemap> {
  if (!env.DATABASE_URL) return []

  const [posts, press] = await Promise.all([
    getPublishedPosts({ limit: 1000 }),
    getPublishedPressReleases({ limit: 1000 }),
  ])

  const entries: MetadataRoute.Sitemap = []

  for (const post of posts.docs) {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedDate),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  for (const release of press.docs) {
    entries.push({
      url: `${siteUrl}/press/${release.slug}`,
      lastModified: new Date(release.updatedAt ?? release.publishedDate),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  return entries
}
