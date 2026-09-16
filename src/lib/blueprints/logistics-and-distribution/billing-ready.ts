import type { ApplicationBlueprint } from '../types'

export const billingReadyBlueprint: ApplicationBlueprint = {
  label: 'Delivered to Billing-Ready Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the context',
    description: 'Bring together the delivery state, documents and billing rules.',
    items: [
      {
        id: 'delivery-status',
        title: 'Delivery Status',
        description: 'TMS delivery completion',
        icon: 'truck',
      },
      {
        id: 'pod-bol',
        title: 'POD / BOL',
        description: 'Proof of delivery or bill of lading',
        icon: 'receipt',
      },
      {
        id: 'document-quality',
        title: 'Document Quality',
        description: 'Readable, linkable evidence',
        icon: 'image',
      },
      {
        id: 'load-linkage',
        title: 'Load Linkage',
        description: 'Document matched to load',
        icon: 'network',
      },
      {
        id: 'billing-rules',
        title: 'Billing Rules',
        description: 'Release or hold conditions',
        icon: 'shield',
      },
      {
        id: 'tms-state',
        title: 'TMS State',
        description: 'Operational status in TMS',
        icon: 'monitor',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'Route the workflow',
    description: 'Move the load from delivered to billing-ready.',
    steps: [
      {
        id: 'delivery-complete',
        title: 'Delivery complete',
        icon: 'truck',
        type: 'trigger',
      },
      {
        id: 'check-billing-requirements',
        title: 'Check billing requirements',
        icon: 'shield',
        type: 'action',
      },
      {
        id: 'identify-request-missing',
        title: 'Identify and request missing POD/BOL',
        icon: 'search',
        type: 'action',
      },
      {
        id: 'validate-link',
        title: 'Validate and link document',
        icon: 'file',
        type: 'action',
      },
      {
        id: 'release-or-hold',
        title: 'Release or hold',
        icon: 'check',
        type: 'decision',
      },
      {
        id: 'record-closure',
        title: 'Record closure',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Coordinate the interaction',
    description: 'Show who acts and where the work gets completed.',
    people: [
      {
        id: 'billing-ar',
        title: 'Billing / AR',
        description: 'Reviews and releases billing',
        icon: 'user',
      },
      {
        id: 'back-office',
        title: 'Back Office',
        description: 'Collects and validates documents',
        icon: 'users',
      },
      {
        id: 'transportation-operations',
        title: 'Transportation Operations',
        description: 'Resolves delivery issues',
        icon: 'truck',
      },
    ],
    systems: [
      {
        id: 'tms',
        title: 'TMS',
        description: 'Transport management',
        icon: 'monitor',
      },
      {
        id: 'erp-billing-ar',
        title: 'ERP / Billing / AR',
        description: 'Billing and receivables',
        icon: 'file',
      },
      {
        id: 'document-repository',
        title: 'Document Repository',
        description: 'POD/BOL storage',
        icon: 'image',
      },
      {
        id: 'email',
        title: 'Email',
        description: 'Evidence requests',
        icon: 'network',
      },
    ],
  },
}
