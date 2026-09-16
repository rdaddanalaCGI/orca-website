import type { ApplicationBlueprint } from '../types'

export const freightAuditDisputeResolutionBlueprint: ApplicationBlueprint = {
  label: 'Freight Audit & Dispute Resolution Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the exception packet behind the invoice',
    description:
      'Bring the disputed line, the contracted basis and the shipment proof together before anyone decides to pay.',
    items: [
      {
        id: 'carrier-invoice',
        title: 'Carrier invoice & line items',
        description: 'Charged amount and accessorials',
        icon: 'receipt',
      },
      {
        id: 'rate-con-contract',
        title: 'Rate con / contract / tariff',
        description: 'What was agreed for the lane',
        icon: 'file',
      },
      {
        id: 'rating-result',
        title: 'Specialist rating result',
        description: 'Expected charge from the rating engine',
        icon: 'layers',
      },
      {
        id: 'tms-shipment',
        title: 'TMS shipment record',
        description: 'Stops, weights, timestamps',
        icon: 'route',
      },
      {
        id: 'bol-pod',
        title: 'BOL / POD',
        description: 'Delivery proof and signatures',
        icon: 'clipboard',
      },
      {
        id: 'accessorial-evidence',
        title: 'Detention / lumper evidence',
        description: 'Gate times, receipts, authorizations',
        icon: 'truck',
      },
      {
        id: 'mileage-fuel',
        title: 'Mileage & fuel inputs',
        description: 'Basis for distance and surcharge',
        icon: 'map-pin',
      },
      {
        id: 'dispute-history',
        title: 'Approvals & dispute history',
        description: 'Prior emails and decisions on this carrier',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From failed match to pay, hold, dispute or recover',
    description:
      'The rating engine keeps the arithmetic; Orcaworks explains the discrepancy and freight-audit or AP authority approves the money.',
    steps: [
      { id: 'trigger', title: 'Invoice fails match', icon: 'circle-alert', type: 'trigger' },
      { id: 'assemble', title: 'Assemble invoice, terms & shipment proof', icon: 'layers', type: 'action' },
      { id: 'rating', title: 'Use rating result, not recompute', icon: 'receipt', type: 'action' },
      { id: 'discrepancy', title: 'Identify missing proof or discrepancy', icon: 'search', type: 'action' },
      { id: 'request', title: 'Request evidence from carrier', icon: 'headphones', type: 'action' },
      { id: 'recommend', title: 'Prepare pay / hold / dispute & amount', icon: 'file', type: 'decision' },
      { id: 'approve', title: 'Freight-audit / AP approves', icon: 'user', type: 'approval' },
      { id: 'update', title: 'Update AP / TMS dispute record', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Retain evidence & disposition', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Analysts receive a decision-ready packet',
    description:
      'Disputed line, expected basis, actual charge, supporting and missing evidence, prior communication, proposed disposition.',
    people: [
      {
        id: 'freight-audit-analyst',
        title: 'Freight-Audit Analyst',
        description: 'Reviews and disputes charges',
        icon: 'user',
      },
      {
        id: 'ap-analyst',
        title: 'AP Analyst',
        description: 'Releases or holds payment',
        icon: 'receipt',
      },
      {
        id: 'freight-payment-manager',
        title: 'Freight-Payment Manager',
        description: 'Approves material amounts and recoveries',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'tms', title: 'TMS', description: 'Shipment record and timestamps', icon: 'route' },
      {
        id: 'rating-payment',
        title: 'Freight rating / payment',
        description: 'Expected charge and payment rail',
        icon: 'layers',
      },
      { id: 'erp-ap', title: 'ERP / AP', description: 'Invoice, hold and payment state', icon: 'database' },
      {
        id: 'documents-email',
        title: 'Documents / carrier email',
        description: 'BOL, POD, receipts, correspondence',
        icon: 'file',
      },
    ],
  },
}
