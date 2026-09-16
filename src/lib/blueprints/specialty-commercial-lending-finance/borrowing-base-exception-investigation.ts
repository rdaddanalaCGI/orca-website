import type { ApplicationBlueprint } from '../types'

export const borrowingBaseExceptionInvestigationBlueprint: ApplicationBlueprint = {
  label: 'Borrowing-Base Exception Investigation Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Explain the variance behind the calculated availability',
    description:
      'Take the ABL system’s calculation as authoritative, then assemble the schedules, facility rules and history that explain the exception.',
    items: [
      {
        id: 'bbc',
        title: 'Submitted BBC',
        description: 'Borrowing-base certificate and certification detail',
        icon: 'file',
      },
      {
        id: 'ar-aging-inventory',
        title: 'AR aging & inventory schedules',
        description: 'Receivable and inventory detail behind the certificate',
        icon: 'receipt',
      },
      {
        id: 'facility-rules',
        title: 'Loan agreement & eligibility rules',
        description: 'Advance rates, ineligible, concentration and dilution terms',
        icon: 'shield',
      },
      {
        id: 'abl-calculation',
        title: 'ABL system calculation',
        description: 'System-computed ineligibles, availability and warnings',
        icon: 'database',
      },
      {
        id: 'prior-bbc',
        title: 'Prior BBC & history',
        description: 'Previous certificate and how earlier variances resolved',
        icon: 'history',
      },
      {
        id: 'field-exam',
        title: 'Field-exam findings',
        description: 'Latest exam adjustments and concerns',
        icon: 'search',
      },
      {
        id: 'borrower-comms',
        title: 'Borrower correspondence',
        description: 'Explanations, supporting evidence and advance requests',
        icon: 'headphones',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From BBC variance to approved availability or hold',
    description:
      'The collateral analyst resolves ordinary discrepancies; delegated collateral or credit authority approves the material exception.',
    steps: [
      { id: 'trigger', title: 'BBC or advance request raises a variance', icon: 'circle-alert', type: 'trigger' },
      { id: 'consume', title: 'Take the ABL system exception as the input', icon: 'database', type: 'action' },
      { id: 'assemble', title: 'Assemble schedules, agreement & prior state', icon: 'layers', type: 'action' },
      {
        id: 'explain',
        title: 'Explain ineligible, concentration or out-of-formula variance',
        icon: 'search',
        type: 'action',
      },
      { id: 'request', title: 'Request missing borrower support', icon: 'headphones', type: 'action' },
      {
        id: 'disposition',
        title: 'Collateral / credit authority approves the disposition',
        icon: 'user',
        type: 'approval',
      },
      { id: 'post', title: 'Post availability or record the exception', icon: 'settings', type: 'system' },
      {
        id: 'close',
        title: 'Availability approved or held—with reason and evidence',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Collateral works the variance; credit keeps the override',
    description:
      'The exception case shows the system calculation beside the submitted support, the facility rule that applies and the open borrower question.',
    people: [
      {
        id: 'collateral-analyst',
        title: 'Collateral Analyst',
        description: 'Works the variance and prepares the disposition',
        icon: 'clipboard',
      },
      {
        id: 'abl-portfolio-manager',
        title: 'ABL Portfolio Manager',
        description: 'Owns the collateral position and borrower follow-up',
        icon: 'monitor',
      },
      {
        id: 'collateral-credit-authority',
        title: 'Delegated Collateral / Credit Authority',
        description: 'Approves exceptions, overrides, holds and availability treatment',
        icon: 'user',
      },
    ],
    systems: [
      {
        id: 'abl-platform',
        title: 'ABL platform',
        description: 'Borrowing base, ineligibles and availability—the calculation of record',
        icon: 'database',
      },
      {
        id: 'borrower-erp',
        title: 'Borrower ERP / accounting export',
        description: 'AR aging, inventory and journal detail',
        icon: 'receipt',
      },
      { id: 'loan-core', title: 'Loan / core system', description: 'Facility balances and state', icon: 'monitor' },
      {
        id: 'email-portal',
        title: 'Email / borrower portal',
        description: 'Borrower explanations and supporting evidence',
        icon: 'headphones',
      },
      {
        id: 'document-store',
        title: 'Document store',
        description: 'Loan agreement, prior BBCs and field exams',
        icon: 'file',
      },
    ],
  },
}
