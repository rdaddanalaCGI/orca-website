import type { ApplicationBlueprint } from '../types'

export const payAppExceptionReviewBlueprint: ApplicationBlueprint = {
  label: 'Pay Application Exception Review Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Reconcile the application against approved scope',
    description:
      'Set the current application beside the schedule of values, prior billing, approved and pending changes, waivers and the accepted progress evidence.',
    items: [
      {
        id: 'current-prior-app',
        title: 'Current & previous pay application',
        description: 'Claimed this period vs billed to date',
        icon: 'receipt',
      },
      {
        id: 'sov',
        title: 'Schedule of values',
        description: 'Line items and contract values',
        icon: 'clipboard',
      },
      {
        id: 'changes',
        title: 'Approved & pending changes',
        description: 'Which change amounts may be billed yet',
        icon: 'history',
      },
      {
        id: 'retainage',
        title: 'Retainage rules & state',
        description: 'Held, released, contractual percentage',
        icon: 'shield',
      },
      {
        id: 'waivers',
        title: 'Lien waivers & required support',
        description: 'Conditional and unconditional releases',
        icon: 'file',
      },
      {
        id: 'progress-evidence',
        title: 'Accepted progress evidence',
        description: 'Site inspection, photos or captured progress',
        icon: 'image',
      },
      {
        id: 'stored-materials',
        title: 'Stored-material evidence',
        description: 'Invoices, insurance and location proof',
        icon: 'boxes',
      },
      {
        id: 'cost-state',
        title: 'Project cost / ERP state',
        description: 'Committed and billed to date',
        icon: 'database',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From received application to approve, reduce or hold',
    description:
      'The authorised reviewer—PM, owner’s representative, architect or finance—decides what is certified; Orcaworks prepares the exception list and its sources.',
    steps: [
      { id: 'trigger', title: 'Pay application received or exception raised', icon: 'circle-alert', type: 'trigger' },
      {
        id: 'reconcile',
        title: 'Reconcile lines vs prior billing & approved scope',
        icon: 'layers',
        type: 'action',
      },
      { id: 'changes', title: 'Isolate pending or unapproved change amounts', icon: 'history', type: 'action' },
      { id: 'waivers', title: 'Check waiver & support completeness', icon: 'file', type: 'action' },
      { id: 'progress', title: 'Compare claimed vs accepted progress evidence', icon: 'image', type: 'decision' },
      { id: 'exceptions', title: 'Prepare exception list with sources', icon: 'clipboard', type: 'action' },
      { id: 'decide', title: 'Authorised reviewer approves, reduces or holds', icon: 'user', type: 'approval' },
      {
        id: 'update',
        title: 'Update payment records; request missing support',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Certification stays with the contract’s reviewer',
    description:
      'The exception package reaches the PM and project accountant with only the lines that disagree, each linked to the change, waiver or progress evidence in question.',
    people: [
      {
        id: 'project-manager',
        title: 'Project Manager',
        description: 'First reviewer of claimed progress and scope',
        icon: 'user',
      },
      {
        id: 'project-accountant',
        title: 'Project Accountant',
        description: 'Checks waivers, retainage and billing to date',
        icon: 'receipt',
      },
      {
        id: 'owner-rep-architect',
        title: 'Owner’s Rep / Architect',
        description: 'Certifies the amount under the contract',
        icon: 'shield',
      },
    ],
    systems: [
      {
        id: 'project-financials',
        title: 'Project financials / ERP',
        description: 'SOV, billing and cost to date',
        icon: 'database',
      },
      {
        id: 'payment-platform',
        title: 'Payment / AP platform',
        description: 'Applications, waivers, payments',
        icon: 'receipt',
      },
      {
        id: 'project-platform',
        title: 'Project platform / CDE',
        description: 'Changes, inspections, daily logs',
        icon: 'network',
      },
      {
        id: 'field-evidence',
        title: 'Field progress evidence',
        description: 'Photos or captured-progress source',
        icon: 'image',
      },
    ],
  },
}
