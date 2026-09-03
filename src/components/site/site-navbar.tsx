import Image from 'next/image'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { AgenticApplicationsMenu } from '@/components/navigation/agentic-applications-menu'
import { ResourcesMenu } from '@/components/navigation/resources-menu'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function SiteNavbar() {
  return (
    <NavbarWithLogoActionsAndCenteredLinks
      id="navbar"
      links={
        <>
          <NavbarLink
            href="/agentic-automation-platform"
            className="rounded-full px-3 py-1 transition-colors hover:bg-olive-950/10 dark:hover:bg-white/10"
          >
            Orca Agent Platform
          </NavbarLink>
          <AgenticApplicationsMenu />
          <ResourcesMenu />
        </>
      }
      logo={
        <NavbarLogo href="/" className="relative h-10 w-32">
          <Image
            src="/img/logos/orcaworks-dark.png"
            alt="Orcaworks"
            className="object-contain dark:hidden"
            fill
            sizes="128px"
          />
          <Image
            src="/img/logos/orcaworks-white.png"
            alt="Orcaworks"
            className="object-contain not-dark:hidden"
            fill
            sizes="128px"
          />
        </NavbarLogo>
      }
      actions={
        <>
          <ThemeToggle />
          <PlainButtonLink href="/" className="max-sm:hidden">
            Log in
          </PlainButtonLink>
          <ButtonLink href="/contact" color="brand">
            Get started
          </ButtonLink>
        </>
      }
    />
  )
}
