import type { ApplicationBlueprint } from '../types'

export const rwWiBreachLossAssessmentBlueprint: ApplicationBlueprint = {
  label: 'R&W / W&I Breach & Loss Assessment Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Reconstruct the deal record warranty by warranty',
    description:
      'The SPA, disclosure letter, data room, diligence reports and post-close evidence tied to each alleged breach.',
    items: [
      {
        id: 'breach-notice',
        title: 'Claim notice & alleged breach',
        description: 'The warranties said to be breached, and how',
        icon: 'circle-alert',
      },
      {
        id: 'spa',
        title: 'SPA & warranty terms',
        description: 'The insured warranties, limits, survival and exclusions',
        icon: 'file',
      },
      {
        id: 'disclosure-vdr',
        title: 'Disclosure letter & data room',
        description: 'What was actually disclosed against each warranty',
        icon: 'layers',
      },
      {
        id: 'diligence',
        title: 'Diligence reports',
        description: 'Financial, tax, legal and commercial diligence',
        icon: 'clipboard',
      },
      {
        id: 'deal-correspondence',
        title: 'Deal correspondence',
        description: 'Pre-close negotiation and the disclosure record',
        icon: 'headphones',
      },
      {
        id: 'loss-evidence',
        title: 'Post-close loss evidence',
        description: 'Financials and facts supporting causation and quantum',
        icon: 'receipt',
      },
      {
        id: 'policy-notice',
        title: 'Policy & notice requirements',
        description: 'W&I policy terms, notice and claims conditions',
        icon: 'shield',
      },
      {
        id: 'prior-positions',
        title: 'Prior positions & responses',
        description: 'Insurer responses, reservations and open disputes',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From breach notice to documented coverage position',
    description:
      'Transactional-risk claims counsel retains breach, coverage, causation, quantum and settlement decisions.',
    steps: [
      { id: 'trigger', title: 'Notice of alleged warranty breach', icon: 'circle-alert', type: 'trigger' },
      { id: 'deal-record', title: 'Reconstruct deal & disclosure record', icon: 'history', type: 'action' },
      { id: 'map', title: 'Map evidence to each alleged breach', icon: 'layers', type: 'action' },
      { id: 'disclosed', title: 'Separate disclosed fact from breach', icon: 'search', type: 'action' },
      { id: 'loss', title: 'Assemble loss & quantum evidence', icon: 'receipt', type: 'action' },
      { id: 'package', title: 'Prepare warranty-by-warranty position', icon: 'clipboard', type: 'action' },
      { id: 'decide', title: 'Claims counsel decides the position', icon: 'user', type: 'approval' },
      { id: 'record', title: 'Record position & respond to insured', icon: 'database', type: 'system' },
      { id: 'close', title: 'Defensible position with source links', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Claims counsel decides; the deal record is already assembled',
    description:
      'Each warranty position arrives with the disclosure, diligence and loss evidence linked to its source document.',
    people: [
      {
        id: 'transactional-claims-counsel',
        title: 'Transactional-Risk Claims Counsel',
        description: 'Decides breach, coverage, quantum and settlement',
        icon: 'user',
      },
      {
        id: 'coverage-counsel',
        title: 'Coverage / External Counsel',
        description: 'Advises on interpretation and litigation strategy',
        icon: 'shield',
      },
      {
        id: 'forensic-accountant',
        title: 'Forensic Accountant',
        description: 'Loss and quantum analysis',
        icon: 'receipt',
      },
      {
        id: 'insured-broker',
        title: 'Insured & Broker',
        description: 'Notice, evidence and negotiation counterparty',
        icon: 'headphones',
      },
    ],
    systems: [
      {
        id: 'claims-matter',
        title: 'Claims / matter record',
        description: 'Notice, positions and correspondence',
        icon: 'database',
      },
      {
        id: 'vdr-deal-files',
        title: 'Virtual data room & deal files',
        description: 'SPA, disclosures and diligence',
        icon: 'layers',
      },
      { id: 'dms-email', title: 'DMS & email', description: 'Diligence and post-close evidence', icon: 'file' },
      {
        id: 'legal-spend',
        title: 'Legal-spend tools',
        description: 'External counsel engagement and invoices',
        icon: 'receipt',
      },
    ],
  },
}
