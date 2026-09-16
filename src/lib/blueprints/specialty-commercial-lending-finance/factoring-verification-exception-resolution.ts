import type { ApplicationBlueprint } from '../types'

export const factoringVerificationExceptionResolutionBlueprint: ApplicationBlueprint = {
  label: 'Factoring Verification Exception Resolution Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the case behind the flagged invoice',
    description:
      'Gather the invoice, its support, the factoring record and the debtor evidence for the receivable the verifier could not clear.',
    items: [
      {
        id: 'invoice',
        title: 'Invoice & purchase evidence',
        description: 'Submitted invoice, PO and delivery or service support',
        icon: 'receipt',
      },
      {
        id: 'fms-record',
        title: 'FMS receivable record',
        description: 'Eligibility, reserve and funding state in the factoring system',
        icon: 'database',
      },
      {
        id: 'debtor-ap',
        title: 'Debtor AP / portal evidence',
        description: 'What the debtor’s payable record or portal shows',
        icon: 'monitor',
      },
      {
        id: 'notice-of-assignment',
        title: 'Notice of assignment',
        description: 'NOA status and debtor acknowledgement',
        icon: 'file',
      },
      {
        id: 'verifier-result',
        title: 'Verification result',
        description: 'The specialist verifier or FMS flag that raised the case',
        icon: 'search',
      },
      {
        id: 'prior-history',
        title: 'Prior verification & dispute history',
        description: 'Earlier confirmations, disputes, credit memos and dilution',
        icon: 'history',
      },
      {
        id: 'party-comms',
        title: 'Client & debtor communications',
        description: 'Confirmations, disputes and explanations',
        icon: 'headphones',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From flagged invoice to funded or held',
    description:
      'Factoring operations and credit approve, hold, reserve or escalate under policy; suspected fraud follows the defined escalation.',
    steps: [
      {
        id: 'trigger',
        title: 'Verifier or FMS flags the invoice for exception',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'assemble', title: 'Assemble invoice, support & FMS state', icon: 'layers', type: 'action' },
      { id: 'confirm', title: 'Coordinate debtor / client confirmation', icon: 'headphones', type: 'action' },
      { id: 'classify', title: 'Match, mismatch, dispute or fraud signal?', icon: 'search', type: 'decision' },
      {
        id: 'disposition',
        title: 'Factoring ops / credit approves, holds or escalates',
        icon: 'user',
        type: 'approval',
      },
      { id: 'update', title: 'Update funding / reserve state & notify parties', icon: 'settings', type: 'system' },
      {
        id: 'close',
        title: 'Fundable receivable or held exception with evidence',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Operations works the exception; credit decides the hard cases',
    description:
      'The case shows the invoice beside the debtor evidence, the verifier result and the communication trail—before funding is decided.',
    people: [
      {
        id: 'verification-analyst',
        title: 'Verification / Operations Analyst',
        description: 'Works flagged invoices and debtor follow-up',
        icon: 'headphones',
      },
      {
        id: 'factoring-ops-manager',
        title: 'Factoring Operations Manager',
        description: 'Approves, holds or reserves under policy',
        icon: 'user',
      },
      {
        id: 'credit-fraud-authority',
        title: 'Credit / Fraud Authority',
        description: 'Decides suspected-fraud and duplicate-financing escalations',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'fms',
        title: 'Factoring management system (FMS)',
        description: 'Receivables, funding, reserves and collections state',
        icon: 'database',
      },
      {
        id: 'verifier',
        title: 'Installed invoice verifier',
        description: 'Clean-case verification and exception flags',
        icon: 'search',
      },
      {
        id: 'debtor-portals',
        title: 'Debtor AP portals',
        description: 'Payable confirmation and remittance evidence',
        icon: 'monitor',
      },
      {
        id: 'document-store',
        title: 'Document store',
        description: 'Invoices, POs, PODs and notices of assignment',
        icon: 'file',
      },
      {
        id: 'email-phone',
        title: 'Email / phone record',
        description: 'Debtor and client confirmation trail',
        icon: 'headphones',
      },
    ],
  },
}
