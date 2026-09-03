export type SolutionUseCase = {
  id: string
  title: string
  shortLabel?: string
  href: string
  description?: string
  image?: string
}

export type SolutionCta = {
  label: string
  href: string
}

export type SolutionHero = {
  eyebrow: string
  headline: string
  subheadline: string
  primaryCta: SolutionCta
  secondaryCta?: SolutionCta
}

export type SolutionProblemCard = {
  eyebrow: string
  heading: string
  body: string
  terms?: string[]
}

export type SolutionProblems = {
  heading: string
  intro: string
  cards: SolutionProblemCard[]
}

export type SolutionApplicationCta = {
  label: string
  href: string
  type: 'contact' | 'sandbox' | 'platform' | 'external'
}

export type SolutionApplication = {
  id: string
  title: string
  shortLabel?: string
  href: string
  category: string
  categoryEyebrow?: string
  headline: string
  description: string
  workflowSteps: string[]
  contextItems: string[]
  roles: string[]
  systems: string[]
  cta: SolutionApplicationCta
  featured?: boolean
  demoAvailable?: boolean
  badge?: string
}

export type SolutionApplications = {
  eyebrow: string
  heading: string
  intro: string
  defaultId?: string
  applications: SolutionApplication[]
}

export type SolutionIntegration = {
  name: string
  category?: string
  status?: 'native' | 'validated' | 'airbyte' | 'api' | 'demo' | 'other'
}

export type SolutionIntegrations = {
  heading: string
  intro: string
  items: SolutionIntegration[]
}

export type SolutionHowOrcaworksFitsCard = {
  id: string
  eyebrow: string
  heading: string
  body: string
  visualType: 'system-stack' | 'context-converge' | 'workflow' | 'blueprint' | 'image'
  items: string[]
  image?: string
  darkImage?: string
}

export type SolutionHowOrcaworksFits = {
  eyebrow: string
  heading: string
  intro: string
  cards: SolutionHowOrcaworksFitsCard[]
}

export type SolutionResourceCta = {
  label: string
  href?: string
  comingSoon?: boolean
  resourceId?: string
}

export type SolutionResource = {
  id: string
  eyebrow: string
  title: string
  description: string
  cta: SolutionResourceCta
}

export type SolutionResources = {
  eyebrow: string
  heading: string
  intro?: string
  items: SolutionResource[]
}

export type SolutionClosingCta = {
  eyebrow?: string
  headline: string
  body: string
  primaryCta: SolutionCta
  secondaryCta: SolutionCta
}

export type SolutionVerticalSolutionsPage = {
  positioning?: string
  featured?: boolean
  displayOrder?: number
}

export type SolutionVertical = {
  id: string
  name: string
  shortName?: string
  slug: string
  href: string
  description?: string
  image?: string
  solutionsPage?: SolutionVerticalSolutionsPage
  hero?: SolutionHero
  problems?: SolutionProblems
  applications?: SolutionApplications
  integrations?: SolutionIntegrations
  howOrcaworksFits?: SolutionHowOrcaworksFits
  resources?: SolutionResources
  closingCta?: SolutionClosingCta
  featuredUseCases: SolutionUseCase[]
}
