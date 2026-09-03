import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig, getPayload } from 'payload'
import type { Post } from '../src/payload-types'

import { Authors } from '../src/collections/Authors'
import { Categories } from '../src/collections/Categories'
import { FormSubmissions } from '../src/collections/FormSubmissions'
import { Leads } from '../src/collections/Leads'
import { Media } from '../src/collections/Media'
import { Posts } from '../src/collections/Posts'
import { PressReleases } from '../src/collections/PressReleases'
import { Users } from '../src/collections/Users'

const ALLOWED_HOSTS = ['localhost', '127.0.0.1']
process.env.DATABASE_URL ??= 'postgresql://orcaworks:orcaworks@localhost:5434/orcaworks'
process.env.PAYLOAD_SECRET ??= 'local-development-only-secret'
process.env.NEXT_PUBLIC_SITE_URL ??= 'http://localhost:3005'

const dbUrl = new URL(process.env.DATABASE_URL)

if (!ALLOWED_HOSTS.includes(dbUrl.hostname)) {
  throw new Error(`Refusing to seed a non-local database: ${dbUrl.hostname}`)
}

if (process.env.APP_ENV === 'production') {
  throw new Error('Refusing to seed when APP_ENV=production')
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const secret = process.env.PAYLOAD_SECRET

const config = buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Posts, Categories, PressReleases, Authors, Media, FormSubmissions, Leads, Users],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    push: true,
  }),
  editor: lexicalEditor(),
  secret,
  serverURL: siteUrl,
  cors: [siteUrl],
  csrf: [siteUrl],
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  },
})

const payload = await getPayload({ config })

const categoryData = [
  { name: 'Agentic AI', slug: 'agentic-ai' },
  { name: 'Digital Coworkers', slug: 'digital-coworkers' },
  { name: 'News', slug: 'news' },
  { name: 'Press Releases', slug: 'press-releases' },
  { name: 'Technology', slug: 'technology' },
  { name: 'The Data Shift Podcast', slug: 'the-data-shift-podcast' },
]

async function ensureCategory(data: (typeof categoryData)[number]) {
  const existing = await payload.find({
    collection: 'categories',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.warn(`Category "${data.slug}" already exists, skipping.`)
    return existing.docs[0].id
  }
  const category = await payload.create({
    collection: 'categories',
    data: { ...data, description: `${data.name} insights and thought leadership.` },
  })
  console.warn(`Created category "${data.slug}"`)
  return category.id
}

const categoryIds = new Map<string, number | string>()
for (const category of categoryData) {
  const id = await ensureCategory(category)
  categoryIds.set(category.slug, id)
}

function makeBody(title: string) {
  const text = (content: string) => ({
    detail: 0,
    format: 0,
    mode: 'normal' as const,
    style: '',
    text: content,
    type: 'text' as const,
    version: 1,
  })

  return {
    root: {
      type: 'root' as const,
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'paragraph' as const,
          format: '',
          indent: 0,
          version: 1,
          children: [
            text(
              `This is a sample body for "${title}". The marketing team will replace this with the full translated content from the WordPress source.`,
            ),
          ],
        },
        {
          type: 'heading' as const,
          tag: 'h3' as const,
          format: '',
          indent: 0,
          version: 1,
          children: [text('What to expect next')],
        },
        {
          type: 'paragraph' as const,
          format: '',
          indent: 0,
          version: 1,
          children: [
            text(
              'Once the content team replaces this placeholder, the article will include sections on the topic, supporting visuals, and a call to action.',
            ),
          ],
        },
      ],
    },
  }
}

const postsData = [
  {
    title: 'Agentic AI vs AI Agents vs RPA: Key Differences Explained',
    slug: 'agentic-ai-vs-ai-agents-vs-rpa',
    excerpt:
      'Confused between RPA, AI agents, and agentic AI? See how each handles structure, reasoning, and risk—and use our framework to pick the right fit.',
    categorySlugs: ['agentic-ai', 'digital-coworkers'],
    publishedDate: '2026-08-07T00:00:00.000Z',
    readingTime: 12,
    seoTitle: 'Agentic AI vs AI Agents vs RPA: Key Differences',
    seoDescription:
      'Confused between RPA, AI agents, and agentic AI? See how each handles structure, reasoning, and risk—and use our framework to pick the right fit.',
  },
  {
    title: '10 Questions to Ask Before Choosing an Agentic AI Platform',
    slug: 'how-to-choose-an-agentic-ai-platform',
    excerpt:
      'Most vendor demos look identical. An agent reads a document, takes an action, and the room applauds. But the real test is what happens after deployment.',
    categorySlugs: ['agentic-ai', 'digital-coworkers'],
    publishedDate: '2026-08-10T00:00:00.000Z',
    readingTime: 10,
    seoTitle: '10 Questions to Ask Before Choosing an Agentic AI Platform',
    seoDescription:
      'Most vendor demos look identical. An agent reads a document, takes an action, and the room applauds. But the real test is what happens after deployment.',
  },
]

async function ensurePost(data: (typeof postsData)[number]) {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.warn(`Post "${data.slug}" already exists, skipping.`)
    return
  }
  const categoryIdsForPost = data.categorySlugs.map((slug) => categoryIds.get(slug)).filter(Boolean)
  await payload.create({
    collection: 'posts',
    data: {
      ...data,
      categories: categoryIdsForPost as number[],
      status: 'published',
      body: makeBody(data.title) as unknown as Post['body'],
    },
  })
  console.warn(`Created post "${data.slug}"`)
}

for (const post of postsData) {
  await ensurePost(post)
}

await payload.destroy()
console.warn('Insights seed complete.')
process.exit(0)
