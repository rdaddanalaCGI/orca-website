import type { ApplicationBlueprint } from '../types'

export const professionalLinesLitigationAuthorityReviewBlueprint: ApplicationBlueprint = {
  label: 'Litigation & Authority Review Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Show what changed since the last approved position',
    description:
      'The litigated matter reconstructed from pleadings, counsel reports, experts, spend and prior authority decisions.',
    items: [
      {
        id: 'matter-posture',
        title: 'Litigated matter & posture',
        description: 'Pleadings, stage and the current case theory',
        icon: 'file',
      },
      {
        id: 'counsel-reports',
        title: 'Defence counsel reports',
        description: 'Case assessments, budgets and recommendations',
        icon: 'clipboard',
      },
      {
        id: 'expert-evidence',
        title: 'Expert evidence',
        description: 'Expert reports and rebuttals on the matter',
        icon: 'users',
      },
      {
        id: 'defence-spend',
        title: 'Defence spend & invoices',
        description: 'Legal-spend history against budget',
        icon: 'receipt',
      },
      {
        id: 'reserve-history',
        title: 'Reserve history',
        description: 'Prior reserves and what drove each change',
        icon: 'history',
      },
      {
        id: 'prior-authority',
        title: 'Prior authority decisions',
        description: 'Approved positions and their recorded rationale',
        icon: 'check',
      },
      {
        id: 'material-changes',
        title: 'Material changes',
        description: 'New rulings, evidence or demands since last review',
        icon: 'circle-alert',
      },
      {
        id: 'policy-coverage',
        title: 'Policy & coverage position',
        description: 'D&O / E&O wording and prior coverage decisions',
        icon: 'shield',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From authority request to decision-ready review package',
    description:
      'The claims authority keeps reserve, settlement and strategy decisions; defence counsel keeps legal judgment.',
    steps: [
      { id: 'trigger', title: 'Authority request or litigation milestone', icon: 'circle-alert', type: 'trigger' },
      { id: 'reconstruct', title: 'Reconstruct matter posture & chronology', icon: 'history', type: 'action' },
      { id: 'delta', title: 'Show what changed since prior approval', icon: 'search', type: 'action' },
      { id: 'reconcile', title: 'Reconcile counsel view with the evidence', icon: 'layers', type: 'action' },
      { id: 'package', title: 'Prepare source-linked authority package', icon: 'clipboard', type: 'action' },
      { id: 'decide', title: 'Claims authority decides the position', icon: 'user', type: 'approval' },
      { id: 'record', title: 'Record decision, reserve & instructions', icon: 'database', type: 'system' },
      { id: 'notify', title: 'Send authorized instructions to counsel', icon: 'headphones', type: 'action' },
      {
        id: 'close',
        title: 'Authority cycle complete; next milestone watched',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'The authority sees the delta, not a re-read of the file',
    description:
      'The review package isolates what materially changed, with counsel’s recommendation beside the source evidence.',
    people: [
      {
        id: 'prolines-handler',
        title: 'Professional-Lines Claims Handler',
        description: 'Prepares and owns the authority request',
        icon: 'user',
      },
      {
        id: 'claims-authority',
        title: 'Claims Counsel / Authority',
        description: 'Approves reserve, settlement and strategy',
        icon: 'shield',
      },
      {
        id: 'defence-counsel',
        title: 'Defence Counsel',
        description: 'Reports and recommendations; retains legal judgment',
        icon: 'users',
      },
      {
        id: 'reinsurance',
        title: 'Reinsurance / Management',
        description: 'Notification where treaties or thresholds require it',
        icon: 'network',
      },
    ],
    systems: [
      {
        id: 'claims-core',
        title: 'Claims system',
        description: 'Claim, reserves and authority history',
        icon: 'database',
      },
      {
        id: 'legal-spend',
        title: 'Legal-spend / matter platform',
        description: 'Counsel reports, budgets and invoices',
        icon: 'receipt',
      },
      { id: 'dms', title: 'DMS', description: 'Pleadings and expert reports', icon: 'file' },
      {
        id: 'email-counsel',
        title: 'Email & counsel portals',
        description: 'Instructions and correspondence',
        icon: 'monitor',
      },
    ],
  },
}
