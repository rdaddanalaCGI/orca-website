import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

export function ClosingCtaSection() {
  return (
    <section className="py-16">
      <Container className="flex flex-col items-start gap-6">
        <h2 className="font-display text-2xl/8 text-olive-950 dark:text-white">Start with one workflow.</h2>
        <p className="max-w-2xl text-base/7 text-olive-700 dark:text-orca-frost">
          Bring us a workflow that crosses systems, documents, people and decisions. See how Orcaworks can turn it into
          a governed AI application.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact" size="lg">
            Get A Demo
          </ButtonLink>
          <PlainButtonLink href="/agentic-automation-platform" size="lg">
            Explore The Platform <ArrowNarrowRightIcon />
          </PlainButtonLink>
        </div>
      </Container>
    </section>
  )
}
