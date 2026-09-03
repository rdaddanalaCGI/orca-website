import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig, getPayload } from 'payload'

import { Authors } from '../src/collections/Authors'
import { FormSubmissions } from '../src/collections/FormSubmissions'
import { Media } from '../src/collections/Media'
import { Posts } from '../src/collections/Posts'
import { PressReleases } from '../src/collections/PressReleases'
import { Users } from '../src/collections/Users'

const ALLOWED_HOSTS = ['localhost', '127.0.0.1']
process.env.DATABASE_URL ??= 'postgresql://orcaworks:orcaworks@localhost:5434/orcaworks_test'

const dbUrl = new URL(process.env.DATABASE_URL)

if (!ALLOWED_HOSTS.includes(dbUrl.hostname)) {
  throw new Error(`Refusing to push schema to a non-local host: ${dbUrl.hostname}`)
}

if (process.env.APP_ENV === 'production') {
  throw new Error('Refusing to push schema when APP_ENV=production')
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3005'
const secret = process.env.PAYLOAD_SECRET ?? 'local-development-only-secret'

const config = buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Posts, PressReleases, Authors, Media, FormSubmissions, Users],
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
await payload.destroy()
console.warn('Database schema pushed successfully.')
process.exit(0)
