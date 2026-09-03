#!/usr/bin/env node
/**
 * Enforces the dependency policy from the scaffold spec (Appendix A):
 *
 *  1. No canary / beta / rc / insiders / experimental versions.
 *  2. No `@latest` or wildcard ranges in committed manifests.
 *  3. All official Payload packages pinned to the same version.
 *  4. react and react-dom pinned to the same version.
 *  5. tailwindcss and @tailwindcss/postcss pinned to the same version.
 *  6. Packages on the "do not add by default" list stay out.
 *
 * Run via `node scripts/check-dependency-versions.mjs`.
 */

import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'))

const deps = { ...pkg.dependencies, ...pkg.devDependencies }
const errors = []

const PRERELEASE = /-(canary|beta|rc|alpha|insiders|experimental|next|dev|pre)\b|-\d+\.\d+\.\d+-/i
const FORBIDDEN_RANGE = /^(latest|\*|)$/

const DISALLOWED_PACKAGES = [
  'axios',
  'lodash',
  'moment',
  'styled-components',
  '@emotion/react',
  '@chakra-ui/react',
  '@mui/material',
  'bootstrap',
  '@tanstack/react-query',
  'react-query',
  'redux',
  '@reduxjs/toolkit',
  'zustand',
  'next-seo',
  'next-sitemap',
  'prisma',
  '@prisma/client',
  'drizzle-orm',
  '@supabase/supabase-js',
  '@payloadcms/db-sqlite',
  '@payloadcms/db-mongodb',
]

for (const [name, range] of Object.entries(deps)) {
  if (PRERELEASE.test(range)) {
    errors.push(`${name}@${range} looks like a prerelease. Use a stable release.`)
  }
  if (FORBIDDEN_RANGE.test(range)) {
    errors.push(`${name}@"${range}" is an unpinned range. Specify an explicit version.`)
  }
}

for (const name of DISALLOWED_PACKAGES) {
  if (deps[name]) {
    errors.push(`${name} is on the do-not-add list. Remove it or document an explicit exception.`)
  }
}

/** Every @payloadcms/* package plus `payload` must share one version. */
const payloadVersions = new Map()
for (const [name, range] of Object.entries(deps)) {
  if (name === 'payload' || name.startsWith('@payloadcms/')) {
    payloadVersions.set(name, range)
  }
}
const distinctPayload = new Set(payloadVersions.values())
if (distinctPayload.size > 1) {
  errors.push(
    `All Payload packages must share one version. Found: ${[...payloadVersions]
      .map(([n, v]) => `${n}@${v}`)
      .join(', ')}`,
  )
}

function requireSameVersion(a, b, label) {
  if (deps[a] && deps[b] && deps[a] !== deps[b]) {
    errors.push(`${label}: ${a}@${deps[a]} must match ${b}@${deps[b]}.`)
  }
}

requireSameVersion('react', 'react-dom', 'React pair')
requireSameVersion('tailwindcss', '@tailwindcss/postcss', 'Tailwind pair')

if (deps['eslint-config-next'] && deps.next && deps['eslint-config-next'] !== deps.next) {
  errors.push(`eslint-config-next@${deps['eslint-config-next']} should match next@${deps.next}.`)
}

if (errors.length > 0) {
  console.error('Dependency policy violations:\n')
  for (const error of errors) console.error(`  - ${error}`)
  console.error('\nSee "Approved Runtime and npm Package Versions" in the scaffold spec.')
  process.exit(1)
}

console.log('Dependency policy checks passed.')
