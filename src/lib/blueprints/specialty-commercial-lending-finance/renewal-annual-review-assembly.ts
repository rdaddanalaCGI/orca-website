import type { ApplicationBlueprint } from '../types'

export const renewalAnnualReviewAssemblyBlueprint: ApplicationBlueprint = {
  label: 'Renewal & Annual Review Assembly Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Rebuild the relationship once, from its sources',
    description: 'Bring the last approved terms, the current package and the facility history into one review case.',
    items: [
      {
        id: 'prior-approval',
        title: 'Prior credit memo & approval',
        description: 'Last approved terms, conditions and decision rationale',
        icon: 'history',
      },
      {
        id: 'current-financials',
        title: 'Current financial package',
        description: 'New statements, tax and bank evidence for the review period',
        icon: 'receipt',
      },
      {
        id: 'covenant-history',
        title: 'Covenant & reporting history',
        description: 'Compliance record and test results since the last approval',
        icon: 'clipboard',
      },
      {
        id: 'collateral-trends',
        title: 'Collateral & BBC trends',
        description: 'Aging, availability and concentration movement',
        icon: 'layers',
      },
      {
        id: 'payment-history',
        title: 'Payment & utilization history',
        description: 'Performance across the facility or lease',
        icon: 'monitor',
      },
      {
        id: 'exceptions-waivers',
        title: 'Exceptions & waivers on record',
        description: 'Prior deviations and how each was disposed',
        icon: 'shield',
      },
      {
        id: 'relationship-comms',
        title: 'Relationship communications',
        description: 'Borrower requests, explanations and recent context',
        icon: 'headphones',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From review due date to decision-ready package',
    description:
      'The underwriter or portfolio manager owns the analysis; the credit authority approves the renewal, amendment or waiver.',
    steps: [
      { id: 'trigger', title: 'Annual review, renewal or amendment comes due', icon: 'circle-alert', type: 'trigger' },
      { id: 'assemble', title: 'Assemble prior approval & current evidence', icon: 'layers', type: 'action' },
      { id: 'gaps', title: 'Identify missing items & request them', icon: 'headphones', type: 'action' },
      { id: 'changes', title: 'Summarize changes since last approval', icon: 'search', type: 'action' },
      { id: 'prepare', title: 'Prepare sourced narrative & review questions', icon: 'clipboard', type: 'decision' },
      {
        id: 'approve',
        title: 'Credit authority approves renewal, amendment or waiver',
        icon: 'user',
        type: 'approval',
      },
      { id: 'update', title: 'Update credit record & documents', icon: 'database', type: 'system' },
      {
        id: 'close',
        title: 'Review completed with a traceable change record',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Analysts get a decision-ready package; credit keeps the approval',
    description:
      'The review case shows what changed since the last approval, with every figure and statement linked to its source.',
    people: [
      {
        id: 'credit-analyst',
        title: 'Credit Analyst / Underwriter',
        description: 'Owns the analysis and the review narrative',
        icon: 'clipboard',
      },
      {
        id: 'portfolio-manager',
        title: 'Portfolio Manager',
        description: 'Owns the relationship review and borrower follow-up',
        icon: 'user',
      },
      {
        id: 'credit-authority',
        title: 'Credit Officer / Committee',
        description: 'Approves the renewal, amendment or waiver',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'credit-los',
        title: 'Credit system / LOS',
        description: 'Prior approvals and review state',
        icon: 'database',
      },
      {
        id: 'document-store',
        title: 'Document store',
        description: 'Memos, statements and supporting evidence',
        icon: 'file',
      },
      {
        id: 'abl-fms-core',
        title: 'ABL / FMS / core',
        description: 'Collateral, payment and utilization history',
        icon: 'monitor',
      },
      {
        id: 'crm-email',
        title: 'CRM / email',
        description: 'Relationship and borrower communications',
        icon: 'headphones',
      },
      {
        id: 'spreading-tools',
        title: 'Spreading / financial-analysis tools',
        description: 'Normalized financials and ratios',
        icon: 'settings',
      },
    ],
  },
}
