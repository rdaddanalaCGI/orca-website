import type { ApplicationBlueprint } from '../types'

export const dispositionCloseoutBlueprint: ApplicationBlueprint = {
  label: 'Settlement & Case Closeout Readiness Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Build the closeout checklist around the settled matter',
    description:
      'Hold the settlement terms, release, lien balances, client signatures, costs ledger and trust state beside the authoritative case record.',
    items: [
      {
        id: 'settlement-terms',
        title: 'Settlement approval & terms',
        description: 'Approved amount, parties and conditions',
        icon: 'file',
      },
      {
        id: 'release-status',
        title: 'Release status',
        description: 'Sent, signed and returned to the insurer',
        icon: 'check',
      },
      {
        id: 'liens',
        title: 'Liens & subrogation',
        description: 'Medical, Medicare and ERISA balances; final lien letters',
        icon: 'receipt',
      },
      {
        id: 'client-signatures',
        title: 'Client signatures & disbursement statement',
        description: 'Closing statement acknowledged by the client',
        icon: 'users',
      },
      {
        id: 'costs-fees',
        title: 'Case costs & fees',
        description: 'Costs ledger and fee split',
        icon: 'database',
      },
      {
        id: 'trust-state',
        title: 'Trust & disbursement state',
        description: 'Funds received, cleared and checks issued',
        icon: 'shield',
      },
      {
        id: 'lienholder-correspondence',
        title: 'Lienholder & insurer correspondence',
        description: 'Reduction requests, confirmations, outstanding replies',
        icon: 'headphones',
      },
      {
        id: 'retention-requirements',
        title: 'Closure & retention requirements',
        description: 'File-closing checklist and retention policy',
        icon: 'clipboard',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From settled to authorized closed matter',
    description:
      'The responsible attorney approves release and lien treatment; the settlement and accounting owners authorize disbursement. Orcaworks never moves money.',
    steps: [
      { id: 'trigger', title: 'Settlement recorded or settled-not-closed ages', icon: 'circle-alert', type: 'trigger' },
      { id: 'verify', title: 'Verify closeout dependencies', icon: 'clipboard', type: 'action' },
      { id: 'request', title: 'Request missing releases & lien letters', icon: 'file', type: 'action' },
      { id: 'signatures', title: 'Chase client signatures', icon: 'smartphone', type: 'action' },
      { id: 'reconcile', title: 'Reconcile case & accounting state', icon: 'database', type: 'action' },
      { id: 'attorney-approve', title: 'Attorney approves closure packet', icon: 'user', type: 'approval' },
      { id: 'disbursement', title: 'Accounting authorizes disbursement', icon: 'shield', type: 'approval' },
      { id: 'update', title: 'Update status fields in the case system', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Closed, or blockers named', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Attorneys approve closure; accounting authorizes the money',
    description:
      'Settled matters appear in the closeout queue with each unmet dependency, who owes it and how long it has been outstanding.',
    people: [
      {
        id: 'settlement-paralegal',
        title: 'Settlement Paralegal / Coordinator',
        description: 'Chases liens, releases and client signatures',
        icon: 'headphones',
      },
      {
        id: 'responsible-attorney',
        title: 'Responsible Attorney',
        description: 'Approves release, lien treatment and closure',
        icon: 'user',
      },
      {
        id: 'accounting-lead',
        title: 'Settlement / Accounting Lead',
        description: 'Authorizes disbursement and closes the ledger',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'case-system',
        title: 'Case management system',
        description: 'Disposition, status and closeout checklist',
        icon: 'database',
      },
      {
        id: 'accounting',
        title: 'Accounting / trust',
        description: 'Costs, funds and disbursement',
        icon: 'receipt',
      },
      { id: 'docusign', title: 'DocuSign', description: 'Releases and client signatures', icon: 'file' },
      {
        id: 'correspondence',
        title: 'Lienholder / insurer correspondence',
        description: 'Letters and confirmations',
        icon: 'headphones',
      },
    ],
  },
}
