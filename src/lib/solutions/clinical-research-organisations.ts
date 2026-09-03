import type { SolutionVertical } from './types'

export const clinicalResearchOrganisations: SolutionVertical = {
  id: 'clinical-research-organisations',
  name: 'Clinical Research Organisations',
  shortName: 'CRO',
  slug: 'clinical-research-organisations',
  href: '/solutions/clinical-research-organisations',
  image: '/img/verticals/healthtech.png',
  solutionsPage: {
    positioning:
      'Streamline patient intake, prior authorization and care coordination across EHRs, faxes, portals and the clinical data they depend on.',
  },
  featuredUseCases: [
    {
      id: 'patient-intake',
      title: 'Patient Intake',
      shortLabel: 'Intake',
      href: '/solutions/clinical-research-organisations#patient-intake',
    },
    {
      id: 'prior-authorization',
      title: 'Prior Authorization',
      shortLabel: 'Prior Auth',
      href: '/solutions/clinical-research-organisations#prior-authorization',
      description:
        'Care coordinators collect clinical notes, patient history, payer policies and formulary rules from EHRs, faxes and portals before a prior authorization request can be submitted cleanly.',
    },
    {
      id: 'care-coordination',
      title: 'Care Coordination',
      shortLabel: 'Care',
      href: '/solutions/clinical-research-organisations#care-coordination',
    },
  ],
  resources: {
    eyebrow: 'INDUSTRY RESOURCES',
    heading: 'Go deeper on clinical research organisations.',
    intro: 'Download guides for your team and your stakeholders.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Clinical Research Organisations — Executive Brief',
        description:
          'A concise view of the operational exceptions, priority workflows and practical starting points for governed AI across patient intake, prior authorization and care coordination.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'clinical-research-organisations-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Clinical Research Organisations — Use-Case Guide',
        description:
          'A deeper operational guide to patient intake, prior authorization and care coordination—including the systems, evidence, users, decisions and metrics behind each workflow.',
        cta: { label: 'Explore the use-case guide →', resourceId: 'clinical-research-organisations-use-case-guide' },
      },
    ],
  },
}
