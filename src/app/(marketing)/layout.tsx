import { Main } from '@/components/elements/main'
import { JsonLd } from '@/components/seo/json-ld'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteNavbar } from '@/components/site/site-navbar'
import { ThemeScript } from '@/components/theme/theme-script'
import { createMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = createMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <>
          <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

          <SiteNavbar />

          <Main>{children}</Main>

          <SiteFooter />
        </>
      </body>
    </html>
  )
}
