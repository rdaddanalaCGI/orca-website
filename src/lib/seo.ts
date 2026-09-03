import type { Metadata } from 'next'

import { isIndexable, siteUrl } from '@/lib/env'

export const site = {
  name: 'Orcaworks',
  url: siteUrl,
  defaultTitle: 'Orcaworks — Customer support that feels like a conversation',
  defaultDescription:
    'Orcaworks helps teams deliver fast, personal customer support at scale with AI that understands context.',
  defaultOgImage: '/img/screenshots/1.webp',
}

function absolute(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  return `${site.url}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

export function createMetadata({
  title,
  description,
  path,
  ogImage,
  noindex,
  type = 'website',
  publishedTime,
  modifiedTime,
}: {
  title?: string
  description?: string
  path?: string
  ogImage?: string
  noindex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
} = {}): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : site.defaultTitle
  const desc = description || site.defaultDescription
  const canonical = absolute(path ?? '/')
  const image = absolute(ogImage ?? site.defaultOgImage)

  // Non-production environments are never indexable, regardless of page intent.
  const index = isIndexable && !noindex

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(site.url),
    alternates: { canonical },
    openGraph: {
      type,
      siteName: site.name,
      title: fullTitle,
      description: desc,
      url: canonical,
      images: [{ url: image }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [image],
    },
    icons: {
      icon: '/favicon.ico',
    },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: absolute('/img/logos/orcaworks-dark.png'),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

export function articleJsonLd({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  headline: string
  description?: string
  path: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    ...(description ? { description } : {}),
    url: absolute(path),
    ...(image ? { image: absolute(image) } : {}),
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    ...(authorName ? { author: { '@type': 'Person', name: authorName } } : {}),
    publisher: {
      '@type': 'Organization',
      name: site.name,
    },
  }
}

export function creativeWorkJsonLd({
  headline,
  description,
  path,
}: {
  headline: string
  description?: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline,
    ...(description ? { description } : {}),
    url: absolute(path),
    isAccessibleForFree: false,
    hasPart: {
      '@type': 'WebPageElement',
      isAccessibleForFree: false,
      cssSelector: '.gated-content',
    },
  }
}
