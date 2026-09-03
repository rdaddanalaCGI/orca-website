import { appEnv, env } from '@/lib/env'

const ALLOWED_HOSTS = ['localhost', '127.0.0.1']

if (appEnv === 'production') {
  throw new Error('DB-backed integration tests cannot run when APP_ENV=production')
}

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required for integration tests')
}

const dbUrl = new URL(env.DATABASE_URL)

if (!ALLOWED_HOSTS.includes(dbUrl.hostname)) {
  throw new Error(`Refusing to run integration tests against non-local database: ${dbUrl.hostname}`)
}
