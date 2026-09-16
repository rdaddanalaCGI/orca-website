import { readFileSync } from 'node:fs'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * `isIndexable` is computed when `@/lib/env` is first imported, so each case
 * resets the module registry and stubs the environment before importing.
 */
async function importWithAppEnv(appEnv: string) {
  vi.resetModules()
  vi.stubEnv('APP_ENV', appEnv)
  vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://oraworksai.vercel.app')
  vi.stubEnv('PAYLOAD_SECRET', 'test-secret')
  vi.stubEnv('DATABASE_URL', 'postgres://localhost:5432/test')

  const [{ default: robots }, { createMetadata }] = await Promise.all([import('@/app/robots'), import('@/lib/seo')])
  return { robots, createMetadata }
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('robots.txt in non-production', () => {
  it.each(['local', 'preview', 'staging'])('%s allows public crawling so noindex can be read', async (appEnv) => {
    const { robots } = await importWithAppEnv(appEnv)
    const result = robots()

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    expect(rules).toHaveLength(1)
    expect(rules[0]).toMatchObject({ userAgent: '*', allow: '/' })
    expect(rules[0]?.disallow).toEqual(expect.arrayContaining(['/admin', '/api']))
    // No blanket `Disallow: /` — crawlers must reach pages to see noindex.
    expect(rules[0]?.disallow).not.toContain('/')
    expect(result.sitemap).toBeUndefined()
    expect(result.host).toBeUndefined()
  })
})

describe('robots.txt in production', () => {
  it('keeps the indexable production rules, sitemap and host', async () => {
    const { robots } = await importWithAppEnv('production')
    const result = robots()

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    expect(rules[0]).toMatchObject({ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] })
    expect(result.sitemap).toBe('https://oraworksai.vercel.app/sitemap.xml')
    expect(result.host).toBe('https://oraworksai.vercel.app')
  })
})

describe('createMetadata indexability', () => {
  it.each(['local', 'preview', 'staging'])('%s emits noindex, nofollow', async (appEnv) => {
    const { createMetadata } = await importWithAppEnv(appEnv)
    const metadata = createMetadata({ title: 'Pricing', path: '/pricing' })
    const robots = metadata.robots as { index?: boolean; follow?: boolean; googleBot?: { index?: boolean } }

    expect(robots.index).toBe(false)
    expect(robots.follow).toBe(false)
    expect(robots.googleBot?.index).toBe(false)
    expect(metadata.alternates?.canonical).toBe('https://oraworksai.vercel.app/pricing')
  })

  it('production pages are indexable', async () => {
    const { createMetadata } = await importWithAppEnv('production')
    const metadata = createMetadata({ title: 'Pricing', path: '/pricing' })
    const robots = metadata.robots as { index?: boolean; follow?: boolean }

    expect(robots.index).toBe(true)
    expect(robots.follow).toBe(true)
  })

  it('an explicit page noindex still applies in production', async () => {
    const { createMetadata } = await importWithAppEnv('production')
    const metadata = createMetadata({ title: 'Draft', path: '/draft', noindex: true })
    const robots = metadata.robots as { index?: boolean }

    expect(robots.index).toBe(false)
  })
})

describe('downloadable file headers', () => {
  it('next.config gates X-Robots-Tag on isIndexable so production never emits it', () => {
    const source = readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf-8')

    expect(source).toContain('X-Robots-Tag')
    expect(source).toContain('isIndexable')
    expect(source).toMatch(/if \(!isIndexable\)/)
  })
})
