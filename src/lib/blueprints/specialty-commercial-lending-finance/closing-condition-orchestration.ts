import type { ApplicationBlueprint } from '../types'

export const closingConditionOrchestrationBlueprint: ApplicationBlueprint = {
  label: 'Closing Condition Orchestration Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Build the closing case around the approval',
    description:
      'Pull the credit approval, its conditions and every piece of third-party evidence into one transaction-specific case.',
    items: [
      {
        id: 'credit-approval',
        title: 'Credit approval & commitment',
        description: 'Approved terms, conditions and delegated authority',
        icon: 'file',
      },
      {
        id: 'approval-conditions',
        title: 'Closing-condition checklist',
        description: 'Pre-funding requirements derived from the approval',
        icon: 'clipboard',
      },
      {
        id: 'title-ucc',
        title: 'Title & UCC evidence',
        description: 'Searches, filings, lien position and perfection items',
        icon: 'shield',
      },
      {
        id: 'insurance-appraisal',
        title: 'Insurance & appraisal evidence',
        description: 'Certificates, valuations and environmental items where required',
        icon: 'receipt',
      },
      {
        id: 'entity-legal-docs',
        title: 'Entity & legal documents',
        description: 'Formation, authority, legal opinions and prepared loan or lease documents',
        icon: 'layers',
      },
      {
        id: 'party-communications',
        title: 'Borrower, counsel & title communications',
        description: 'Email, portal and message evidence from outside parties',
        icon: 'headphones',
      },
      {
        id: 'los-status',
        title: 'LOS closing status',
        description: 'Checklist and transaction state in the system of record',
        icon: 'monitor',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From credit approval to clear to close',
    description:
      'Loan operations clears or holds within delegated authority; credit or legal decides material waivers and legal exceptions.',
    steps: [
      { id: 'trigger', title: 'Credit approval recorded; deal enters closing', icon: 'circle-alert', type: 'trigger' },
      { id: 'checklist', title: 'Derive the condition checklist from the approval', icon: 'clipboard', type: 'action' },
      { id: 'map-evidence', title: 'Map incoming evidence to each condition', icon: 'layers', type: 'action' },
      { id: 'chase', title: 'Chase title, insurance, counsel & borrower items', icon: 'headphones', type: 'action' },
      { id: 'exceptions', title: 'Flag evidence that conflicts with approval terms', icon: 'search', type: 'decision' },
      {
        id: 'clear-or-hold',
        title: 'Loan operations clears or holds; credit/legal decides waivers',
        icon: 'user',
        type: 'approval',
      },
      { id: 'update', title: 'Update LOS closing state & notify parties', icon: 'settings', type: 'system' },
      {
        id: 'close',
        title: 'Clear to close—or held with the open condition named',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Loan operations decides; the record and the parties are updated',
    description:
      'Work appears in the closing queue with each condition, its evidence state and the approval language that governs it.',
    people: [
      {
        id: 'loan-closer',
        title: 'Loan Closer',
        description: 'Works the checklist and chases borrower, counsel and title parties',
        icon: 'headphones',
      },
      {
        id: 'loan-operations-manager',
        title: 'Loan Operations Manager',
        description: 'Clears or holds the transaction within delegated authority',
        icon: 'user',
      },
      {
        id: 'credit-legal',
        title: 'Credit / Legal',
        description: 'Decides material waivers, deviations and legal exceptions',
        icon: 'shield',
      },
    ],
    systems: [
      { id: 'los', title: 'LOS / credit system', description: 'Approval record and closing status', icon: 'database' },
      {
        id: 'document-repository',
        title: 'Document repository',
        description: 'Executed package and evidence store',
        icon: 'file',
      },
      {
        id: 'ucc-title-providers',
        title: 'UCC / title & due-diligence providers',
        description: 'Searches, filings, insurance and appraisal evidence',
        icon: 'search',
      },
      {
        id: 'email-teams',
        title: 'Email / Teams / portal',
        description: 'Borrower, counsel and title-party follow-up',
        icon: 'monitor',
      },
      {
        id: 'doc-prep-esign',
        title: 'Document prep / e-sign',
        description: 'Generated and executed loan or lease documents',
        icon: 'receipt',
      },
    ],
  },
}
