import type { ApplicationBlueprint } from '../types'

export const reportingCovenantExceptionManagementBlueprint: ApplicationBlueprint = {
  label: 'Reporting & Covenant Exception Management Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Connect each obligation to its evidence',
    description:
      'Bring the credit agreement, the submitted reporting and the prior exception history into one monitored case.',
    items: [
      {
        id: 'reporting-obligation',
        title: 'Reporting obligation & due dates',
        description: 'What the credit agreement requires, and when',
        icon: 'clipboard',
      },
      {
        id: 'covenant-definitions',
        title: 'Covenant definitions',
        description: 'Tests, thresholds and calculation rules in the agreement',
        icon: 'file',
      },
      {
        id: 'compliance-certificate',
        title: 'Compliance certificate & financials',
        description: 'Submitted statements, certificates and supporting schedules',
        icon: 'receipt',
      },
      {
        id: 'bbc-support',
        title: 'BBC & collateral support',
        description: 'Borrowing-base and collateral data where the facility requires it',
        icon: 'database',
      },
      {
        id: 'insurance-ucc-tax',
        title: 'Insurance, UCC & tax items',
        description: 'Expiring policies, continuations and other tickler evidence',
        icon: 'shield',
      },
      {
        id: 'prior-exceptions',
        title: 'Prior exceptions & waivers',
        description: 'Earlier breaches, waivers and their recorded rationale',
        icon: 'history',
      },
      {
        id: 'borrower-comms',
        title: 'Borrower correspondence',
        description: 'Emails, portal uploads and explanations tied to the obligation',
        icon: 'headphones',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From due date to recorded disposition',
    description:
      'The credit officer or committee decides waiver, escalation or other material treatment; Orcaworks keeps the case current.',
    steps: [
      { id: 'trigger', title: 'Report due, covenant test or tickler expiry', icon: 'circle-alert', type: 'trigger' },
      { id: 'detect', title: 'Detect missing, late or inconsistent items', icon: 'search', type: 'action' },
      { id: 'request', title: 'Request the evidence from the borrower', icon: 'headphones', type: 'action' },
      { id: 'test', title: 'Test covenant & compare to prior state', icon: 'layers', type: 'action' },
      { id: 'classify', title: 'Satisfied, data issue, waiver or breach?', icon: 'clipboard', type: 'decision' },
      {
        id: 'credit-decision',
        title: 'Credit officer decides waiver or escalation',
        icon: 'user',
        type: 'approval',
      },
      { id: 'record', title: 'Record disposition & update tickler state', icon: 'database', type: 'system' },
      {
        id: 'close',
        title: 'Obligation resolved—with the reason and evidence retained',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Portfolio teams keep the file current; credit keeps the waiver',
    description:
      'Each obligation shows its due date, submitted evidence, test result and the pending credit decision in one place.',
    people: [
      {
        id: 'portfolio-manager',
        title: 'Portfolio Manager',
        description: 'Monitors obligations and investigates exceptions',
        icon: 'monitor',
      },
      {
        id: 'collateral-analyst',
        title: 'Collateral Analyst',
        description: 'Validates reporting and collateral support',
        icon: 'clipboard',
      },
      {
        id: 'credit-officer',
        title: 'Credit Officer / Committee',
        description: 'Decides waivers, escalations and material treatment',
        icon: 'user',
      },
    ],
    systems: [
      {
        id: 'portfolio-los-abl',
        title: 'Portfolio / LOS / ABL platform',
        description: 'Obligations, ticklers and collateral state',
        icon: 'database',
      },
      {
        id: 'document-repository',
        title: 'Document repository',
        description: 'Statements, certificates and prior waivers',
        icon: 'file',
      },
      {
        id: 'covenant-tools',
        title: 'Covenant / spreading tools',
        description: 'Financial data and test calculations',
        icon: 'settings',
      },
      {
        id: 'email-teams',
        title: 'Email / Teams',
        description: 'Borrower requests and responses',
        icon: 'monitor',
      },
    ],
  },
}
