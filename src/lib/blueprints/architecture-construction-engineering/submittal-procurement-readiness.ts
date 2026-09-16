import type { ApplicationBlueprint } from '../types'

export const submittalProcurementReadinessBlueprint: ApplicationBlueprint = {
  label: 'Submittal-to-Procurement Readiness Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Approved is not the same as on site',
    description:
      'Combine the submittal’s technical disposition with PO release, vendor fabrication status, the committed delivery date and the date the schedule needs the material.',
    items: [
      {
        id: 'submittal-package',
        title: 'Submittal, shop drawing or product data',
        description: 'Current package and its resubmittal cycle',
        icon: 'file',
      },
      {
        id: 'spec-requirements',
        title: 'Specification & drawing requirements',
        description: 'Governing section and performance criteria',
        icon: 'layers',
      },
      {
        id: 'disposition',
        title: 'Disposition & reviewer comments',
        description: 'Approved, approved as noted, revise and resubmit',
        icon: 'check',
      },
      {
        id: 'po-release',
        title: 'PO / release state',
        description: 'Has the item actually been released for fabrication?',
        icon: 'receipt',
      },
      {
        id: 'vendor-status',
        title: 'Vendor acknowledgement & fabrication status',
        description: 'Confirmed, in production, shipped',
        icon: 'boxes',
      },
      {
        id: 'committed-delivery',
        title: 'Committed delivery date',
        description: 'Latest vendor commitment',
        icon: 'truck',
      },
      {
        id: 'required-on-site',
        title: 'Required-on-site date',
        description: 'The schedule activity that consumes the material',
        icon: 'route',
      },
      {
        id: 'substitution-history',
        title: 'Approved substitutions & related changes',
        description: 'Prior decisions on this package',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From technical disposition to material readiness',
    description:
      'The architect or engineer disposes the submittal; the PM and procurement lead decide expedite, substitution or resequence when a package is at risk.',
    steps: [
      {
        id: 'trigger',
        title: 'Submittal, disposition or vendor status changes',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'compare', title: 'Compare package to spec & prior review state', icon: 'search', type: 'action' },
      {
        id: 'technical',
        title: 'Route technical exceptions to architect / engineer',
        icon: 'users',
        type: 'decision',
      },
      { id: 'reconcile', title: 'Reconcile PO, fabrication & delivery vs need date', icon: 'layers', type: 'action' },
      { id: 'request', title: 'Request missing vendor / sub confirmations', icon: 'headphones', type: 'action' },
      { id: 'flag', title: 'Flag at-risk packages with decision paths', icon: 'circle-alert', type: 'decision' },
      {
        id: 'decide',
        title: 'PM / procurement decides expedite, substitute or resequence',
        icon: 'user',
        type: 'approval',
      },
      { id: 'update', title: 'Update records; notify field & schedule', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Technical and procurement decisions stay separate and owned',
    description:
      'The package appears in the project engineer’s submittal queue as approved, released, committed or at risk—with the confirmation still outstanding named.',
    people: [
      {
        id: 'project-engineer',
        title: 'Project Engineer / APM',
        description: 'Runs the submittal log and chases vendors',
        icon: 'user',
      },
      {
        id: 'architect-engineer',
        title: 'Architect / Engineer',
        description: 'Owns the technical disposition',
        icon: 'users',
      },
      {
        id: 'pm-procurement',
        title: 'PM / Procurement Lead',
        description: 'Decides expedite, substitution or resequence',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'submittal-log',
        title: 'Project platform submittal log',
        description: 'Packages, dispositions, comments',
        icon: 'network',
      },
      {
        id: 'procurement-erp',
        title: 'Procurement / ERP',
        description: 'POs, releases and commitments',
        icon: 'database',
      },
      { id: 'master-schedule', title: 'Master schedule', description: 'Required-on-site dates', icon: 'route' },
      {
        id: 'vendor-email',
        title: 'Vendor & subcontractor email',
        description: 'Acknowledgements and fabrication updates',
        icon: 'monitor',
      },
    ],
  },
}
