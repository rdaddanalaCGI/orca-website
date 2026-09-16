import type { ApplicationBlueprint } from '../types'

export const accessorialReviewBlueprint: ApplicationBlueprint = {
  label: 'Accessorial Review & Dispute Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the context',
    description: 'Bring together the load, rate terms and evidence around the charge.',
    items: [
      {
        id: 'rate-confirmation',
        title: 'Rate Confirmation',
        description: 'Agreed rate and terms',
        icon: 'receipt',
      },
      {
        id: 'pod-bol',
        title: 'POD / BOL',
        description: 'Delivery evidence',
        icon: 'file',
      },
      {
        id: 'gps-eld',
        title: 'GPS / ELD Timestamps',
        description: 'Time and location evidence',
        icon: 'map-pin',
      },
      {
        id: 'gate-evidence',
        title: 'Gate Evidence',
        description: 'Yard and facility timestamps',
        icon: 'warehouse',
      },
      {
        id: 'authorization',
        title: 'Authorization',
        description: 'Signed or documented approval',
        icon: 'shield',
      },
      {
        id: 'tms-ap-state',
        title: 'TMS / AP State',
        description: 'Load, carrier and invoice status',
        icon: 'monitor',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'Route the workflow',
    description: 'Move the invoice from receipt to a supported decision.',
    steps: [
      {
        id: 'invoice-received',
        title: 'Invoice received',
        icon: 'receipt',
        type: 'trigger',
      },
      {
        id: 'join-load-rate',
        title: 'Join load and rate terms',
        icon: 'file',
        type: 'action',
      },
      {
        id: 'assemble-evidence',
        title: 'Assemble evidence',
        icon: 'image',
        type: 'action',
      },
      {
        id: 'match-calculate-missing',
        title: 'Match, calculate and identify missing proof',
        icon: 'search',
        type: 'action',
      },
      {
        id: 'route-decision',
        title: 'Route decision',
        icon: 'user',
        type: 'decision',
      },
      {
        id: 'update-preserve-evidence',
        title: 'Update TMS/AP and preserve evidence',
        icon: 'settings',
        type: 'system',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Coordinate the interaction',
    description: 'Show who acts and where the work gets completed.',
    people: [
      {
        id: 'carrier-ap',
        title: 'Carrier AP',
        description: 'Owns the invoice',
        icon: 'user',
      },
      {
        id: 'freight-audit-analyst',
        title: 'Freight-Audit Analyst',
        description: 'Verifies and disputes',
        icon: 'users',
      },
      {
        id: 'transportation-operations',
        title: 'Transportation Operations',
        description: 'Resolves delivery disputes',
        icon: 'truck',
      },
    ],
    systems: [
      {
        id: 'tms',
        title: 'TMS',
        description: 'Load and carrier data',
        icon: 'monitor',
      },
      {
        id: 'erp-ap',
        title: 'ERP / AP',
        description: 'Invoice and payment records',
        icon: 'database',
      },
      {
        id: 'documents-email',
        title: 'Documents / Email',
        description: 'Evidence and communication',
        icon: 'network',
      },
      {
        id: 'telemetry-gate',
        title: 'Telemetry / Gate Evidence',
        description: 'GPS, ELD and yard data',
        icon: 'map-pin',
      },
    ],
  },
}
