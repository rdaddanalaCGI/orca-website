import { Layout } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import { getPageMap } from 'nextra/page-map'

import { UnlockScript } from '@/components/gated/unlock-script'
import { HandbookSidebarToggle } from '@/components/handbook/sidebar-toggle'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteNavbar } from '@/components/site/site-navbar'
import { ThemeScript } from '@/components/theme/theme-script'
import '../globals.css'
import './handbook.css'

export default async function HandbookPreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pageMap = await getPageMap('/enterprise-ai-safety-handbook')

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <UnlockScript />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="rgb(244,244,240)" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="rgb(12,12,9)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Layout
          pageMap={pageMap}
          navbar={
            <>
              <SiteNavbar />
              <HandbookSidebarToggle />
            </>
          }
          footer={<SiteFooter />}
          darkMode={false}
          search={null}
          editLink={null}
          feedback={{ content: null }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
