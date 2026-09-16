import type { ApplicationBlueprint } from '../types'

export const intakeToRetainerBlueprint: ApplicationBlueprint = {
  label: 'Intake-to-Retainer Coordination Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble the intake case around the prospective client',
    description:
      'Pull the intake record, conflict result, attorney response, investigator status and signing state into one matter-aware case.',
    items: [
      {
        id: 'intake-record',
        title: 'Intake form & call notes',
        description: 'Incident, injuries and first-contact record in the case management system',
        icon: 'clipboard',
      },
      {
        id: 'contact-attempts',
        title: 'Contact attempts & client replies',
        description: 'Call, SMS and email history with the prospective client',
        icon: 'smartphone',
      },
      {
        id: 'conflict-status',
        title: 'Conflict check result',
        description: 'Cleared, pending or flagged in the conflicts system',
        icon: 'shield',
      },
      {
        id: 'practice-fit',
        title: 'Case type, venue & language',
        description: 'Practice area, county and client language',
        icon: 'map-pin',
      },
      {
        id: 'attorney-response',
        title: 'Attorney acceptance status',
        description: 'Who was asked to accept and whether they answered',
        icon: 'user',
      },
      {
        id: 'investigator-status',
        title: 'Investigator dispatch status',
        description: 'Request sent, accepted, scene visit scheduled',
        icon: 'search',
      },
      {
        id: 'retainer-esign',
        title: 'Retainer & e-signature state',
        description: 'Sent, viewed, signed or expired in DocuSign',
        icon: 'file',
      },
      {
        id: 'onboarding-docs',
        title: 'Onboarding documents',
        description: 'Police report, photos, HIPAA release, insurance information',
        icon: 'layers',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From qualified lead to retained matter',
    description:
      'The intake attorney decides representation and conflicts; Orcaworks coordinates every handoff in between and writes the retained state back.',
    steps: [
      { id: 'trigger', title: 'Qualified lead awaits acceptance', icon: 'circle-alert', type: 'trigger' },
      { id: 'gather', title: 'Gather missing intake facts', icon: 'clipboard', type: 'action' },
      { id: 'accept', title: 'Intake attorney accepts or declines', icon: 'user', type: 'approval' },
      { id: 'investigator', title: 'Dispatch & confirm investigator', icon: 'search', type: 'action' },
      { id: 'retainer', title: 'Send retainer via DocuSign', icon: 'file', type: 'system' },
      { id: 'chase', title: 'Chase signature & onboarding documents', icon: 'smartphone', type: 'action' },
      { id: 'verify', title: 'Verify onboarding complete', icon: 'check', type: 'decision' },
      { id: 'write-back', title: 'Write retained case to the case system', icon: 'database', type: 'system' },
      { id: 'close', title: 'Close with decision record', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Intake decides; the case system records the retained matter',
    description:
      'Work appears in the intake queue with the missing item, the pending attorney decision and the signing state for each lead.',
    people: [
      {
        id: 'intake-specialist',
        title: 'Intake Specialist',
        description: 'Works the lead; chases client, attorney and investigator',
        icon: 'headphones',
      },
      {
        id: 'intake-attorney',
        title: 'Intake Attorney',
        description: 'Accepts or declines representation; owns conflict clearance',
        icon: 'user',
      },
      {
        id: 'intake-director',
        title: 'Intake Director',
        description: 'Owns qualified-to-retained aging and conversion',
        icon: 'users',
      },
    ],
    systems: [
      {
        id: 'case-system',
        title: 'Case management system',
        description: 'Intake record, case stage, attorney field',
        icon: 'database',
      },
      {
        id: 'telephony-outlook',
        title: 'Telephony / SMS & Outlook',
        description: 'Client, attorney and investigator follow-up',
        icon: 'smartphone',
      },
      { id: 'docusign', title: 'DocuSign', description: 'Retainer and HIPAA signature state', icon: 'file' },
      {
        id: 'investigator-tools',
        title: 'Investigator / vendor tools',
        description: 'Dispatch status and scene evidence',
        icon: 'search',
      },
    ],
  },
}
