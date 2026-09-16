import type { ApplicationBlueprint } from '../types'

export const claimsNextActionOrchestrationBlueprint: ApplicationBlueprint = {
  label: 'Claims Next-Action & Diary Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Read the whole pending inventory, not just the diary dates',
    description:
      'Current claim state, latest correspondence, external dependencies and service standards around every open file.',
    items: [
      {
        id: 'open-claim',
        title: 'Open claim & exposure',
        description: 'Current claim state, reserves and coverage position',
        icon: 'database',
      },
      {
        id: 'diary-activities',
        title: 'Diary & activity list',
        description: 'Overdue, due and scheduled activities per handler',
        icon: 'clipboard',
      },
      {
        id: 'notes-correspondence',
        title: 'Claim notes & correspondence',
        description: 'Latest adjuster notes, emails and letters',
        icon: 'file',
      },
      {
        id: 'external-dependencies',
        title: 'External dependencies',
        description: 'Provider, claimant, counsel or vendor items awaited',
        icon: 'headphones',
      },
      {
        id: 'recent-events',
        title: 'Recent evidence & events',
        description: 'New documents, payments or status changes since last review',
        icon: 'circle-alert',
      },
      {
        id: 'authority-boundaries',
        title: 'Authority boundaries',
        description: 'Which actions need supervisor or authority sign-off',
        icon: 'shield',
      },
      {
        id: 'prior-actions',
        title: 'Prior next actions',
        description: 'What was planned, done and skipped',
        icon: 'history',
      },
      {
        id: 'service-standards',
        title: 'Service standards',
        description: 'Required touchpoints and compliance timelines',
        icon: 'check',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From diary fire to a recorded, meaningful next action',
    description:
      'The adjuster keeps consequential claim decisions; the output is a next action with a reason, not a reminder.',
    steps: [
      { id: 'trigger', title: 'Diary fires or claim state changes', icon: 'circle-alert', type: 'trigger' },
      { id: 'gather', title: 'Gather latest state & correspondence', icon: 'layers', type: 'action' },
      { id: 'delta', title: 'Determine what changed & what is blocked', icon: 'search', type: 'action' },
      { id: 'classify', title: 'Distinguish blocked from actionable files', icon: 'route', type: 'decision' },
      { id: 'prepare', title: 'Prepare permitted follow-up or request', icon: 'clipboard', type: 'action' },
      { id: 'approve', title: 'Handler approves consequential action', icon: 'user', type: 'approval' },
      { id: 'act', title: 'Send communication & update the claim', icon: 'database', type: 'system' },
      { id: 'close', title: 'Next action recorded with reason & checkpoint', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Handlers decide; the queue explains itself',
    description:
      'Each pending file arrives with what changed, what is still blocked and the proposed next step—with the authority it needs.',
    people: [
      {
        id: 'adjuster',
        title: 'Claims Adjuster / Examiner',
        description: 'Approves consequential claim actions',
        icon: 'user',
      },
      {
        id: 'claims-manager',
        title: 'Claims Team Manager',
        description: 'Owns pending inventory and the overdue-activity rate',
        icon: 'users',
      },
      {
        id: 'external-parties',
        title: 'External Parties',
        description: 'Providers, claimants, counsel and vendors being chased',
        icon: 'headphones',
      },
      {
        id: 'compliance-qa',
        title: 'Compliance / QA',
        description: 'Service-standard adherence and file review',
        icon: 'check',
      },
    ],
    systems: [
      {
        id: 'claims-core',
        title: 'Claims system',
        description: 'State, notes, diaries and payments',
        icon: 'database',
      },
      {
        id: 'email-phone',
        title: 'Email & phone logs',
        description: 'Claimant and provider correspondence',
        icon: 'headphones',
      },
      {
        id: 'dms-portals',
        title: 'DMS & external portals',
        description: 'Documents and external-party status',
        icon: 'file',
      },
      {
        id: 'bi-reporting',
        title: 'BI / reporting',
        description: 'Inventory and overdue-activity reporting',
        icon: 'monitor',
      },
    ],
  },
}
