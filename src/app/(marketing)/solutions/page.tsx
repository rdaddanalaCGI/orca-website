import Image from 'next/image'
import NextLink from 'next/link'

import { ButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { Link } from '@/components/elements/link'
import { Section } from '@/components/elements/section'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { createMetadata } from '@/lib/seo'
import { getCrossIndustryApplications, getSolutionApplicationsForLanding, solutions } from '@/lib/solutions'

export const metadata = createMetadata({
  title: 'AI Solutions by Industry',
  description:
    'Explore Orcaworks AI solutions for logistics, insurance, clinical research, architecture and engineering, and credit unions and specialty lending.',
  path: '/solutions',
})

export default function Page() {
  const crossIndustryApplications = getCrossIndustryApplications(solutions)
  const [logistics, ...others] = solutions

  return (
    <>
      <section className="py-16 lg:py-24">
        <Container className="flex max-w-3xl flex-col gap-6">
          <Eyebrow variant="brand">AI SOLUTIONS</Eyebrow>
          <Heading className="max-w-4xl">AI solutions built around how your industry works.</Heading>
          <Text size="lg" className="max-w-2xl">
            Explore the industries and operational workflows where Orcaworks helps teams resolve complex work across
            systems, data, documents and decisions.
          </Text>
          <Link href="#industries" color="brand" className="mt-2">
            Explore industries <ArrowNarrowRightIcon className="h-4 w-4" />
          </Link>

          <div className="mt-4 flex flex-wrap gap-2">
            {solutions.map((solution) => (
              <SoftButtonLink key={solution.id} href={`#${solution.id}`} size="md">
                {solution.shortName ?? solution.name}
              </SoftButtonLink>
            ))}
          </div>
        </Container>
      </section>

      <Section id="industries" className="py-16 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {logistics && (
            <div
              id={logistics.id}
              className="group relative overflow-hidden rounded-2xl bg-olive-950/2.5 ring-1 ring-olive-950/5 transition-all duration-300 hover:ring-orca-orange/20 motion-reduce:transition-none lg:col-span-2 dark:bg-white/5 dark:ring-white/10"
            >
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col gap-5 p-6 sm:p-10">
                  <h2 className="font-display text-2xl/8 text-olive-950 dark:text-white">{logistics.name}</h2>
                  {logistics.solutionsPage?.positioning && (
                    <p className="text-base/7 text-olive-700 dark:text-olive-400">
                      {logistics.solutionsPage.positioning}
                    </p>
                  )}
                  <ul className="flex flex-col gap-2" role="list">
                    {getSolutionApplicationsForLanding(logistics)
                      .slice(0, 3)
                      .map((application) => (
                        <li key={application.href}>
                          <Link
                            href={application.href}
                            color="brand"
                            className="group/link text-sm/7"
                            aria-label={`${application.shortLabel ?? application.title} in ${logistics.name}`}
                          >
                            {application.shortLabel ?? application.title}
                            <ArrowNarrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:transition-none" />
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <Link
                    href={logistics.href}
                    color="brand"
                    className="group/cta mt-auto text-sm/7"
                    aria-label={`Explore ${logistics.name}`}
                  >
                    Explore {logistics.name}
                    <ArrowNarrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
                  </Link>
                </div>
                {logistics.image && (
                  <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto">
                    <Image
                      src={logistics.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {others.map((solution) => {
            const applications = getSolutionApplicationsForLanding(solution).slice(0, 3)
            return (
              <div
                id={solution.id}
                key={solution.id}
                className="group relative overflow-hidden rounded-2xl bg-olive-950/2.5 ring-1 ring-olive-950/5 transition-all duration-300 hover:ring-orca-orange/20 motion-reduce:transition-none dark:bg-white/5 dark:ring-white/10"
              >
                {solution.image && (
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={solution.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4 p-6 sm:p-8">
                  <h2 className="font-display text-2xl/8 text-olive-950 dark:text-white">{solution.name}</h2>
                  {solution.solutionsPage?.positioning && (
                    <p className="text-base/7 text-olive-700 dark:text-olive-400">
                      {solution.solutionsPage.positioning}
                    </p>
                  )}
                  <ul className="flex flex-col gap-2" role="list">
                    {applications.map((application) => (
                      <li key={application.href}>
                        <Link
                          href={application.href}
                          color="brand"
                          className="group/link text-sm/7"
                          aria-label={`${application.shortLabel ?? application.title} in ${solution.name}`}
                        >
                          {application.shortLabel ?? application.title}
                          <ArrowNarrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:transition-none" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={solution.href}
                    color="brand"
                    className="group/cta mt-auto text-sm/7"
                    aria-label={`Explore ${solution.name}`}
                  >
                    Explore {solution.name}
                    <ArrowNarrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section
        id="workflows"
        eyebrow="WORKFLOWS"
        eyebrowVariant="brand"
        headline="Looking for a specific workflow?"
        subheadline="Find applications by the operational problem they solve, not only the industry they belong to."
        className="py-16 lg:py-24"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {crossIndustryApplications.map((application) => (
            <li key={`${application.vertical}-${application.id}`}>
              <NextLink
                href={application.href}
                className="group flex h-full flex-col gap-1 rounded-2xl border border-olive-950/5 bg-olive-950/2.5 p-5 transition-all duration-300 hover:border-orca-orange/20 hover:bg-olive-950/5 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg/7 text-olive-950 dark:text-white">
                    {application.shortLabel ?? application.title}
                  </h3>
                  <ArrowNarrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-orca-orange transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                </div>
                <span className="text-sm/6 text-olive-700 dark:text-olive-400">{application.vertical}</span>
              </NextLink>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-orca-mist py-12 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
        <Container className="flex flex-col items-start gap-6">
          <Subheading>Not sure where to start? Start with one workflow.</Subheading>
          <Text className="max-w-2xl">
            Bring us a process that crosses systems, documents, teams and decisions. We&apos;ll show you where Orcaworks
            can fit.
          </Text>
          <ButtonLink href="/contact" color="brand" size="lg">
            Get a demo <ArrowNarrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </Container>
      </section>
    </>
  )
}
