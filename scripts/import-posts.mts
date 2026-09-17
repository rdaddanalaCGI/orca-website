#!/usr/bin/env tsx
/**
 * Import curated post JSON files from blog-content/posts/ into Payload via the
 * local API. Idempotent: posts are upserted by slug.
 *
 *   local    pnpm tsx scripts/import-posts.mts
 *   remote   DATABASE_URL=... ALLOW_REMOTE_IMPORT=1 pnpm tsx scripts/import-posts.mts
 *   prod     additionally requires ALLOW_PRODUCTION_IMPORT=1
 */
import { randomUUID } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { BlocksFeature, convertHTMLToLexical, editorConfigFactory, lexicalEditor } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import { getPayload } from 'payload'
import { z } from 'zod'

import { CtaBanner } from '../src/blocks/cta-banner'

// --- env defaults + safety gates -------------------------------------------

process.env.DATABASE_URL ??= 'postgresql://orcaworks:orcaworks@localhost:5434/orcaworks?sslmode=disable'
process.env.PAYLOAD_SECRET ??= 'local-development-only-secret'
process.env.APP_ENV ??= 'local'
process.env.NEXT_PUBLIC_SITE_URL ??= 'http://localhost:3005'

const dbUrl = new URL(process.env.DATABASE_URL)
const isLocal = ['localhost', '127.0.0.1', '::1'].includes(dbUrl.hostname)
if (!isLocal && process.env.ALLOW_REMOTE_IMPORT !== '1') {
  throw new Error(`Refusing to import into non-local database ${dbUrl.hostname} without ALLOW_REMOTE_IMPORT=1`)
}
if (process.env.APP_ENV === 'production' && process.env.ALLOW_PRODUCTION_IMPORT !== '1') {
  throw new Error('Refusing to import when APP_ENV=production without ALLOW_PRODUCTION_IMPORT=1')
}

const CONTENT_DIR = path.resolve(process.env.CONTENT_DIR ?? 'blog-content/posts')

// --- JSON schema ------------------------------------------------------------

const htmlSegment = z.object({ type: z.literal('html'), html: z.string() })
const ctaSegment = z.object({
  type: z.literal('cta'),
  title: z.string().min(1),
  buttonLabel: z.string().min(1),
  buttonHref: z.string().min(1),
  theme: z.enum(['teal', 'orange', 'dark']).default('teal'),
})

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(['draft', 'published']).default('draft'),
  publishedDate: z.string().min(1),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  categories: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonical: z.string().optional(),
  robots: z.enum(['index-follow', 'noindex-follow', 'index-nofollow', 'noindex-nofollow']).optional(),
  heroImage: z.object({ path: z.string(), alt: z.string().optional() }).optional(),
  body: z.array(z.discriminatedUnion('type', [htmlSegment, ctaSegment])).default([]),
})
type PostFile = z.infer<typeof postSchema>

// --- payload init ------------------------------------------------------------

const config = (await import('../src/payload.config')).default
const payload = await getPayload({ config })
const editor = lexicalEditor({
  features: ({ defaultFeatures }) => [...defaultFeatures, BlocksFeature({ blocks: [CtaBanner] })],
})
const editorConfig = await editorConfigFactory.fromEditor({
  config: payload.config,
  editor,
})

// --- relation helpers ---------------------------------------------------------

async function ensureCategory(slug: string): Promise<number> {
  const found = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (found.docs[0]) return found.docs[0].id
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const created = await payload.create({
    collection: 'categories',
    data: { name, slug },
  })
  console.warn(`  created category "${slug}"`)
  return created.id
}

async function ensureAuthor(name: string): Promise<number> {
  const found = await payload.find({
    collection: 'authors',
    where: { name: { equals: name } },
    limit: 1,
  })
  if (found.docs[0]) return found.docs[0].id
  const created = await payload.create({ collection: 'authors', data: { name } })
  console.warn(`  created author "${name}"`)
  return created.id
}

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
}

async function ensureMedia(relPath: string, alt?: string): Promise<number | null> {
  const abs = path.resolve(relPath)
  if (!existsSync(abs)) {
    console.warn(`  hero image not found, skipping: ${relPath}`)
    return null
  }
  const filename = path.basename(abs)
  const found = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (found.docs[0]) return found.docs[0].id
  const data = readFileSync(abs)
  const mimetype = MIME[path.extname(filename).toLowerCase()] ?? 'image/png'
  const created = await payload.create({
    collection: 'media',
    data: { alt: alt ?? filename },
    file: { data, mimetype, name: filename, size: data.length },
  })
  console.warn(`  uploaded media "${filename}"`)
  return created.id
}

// --- body building ------------------------------------------------------------

type LexNode = { type: string; version: number; children?: LexNode[]; [k: string]: unknown }

/** Remove unresolved `upload` nodes (dead old-site image URLs) so validation
 * can't fail on them; the file importer warns instead. */
function stripPendingUploads(nodes: LexNode[], warnings: string[]): LexNode[] {
  const out: LexNode[] = []
  for (const node of nodes) {
    if (node.type === 'upload') {
      const pending = node.pending as { src?: string } | undefined
      if (pending?.src) {
        warnings.push(`dropped unresolved image: ${pending.src}`)
        continue
      }
    }
    if (node.children) node.children = stripPendingUploads(node.children, warnings)
    out.push(node)
  }
  return out
}

async function buildBody(post: PostFile, warnings: string[]) {
  const children: LexNode[] = []
  for (const segment of post.body) {
    if (segment.type === 'html') {
      const converted = convertHTMLToLexical({
        editorConfig,
        html: segment.html,
        JSDOM: JSDOM as unknown as new (html: string) => { window: { document: Document } },
      }) as unknown as { root: { children: LexNode[] } }
      children.push(...converted.root.children)
    } else {
      children.push({
        type: 'block',
        format: '',
        version: 2,
        fields: {
          id: randomUUID(),
          blockName: '',
          blockType: 'ctaBanner',
          title: segment.title,
          buttonLabel: segment.buttonLabel,
          buttonHref: segment.buttonHref,
          theme: segment.theme,
        },
      })
    }
  }
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: stripPendingUploads(children, warnings),
    },
  }
}

// --- main ----------------------------------------------------------------------

const files = readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith('.json'))
  .sort()
if (files.length === 0) {
  console.warn(`No JSON files found in ${CONTENT_DIR}`)
  process.exit(0)
}

let created = 0
let updated = 0

for (const file of files) {
  const raw = JSON.parse(readFileSync(path.join(CONTENT_DIR, file), 'utf8'))
  const parsed = postSchema.safeParse(raw)
  if (!parsed.success) {
    console.error(`✗ ${file}: invalid JSON —`, z.prettifyError(parsed.error))
    process.exitCode = 1
    continue
  }
  const post = parsed.data
  const warnings: string[] = []

  const [authorId, categoryIds, heroImageId, body] = [
    post.author ? await ensureAuthor(post.author) : undefined,
    await Promise.all(post.categories.map(ensureCategory)),
    post.heroImage ? await ensureMedia(post.heroImage.path, post.heroImage.alt) : null,
    await buildBody(post, warnings),
  ]

  const data = {
    title: post.title,
    slug: post.slug,
    status: post.status,
    publishedDate: new Date(post.publishedDate).toISOString(),
    excerpt: post.excerpt,
    author: authorId,
    categories: categoryIds,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    canonical: post.canonical,
    robots: post.robots,
    // Omit the key entirely (rather than sending heroImage: undefined) when
    // resolution failed, so a re-import with a temporarily-missing asset file
    // doesn't clear an already-set hero image on update.
    ...(heroImageId ? { heroImage: heroImageId } : {}),
    body,
  }

  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: post.slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    await payload.update({ collection: 'posts', id: existing.docs[0].id, data })
    updated++
    console.warn(`✓ updated  ${post.slug}`)
  } else {
    await payload.create({ collection: 'posts', data })
    created++
    console.warn(`✓ created  ${post.slug}`)
  }
  warnings.forEach((w) => console.warn(`    ${w}`))
}

console.warn(`Done. created=${created} updated=${updated}`)
await payload.destroy()
process.exit(0)
