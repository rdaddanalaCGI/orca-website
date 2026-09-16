import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { staticRoutePaths } from '@/lib/routes'

const APP_DIR = path.join(process.cwd(), 'src/app')

/** Maps a public route path to its `page.tsx` on disk. */
function pageFileForRoute(route: string) {
  const segment = route === '/' ? '' : route
  const candidates = [
    path.join(APP_DIR, '(marketing)', segment, 'page.tsx'),
    path.join(APP_DIR, segment, 'page.tsx'),
    path.join(APP_DIR, segment, '[[...mdxPath]]', 'page.tsx'),
    path.join(APP_DIR, segment, '[...mdxPath]', 'page.tsx'),
  ]
  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0]
}

async function findPageFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await findPageFiles(full)))
    } else if (entry.name === 'page.tsx') {
      files.push(full)
    }
  }

  return files
}

describe('SEO: page metadata', () => {
  it.each(staticRoutePaths)('%s exports metadata with a canonical path', (route) => {
    const source = readFileSync(pageFileForRoute(route), 'utf-8')

    expect(source, `${route} must export metadata`).toMatch(/export (const metadata|async function generateMetadata)/)
    expect(source, `${route} must build metadata via createMetadata()`).toMatch(/createMetadata\(/)
    expect(source, `${route} must declare its canonical path`).toContain(`'${route}'`)
  })

  it('every page in src/app declares metadata', async () => {
    const pageFiles = await findPageFiles(APP_DIR)
    const missing: string[] = []

    for (const file of pageFiles) {
      const source = readFileSync(file, 'utf-8')
      if (!/export const metadata|generateMetadata/.test(source)) {
        missing.push(path.relative(process.cwd(), file))
      }
    }

    expect(missing, 'pages without metadata').toEqual([])
  })

  it('no page hardcodes a robots noindex that would leak into production', async () => {
    const pageFiles = await findPageFiles(APP_DIR)

    for (const file of pageFiles) {
      const source = readFileSync(file, 'utf-8')
      expect(source, `${file} should use createMetadata({ noindex }) instead of raw robots`).not.toMatch(
        /robots:\s*['"]noindex/,
      )
    }
  })
})

describe('SEO: sitemap and routes', () => {
  it('sitemap route list matches the on-disk pages', async () => {
    const pageFiles = await findPageFiles(APP_DIR)

    const routesOnDisk = pageFiles
      .map((file) => path.dirname(path.relative(APP_DIR, file)))
      // Remove the marketing route-group prefix and map to public URL paths.
      .map((dir) => {
        const stripped = dir.replace(/^\(marketing\)\/?/, '')
        // Nextra catch-all routes represent their parent directory in the sitemap.
        const withoutMdx = stripped.replace(/\/\[\[?\.\.\.mdxPath\]\]?$/, '')
        return withoutMdx ? `/${withoutMdx}` : '/'
      })
      // Payload and other dynamic [slug] routes are not part of the static list.
      .filter((route) => !route.includes('(payload)') && !route.includes('/_') && !route.includes('['))
      .sort()

    expect(routesOnDisk).toEqual([...staticRoutePaths].sort())
  })

  it('every sitemap route has a unique path and sane priority', () => {
    expect(new Set(staticRoutePaths).size).toBe(staticRoutePaths.length)
  })
})

describe('SEO: heading structure', () => {
  it('no page declares more than one h1', async () => {
    const pageFiles = await findPageFiles(APP_DIR)

    for (const file of pageFiles) {
      const source = readFileSync(file, 'utf-8')
      const h1Count = (source.match(/<h1[\s>]/g) ?? []).length
      expect(h1Count, `${path.relative(process.cwd(), file)} must not contain multiple <h1> tags`).toBeLessThanOrEqual(
        1,
      )
    }
  })
})
