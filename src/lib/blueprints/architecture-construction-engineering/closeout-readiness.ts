import type { ApplicationBlueprint } from '../types'

export const closeoutReadinessBlueprint: ApplicationBlueprint = {
  label: 'Closeout Readiness Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Know what handover actually requires',
    description:
      'Build the expected turnover list from contract, specification and trade-package requirements, then reconcile it against what has arrived and what has been accepted.',
    items: [
      {
        id: 'closeout-requirements',
        title: 'Contract & specification closeout requirements',
        description: 'O&Ms, warranties, as-builts, tests and training required per section',
        icon: 'file',
      },
      {
        id: 'trade-package-requirements',
        title: 'Subcontract & trade-package obligations',
        description: 'Which subcontractor or vendor owes which deliverable',
        icon: 'users',
      },
      {
        id: 'submittal-history',
        title: 'Submittal & approved-product history',
        description: 'The approved products the O&Ms and warranties must match',
        icon: 'history',
      },
      {
        id: 'asset-list',
        title: 'Asset & equipment list',
        description: 'Systems and equipment needing documentation and training',
        icon: 'boxes',
      },
      {
        id: 'received-documents',
        title: 'Received O&Ms, warranties & as-builts',
        description: 'What has arrived, in which revision, from whom',
        icon: 'clipboard',
      },
      {
        id: 'commissioning-records',
        title: 'Commissioning & test records',
        description: 'Completed tests and outstanding items',
        icon: 'check',
      },
      {
        id: 'acceptance-comments',
        title: 'Acceptance & rejection comments',
        description: 'Designer, commissioning and owner responses to each item',
        icon: 'shield',
      },
      {
        id: 'payment-dependencies',
        title: 'Retention & final-payment gates',
        description: 'Milestones blocked by missing closeout items',
        icon: 'receipt',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From closeout start to an accepted handover package',
    description:
      'The PM, designer, commissioning lead or owner representative accepts each deliverable; Orcaworks builds the list, chases, checks and routes.',
    steps: [
      {
        id: 'trigger',
        title: 'Closeout start or substantial completion approaching',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'expected', title: 'Build expected deliverables by trade & asset', icon: 'clipboard', type: 'action' },
      { id: 'reconcile', title: 'Reconcile expected vs received vs accepted', icon: 'layers', type: 'action' },
      { id: 'check', title: 'Check revision, project-specific & date fields', icon: 'search', type: 'action' },
      {
        id: 'request',
        title: 'Request missing items from subs & vendors; log replies',
        icon: 'headphones',
        type: 'action',
      },
      { id: 'accept', title: 'PM / designer / owner accepts each item', icon: 'user', type: 'approval' },
      { id: 'update', title: 'Update closeout status in the project platform', icon: 'settings', type: 'system' },
      {
        id: 'close',
        title: 'Package accounted for; open items owned and escalated',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Acceptance stays with the accountable reviewer',
    description:
      'The project engineer works the closeout case from the register; technical items route to the designer, commissioning lead or owner representative who can accept them.',
    people: [
      {
        id: 'project-engineer-apm',
        title: 'Project Engineer / APM',
        description: 'Runs the closeout case and chases trades',
        icon: 'user',
      },
      {
        id: 'document-controller',
        title: 'Document Controller',
        description: 'Verifies revision and register state',
        icon: 'clipboard',
      },
      {
        id: 'technical-acceptor',
        title: 'Designer / Commissioning / Owner Rep',
        description: 'Accepts technical deliverables and training',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'project-platform',
        title: 'Project management platform / CDE',
        description: 'Closeout log and document register',
        icon: 'network',
      },
      {
        id: 'dms',
        title: 'Document management / SharePoint',
        description: 'Received O&Ms, warranties, as-builts',
        icon: 'file',
      },
      {
        id: 'commissioning-system',
        title: 'Commissioning / asset system',
        description: 'Test and equipment records where installed',
        icon: 'settings',
      },
      {
        id: 'email-vendor',
        title: 'Email & vendor submissions',
        description: 'Subcontractor and supplier responses',
        icon: 'monitor',
      },
    ],
  },
}
