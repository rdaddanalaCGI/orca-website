import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import type { SolutionVertical } from '@/lib/solutions'

import { SolutionApplications } from './applications'
import { SolutionClosingCta } from './closing-cta'
import { SolutionHero } from './hero'
import { HowOrcaworksFitsSection } from './how-orcaworks-fits'
import { SolutionProblems } from './problems'
import { SolutionResources } from './resources'

export function VerticalPage({ solution }: { solution: SolutionVertical }) {
  return (
    <>
      {solution.hero ? (
        <SolutionHero hero={solution.hero} />
      ) : (
        <section className="py-16">
          <Container className="flex flex-col gap-6">
            <Heading>{solution.name}</Heading>
            <Text size="lg">{solution.name} — content and design coming soon.</Text>
          </Container>
        </section>
      )}

      {solution.problems && <SolutionProblems problems={solution.problems} />}

      {solution.applications && (
        <SolutionApplications applications={solution.applications} integrations={solution.integrations} />
      )}

      {solution.howOrcaworksFits && <HowOrcaworksFitsSection fits={solution.howOrcaworksFits} />}

      {solution.resources && <SolutionResources resources={solution.resources} />}

      {solution.closingCta && <SolutionClosingCta closingCta={solution.closingCta} />}

      {solution.featuredUseCases.map((useCase) => (
        <section key={useCase.id} id={useCase.id} className="scroll-mt-24 py-16">
          <Container className="flex flex-col gap-4">
            <Subheading>{useCase.title}</Subheading>
            {useCase.description ? <Text>{useCase.description}</Text> : <Text>Details coming soon.</Text>}
          </Container>
        </section>
      ))}
    </>
  )
}
