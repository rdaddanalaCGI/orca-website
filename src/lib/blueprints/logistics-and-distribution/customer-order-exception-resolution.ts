import type { ApplicationBlueprint } from '../types'

export const customerOrderExceptionResolutionBlueprint: ApplicationBlueprint = {
  label: 'Customer Order Intake & Exception Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Put the original request beside a clean order',
    description:
      'Reconcile the email, PDF, spreadsheet or partial EDI against customer master, pricing and product data.',
    items: [
      {
        id: 'source-order',
        title: 'Source email / PDF / XLS / EDI',
        description: 'The order as the customer sent it',
        icon: 'file',
      },
      {
        id: 'customer-ship-to',
        title: 'Customer, ship-to & terms',
        description: 'Account, delivery address, payment terms',
        icon: 'map-pin',
      },
      {
        id: 'sku-alias-uom',
        title: 'SKU alias & UOM mapping',
        description: 'Customer part numbers to your items',
        icon: 'package',
      },
      {
        id: 'price-contract',
        title: 'Price, contract or quote',
        description: 'Agreed pricing and promotions',
        icon: 'receipt',
      },
      {
        id: 'qty-date',
        title: 'Requested quantity & date',
        description: 'What they want and when',
        icon: 'clipboard',
      },
      {
        id: 'atp-constraints',
        title: 'ATP & warehouse constraints',
        description: 'Availability and cut-offs',
        icon: 'warehouse',
      },
      {
        id: 'freight-service-terms',
        title: 'Freight / service terms',
        description: 'Delivery method and service level',
        icon: 'truck',
      },
      {
        id: 'prior-revisions',
        title: 'Prior revisions & messages',
        description: 'Earlier versions of the same order',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From mixed-format request to accepted ERP order',
    description:
      'Clean lines flow through; nonstandard pricing, substitutions and service commitments wait for the CSR or manager.',
    steps: [
      { id: 'trigger', title: 'Order arrives or EDI fails', icon: 'circle-alert', type: 'trigger' },
      { id: 'identify', title: 'Identify customer & ship-to', icon: 'search', type: 'action' },
      { id: 'extract', title: 'Extract lines, UOM, dates & prices', icon: 'file', type: 'action' },
      { id: 'resolve', title: 'Resolve aliases vs item master', icon: 'package', type: 'action' },
      { id: 'validate', title: 'Check pricing & ATP', icon: 'layers', type: 'action' },
      { id: 'request', title: 'Request missing info from customer', icon: 'headphones', type: 'action' },
      { id: 'approve', title: 'CSR decides pricing / substitution', icon: 'user', type: 'approval' },
      { id: 'create', title: 'Create / update ERP order', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Confirm & retain source trail', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'CSRs see only the lines that need a decision',
    description: 'Differences between the request and the proposed clean order are highlighted, not buried.',
    people: [
      {
        id: 'csr',
        title: 'Customer Service Rep',
        description: 'Resolves ambiguous lines',
        icon: 'user',
      },
      {
        id: 'order-manager',
        title: 'Order / CS Manager',
        description: 'Approves nonstandard pricing or service',
        icon: 'users',
      },
      {
        id: 'order-entry',
        title: 'Order-Entry Specialist',
        description: 'Confirms clean orders',
        icon: 'clipboard',
      },
    ],
    systems: [
      { id: 'erp-oms', title: 'ERP / OMS', description: 'Order of record', icon: 'database' },
      { id: 'edi', title: 'EDI / email inbox', description: 'Inbound order channels', icon: 'network' },
      { id: 'pricing', title: 'Pricing / contracts', description: 'Agreed commercial terms', icon: 'receipt' },
      { id: 'atp', title: 'Inventory / ATP', description: 'Availability checks', icon: 'boxes' },
    ],
  },
}
