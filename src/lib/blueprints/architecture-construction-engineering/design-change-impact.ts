import type { ApplicationBlueprint } from '../types'

export const designChangeImpactBlueprint: ApplicationBlueprint = {
  label: 'Design / Revision Impact Coordination Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Start from the authoritative revision',
    description:
      'Take the approved change or revision and assemble the sheets, specifications, RFIs, submittals, model issues and work packages that may depend on it.',
    items: [
      {
        id: 'revision',
        title: 'Current & prior revision / bulletin',
        description: 'ASI, design bulletin or approved change',
        icon: 'layers',
      },
      {
        id: 'transmittal',
        title: 'Transmittal & issue history',
        description: 'Who received which revision, and when',
        icon: 'history',
      },
      {
        id: 'related-rfis',
        title: 'Related RFIs & submittals',
        description: 'Decisions and reviews on the affected detail',
        icon: 'file',
      },
      {
        id: 'model-issues',
        title: 'Clash & model issues',
        description: 'Coordination outputs touching the change',
        icon: 'network',
      },
      {
        id: 'consultant-packages',
        title: 'Consultant & discipline packages',
        description: 'Structural, MEP and civil sets that reference it',
        icon: 'users',
      },
      {
        id: 'work-packages',
        title: 'Affected work packages & schedule',
        description: 'Trades and activities consuming the sheets',
        icon: 'route',
      },
      {
        id: 'field-state',
        title: 'Current field state',
        description: 'Has the superseded detail already been built?',
        icon: 'image',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From design change to confirmed, distributed impact',
    description:
      'Discipline leads confirm what must technically change; document control runs the controlled issue and transmittal.',
    steps: [
      { id: 'trigger', title: 'Approved change, ASI or model issue resolved', icon: 'circle-alert', type: 'trigger' },
      { id: 'authoritative', title: 'Identify the authoritative revision', icon: 'layers', type: 'action' },
      { id: 'gather', title: 'Gather dependent sheets, specs, RFIs & submittals', icon: 'search', type: 'action' },
      { id: 'propose', title: 'Propose affected records & work packages', icon: 'clipboard', type: 'decision' },
      {
        id: 'confirm',
        title: 'Design manager / discipline leads confirm impact',
        icon: 'user',
        type: 'approval',
      },
      { id: 'issue', title: 'Document control completes controlled issue', icon: 'file', type: 'system' },
      { id: 'notify', title: 'Notify affected roles; update linked records', icon: 'settings', type: 'system' },
      {
        id: 'track',
        title: 'Track unacknowledged or unresolved impacts',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Designers decide the change; document control issues it',
    description:
      'The impact view reaches the design manager and document controller with the proposed affected sheets, RFIs, submittals and trades ready to confirm or strike.',
    people: [
      {
        id: 'design-manager',
        title: 'Design Manager / Discipline Leads',
        description: 'Confirm the technical change and its scope',
        icon: 'users',
      },
      {
        id: 'document-controller',
        title: 'Document Controller',
        description: 'Runs the controlled issue and transmittal',
        icon: 'clipboard',
      },
      {
        id: 'bim-vdc',
        title: 'BIM / VDC Coordinator',
        description: 'Reconciles model issues with the revision',
        icon: 'network',
      },
    ],
    systems: [
      {
        id: 'cde-register',
        title: 'CDE / document register',
        description: 'Revisions, transmittals, issue state',
        icon: 'database',
      },
      {
        id: 'design-tools',
        title: 'Design authoring & model tools',
        description: 'Sheets, models, coordination issues',
        icon: 'layers',
      },
      {
        id: 'project-platform',
        title: 'Project platform',
        description: 'RFIs, submittals, work packages',
        icon: 'network',
      },
      { id: 'email-teams', title: 'Email & Teams', description: 'Consultant and trade notifications', icon: 'monitor' },
    ],
  },
}
