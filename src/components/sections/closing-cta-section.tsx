import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Link } from '@/components/elements/link'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

export function ClosingCtaSection() {
  return (
    <section className="bg-orca-teal-dark py-12">
      <Container className="flex flex-col items-start gap-6">
        <h2 className="font-display text-[2rem]/10 tracking-tight text-pretty text-white sm:text-5xl/14">
          Start with one workflow.
        </h2>
        <p className="max-w-2xl text-base/7 text-white/70">
          Bring us a workflow that crosses systems, documents, people and decisions. See how Orcaworks can turn it into
          a governed AI application.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink
            href="/contact"
            color="brand"
            size="lg"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get a demo
          </ButtonLink>
          <Link
            href="/agentic-automation-platform"
            color="brand"
            className="rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore the platform <ArrowNarrowRightIcon />
          </Link>
        </div>
      </Container>
    </section>
  )
}
