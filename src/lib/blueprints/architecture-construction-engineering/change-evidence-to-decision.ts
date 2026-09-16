import type { ApplicationBlueprint } from '../types'

export const changeEvidenceToDecisionBlueprint: ApplicationBlueprint = {
  label: 'Change / Variation Evidence-to-Decision Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Reconstruct the potential change',
    description:
      'Pull the triggering RFI or instruction, the governing and superseded revisions, field evidence, trade pricing, the affected schedule activity and the approval state into one change case.',
    items: [
      {
        id: 'trigger-record',
        title: 'Triggering RFI, instruction or revision',
        description: 'The field condition, owner directive, RFI response or design bulletin that raised the change',
        icon: 'circle-alert',
      },
      {
        id: 'drawing-spec-revisions',
        title: 'Current vs superseded drawings & specs',
        description: 'Which revision governs and what changed between them',
        icon: 'layers',
      },
      {
        id: 'contract-scope',
        title: 'Prime contract & subcontract scope',
        description: 'Scope clauses, amendments and notice provisions',
        icon: 'shield',
      },
      {
        id: 'field-evidence',
        title: 'Field photos, daily reports & inspections',
        description: 'Digitally captured site evidence for the condition',
        icon: 'image',
      },
      {
        id: 'sub-pricing',
        title: 'Subcontractor quote & estimate backup',
        description: 'Trade pricing, quantities and assumptions',
        icon: 'receipt',
      },
      {
        id: 'schedule-activity',
        title: 'Affected schedule activity',
        description: 'Activity, float and milestone touched by the change',
        icon: 'route',
      },
      {
        id: 'change-log-state',
        title: 'Change log, cost code & budget',
        description: 'PCO / variation status and current budget position',
        icon: 'database',
      },
      {
        id: 'correspondence-approvals',
        title: 'Correspondence & prior decisions',
        description: 'Owner and designer replies, earlier approvals and notices',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From potential change to an authorised position',
    description:
      'The PM or commercial lead sets the contractor position; the owner approves owner-controlled changes where the contract requires it.',
    steps: [
      {
        id: 'trigger',
        title: 'Potential change raised from RFI, instruction or revision',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'scope', title: 'Identify affected scope & governing revision', icon: 'search', type: 'action' },
      {
        id: 'assemble',
        title: 'Assemble field, pricing, schedule & contract evidence',
        icon: 'layers',
        type: 'action',
      },
      { id: 'gaps', title: 'Flag missing, contradictory or superseded support', icon: 'file', type: 'action' },
      { id: 'prepare', title: 'Prepare change chronology & scope delta', icon: 'clipboard', type: 'decision' },
      { id: 'position', title: 'PM / commercial lead sets contractor position', icon: 'user', type: 'approval' },
      { id: 'update', title: 'Route owner approval; update change & cost records', icon: 'settings', type: 'system' },
      {
        id: 'close',
        title: 'Close with evidence, position & approvals kept',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Commercial judgment stays with the project team',
    description:
      'The change case arrives in the project engineer’s and PM’s queue with the evidence package, the gaps and the approval still required.',
    people: [
      {
        id: 'project-engineer',
        title: 'Project Engineer',
        description: 'Assembles and verifies the field and design evidence',
        icon: 'user',
      },
      {
        id: 'pm-commercial-manager',
        title: 'PM / Commercial Manager',
        description: 'Sets the contractor position, pricing and notice',
        icon: 'users',
      },
      {
        id: 'owner-representative',
        title: 'Owner’s Representative',
        description: 'Approves owner-controlled changes under delegated authority',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'project-platform',
        title: 'Project management platform / CDE',
        description: 'RFIs, drawings, change events',
        icon: 'network',
      },
      {
        id: 'cost-change-erp',
        title: 'Cost & change management / ERP',
        description: 'PCOs, budget and cost codes',
        icon: 'database',
      },
      {
        id: 'master-schedule',
        title: 'Master schedule',
        description: 'Affected activities and milestones',
        icon: 'route',
      },
      {
        id: 'email-teams',
        title: 'Email, Teams & shared drives',
        description: 'Owner, designer and trade correspondence',
        icon: 'monitor',
      },
    ],
  },
}
