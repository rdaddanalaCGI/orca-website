import { describe, expect, it } from 'vitest'

import { findGatedResourceByPath, gatedResources, getGatedResource } from '@/lib/gated-resources'
import { staticRoutePaths } from '@/lib/routes'

describe('gated resources registry', () => {
  it('has unique ids and canonical paths', () => {
    const ids = Object.keys(gatedResources)
    const canonicals = Object.values(gatedResources).map((r) => r.canonicalPath)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(canonicals).size).toBe(canonicals.length)
  })

  it('has canonical paths registered as static routes', () => {
    for (const resource of Object.values(gatedResources)) {
      expect(staticRoutePaths).toContain(resource.canonicalPath)
    }
  })

  it('requires every gated path prefix to start with the canonical path', () => {
    for (const resource of Object.values(gatedResources)) {
      for (const prefix of resource.gatedPathPrefixes ?? []) {
        expect(prefix.startsWith(resource.canonicalPath)).toBe(true)
      }
    }
  })

  it('uses snake_case analytics ids', () => {
    for (const resource of Object.values(gatedResources)) {
      expect(resource.analyticsId).toMatch(/^[a-z0-9_]+$/)
    }
  })

  it('finds gated and public paths for each resource', () => {
    for (const resource of Object.values(gatedResources)) {
      const publicMatch = findGatedResourceByPath(resource.canonicalPath)
      expect(publicMatch).not.toBeNull()
      expect(publicMatch!.isGatedPath).toBe(false)

      for (const prefix of resource.gatedPathPrefixes ?? []) {
        expect(findGatedResourceByPath(`${prefix}/an-example`)?.isGatedPath).toBe(true)
      }

      expect(getGatedResource(resource.id)).toBe(resource)
    }
  })

  it('returns null for unknown paths and resource ids', () => {
    expect(findGatedResourceByPath('/not-a-handbook')).toBeNull()
    expect(getGatedResource('not-real')).toBeNull()
  })
})
