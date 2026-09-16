import type { ApplicationBlueprint } from '../types'

export const legalSchedulingCoordinationBlueprint: ApplicationBlueprint = {
  label: 'Legal Scheduling Coordination Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Gather what the event needs before proposing a date',
    description:
      'Combine the case event, court notice, internal calendars, external availability and required documents so options are realistic.',
    items: [
      {
        id: 'case-event',
        title: 'Case event to schedule',
        description: 'Deposition, mediation, IME, signing or expert meeting',
        icon: 'clipboard',
      },
      {
        id: 'court-notice',
        title: 'Court notice & procedural constraints',
        description: 'From the docketing system, which stays authoritative',
        icon: 'shield',
      },
      {
        id: 'internal-calendars',
        title: 'Attorney & paralegal calendars',
        description: 'Outlook availability and blocked time',
        icon: 'users',
      },
      {
        id: 'external-availability',
        title: 'Opposing counsel, client & witness availability',
        description: 'Replies gathered by email or phone',
        icon: 'network',
      },
      {
        id: 'venue-services',
        title: 'Location, court reporter & interpreter',
        description: 'Venue and services that must also be booked',
        icon: 'map-pin',
      },
      {
        id: 'required-documents',
        title: 'Notice & supporting documents',
        description: 'Notice of deposition, exhibits, subpoenas',
        icon: 'file',
      },
      {
        id: 'case-deadlines',
        title: 'Case deadlines & ticklers',
        description: 'Discovery cut-off and trial setting',
        icon: 'circle-alert',
      },
      {
        id: 'reschedule-history',
        title: 'Prior reschedules',
        description: 'How often and why this event has moved',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From scheduling request to confirmed, recorded event',
    description:
      'The attorney or paralegal confirms the final date; the docketing system remains authoritative for deadlines.',
    steps: [
      { id: 'trigger', title: 'Event needs scheduling or reschedule', icon: 'circle-alert', type: 'trigger' },
      { id: 'participants', title: 'Identify participants & constraints', icon: 'users', type: 'action' },
      { id: 'availability', title: 'Collect availability', icon: 'headphones', type: 'action' },
      { id: 'propose', title: 'Propose permitted time options', icon: 'route', type: 'action' },
      { id: 'track', title: 'Track responses & conflicts', icon: 'search', type: 'action' },
      { id: 'escalate', title: 'Escalate unresolved conflict', icon: 'circle-alert', type: 'decision' },
      { id: 'confirm', title: 'Attorney confirms date', icon: 'user', type: 'approval' },
      { id: 'update', title: 'Update calendars & case event', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Notice & materials distributed', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Assistants coordinate; attorneys confirm the date',
    description:
      'Open events appear with who has responded, who has not and which proposed times still work for everyone.',
    people: [
      {
        id: 'legal-assistant',
        title: 'Legal Assistant / Paralegal',
        description: 'Coordinates parties and confirms logistics',
        icon: 'headphones',
      },
      {
        id: 'attorney',
        title: 'Attorney',
        description: 'Decides strategic timing and confirms the date',
        icon: 'user',
      },
      {
        id: 'support-manager',
        title: 'Legal Support Manager',
        description: 'Owns request-to-confirm turnaround',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'case-system', title: 'Case management system', description: 'Case event and notes', icon: 'database' },
      { id: 'outlook-teams', title: 'Outlook / Teams', description: 'Calendars and invitations', icon: 'monitor' },
      {
        id: 'docketing',
        title: 'Docketing / court portals',
        description: 'Notices and procedural deadlines',
        icon: 'shield',
      },
      { id: 'docusign', title: 'DocuSign', description: 'Signing events where relevant', icon: 'file' },
    ],
  },
}
