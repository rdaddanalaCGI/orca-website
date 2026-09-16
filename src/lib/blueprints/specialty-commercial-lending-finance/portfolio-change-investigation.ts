import type { ApplicationBlueprint } from '../types'

export const portfolioChangeInvestigationBlueprint: ApplicationBlueprint = {
  label: 'Portfolio Change Investigation Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Reconstruct what changed around the signal',
    description:
      'Gather the multi-period, multi-system evidence needed to explain a portfolio risk signal before anyone acts.',
    items: [
      {
        id: 'risk-signal',
        title: 'Risk signal & trigger',
        description: 'Delinquency, aging shift, covenant variance or utilization change',
        icon: 'circle-alert',
      },
      {
        id: 'financial-periods',
        title: 'Current & prior financials',
        description: 'Multi-period statements, spreads and trends',
        icon: 'receipt',
      },
      {
        id: 'collateral-history',
        title: 'Collateral & availability history',
        description: 'BBC trend, aging, concentrations and ineligibles',
        icon: 'layers',
      },
      {
        id: 'payment-covenants',
        title: 'Payment & covenant record',
        description: 'Performance and prior test results',
        icon: 'monitor',
      },
      {
        id: 'prior-review',
        title: 'Prior reviews & exceptions',
        description: 'Last analysis, waivers and open conditions',
        icon: 'history',
      },
      {
        id: 'relationship-comms',
        title: 'Borrower & relationship communications',
        description: 'Recent explanations, requests and commitments',
        icon: 'headphones',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From signal to documented credit action',
    description:
      'The portfolio manager investigates; the credit officer or delegated committee approves material rating, structure or limit changes.',
    steps: [
      { id: 'trigger', title: 'Material portfolio signal detected', icon: 'circle-alert', type: 'trigger' },
      { id: 'gather', title: 'Gather multi-period, multi-system context', icon: 'layers', type: 'action' },
      { id: 'explain', title: 'Explain what changed and why', icon: 'search', type: 'action' },
      { id: 'classify', title: 'Transient variance or structural deterioration?', icon: 'clipboard', type: 'decision' },
      {
        id: 'credit-action',
        title: 'Credit officer approves action or closes the signal',
        icon: 'user',
        type: 'approval',
      },
      { id: 'update', title: 'Update rating, conditions or monitoring state', icon: 'settings', type: 'system' },
      {
        id: 'close',
        title: 'Signal closed or converted to an authorized action',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Credit keeps the judgment; the evidence is already assembled',
    description:
      'The investigation case shows the signal, the changes that matter and what still needs confirmation—before a decision is asked for.',
    people: [
      {
        id: 'portfolio-manager',
        title: 'Portfolio Manager',
        description: 'Investigates the signal and recommends the response',
        icon: 'monitor',
      },
      {
        id: 'collateral-analyst',
        title: 'Collateral Analyst',
        description: 'Supplies collateral and availability evidence',
        icon: 'clipboard',
      },
      {
        id: 'credit-officer',
        title: 'Credit Officer / Committee',
        description: 'Approves rating, structure, limit or condition changes',
        icon: 'user',
      },
    ],
    systems: [
      {
        id: 'portfolio-abl-fms',
        title: 'Portfolio / LOS / ABL / FMS',
        description: 'Positions, availability and risk state',
        icon: 'database',
      },
      { id: 'core', title: 'Core / servicing', description: 'Balances and payment history', icon: 'monitor' },
      {
        id: 'crm-email',
        title: 'CRM / email',
        description: 'Relationship context and borrower responses',
        icon: 'headphones',
      },
      {
        id: 'document-repository',
        title: 'Document repository',
        description: 'Prior reviews, memos and waivers',
        icon: 'file',
      },
      {
        id: 'external-data',
        title: 'External data (where licensed)',
        description: 'Credit, fraud and market signals already in the estate',
        icon: 'search',
      },
    ],
  },
}
