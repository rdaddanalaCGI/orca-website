import type { SolutionVertical } from './types'

export const architectureConstructionEngineering: SolutionVertical = {
  id: 'architecture-construction-engineering',
  name: 'Architecture, Construction & Engineering',
  shortName: 'ACE',
  slug: 'architecture-construction-engineering',
  href: '/solutions/architecture-construction-engineering',
  image: '/img/verticals/aec.jpeg',
  solutionsPage: {
    positioning:
      'Coordinate project, document and field work across RFIs, submittals, schedules and the shared project information behind them.',
  },
  featuredUseCases: [
    {
      id: 'project-coordination',
      title: 'Project Coordination',
      shortLabel: 'Coordination',
      href: '/solutions/architecture-construction-engineering#project-coordination',
      description:
        'Project managers pull RFIs, submittals, field reports and schedule updates from email, project tools and shared drives before they can see what is blocked and who must act.',
    },
    {
      id: 'document-review',
      title: 'Document Review',
      shortLabel: 'Documents',
      href: '/solutions/architecture-construction-engineering#document-review',
    },
    {
      id: 'field-coordination',
      title: 'Field Coordination',
      shortLabel: 'Field',
      href: '/solutions/architecture-construction-engineering#field-coordination',
    },
  ],
  resources: {
    eyebrow: 'INDUSTRY RESOURCES',
    heading: 'Go deeper on architecture, construction & engineering.',
    intro: 'Download guides for your team and your stakeholders.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Architecture, Construction & Engineering — Executive Brief',
        description:
          'A concise view of the operational exceptions, priority workflows and practical starting points for governed AI across project, document and field coordination.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'architecture-construction-engineering-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Architecture, Construction & Engineering — Use-Case Guide',
        description:
          'A deeper operational guide to RFIs, submittals, field reports and schedule updates—including the systems, evidence, users, decisions and metrics behind each workflow.',
        cta: {
          label: 'Explore the use-case guide →',
          resourceId: 'architecture-construction-engineering-use-case-guide',
        },
      },
    ],
  },
}
