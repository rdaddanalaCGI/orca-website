import type { ApplicationBlueprint } from '../types'

export const inventoryStateReconciliationBlueprint: ApplicationBlueprint = {
  label: 'ERP–WMS–3PL Inventory Reconciliation Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Line up every transaction that touched the SKU',
    description:
      'Compare balances, receipts, shipments, adjustments and failed messages across ERP, WMS and 3PL feeds.',
    items: [
      {
        id: 'balances',
        title: 'SKU / location balances',
        description: 'ERP, WMS and 3PL quantities',
        icon: 'boxes',
      },
      {
        id: 'transactions',
        title: 'Receipt, shipment & adjustment history',
        description: 'Postings on each side',
        icon: 'history',
      },
      {
        id: 'identifiers',
        title: 'LPN / pallet / shipment IDs',
        description: 'Keys to join the events',
        icon: 'package',
      },
      {
        id: 'holds-recalls',
        title: 'Holds, recalls & damage status',
        description: 'State that blocks or reclassifies stock',
        icon: 'circle-alert',
      },
      {
        id: 'integration-logs',
        title: 'EDI / API / message-queue logs',
        description: 'Failed, stuck or duplicate messages',
        icon: 'network',
      },
      {
        id: 'threepl-extracts',
        title: '3PL inventory extracts',
        description: 'Partner-reported balances',
        icon: 'warehouse',
      },
      {
        id: 'documents',
        title: 'Receiving / shipping documents',
        description: 'Packing lists, BOLs, receipts',
        icon: 'file',
      },
      {
        id: 'physical-count',
        title: 'Physical count result',
        description: 'When digital evidence is not enough',
        icon: 'clipboard',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From mismatch to authorized correction',
    description:
      'No inventory adjustment, reversal or reprocess is executed without the configured owner and evidence.',
    steps: [
      { id: 'trigger', title: 'Mismatch or failed confirmation', icon: 'circle-alert', type: 'trigger' },
      { id: 'gather', title: 'Gather ERP, WMS & 3PL history', icon: 'layers', type: 'action' },
      { id: 'normalize', title: 'Normalize IDs & order events', icon: 'history', type: 'action' },
      { id: 'locate', title: 'Locate missing or duplicate posting', icon: 'search', type: 'action' },
      { id: 'sufficient', title: 'Digital evidence sufficient?', icon: 'shield', type: 'decision' },
      { id: 'count', title: 'Hold for physical count if not', icon: 'clipboard', type: 'action' },
      { id: 'prepare', title: 'Prepare reprocess / reversal / adjustment', icon: 'file', type: 'action' },
      { id: 'approve', title: 'Inventory owner approves', icon: 'user', type: 'approval' },
      { id: 'execute', title: 'Post & verify both systems agree', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Close with cause & evidence', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'An investigation timeline, not a spreadsheet hunt',
    description:
      'Analysts see ERP, WMS and 3PL events on one timeline with the proposed correction and resulting balances.',
    people: [
      {
        id: 'inventory-control',
        title: 'Inventory Control Analyst',
        description: 'Investigates and proposes correction',
        icon: 'user',
      },
      {
        id: 'applications-owner',
        title: 'WMS / ERP Applications Owner',
        description: 'Reprocesses failed messages',
        icon: 'settings',
      },
      {
        id: 'dc-manager',
        title: 'DC Manager / Controller',
        description: 'Approves material adjustments',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'erp', title: 'ERP', description: 'Financial inventory of record', icon: 'database' },
      { id: 'wms', title: 'WMS', description: 'Operational inventory and tasks', icon: 'warehouse' },
      { id: 'threepl', title: '3PL feeds', description: 'Partner balances and events', icon: 'network' },
      {
        id: 'integration',
        title: 'Integration / message queue',
        description: 'Where postings fail',
        icon: 'layers',
      },
    ],
  },
}
