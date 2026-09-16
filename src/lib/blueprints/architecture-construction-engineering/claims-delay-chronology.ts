import type { ApplicationBlueprint } from '../types'

export const claimsDelayChronologyBlueprint: ApplicationBlueprint = {
  label: 'Claims & Delay Chronology Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'The contemporaneous record, source-linked',
    description:
      'Gather baseline and updated schedules, RFIs, submittals, changes, daily logs, minutes, correspondence and notice provisions around the event or period.',
    items: [
      {
        id: 'schedules',
        title: 'Baseline & schedule updates',
        description: 'Logic, milestones and float over the period',
        icon: 'route',
      },
      {
        id: 'rfis-submittals',
        title: 'RFIs & submittals with response dates',
        description: 'Questions and reviews touching the affected work',
        icon: 'file',
      },
      {
        id: 'change-events',
        title: 'Change events, COs & variations',
        description: 'Scope changes during the period',
        icon: 'history',
      },
      {
        id: 'daily-logs',
        title: 'Daily logs, photos & inspections',
        description: 'Crew, weather, access and progress',
        icon: 'image',
      },
      {
        id: 'minutes-correspondence',
        title: 'Meeting minutes & correspondence',
        description: 'What was said, promised and disputed, with dates',
        icon: 'clipboard',
      },
      {
        id: 'contract-notice',
        title: 'Contract & notice provisions',
        description: 'Required notice periods and forms',
        icon: 'shield',
      },
      {
        id: 'cost-payment',
        title: 'Cost & payment records',
        description: 'Costs incurred over the period where relevant',
        icon: 'receipt',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From delay event to a reviewed factual chronology',
    description:
      'Orcaworks assembles the facts; authorised commercial or legal leadership decides entitlement, notice and the contractor’s position.',
    steps: [
      { id: 'trigger', title: 'Potential delay, claim or notice event defined', icon: 'circle-alert', type: 'trigger' },
      { id: 'define', title: 'Define event, period & affected work', icon: 'search', type: 'action' },
      { id: 'gather', title: 'Gather schedule & contemporaneous records', icon: 'layers', type: 'action' },
      {
        id: 'normalise',
        title: 'Normalise dates, sources & versions into a chronology',
        icon: 'history',
        type: 'action',
      },
      { id: 'gaps', title: 'Identify gaps, conflicts & candidate causal links', icon: 'file', type: 'decision' },
      { id: 'review', title: 'Scheduler / commercial lead reviews the chronology', icon: 'user', type: 'approval' },
      {
        id: 'position',
        title: 'Authorised commercial / legal role sets position',
        icon: 'shield',
        type: 'approval',
      },
      { id: 'preserve', title: 'Chronology and evidence trail preserved', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Facts assembled; entitlement decided by people',
    description:
      'Project controls and the commercial team receive a dated, source-linked chronology with the missing records and contradictions called out for review.',
    people: [
      {
        id: 'scheduler-controls',
        title: 'Scheduler / Project Controls',
        description: 'Validates schedule facts and logic',
        icon: 'clipboard',
      },
      {
        id: 'commercial-claims-manager',
        title: 'Commercial / Claims Manager',
        description: 'Owns the factual case and notices',
        icon: 'user',
      },
      {
        id: 'commercial-legal-leadership',
        title: 'Authorised Commercial / Legal Leadership',
        description: 'Decides entitlement and claim position',
        icon: 'shield',
      },
    ],
    systems: [
      { id: 'master-schedule', title: 'Master schedule', description: 'Baseline, updates and logic', icon: 'route' },
      {
        id: 'project-platform',
        title: 'Project platform / CDE',
        description: 'RFIs, submittals, changes, daily logs',
        icon: 'network',
      },
      {
        id: 'cost-payment-systems',
        title: 'Cost & payment systems',
        description: 'Costs and payments over the period',
        icon: 'database',
      },
      {
        id: 'email-minutes',
        title: 'Email, minutes & document stores',
        description: 'Correspondence and meeting records',
        icon: 'monitor',
      },
    ],
  },
}
