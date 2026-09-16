import type { ReactNode } from 'react'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

import { HeroProcessVisual } from './hero-visual'

export function SolutionsLandingHero({ children }: { children?: ReactNode }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <Eyebrow variant="brand">SOLUTIONS</Eyebrow>
            <Heading>From business process to governed AI application.</Heading>
            <Text size="lg" className="max-w-2xl text-pretty">
              Turn complex workflows across systems, documents, decisions and people into production agentic
              applications.
            </Text>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <ButtonLink href="#industries" size="lg">
                Explore solutions
              </ButtonLink>
              <PlainButtonLink href="#lifecycle" size="lg">
                See how we build them <ArrowNarrowRightIcon className="h-4 w-4" />
              </PlainButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <HeroProcessVisual />
          </div>
        </div>
        {children}
      </Container>
    </section>
  )
}
