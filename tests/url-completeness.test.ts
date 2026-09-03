import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { getRedirects } from '@/lib/redirects'
import { staticRoutePaths } from '@/lib/routes'

/**
 * Primary automated proof that the WordPress migration did not lose a URL.
 *
 * An old URL passes if either:
 *   A. the same path still exists, or
 *   B. it redirects to a path that exists.
 */

const LOCAL_CSV = '.local/urls/required-urls.csv'
const FIXTURE_CSV = 'tests/fixtures/required-urls.csv'

type Row = { oldUrl: string; targetUrl: string; line: number }

function loadCsv(): { rows: Row[]; source: string } {
  const source = existsSync(LOCAL_CSV) ? LOCAL_CSV : FIXTURE_CSV
  const content = readFileSync(source, 'utf-8')
  const lines = content.split('\n')

  const rows: Row[] = []
  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i]?.trim()
    if (!raw) continue

    const cells = raw.split(',').map((cell) => cell.trim())
    rows.push({ oldUrl: cells[0] ?? '', targetUrl: cells[1] ?? '', line: i + 1 })
  }

  return { rows, source }
}

const redirects = getRedirects()
const redirectMap = new Map(redirects.map((r) => [r.source, r.destination]))
const existingPaths = new Set(staticRoutePaths)

/** Follows the redirect chain, guarding against loops. */
function resolve(startPath: string) {
  const seen = new Set<string>()
  let current = startPath

  while (redirectMap.has(current)) {
    if (seen.has(current)) {
      return { path: current, loop: true, hops: seen.size }
    }
    seen.add(current)
    current = redirectMap.get(current)!
  }

  return { path: current, loop: false, hops: seen.size }
}

describe('redirect configuration', () => {
  it('has no self-referential redirects', () => {
    for (const redirect of redirects) {
      expect(redirect.source, 'a redirect must not point at itself').not.toBe(redirect.destination)
    }
  })

  it('has no duplicate redirect sources', () => {
    const sources = redirects.map((r) => r.source)
    expect(new Set(sources).size, 'duplicate redirect sources are ambiguous').toBe(sources.length)
  })

  it('uses absolute in-site paths', () => {
    for (const redirect of redirects) {
      expect(redirect.source.startsWith('/'), `${redirect.source} must start with "/"`).toBe(true)
      expect(redirect.destination.startsWith('/'), `${redirect.destination} must start with "/"`).toBe(true)
    }
  })

  it('has no redirect loops', () => {
    for (const redirect of redirects) {
      expect(resolve(redirect.source).loop, `${redirect.source} is part of a redirect loop`).toBe(false)
    }
  })

  it('every redirect lands on an existing page', () => {
    for (const redirect of redirects) {
      const { path } = resolve(redirect.source)
      expect(existingPaths.has(path), `${redirect.source} -> ${path} does not exist`).toBe(true)
    }
  })
})

describe('URL completeness', () => {
  const { rows, source } = loadCsv()

  it(`reads the authoritative URL list (${source})`, () => {
    expect(rows.length, 'the URL list must not be empty').toBeGreaterThan(0)
  })

  it('has no malformed rows', () => {
    for (const row of rows) {
      expect(row.oldUrl, `line ${row.line}: missing old_url`).toBeTruthy()
      expect(row.targetUrl, `line ${row.line}: missing target_url`).toBeTruthy()
      expect(row.oldUrl.startsWith('/'), `line ${row.line}: old_url must be a path`).toBe(true)
      expect(row.targetUrl.startsWith('/'), `line ${row.line}: target_url must be a path`).toBe(true)
    }
  })

  it('every old URL either still exists or redirects to an existing page', () => {
    const failures: string[] = []

    for (const row of rows) {
      const { path, loop } = resolve(row.oldUrl)

      if (loop) {
        failures.push(`line ${row.line}: ${row.oldUrl} is part of a redirect loop`)
        continue
      }

      if (path !== row.targetUrl) {
        failures.push(`line ${row.line}: ${row.oldUrl} resolves to ${path}, expected ${row.targetUrl}`)
        continue
      }

      if (!existingPaths.has(path)) {
        failures.push(`line ${row.line}: ${row.oldUrl} -> ${path} but ${path} does not exist`)
      }
    }

    expect(failures, 'URL migration coverage gaps').toEqual([])
  })
})
