import type { ApplicationBlueprint } from '../types'

export const recordsEvidenceReadinessBlueprint: ApplicationBlueprint = {
  label: 'Records & Evidence Readiness Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Compare what the case needs with what has arrived',
    description:
      'Hold the evidence checklist, every request sent, every record returned and the provider correspondence beside the matter.',
    items: [
      {
        id: 'evidence-checklist',
        title: 'Case stage & evidence checklist',
        description: 'Records required for demand, deposition or trial readiness',
        icon: 'clipboard',
      },
      {
        id: 'requests-sent',
        title: 'Records requests sent',
        description: 'Provider, court or insurer; date sent; method',
        icon: 'history',
      },
      {
        id: 'provider-contacts',
        title: 'Provider, court & insurer contacts',
        description: 'Records departments, portals and fax numbers',
        icon: 'network',
      },
      {
        id: 'received-records',
        title: 'Received records & bills',
        description: 'PDFs, itemized bills, certifications',
        icon: 'file',
      },
      {
        id: 'provider-correspondence',
        title: 'Provider correspondence',
        description: 'Denials, fee requests, partial responses',
        icon: 'headphones',
      },
      {
        id: 'hipaa-authorizations',
        title: 'HIPAA authorizations',
        description: 'Signed releases and their expiry',
        icon: 'shield',
      },
      {
        id: 'ticklers',
        title: 'Ticklers & deadlines',
        description: 'Statute, discovery cut-off, demand target date',
        icon: 'circle-alert',
      },
      {
        id: 'source-metadata',
        title: 'Source & page metadata',
        description: 'Page counts, date ranges, custodian',
        icon: 'search',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From records gap to source-linked, review-ready file',
    description:
      'The paralegal confirms completeness; the attorney judges legal sufficiency and what the records mean for the case.',
    steps: [
      { id: 'trigger', title: 'Checklist needs records or request ages', icon: 'circle-alert', type: 'trigger' },
      { id: 'compare', title: 'Compare received set to checklist', icon: 'search', type: 'action' },
      { id: 'request', title: 'Send approved records request', icon: 'file', type: 'action' },
      { id: 'follow-up', title: 'Follow up provider on schedule', icon: 'headphones', type: 'action' },
      { id: 'validate', title: 'Check pages, dates & readability', icon: 'check', type: 'action' },
      { id: 'index', title: 'Index & link records in DMS', icon: 'layers', type: 'system' },
      { id: 'review', title: 'Attorney reviews sufficiency', icon: 'user', type: 'approval' },
      { id: 'update', title: 'Update case readiness in the case system', icon: 'database', type: 'system' },
      { id: 'close', title: 'Case-ready or blocker escalated', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Paralegals confirm completeness; attorneys judge sufficiency',
    description:
      'Work appears in the records queue with each outstanding request, its age, the last provider response and the next follow-up.',
    people: [
      {
        id: 'records-coordinator',
        title: 'Records Coordinator',
        description: 'Sends requests and verifies returned records',
        icon: 'headphones',
      },
      {
        id: 'paralegal',
        title: 'Paralegal',
        description: 'Confirms completeness for demand or discovery',
        icon: 'clipboard',
      },
      {
        id: 'attorney',
        title: 'Attorney',
        description: 'Decides legal sufficiency and strategy impact',
        icon: 'user',
      },
    ],
    systems: [
      {
        id: 'case-system',
        title: 'Case management system',
        description: 'Checklist, stage and request status',
        icon: 'database',
      },
      { id: 'dms', title: 'DMS', description: 'Indexed records with source links', icon: 'layers' },
      {
        id: 'portals-fax',
        title: 'Provider / court / insurer portals & fax',
        description: 'Request and return channels',
        icon: 'network',
      },
      {
        id: 'review-tools',
        title: 'Chronology / review tools',
        description: 'Downstream analysis on the complete set',
        icon: 'monitor',
      },
    ],
  },
}
