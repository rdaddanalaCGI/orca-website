import { z } from 'zod'

export const APP_ENVS = ['local', 'preview', 'staging', 'production'] as const
export type AppEnv = (typeof APP_ENVS)[number]

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'

const schema = z.object({
  APP_ENV: z.enum(APP_ENVS).default('local'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  PAYLOAD_SECRET: z.string().min(1).optional(),
  DATABASE_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  UNLOCK_COOKIE_SECRET: z.string().min(1).optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_SEARCH_CONSOLE: z.string().optional(),
})

const parsed = schema.safeParse({
  APP_ENV: process.env.APP_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
  UNLOCK_COOKIE_SECRET: process.env.UNLOCK_COOKIE_SECRET,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_SEARCH_CONSOLE: process.env.NEXT_PUBLIC_SEARCH_CONSOLE,
})

if (!parsed.success) {
  throw new Error(`Invalid environment configuration:\n${z.prettifyError(parsed.error)}`)
}

export const env = parsed.data

export const appEnv: AppEnv = env.APP_ENV

/** Only production is indexable. Every other environment must stay noindex. */
export const isIndexable = appEnv === 'production'

export const isProduction = appEnv === 'production'

/**
 * Production requires real secrets. Fail fast at runtime rather than booting
 * with an insecure fallback. Skipped during build, when secrets are absent.
 */
if (isProduction && !isBuildPhase) {
  if (!env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required when APP_ENV=production')
  }
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required when APP_ENV=production')
  }
}

export const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
