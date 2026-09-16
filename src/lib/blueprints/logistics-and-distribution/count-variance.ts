import type { ApplicationBlueprint } from '../types'

export const countVarianceBlueprint: ApplicationBlueprint = {
  label: 'Count Variance & Adjustment Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the context',
    description: 'Bring together the physical, system and policy context around the variance.',
    items: [
      {
        id: 'physical-count',
        title: 'Physical Count',
        description: 'What was actually counted',
        icon: 'clipboard',
      },
      {
        id: 'wms-quantity',
        title: 'WMS Quantity',
        description: 'Expected system quantity',
        icon: 'database',
      },
      {
        id: 'accepted-variance',
        title: 'Accepted Variance',
        description: 'Tolerance thresholds',
        icon: 'shield',
      },
      {
        id: 'movement-history',
        title: 'Movement History',
        description: 'Receipts, moves and picks',
        icon: 'history',
      },
      {
        id: 'erp-impact',
        title: 'ERP Impact',
        description: 'Financial and demand implications',
        icon: 'file',
      },
      {
        id: 'approval-policy',
        title: 'Approval Policy',
        description: 'Who can approve corrections',
        icon: 'check',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'Route the workflow',
    description: 'Move the variance from discovery to approved correction.',
    steps: [
      {
        id: 'variance-recorded',
        title: 'Variance recorded',
        icon: 'circle-alert',
        type: 'trigger',
      },
      {
        id: 'compare-state',
        title: 'Compare physical/system state',
        icon: 'search',
        type: 'action',
      },
      {
        id: 'recount',
        title: 'Recount if needed',
        icon: 'clipboard',
        type: 'decision',
      },
      {
        id: 'route-approval',
        title: 'Route material approval',
        icon: 'user',
        type: 'approval',
      },
      {
        id: 'post-correction',
        title: 'Post and record correction',
        icon: 'settings',
        type: 'system',
      },
      {
        id: 'close',
        title: 'Close',
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
        id: 'inventory-control',
        title: 'Inventory Control',
        description: 'Validates and investigates',
        icon: 'users',
      },
      {
        id: 'warehouse-supervisor',
        title: 'Warehouse Supervisor',
        description: 'Approves corrections',
        icon: 'user',
      },
    ],
    systems: [
      {
        id: 'wms',
        title: 'WMS',
        description: 'Inventory records',
        icon: 'database',
      },
      {
        id: 'erp',
        title: 'ERP',
        description: 'Financial state',
        icon: 'file',
      },
      {
        id: 'rf-mobile',
        title: 'RF / Mobile',
        description: 'On-floor counts',
        icon: 'smartphone',
      },
      {
        id: 'count-evidence',
        title: 'Count Evidence',
        description: 'Photos, scans, documents',
        icon: 'image',
      },
    ],
  },
}
