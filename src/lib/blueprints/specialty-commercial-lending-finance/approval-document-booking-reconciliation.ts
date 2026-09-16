import type { ApplicationBlueprint } from '../types'

export const approvalDocumentBookingReconciliationBlueprint: ApplicationBlueprint = {
  label: 'Approval, Document & Booking Reconciliation Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Put the three versions of the transaction side by side',
    description:
      'Assemble the credit approval, the executed legal package and the booked system record into one reconciliation case.',
    items: [
      {
        id: 'approval-memo',
        title: 'Credit approval & terms',
        description: 'Rate, term, collateral, guarantors, covenants, fees and conditions',
        icon: 'file',
      },
      {
        id: 'executed-docs',
        title: 'Executed loan / lease documents',
        description: 'Agreement, security agreement, guaranty and fee letter as signed',
        icon: 'layers',
      },
      {
        id: 'booked-record',
        title: 'Booked loan / lease record',
        description: 'Fields boarded into the servicing or core system',
        icon: 'database',
      },
      {
        id: 'los-fields',
        title: 'LOS transaction fields',
        description: 'Deal state as originated and approved',
        icon: 'monitor',
      },
      {
        id: 'collateral-guarantor',
        title: 'Collateral & guarantor record',
        description: 'What the system shows as pledged and who guarantees',
        icon: 'shield',
      },
      {
        id: 'exception-history',
        title: 'Prior documentation exceptions',
        description: 'Waivers, corrections and open post-close items already recorded',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From document generation to a reconciled booking',
    description:
      'Operations corrects clerical and system errors under policy; credit or legal owns substantive deviations and re-documentation.',
    steps: [
      {
        id: 'trigger',
        title: 'Documents executed or transaction ready to board',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'compare-docs', title: 'Compare approval terms to executed documents', icon: 'search', type: 'action' },
      { id: 'compare-booking', title: 'Compare documents to booked system fields', icon: 'layers', type: 'action' },
      { id: 'classify', title: 'Classify clerical vs substantive mismatch', icon: 'clipboard', type: 'decision' },
      {
        id: 'resolve',
        title: 'Operations fixes clerical; credit/legal owns substantive deviation',
        icon: 'user',
        type: 'approval',
      },
      {
        id: 'correct',
        title: 'Coordinate re-document or authorized system correction',
        icon: 'settings',
        type: 'system',
      },
      {
        id: 'close',
        title: 'Approval, documents & booking reconcile—with exceptions documented',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Operations resolves; credit and legal decide the substantive gaps',
    description:
      'The reconciliation case shows each mismatched term beside the approval language, the executed document and the booked field.',
    people: [
      {
        id: 'loan-ops-specialist',
        title: 'Loan Operations / Documentation Specialist',
        description: 'Works the discrepancy and prepares the correction',
        icon: 'headphones',
      },
      {
        id: 'loan-operations-manager',
        title: 'Loan Operations Manager',
        description: 'Approves clerical and system corrections under policy',
        icon: 'user',
      },
      {
        id: 'credit-legal',
        title: 'Credit / Legal',
        description: 'Owns substantive deviations and re-documentation decisions',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'credit-los',
        title: 'Credit system / LOS',
        description: 'Approval terms and deal state',
        icon: 'database',
      },
      {
        id: 'doc-gen-esign',
        title: 'Document generation / e-sign',
        description: 'Generated and executed legal package',
        icon: 'file',
      },
      {
        id: 'servicing-core',
        title: 'Servicing / core system',
        description: 'Booked loan or lease record',
        icon: 'monitor',
      },
      {
        id: 'email-legal',
        title: 'Email / legal workflow',
        description: 'Counsel review and correction correspondence',
        icon: 'headphones',
      },
    ],
  },
}
