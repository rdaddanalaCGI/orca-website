import { architectureConstructionEngineering } from './architecture-construction-engineering'
import { clinicalResearchOrganisations } from './clinical-research-organisations'
import { creditUnionsSpecialtyLending } from './credit-unions-specialty-lending'
import { insurance } from './insurance'
import { logisticsAndDistribution } from './logistics-and-distribution'
import type { SolutionVertical } from './types'

export * from './types'

export const solutions: SolutionVertical[] = [
  logisticsAndDistribution,
  insurance,
  clinicalResearchOrganisations,
  architectureConstructionEngineering,
  creditUnionsSpecialtyLending,
]

export const solutionSlugs = solutions.map((solution) => solution.slug)

export function getSolutionBySlug(slug: string): SolutionVertical | undefined {
  return solutions.find((solution) => solution.slug === slug)
}

type ApplicationListItem = {
  id: string
  title: string
  shortLabel?: string
  href: string
}

export function getSolutionApplicationsForLanding(solution: SolutionVertical): ApplicationListItem[] {
  if (solution.applications?.applications && solution.applications.applications.length > 0) {
    return solution.applications.applications.map((app) => ({
      id: app.id,
      title: app.title,
      shortLabel: app.shortLabel,
      href: app.href,
    }))
  }
  return solution.featuredUseCases.map((useCase) => ({
    id: useCase.id,
    title: useCase.title,
    shortLabel: useCase.shortLabel,
    href: useCase.href,
  }))
}

export function getCrossIndustryApplications(
  solutionsList: SolutionVertical[],
  limit = 6,
): (ApplicationListItem & { vertical: string })[] {
  const verticalApps = solutionsList.map((solution) => ({
    solution,
    apps: getSolutionApplicationsForLanding(solution),
  }))

  const result: (ApplicationListItem & { vertical: string })[] = []
  let index = 0
  while (result.length < limit) {
    let added = false
    for (const { solution, apps } of verticalApps) {
      const app = apps[index]
      if (app) {
        result.push({ ...app, vertical: solution.name })
        if (result.length >= limit) break
        added = true
      }
    }
    if (!added) break
    index++
  }

  return result
}
