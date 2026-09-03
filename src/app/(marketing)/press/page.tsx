import NextLink from 'next/link'

import { Text } from '@/components/elements/text'
import { DocumentLeftAligned } from '@/components/sections/document-left-aligned'
import { getPublishedPressReleases } from '@/lib/payload'
import { createMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata = createMetadata({
  title: 'Press',
  description: 'News and press releases from Orcaworks.',
  path: '/press',
})

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function Page() {
  const { docs } = await getPublishedPressReleases()

  return (
    <DocumentLeftAligned headline="Press" subheadline={<p>News and press releases from Orcaworks.</p>}>
      {docs.length === 0 ? (
        <Text>No published press releases yet.</Text>
      ) : (
        <ul className="flex flex-col gap-8">
          {docs.map((release) => (
            <li key={release.slug}>
              <NextLink href={`/press/${release.slug}`} className="group flex flex-col gap-2">
                <span className="text-xs/6 font-semibold text-olive-600 dark:text-olive-400">
                  {formatDate(release.publishedDate)}
                </span>
                <h3 className="font-display text-2xl/8 text-olive-950 group-hover:underline dark:text-white">
                  {release.title}
                </h3>
                {release.excerpt ? (
                  <p className="text-base/7 text-olive-700 dark:text-olive-400">{release.excerpt}</p>
                ) : null}
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </DocumentLeftAligned>
  )
}
