import type { ApplicationBlueprint } from '../types'

export const shortPickBlueprint: ApplicationBlueprint = {
  label: 'Short Pick Resolution Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the context',
    description: 'Bring together the signals needed to understand the case.',
    items: [
      {
        id: 'sku-location',
        title: 'SKU + Location',
        description: 'What was short and where',
        icon: 'package',
      },
      {
        id: 'order-priority',
        title: 'Order Priority',
        description: 'Customer and service impact',
        icon: 'file',
      },
      {
        id: 'inventory-history',
        title: 'Inventory History',
        description: 'Past movements and balances',
        icon: 'history',
      },
      {
        id: 'count-evidence',
        title: 'Count Evidence',
        description: 'Cycle count, photos, scans',
        icon: 'clipboard',
      },
      {
        id: 'adjustment-policy',
        title: 'Adjustment Policy',
        description: 'Rules and thresholds',
        icon: 'shield',
      },
      {
        id: 'wms-erp',
        title: 'WMS / ERP',
        description: 'System records and status',
        icon: 'database',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'Route the workflow',
    description: 'Move the exception through the right next action.',
    steps: [
      {
        id: 'short-pick',
        title: 'Short pick',
        icon: 'package',
        type: 'trigger',
      },
      {
        id: 'alternate-stock',
        title: 'Check alternate stock',
        icon: 'search',
        type: 'action',
      },
      {
        id: 'count',
        title: 'Count if required',
        icon: 'clipboard',
        type: 'decision',
      },
      {
        id: 'approval',
        title: 'Supervisor approval',
        icon: 'user',
        type: 'approval',
      },
      {
        id: 'update-system',
        title: 'Update WMS / ERP',
        icon: 'settings',
        type: 'system',
      },
      {
        id: 'close',
        title: 'Close exception',
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
        id: 'warehouse-supervisor',
        title: 'Warehouse Supervisor',
        description: 'Reviews, approves',
        icon: 'user',
      },
      {
        id: 'inventory-control',
        title: 'Inventory Control',
        description: 'Validates and investigates',
        icon: 'users',
      },
      {
        id: 'control-desk',
        title: 'Control Desk',
        description: 'Monitors and supports',
        icon: 'headphones',
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
        description: 'On-floor actions',
        icon: 'smartphone',
      },
      {
        id: 'physical-evidence',
        title: 'Physical Inventory Evidence',
        description: 'Photos, scans, documents',
        icon: 'image',
      },
    ],
  },
}
