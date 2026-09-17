import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'

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
            Get a demo
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
