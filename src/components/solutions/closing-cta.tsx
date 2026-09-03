import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'

import type { SolutionClosingCta } from '@/lib/solutions'

export function SolutionClosingCta({ closingCta }: { closingCta: SolutionClosingCta }) {
  return (
    <section className="py-24">
      <Container className="flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-6">
          <Eyebrow variant="brand">{closingCta.eyebrow}</Eyebrow>
          <Subheading>{closingCta.headline}</Subheading>
          <Text size="lg" className="max-w-2xl text-pretty">
            {closingCta.body}
          </Text>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={closingCta.primaryCta.href} color="dark/light" size="lg">
            {closingCta.primaryCta.label}
          </ButtonLink>
          <PlainButtonLink href={closingCta.secondaryCta.href} color="brand" size="lg">
            {closingCta.secondaryCta.label}
          </PlainButtonLink>
        </div>
      </Container>
    </section>
  )
}
