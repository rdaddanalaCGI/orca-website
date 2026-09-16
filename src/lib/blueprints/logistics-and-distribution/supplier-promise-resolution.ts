import type { ApplicationBlueprint } from '../types'

export const supplierPromiseResolutionBlueprint: ApplicationBlueprint = {
  label: 'Supplier Promise & PO Change Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Match the supplier response to the open PO',
    description: 'Put the PO line, the ERP promise date and the supplier reply from email, portal or EDI side by side.',
    items: [
      {
        id: 'po-header-line',
        title: 'PO header & line',
        description: 'Supplier, item, ordered quantity',
        icon: 'file',
      },
      {
        id: 'promise-dates',
        title: 'Requested vs promised date',
        description: 'Current ERP commitment',
        icon: 'history',
      },
      {
        id: 'supplier-response',
        title: 'Supplier email / portal / EDI',
        description: 'Acknowledgement, ASN or changed reply',
        icon: 'headphones',
      },
      {
        id: 'qty-uom-price',
        title: 'Quantity, UOM & price',
        description: 'Partial-fill or price changes',
        icon: 'package',
      },
      {
        id: 'demand-inventory',
        title: 'Open demand & inventory',
        description: 'Who is waiting on this receipt',
        icon: 'boxes',
      },
      {
        id: 'alternate-supply-rules',
        title: 'Approved supplier & alternate rules',
        description: 'Who else can fill and within what policy',
        icon: 'shield',
      },
      {
        id: 'follow-up-history',
        title: 'Follow-up history',
        description: 'Previous chases and answers',
        icon: 'clipboard',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From unacknowledged PO to trusted promise date',
    description:
      'Changes within policy update automatically; material date, quantity or price changes go to the buyer.',
    steps: [
      { id: 'trigger', title: 'PO unacknowledged or promise changed', icon: 'circle-alert', type: 'trigger' },
      { id: 'match', title: 'Match reply to supplier, PO & line', icon: 'search', type: 'action' },
      { id: 'extract', title: 'Extract date, qty & price changes', icon: 'file', type: 'action' },
      { id: 'compare', title: 'Compare to ERP & open demand', icon: 'layers', type: 'action' },
      { id: 'request', title: 'Request missing confirmation', icon: 'headphones', type: 'action' },
      { id: 'policy', title: 'Within policy? Auto-update', icon: 'shield', type: 'decision' },
      { id: 'approve', title: 'Buyer decides material change', icon: 'user', type: 'approval' },
      { id: 'update', title: 'Update PO & notify planning', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Record evidence & new commitment', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Buyers work from an open-PO exception queue',
    description:
      'Cases are grouped as waiting on supplier, changed promise, material change requires decision, and ready to update.',
    people: [
      {
        id: 'buyer',
        title: 'Buyer',
        description: 'Accepts date, quantity or price changes',
        icon: 'user',
      },
      {
        id: 'expeditor',
        title: 'Expeditor / Purchasing Coordinator',
        description: 'Chases acknowledgements',
        icon: 'headphones',
      },
      {
        id: 'materials-planner',
        title: 'Materials Planner',
        description: 'Consumes the corrected promise',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'erp', title: 'ERP purchasing', description: 'PO and promise date of record', icon: 'database' },
      {
        id: 'supplier-channels',
        title: 'Supplier email / portal / EDI',
        description: 'Acknowledgements and ASNs',
        icon: 'network',
      },
      { id: 'planning', title: 'Planning / ATP', description: 'Downstream demand context', icon: 'boxes' },
      { id: 'email', title: 'Email / Teams', description: 'Buyer and planner notifications', icon: 'monitor' },
    ],
  },
}
