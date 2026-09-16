import type { ApplicationBlueprint } from '../types'

export const planVsActualResolutionBlueprint: ApplicationBlueprint = {
  label: 'Plan-vs-Actual Exception Investigation Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Explain the variance, not just show it',
    description:
      'Set planned state, captured actual progress and the RFIs, submittals, deliveries, constraints and changes touching the affected work side by side.',
    items: [
      {
        id: 'schedule-activity',
        title: 'Master schedule activity & milestone',
        description: 'Planned dates, logic and float',
        icon: 'route',
      },
      {
        id: 'lookahead',
        title: 'Lookahead / weekly work plan',
        description: 'Promised tasks and PPC history',
        icon: 'clipboard',
      },
      {
        id: 'captured-progress',
        title: 'Captured actual progress',
        description: 'Field, project or specialist progress-capture source',
        icon: 'image',
      },
      {
        id: 'open-constraints',
        title: 'Open constraints',
        description: 'Logged constraints and how long they have aged',
        icon: 'circle-alert',
      },
      {
        id: 'linked-rfis-submittals',
        title: 'RFIs & submittals on the work',
        description: 'Unanswered questions and revise-and-resubmit cycles',
        icon: 'file',
      },
      {
        id: 'deliveries',
        title: 'Procurement & delivery commitments',
        description: 'Required-on-site vs committed delivery dates',
        icon: 'truck',
      },
      {
        id: 'changes',
        title: 'Recent change events',
        description: 'Variations affecting the activity',
        icon: 'history',
      },
      {
        id: 'daily-reports',
        title: 'Daily reports & photos',
        description: 'Crew, access and weather evidence',
        icon: 'search',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From missed activity to an owned corrective decision',
    description:
      'The superintendent, PM and project controls decide whether to resequence, clear a constraint, escalate or revise the planning assumption.',
    steps: [
      {
        id: 'trigger',
        title: 'Meaningful variance or missed weekly commitment',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'state', title: 'Retrieve planned, actual & prerequisite state', icon: 'layers', type: 'action' },
      { id: 'gather', title: 'Gather RFIs, submittals, deliveries & changes', icon: 'search', type: 'action' },
      { id: 'separate', title: 'Separate missing evidence from plausible cause', icon: 'file', type: 'action' },
      { id: 'reasons', title: 'Prepare reasons-for-variance & follow-on impact', icon: 'clipboard', type: 'decision' },
      {
        id: 'decide',
        title: 'Superintendent / PM decides resequence, clear or escalate',
        icon: 'user',
        type: 'approval',
      },
      { id: 'record', title: 'Record decision; notify trades & project controls', icon: 'settings', type: 'system' },
      {
        id: 'track',
        title: 'Track whether the intervention clears the variance',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Field and controls decide; Orcaworks explains',
    description:
      'The reasons-for-variance case reaches the superintendent and scheduler before the weekly planning meeting, with the evidence and the open constraint attached.',
    people: [
      {
        id: 'superintendent',
        title: 'Superintendent',
        description: 'Decides field sequencing and access',
        icon: 'user',
      },
      {
        id: 'scheduler-controls',
        title: 'Scheduler / Project Controls',
        description: 'Owns the schedule update and variance record',
        icon: 'clipboard',
      },
      {
        id: 'project-manager',
        title: 'Project Manager',
        description: 'Escalates constraints and approves plan changes',
        icon: 'users',
      },
    ],
    systems: [
      {
        id: 'master-schedule',
        title: 'Master schedule (CPM)',
        description: 'Activities, logic and updates',
        icon: 'route',
      },
      {
        id: 'lookahead-tool',
        title: 'Lookahead / lean planning tool',
        description: 'Weekly commitments and constraints',
        icon: 'clipboard',
      },
      {
        id: 'field-progress',
        title: 'Captured field progress',
        description: 'Progress-capture or daily-log source',
        icon: 'image',
      },
      {
        id: 'project-platform-email',
        title: 'Project platform & email',
        description: 'RFIs, submittals, deliveries, correspondence',
        icon: 'network',
      },
    ],
  },
}
