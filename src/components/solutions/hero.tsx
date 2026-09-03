import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import type { SolutionHero as SolutionHeroData } from '@/lib/solutions'

export function SolutionHero({ hero }: { hero: SolutionHeroData }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex max-w-4xl flex-col items-center gap-8 text-center">
        <Eyebrow variant="brand">{hero.eyebrow}</Eyebrow>
        <Heading>{hero.headline}</Heading>
        <Text size="lg" className="max-w-2xl">
          {hero.subheadline}
        </Text>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={hero.primaryCta.href} color="brand" size="lg">
            {hero.primaryCta.label}
          </ButtonLink>
          {hero.secondaryCta && (
            <PlainButtonLink href={hero.secondaryCta.href} size="lg">
              {hero.secondaryCta.label}
            </PlainButtonLink>
          )}
        </div>
      </Container>
    </section>
  )
}
