import { SolutionClosingCta } from '@/components/solutions/closing-cta'
import { AdlcLifecycle } from '@/components/solutions/landing/adlc-lifecycle'
import { ApaSection } from '@/components/solutions/landing/apa-section'
import { SolutionsLandingHero } from '@/components/solutions/landing/hero'
import { IndustryExplorer, type ExplorerVertical } from '@/components/solutions/landing/industry-explorer'
import { createMetadata } from '@/lib/seo'
import { getSolutionExplorerApplications, solutions } from '@/lib/solutions'

export const metadata = createMetadata({
  title: 'AI Solutions & Agentic Process Automation',
  description:
    'See how Orcaworks turns complex cross-system workflows into production agentic applications — solutions for logistics, insurance, clinical research, architecture and engineering, and credit unions, delivered through a disciplined development lifecycle.',
  path: '/solutions',
})

export default function Page() {
  const verticals: ExplorerVertical[] = solutions.map((solution) => ({
    id: solution.id,
    name: solution.name,
    shortName: solution.shortName,
    href: solution.href,
    positioning: solution.solutionsPage?.positioning,
    image: solution.image,
    applications: getSolutionExplorerApplications(solution),
  }))

  return (
    <>
      <SolutionsLandingHero>
        <div id="industries" className="mt-16 scroll-mt-24 sm:mt-20">
          <IndustryExplorer verticals={verticals} />
        </div>
      </SolutionsLandingHero>

      <ApaSection />

      <AdlcLifecycle />

      <SolutionClosingCta
        closingCta={{
          eyebrow: 'GET STARTED',
          headline: 'Start with one workflow.',
          body: "Bring us a process that crosses systems, documents, people and decisions. We'll show you how to turn it into a governed agentic application.",
          primaryCta: { label: 'Get a demo', href: '/contact' },
          secondaryCta: { label: 'Explore applications', href: '#industries' },
        }}
      />
    </>
  )
}
