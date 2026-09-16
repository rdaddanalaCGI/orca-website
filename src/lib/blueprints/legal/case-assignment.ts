import type { ApplicationBlueprint } from '../types'

export const caseAssignmentBlueprint: ApplicationBlueprint = {
  label: 'Governed Case Assignment Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the assignment case for the unassigned matter',
    description:
      'Bring case type, venue, special-case flags, the eligible roster, current caseloads and the firm’s rotation rules into one view.',
    items: [
      {
        id: 'case-notes',
        title: 'Case notes & type',
        description: 'Practice area, injury type, liability posture',
        icon: 'clipboard',
      },
      {
        id: 'venue-language',
        title: 'Venue, office & language',
        description: 'County, courthouse and client language',
        icon: 'map-pin',
      },
      {
        id: 'special-flags',
        title: 'Special-case flags',
        description: 'Referral, federal, catastrophic or VIP matter',
        icon: 'circle-alert',
      },
      {
        id: 'attorney-roster',
        title: 'Eligible attorney roster',
        description: 'Practice, bar admissions and office',
        icon: 'users',
      },
      {
        id: 'caseloads',
        title: 'Current caseloads & recent assignments',
        description: 'On-desk counts and rotation position',
        icon: 'layers',
      },
      {
        id: 'rotation-rules',
        title: 'Rotation & capacity rules',
        description: 'The firm’s configured eligibility logic',
        icon: 'settings',
      },
      {
        id: 'conflict-status',
        title: 'Conflict status',
        description: 'Cleared or pending for the recommended attorney',
        icon: 'shield',
      },
      {
        id: 'assignment-history',
        title: 'Assignment history & rationale',
        description: 'Prior assignments and why they were made',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From unassigned matter to approved attorney owner',
    description:
      'Standard matters follow the firm’s rotation; special matters go to the intake attorney or partner for deliberate selection. Every assignment is approved before write-back.',
    steps: [
      { id: 'trigger', title: 'Qualified matter has no attorney', icon: 'circle-alert', type: 'trigger' },
      { id: 'screen', title: 'Screen for special-case conditions', icon: 'search', type: 'action' },
      { id: 'eligible', title: 'Build eligible attorney set', icon: 'users', type: 'action' },
      { id: 'rotation', title: 'Apply rotation & capacity rules', icon: 'settings', type: 'action' },
      { id: 'route', title: 'Standard rotation or partner selection', icon: 'route', type: 'decision' },
      { id: 'approve', title: 'Intake attorney approves assignment', icon: 'user', type: 'approval' },
      { id: 'write-back', title: 'Write assignment to the case system', icon: 'database', type: 'system' },
      { id: 'close', title: 'Record assignment basis', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Intake attorneys approve; partners select special matters',
    description:
      'The recommendation appears with the eligible set, each attorney’s current load and the rule that produced it, ready for approval or override.',
    people: [
      {
        id: 'intake-attorney',
        title: 'Intake Attorney',
        description: 'Approves standard assignments; handles special matters',
        icon: 'user',
      },
      {
        id: 'partner',
        title: 'Managing / Practice Partner',
        description: 'Selects the attorney for special matters',
        icon: 'users',
      },
      {
        id: 'case-operations',
        title: 'Case Operations Lead',
        description: 'Owns rotation rules and unassigned aging',
        icon: 'settings',
      },
    ],
    systems: [
      {
        id: 'case-system',
        title: 'Case management system',
        description: 'Case notes, status and attorney field',
        icon: 'database',
      },
      {
        id: 'assignment-config',
        title: 'Assignment configuration',
        description: 'Rotation, eligibility and capacity rules',
        icon: 'settings',
      },
      {
        id: 'workload-data',
        title: 'Calendar / workload data',
        description: 'Availability where approved for use',
        icon: 'layers',
      },
    ],
  },
}
