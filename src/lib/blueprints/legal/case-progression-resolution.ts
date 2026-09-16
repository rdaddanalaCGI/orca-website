import type { ApplicationBlueprint } from '../types'

export const caseProgressionResolutionBlueprint: ApplicationBlueprint = {
  label: 'Stalled-Case Progression Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Reconstruct the real state of a stale matter',
    description:
      'Put the reporting exception beside the case stage, tasks, latest communications, outstanding requests and the owner’s explanation.',
    items: [
      {
        id: 'report-exception',
        title: 'Reporting exception',
        description: 'Stage age, no-touch days or overdue checklist item',
        icon: 'circle-alert',
      },
      {
        id: 'stage-tasks',
        title: 'Case stage, tasks & checklist',
        description: 'What the case system says should happen next',
        icon: 'clipboard',
      },
      {
        id: 'notes-comms',
        title: 'Notes, emails & SMS',
        description: 'Latest activity, including unrecorded touches',
        icon: 'headphones',
      },
      {
        id: 'records-status',
        title: 'Outstanding records requests',
        description: 'Provider, court or insurer items still open',
        icon: 'file',
      },
      {
        id: 'appointments',
        title: 'Appointments & court dates',
        description: 'Upcoming events that explain or contradict the gap',
        icon: 'map-pin',
      },
      {
        id: 'settlement-discovery',
        title: 'Settlement / discovery state',
        description: 'Offers, demands and discovery exchanged',
        icon: 'layers',
      },
      {
        id: 'owner-response',
        title: 'Case owner’s explanation',
        description: 'Context requested from the case manager or attorney',
        icon: 'user',
      },
      {
        id: 'stage-history',
        title: 'Prior stage changes',
        description: 'When and why the stage last moved',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From dashboard outlier to explained, corrected case',
    description:
      'The case owner explains the blocker; the supervising attorney approves any legal or strategic change before the record moves.',
    steps: [
      { id: 'trigger', title: 'Stage-age or no-touch exception', icon: 'circle-alert', type: 'trigger' },
      { id: 'reconstruct', title: 'Reconstruct current case state', icon: 'layers', type: 'action' },
      { id: 'gap', title: 'Identify stale or missing fact', icon: 'search', type: 'action' },
      { id: 'ask-owner', title: 'Ask case owner for context', icon: 'headphones', type: 'action' },
      { id: 'classify', title: 'Stalled, stale record or external wait', icon: 'route', type: 'decision' },
      { id: 'approve', title: 'Supervising attorney approves next step', icon: 'user', type: 'approval' },
      { id: 'act', title: 'Send follow-up or correct record', icon: 'settings', type: 'action' },
      { id: 'refresh', title: 'Refresh stage & next action in the case system', icon: 'database', type: 'system' },
      { id: 'close', title: 'Explained status with named owner', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Case owners explain; supervising attorneys approve the next step',
    description:
      'Exceptions appear in the case-operations queue with the reconstructed state, the suspected blocker and the question for the owner.',
    people: [
      {
        id: 'case-manager',
        title: 'Case Manager / Paralegal',
        description: 'Explains the blocker and performs follow-up',
        icon: 'headphones',
      },
      {
        id: 'supervising-attorney',
        title: 'Supervising Attorney',
        description: 'Approves legal or strategic next steps',
        icon: 'user',
      },
      {
        id: 'case-operations',
        title: 'COO / Case Operations',
        description: 'Owns inventory aging and reporting accuracy',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'case-system', title: 'Case management system', description: 'Stage, tasks and notes', icon: 'database' },
      { id: 'reporting', title: 'BI / reporting', description: 'Exception detection', icon: 'monitor' },
      { id: 'outlook-sms', title: 'Outlook / SMS', description: 'Owner and external follow-up', icon: 'smartphone' },
      { id: 'dms-portals', title: 'DMS & portals', description: 'Records and external status', icon: 'network' },
    ],
  },
}
