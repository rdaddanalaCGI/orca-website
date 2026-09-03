import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { FormSubmissions } from './collections/FormSubmissions'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { PressReleases } from './collections/PressReleases'
import { Users } from './collections/Users'
import { env, isProduction, siteUrl } from './lib/env'

// `src/lib/env.ts` already fails fast if these are missing in production. The
// local-only fallbacks below keep `pnpm build` and `pnpm dev` working without
// forcing developers to configure secrets before their first run.
const secret = env.PAYLOAD_SECRET ?? (isProduction ? '' : 'local-development-only-secret')
const connectionString = env.DATABASE_URL ?? ''

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Orcaworks',
      icons: [{ url: '/favicon.ico', rel: 'icon' }],
    },
    components: {
      graphics: {
        Logo: '/src/components/admin/Logo#Logo',
        Icon: '/src/components/admin/Icon#Icon',
      },
    },
  },
  collections: [Posts, Categories, PressReleases, Authors, Media, FormSubmissions, Leads, Users],
  db: postgresAdapter({
    pool: { connectionString },
  }),
  editor: lexicalEditor(),
  secret,
  serverURL: siteUrl,
  // Restrict cross-origin access to the Payload API to our own site.
  cors: [siteUrl],
  csrf: [siteUrl],
  upload: {
    limits: {
      // 10 MB cap on CMS uploads.
      fileSize: 10 * 1024 * 1024,
    },
  },
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})
