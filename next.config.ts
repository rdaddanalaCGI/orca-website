import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

import nextra from 'nextra'

import { isIndexable } from '@/lib/env'
import { getRedirects } from '@/lib/redirects'
import { createSecurityHeaders } from '@/lib/security-headers'

const withNextra = nextra({
  contentDirBasePath: '/',
})

const getBaseConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  return {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tailwindcss.com',
          pathname: '/plus-assets/img/component-images/**',
        },
      ],
    },
    // Payload's Postgres/Drizzle stack loads native binaries that cannot be bundled.
    serverExternalPackages: ['payload', '@payloadcms/db-postgres', '@payloadcms/drizzle', 'drizzle-kit', 'esbuild'],
    turbopack: {
      resolveAlias: {
        'next-mdx-import-source-file': './src/mdx-components.tsx',
      },
    },
    outputFileTracingIncludes: {
      '/api/downloads/**': ['./private/pdfs/**'],
    },
    async redirects() {
      return getRedirects()
    },
    async headers() {
      const entries = [{ source: '/:path*', headers: createSecurityHeaders({ isDev }) }]

      // File responses are not covered by page metadata, so non-production
      // builds mark downloadable documents noindex via X-Robots-Tag. This is
      // intentionally gated on isIndexable so a production build never emits it.
      if (!isIndexable) {
        entries.push({
          source: '/:file(.*\\.(?:pdf|doc|docx|xls|xlsx|ppt|pptx|csv|zip|epub))',
          headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
        })
      }

      return entries
    },
  } as unknown as NextConfig
}

const nextConfig = (phase: string): NextConfig => withNextra(getBaseConfig(phase))

export default nextConfig
