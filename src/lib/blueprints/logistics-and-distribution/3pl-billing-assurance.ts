import type { ApplicationBlueprint } from '../types'

export const threePlBillingAssuranceBlueprint: ApplicationBlueprint = {
  label: '3PL Billing Assurance Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Match billable work to the customer rate card',
    description:
      'Combine captured WMS events with the special handling, project work and account notes recorded outside the billing path.',
    items: [
      {
        id: 'wms-events',
        title: 'WMS activity & events',
        description: 'Receipts, picks, moves, storage days',
        icon: 'warehouse',
      },
      {
        id: 'service-units',
        title: 'Storage / handling / service units',
        description: 'Pallets, cases, hours, cycles',
        icon: 'boxes',
      },
      {
        id: 'rate-card',
        title: 'Customer rate card & contract',
        description: 'Agreed charges and conditions',
        icon: 'receipt',
      },
      {
        id: 'sla-sop',
        title: 'SLA / SOP & special services',
        description: 'Customer-specific conditions',
        icon: 'shield',
      },
      {
        id: 'out-of-system-evidence',
        title: 'Work tickets, emails & project notes',
        description: 'Evidence of billable work outside WMS',
        icon: 'file',
      },
      {
        id: 'credits-disputes',
        title: 'Prior credits & disputes',
        description: 'What this customer has challenged',
        icon: 'history',
      },
      {
        id: 'billing-record',
        title: 'Accounting / billing record',
        description: 'Invoice lines already raised',
        icon: 'database',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From billing cycle to defensible invoice',
    description:
      'Standard configured charges keep flowing through the WMS billing engine; nonstandard charges and credits are decided by billing or site authority.',
    steps: [
      { id: 'trigger', title: 'Billing cycle or event exception', icon: 'circle-alert', type: 'trigger' },
      { id: 'gather', title: 'Gather WMS events & work evidence', icon: 'layers', type: 'action' },
      { id: 'match', title: 'Match to rate-card conditions', icon: 'receipt', type: 'action' },
      { id: 'identify', title: 'Find missing or unsupported charge', icon: 'search', type: 'action' },
      { id: 'request', title: 'Request operational evidence', icon: 'headphones', type: 'action' },
      { id: 'approve', title: 'Billing / site GM approves nonstandard', icon: 'user', type: 'approval' },
      { id: 'update', title: 'Create / update billing record', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Preserve evidence for the amount', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'A billing-assurance queue by customer and period',
    description:
      'Cases sit in ready, missing evidence, nonstandard approval or disputed until the invoice is defensible.',
    people: [
      {
        id: 'billing-analyst',
        title: 'Warehouse Billing Analyst',
        description: 'Reconciles events to rate card',
        icon: 'user',
      },
      {
        id: 'account-coordinator',
        title: 'Account Coordinator',
        description: 'Supplies customer-specific evidence',
        icon: 'headphones',
      },
      {
        id: 'site-gm',
        title: 'Site GM / Billing Manager',
        description: 'Approves nonstandard charges and credits',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'wms', title: 'WMS', description: 'Captured billable events', icon: 'warehouse' },
      {
        id: 'billing-engine',
        title: 'WMS billing engine',
        description: 'Configured standard charges',
        icon: 'receipt',
      },
      { id: 'accounting', title: 'Accounting / AR', description: 'Invoice of record', icon: 'database' },
      {
        id: 'tickets-email',
        title: 'Work tickets / email',
        description: 'Out-of-system work evidence',
        icon: 'file',
      },
    ],
  },
}
