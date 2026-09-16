import { architectureConstructionEngineering } from './architecture-construction-engineering'
import { clinicalResearchOrganisations } from './clinical-research-organisations'
import { insurance } from './insurance'
import { legal } from './legal'
import { logisticsAndDistribution } from './logistics-and-distribution'
import { specialtyCommercialLendingFinance } from './specialty-commercial-lending-finance'
import type { SolutionVertical } from './types'

export * from './types'

export const solutions: SolutionVertical[] = [
  logisticsAndDistribution,
  insurance,
  legal,
  clinicalResearchOrganisations,
  architectureConstructionEngineering,
  specialtyCommercialLendingFinance,
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

export type ExplorerApplication = ApplicationListItem & { category?: string }

/**
 * Applications for the /solutions industry explorer: category-aware when the
 * vertical has a full application catalogue, featured use cases otherwise.
 */
export function getSolutionExplorerApplications(solution: SolutionVertical, limit = 5): ExplorerApplication[] {
  if (solution.applications?.applications && solution.applications.applications.length > 0) {
    return solution.applications.applications.slice(0, limit).map((app) => ({
      id: app.id,
      title: app.title,
      shortLabel: app.shortLabel,
      href: app.href,
      category: app.categoryEyebrow ?? app.category,
    }))
  }
  return solution.featuredUseCases.slice(0, limit).map((useCase) => ({
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
