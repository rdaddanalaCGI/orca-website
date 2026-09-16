import type { ApplicationBlueprint } from '../types'

export const dealPackageCompletionBlueprint: ApplicationBlueprint = {
  label: 'Deal Package Completion Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Build the package the program actually requires',
    description:
      'Pull mixed-channel submissions, the deal’s evidence requirements and the relationship record into one completeness case.',
    items: [
      {
        id: 'application',
        title: 'Application & deal details',
        description: 'Submitted request, structure and selected program',
        icon: 'clipboard',
      },
      {
        id: 'program-requirements',
        title: 'Program evidence requirements',
        description: 'What this deal type and ticket size must include',
        icon: 'file',
      },
      {
        id: 'financial-package',
        title: 'Financial statements & tax / bank data',
        description: 'Statements, returns and bank evidence as submitted',
        icon: 'receipt',
      },
      {
        id: 'equipment-quote',
        title: 'Equipment quote / invoice',
        description: 'Asset, cost and vendor detail for the transaction',
        icon: 'package',
      },
      {
        id: 'entity-guarantor',
        title: 'Entity & guarantor documents',
        description: 'Legal names, formation and required guarantees',
        icon: 'users',
      },
      {
        id: 'channel-submissions',
        title: 'Portal, broker & email submissions',
        description: 'Mixed-channel documents and messages tied to the deal',
        icon: 'headphones',
      },
      {
        id: 'crm-record',
        title: 'CRM / relationship record',
        description: 'Existing borrower, broker and vendor history',
        icon: 'database',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From first submission to decision-ready package',
    description:
      'Originations and credit operations determine checklist completion; the underwriter decides when the package is ready for credit.',
    steps: [
      {
        id: 'trigger',
        title: 'Application or broker / vendor submission received',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'checklist', title: 'Apply the program-specific evidence checklist', icon: 'clipboard', type: 'action' },
      { id: 'gaps', title: 'Flag missing, stale or inconsistent items', icon: 'search', type: 'action' },
      { id: 'chase', title: 'Request documents from borrower, broker or vendor', icon: 'headphones', type: 'action' },
      { id: 'validate', title: 'Validate arrivals & update package state', icon: 'layers', type: 'action' },
      {
        id: 'decision-ready',
        title: 'Underwriter accepts the decision-ready package',
        icon: 'user',
        type: 'approval',
      },
      { id: 'update', title: 'Update LOS status & notify credit', icon: 'settings', type: 'system' },
      {
        id: 'close',
        title: 'Decision-ready package—or named gaps with an owner',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Underwriters get a complete package, not another reopen cycle',
    description:
      'The case shows each required item, what arrived, what failed validation and the open follow-up with its owner.',
    people: [
      {
        id: 'originations-coordinator',
        title: 'Originations Coordinator',
        description: 'Works the checklist and borrower / broker follow-up',
        icon: 'headphones',
      },
      {
        id: 'credit-analyst',
        title: 'Credit Analyst',
        description: 'Validates incoming evidence against the deal',
        icon: 'clipboard',
      },
      {
        id: 'underwriter',
        title: 'Underwriter',
        description: 'Decides when the package is ready for credit judgment',
        icon: 'user',
      },
    ],
    systems: [
      {
        id: 'los-portal',
        title: 'LOS / borrower portal',
        description: 'Application state and checklist',
        icon: 'database',
      },
      { id: 'crm', title: 'CRM', description: 'Borrower, broker and vendor relationships', icon: 'users' },
      {
        id: 'document-store',
        title: 'Document store',
        description: 'Received statements, quotes and entity documents',
        icon: 'file',
      },
      {
        id: 'email',
        title: 'Email / shared inbox',
        description: 'Broker, vendor and borrower submissions',
        icon: 'monitor',
      },
      {
        id: 'credit-data',
        title: 'Credit / data providers (where licensed)',
        description: 'Bureau, KYB and fraud inputs already in the stack',
        icon: 'search',
      },
    ],
  },
}
