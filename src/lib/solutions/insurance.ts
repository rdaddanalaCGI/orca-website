import type { SolutionVertical } from './types'

export const insurance: SolutionVertical = {
  id: 'insurance',
  name: 'Insurance',
  slug: 'insurance',
  href: '/solutions/insurance',
  image: '/img/verticals/insurance.jpeg',
  solutionsPage: {
    positioning:
      'Coordinate claims, underwriting and investigation work across the evidence, correspondence and decisions that drive each case.',
  },
  featuredUseCases: [
    {
      id: 'claims',
      title: 'Claims Operations',
      shortLabel: 'Claims',
      href: '/solutions/insurance#claims',
      description: 'Coordinate evidence, decisions and actions across the claims lifecycle.',
    },
    {
      id: 'underwriting',
      title: 'Underwriting',
      shortLabel: 'Underwriting',
      href: '/solutions/insurance#underwriting',
    },
    {
      id: 'investigations',
      title: 'Investigations',
      shortLabel: 'Investigations',
      href: '/solutions/insurance#investigations',
    },
  ],
  resources: {
    eyebrow: 'INDUSTRY RESOURCES',
    heading: 'Go deeper on insurance.',
    intro: 'Download guides for your team and your stakeholders.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Insurance — Executive Brief',
        description:
          'A concise view of the operational exceptions, priority workflows and practical starting points for governed AI across claims, underwriting and investigations.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'insurance-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Insurance — Use-Case Guide',
        description:
          'A deeper operational guide to claims, underwriting and investigations—including the systems, evidence, users, decisions and metrics behind each workflow.',
        cta: { label: 'Explore the use-case guide →', resourceId: 'insurance-use-case-guide' },
      },
    ],
  },
}
