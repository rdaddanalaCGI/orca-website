import type { SolutionVertical } from './types'

export const creditUnionsSpecialtyLending: SolutionVertical = {
  id: 'credit-unions-specialty-lending',
  name: 'Credit Unions & Specialty Lending',
  shortName: 'Credit Unions',
  slug: 'credit-unions-specialty-lending',
  href: '/solutions/credit-unions-specialty-lending',
  image: '/img/verticals/fintech.jpeg',
  solutionsPage: {
    positioning:
      'Unite client onboarding, KYC and fraud-prevention work across identity, documents, risk signals and policy exceptions.',
  },
  featuredUseCases: [
    {
      id: 'client-onboarding',
      title: 'Client Onboarding',
      shortLabel: 'Onboarding',
      href: '/solutions/credit-unions-specialty-lending#client-onboarding',
      description:
        'Onboarding teams manually verify customer identity, source documents, risk signals and policy exceptions across KYC portals, email and internal systems before an account can be approved.',
    },
    {
      id: 'kyc',
      title: 'Know Your Customer',
      shortLabel: 'KYC',
      href: '/solutions/credit-unions-specialty-lending#kyc',
    },
    {
      id: 'fraud-prevention',
      title: 'Fraud Prevention',
      shortLabel: 'Fraud',
      href: '/solutions/credit-unions-specialty-lending#fraud-prevention',
    },
  ],
  resources: {
    eyebrow: 'INDUSTRY RESOURCES',
    heading: 'Go deeper on credit unions & specialty lending.',
    intro: 'Download guides for your team and your stakeholders.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Credit Unions & Specialty Lending — Executive Brief',
        description:
          'A concise view of the operational exceptions, priority workflows and practical starting points for governed AI across client onboarding, KYC and fraud prevention.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'credit-unions-specialty-lending-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Credit Unions & Specialty Lending — Use-Case Guide',
        description:
          'A deeper operational guide to client onboarding, KYC and fraud prevention—including the systems, evidence, users, decisions and metrics behind each workflow.',
        cta: { label: 'Explore the use-case guide →', resourceId: 'credit-unions-specialty-lending-use-case-guide' },
      },
    ],
  },
}
