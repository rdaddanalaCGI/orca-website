import type { ApplicationBlueprint } from '../types'

export const crossPlatformRfiBlueprint: ApplicationBlueprint = {
  label: 'Cross-Platform RFI Decision Continuity Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'One RFI, however many platforms it crosses',
    description:
      'Identify the authoritative source record, the governing drawing and specification, related decisions and the target record that must reflect the answer.',
    items: [
      {
        id: 'source-rfi',
        title: 'Source RFI / question & response',
        description: 'As raised in the owner’s or trade’s platform, email or site note',
        icon: 'file',
      },
      {
        id: 'governing-revision',
        title: 'Current drawing & specification revision',
        description: 'Sheet, detail and spec section referenced',
        icon: 'layers',
      },
      {
        id: 'related-decisions',
        title: 'Related RFIs & submittals',
        description: 'Prior answers on the same detail',
        icon: 'history',
      },
      {
        id: 'platform-ids',
        title: 'Source & target record identifiers',
        description: 'Matching numbers across two companies’ systems',
        icon: 'network',
      },
      {
        id: 'ball-in-court',
        title: 'Due date & ball-in-court state',
        description: 'Who owes the next action and by when',
        icon: 'circle-alert',
      },
      {
        id: 'affected-work',
        title: 'Affected work package & trade',
        description: 'Scope waiting on the answer',
        icon: 'boxes',
      },
      {
        id: 'downstream',
        title: 'Downstream change, schedule or submittal links',
        description: 'What the answer may trigger next',
        icon: 'route',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From received question to consistent records',
    description:
      'The architect or engineer owns the technical answer; the project engineer reviews before the record is written into the other platform.',
    steps: [
      {
        id: 'trigger',
        title: 'RFI or official response lands in a source channel',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'source', title: 'Identify authoritative source & project object', icon: 'search', type: 'action' },
      { id: 'attach', title: 'Attach governing drawing, spec & prior answers', icon: 'layers', type: 'action' },
      { id: 'gaps', title: 'Flag missing or ambiguous fields before re-keying', icon: 'file', type: 'action' },
      {
        id: 'technical',
        title: 'Route open technical question to architect / engineer',
        icon: 'users',
        type: 'decision',
      },
      { id: 'review', title: 'Project engineer reviews the prepared record', icon: 'user', type: 'approval' },
      { id: 'write', title: 'Write target record; notify affected trades', icon: 'settings', type: 'system' },
      {
        id: 'close',
        title: 'Same answer in every system, source attributed',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Designers answer; the GC team keeps the record straight',
    description:
      'The prepared record appears in the project engineer’s RFI queue with the source response, governing sheet and the fields that still need a person.',
    people: [
      {
        id: 'project-engineer',
        title: 'Project Engineer / APM',
        description: 'Reviews and owns the internal RFI record',
        icon: 'user',
      },
      {
        id: 'architect-engineer',
        title: 'Architect / Engineer',
        description: 'Owns the technical response',
        icon: 'users',
      },
      {
        id: 'document-controller',
        title: 'Document Controller',
        description: 'Keeps register integrity across platforms',
        icon: 'clipboard',
      },
    ],
    systems: [
      {
        id: 'owner-cde',
        title: 'Owner’s / client CDE',
        description: 'Where the formal RFI may originate',
        icon: 'network',
      },
      {
        id: 'contractor-platform',
        title: 'Contractor project platform',
        description: 'Internal RFI log and distribution',
        icon: 'database',
      },
      {
        id: 'design-documents',
        title: 'Design documents & models',
        description: 'Governing sheets and specifications',
        icon: 'layers',
      },
      { id: 'email-teams', title: 'Email & Teams', description: 'Site clarifications and relays', icon: 'monitor' },
    ],
  },
}
