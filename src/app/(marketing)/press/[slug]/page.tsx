import { notFound } from 'next/navigation'

import { Text } from '@/components/elements/text'
import { DocumentLeftAligned } from '@/components/sections/document-left-aligned'
import { JsonLd } from '@/components/seo/json-ld'
import { cmsImageUrl, getPressReleaseBySlug } from '@/lib/payload'
import { articleJsonLd, createMetadata } from '@/lib/seo'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const release = await getPressReleaseBySlug(slug)

  if (!release) {
    notFound()
  }

  return createMetadata({
    title: release.seoTitle || release.title,
    description: release.seoDescription || release.excerpt || undefined,
    path: `/press/${release.slug}`,
    ogImage: cmsImageUrl(release.ogImage),
    type: 'article',
    publishedTime: new Date(release.publishedDate).toISOString(),
    modifiedTime: new Date(release.updatedAt).toISOString(),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const release = await getPressReleaseBySlug(slug)

  if (!release) {
    notFound()
  }

  const image = cmsImageUrl(release.ogImage)

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: release.title,
          description: release.excerpt ?? undefined,
          path: `/press/${release.slug}`,
          image,
          datePublished: new Date(release.publishedDate).toISOString(),
          dateModified: new Date(release.updatedAt).toISOString(),
        })}
      />

      <DocumentLeftAligned headline={release.title} subheadline={<p>{formatDate(release.publishedDate)}</p>}>
        {release.excerpt ? <Text size="lg">{release.excerpt}</Text> : null}
      </DocumentLeftAligned>
    </>
  )
}
