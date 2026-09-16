import type { ApplicationBlueprint } from '../types'

export const endorsementExceptionResolutionBlueprint: ApplicationBlueprint = {
  label: 'Endorsement Exception Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the exception the straight-through path rejected',
    description:
      'The request, the current policy state, the evidence and the authority rules—plus what is missing or in conflict.',
    items: [
      {
        id: 'endorsement-request',
        title: 'Endorsement request',
        description: 'The change asked for, in the broker’s own words',
        icon: 'file',
      },
      {
        id: 'policy-state',
        title: 'Current policy state',
        description: 'PAS record, existing endorsements and effective dates',
        icon: 'database',
      },
      {
        id: 'supporting-evidence',
        title: 'Supporting evidence',
        description: 'Attachments, schedules and broker documentation',
        icon: 'clipboard',
      },
      {
        id: 'broker-correspondence',
        title: 'Broker correspondence',
        description: 'Clarifications, history and unanswered questions',
        icon: 'headphones',
      },
      {
        id: 'discrepancy',
        title: 'Discrepancy & ambiguity',
        description: 'Missing, conflicting or backdated elements',
        icon: 'circle-alert',
      },
      {
        id: 'authority-rules',
        title: 'Authority & referral rules',
        description: 'What service can approve versus what needs underwriting',
        icon: 'shield',
      },
      {
        id: 'prior-exceptions',
        title: 'Prior exceptions',
        description: 'How similar requests were resolved',
        icon: 'history',
      },
      {
        id: 'uw-impact',
        title: 'Rating / underwriting impact',
        description: 'Premium or exposure effect where relevant',
        icon: 'receipt',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From ambiguous request to issued—or properly declined—change',
    description:
      'The underwriter decides anything outside service authority; approved changes are issued through the PAS.',
    steps: [
      { id: 'trigger', title: 'Request fails the straight-through path', icon: 'circle-alert', type: 'trigger' },
      { id: 'gather', title: 'Gather policy, request & evidence', icon: 'layers', type: 'action' },
      { id: 'identify', title: 'Identify the missing or conflicting item', icon: 'search', type: 'action' },
      { id: 'chase', title: 'Chase the broker for what is missing', icon: 'headphones', type: 'action' },
      { id: 'prepare', title: 'Prepare exception for the right authority', icon: 'clipboard', type: 'action' },
      { id: 'decide', title: 'Underwriter or service lead decides', icon: 'user', type: 'approval' },
      { id: 'issue', title: 'Issue or decline; update the PAS', icon: 'database', type: 'system' },
      { id: 'close', title: 'Change issued with decision trail', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Service teams resolve; underwriters decide what exceeds authority',
    description:
      'The exception arrives with the policy state, the discrepancy and the broker’s answers—ready for a decision, not research.',
    people: [
      {
        id: 'policy-services',
        title: 'Policy-Services Representative',
        description: 'Works the exception and the broker follow-up',
        icon: 'headphones',
      },
      {
        id: 'uw-assistant',
        title: 'Underwriting Assistant',
        description: 'Prepares the referral package',
        icon: 'clipboard',
      },
      {
        id: 'underwriter',
        title: 'Underwriter',
        description: 'Decides requests outside service authority',
        icon: 'user',
      },
      {
        id: 'broker',
        title: 'Broker',
        description: 'Requester; supplies the missing evidence',
        icon: 'users',
      },
    ],
    systems: [
      {
        id: 'pas',
        title: 'Policy administration (PAS)',
        description: 'Policy state and issued endorsements',
        icon: 'database',
      },
      {
        id: 'broker-portal',
        title: 'Broker portal & email',
        description: 'Requests and clarifications',
        icon: 'headphones',
      },
      { id: 'dms', title: 'DMS', description: 'Attachments and schedules', icon: 'file' },
      {
        id: 'uw-workbench',
        title: 'UW workbench',
        description: 'Referrals and underwriting decisions',
        icon: 'monitor',
      },
    ],
  },
}
