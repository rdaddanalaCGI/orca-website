import { notFound } from 'next/navigation'

import { Text } from '@/components/elements/text'
import { LexicalRenderer } from '@/components/lexical-renderer'
import { DocumentLeftAligned } from '@/components/sections/document-left-aligned'
import { JsonLd } from '@/components/seo/json-ld'
import { cmsAuthorName, cmsImageUrl, getPostBySlug } from '@/lib/payload'
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

function isCmsCategory(value: unknown): value is { id: number | string; name: string; slug: string } {
  return typeof value === 'object' && value !== null && 'name' in value && 'slug' in value
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return createMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    path: `/blog/${post.slug}`,
    ogImage: cmsImageUrl(post.ogImage) ?? cmsImageUrl(post.heroImage),
    type: 'article',
    publishedTime: new Date(post.publishedDate).toISOString(),
    modifiedTime: new Date(post.updatedAt).toISOString(),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const image = cmsImageUrl(post.ogImage) ?? cmsImageUrl(post.heroImage)
  const heroImageUrl = cmsImageUrl(post.heroImage)
  const categoryNames =
    post.categories
      ?.filter(isCmsCategory)
      .map((c) => c.name)
      .join(', ') ?? ''

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.excerpt ?? undefined,
          path: `/blog/${post.slug}`,
          image,
          datePublished: new Date(post.publishedDate).toISOString(),
          dateModified: new Date(post.updatedAt).toISOString(),
          authorName: cmsAuthorName(post.author),
        })}
      />

      <DocumentLeftAligned
        headline={post.title}
        subheadline={
          <p>
            {formatDate(post.publishedDate)}
            {cmsAuthorName(post.author) ? ` · ${cmsAuthorName(post.author)}` : null}
            {categoryNames ? ` · ${categoryNames}` : null}
            {post.readingTime ? ` · ${post.readingTime} min read` : null}
          </p>
        }
      >
        {heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImageUrl} alt={post.title} className="mb-8 w-full rounded-lg" />
        ) : null}
        {post.excerpt ? <Text size="lg">{post.excerpt}</Text> : null}
        {post.body ? <LexicalRenderer body={post.body} /> : null}
      </DocumentLeftAligned>
    </>
  )
}
