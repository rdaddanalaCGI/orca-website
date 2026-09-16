import type { ApplicationBlueprint } from '../types'

export const supplierSpecChangeBlueprint: ApplicationBlueprint = {
  label: 'Supplier Specification Change Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the context',
    description: 'Bring together the supplier change, product master and downstream impact.',
    items: [
      {
        id: 'supplier-specification',
        title: 'Supplier Specification',
        description: 'Revised document or message',
        icon: 'file',
      },
      {
        id: 'product-master',
        title: 'Product Master',
        description: 'Current item record and attributes',
        icon: 'database',
      },
      {
        id: 'required-attributes',
        title: 'Required Attributes',
        description: 'Mandatory data fields',
        icon: 'shield',
      },
      {
        id: 'downstream-erp',
        title: 'Downstream ERP',
        description: 'ERP records affected',
        icon: 'file',
      },
      {
        id: 'wms',
        title: 'WMS',
        description: 'Warehouse attributes',
        icon: 'warehouse',
      },
      {
        id: 'commerce',
        title: 'Commerce',
        description: 'Storefront and catalog data',
        icon: 'layers',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'Route the workflow',
    description: 'Move the supplier change from receipt to synchronized records.',
    steps: [
      {
        id: 'change-arrives',
        title: 'Supplier change arrives',
        icon: 'truck',
        type: 'trigger',
      },
      {
        id: 'compare-master',
        title: 'Compare to product master',
        icon: 'search',
        type: 'action',
      },
      {
        id: 'identify-request-gaps',
        title: 'Identify and request missing fields',
        icon: 'shield',
        type: 'action',
      },
      {
        id: 'steward-approval',
        title: 'Data steward approves',
        icon: 'user',
        type: 'approval',
      },
      {
        id: 'queue-updates',
        title: 'Queue downstream updates',
        icon: 'settings',
        type: 'system',
      },
      {
        id: 'retain-provenance',
        title: 'Retain provenance',
        icon: 'history',
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
        id: 'product-data-steward',
        title: 'Product-Data Steward',
        description: 'Leads the change case',
        icon: 'user',
      },
      {
        id: 'item-master-steward',
        title: 'Item-Master Steward',
        description: 'Owns the master record',
        icon: 'user',
      },
      {
        id: 'data-governance',
        title: 'Data Governance',
        description: 'Policy and control',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'pim-mdm',
        title: 'PIM/MDM',
        description: 'Product master hub',
        icon: 'database',
      },
      {
        id: 'erp',
        title: 'ERP',
        description: 'Financial and item records',
        icon: 'file',
      },
      {
        id: 'wms',
        title: 'WMS',
        description: 'Warehouse records',
        icon: 'warehouse',
      },
      {
        id: 'supplier-documents',
        title: 'Supplier Documents',
        description: 'Specifications and evidence',
        icon: 'image',
      },
    ],
  },
}
