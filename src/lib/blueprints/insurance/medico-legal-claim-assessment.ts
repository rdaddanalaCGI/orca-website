import type { ApplicationBlueprint } from '../types'

export const medicoLegalClaimAssessmentBlueprint: ApplicationBlueprint = {
  label: 'Medico-Legal Issue Assessment Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Build the clinical chronology around the allegation',
    description:
      'Tie the complaint and each alleged breach of care to the treatment records, correspondence and expert opinions that bear on it.',
    items: [
      {
        id: 'allegation-issue',
        title: 'Allegation / claim issue',
        description: 'The specific standard-of-care or causation question under assessment',
        icon: 'circle-alert',
      },
      {
        id: 'clinical-chronology',
        title: 'Clinical chronology',
        description: 'Years of treatment history ordered by event, not by source folder',
        icon: 'history',
      },
      {
        id: 'medical-records',
        title: 'Medical records & providers',
        description: 'Treatment notes, imaging and labs across every treating provider',
        icon: 'file',
      },
      {
        id: 'expert-reports',
        title: 'Expert opinions & assumptions',
        description: 'Medical expert reports and the evidence each opinion rests on',
        icon: 'users',
      },
      {
        id: 'claim-correspondence',
        title: 'Claim notes & correspondence',
        description: 'Adjuster notes, counsel memos and claimant or lawyer letters',
        icon: 'headphones',
      },
      {
        id: 'policy-coverage',
        title: 'Policy & coverage position',
        description: 'MPL wording, limits and prior coverage decisions on the claim',
        icon: 'shield',
      },
      {
        id: 'missing-records',
        title: 'Missing-record requests',
        description: 'Provider items requested, returned partial or still unanswered',
        icon: 'search',
      },
      {
        id: 'prior-decisions',
        title: 'Prior decisions & authority',
        description: 'Earlier positions, reserves and approvals with their rationale',
        icon: 'check',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From allegation to source-linked issue assessment',
    description:
      'The medico-legal reviewer or claims counsel retains causation, liability, reserve and settlement judgment.',
    steps: [
      { id: 'trigger', title: 'Allegation or authority review opens the issue', icon: 'circle-alert', type: 'trigger' },
      { id: 'chronology', title: 'Reconstruct the clinical chronology', icon: 'history', type: 'action' },
      { id: 'map', title: 'Map evidence: supports, contradicts, unknown', icon: 'layers', type: 'action' },
      { id: 'compare', title: 'Compare expert opinions & assumptions', icon: 'users', type: 'action' },
      { id: 'gaps', title: 'Request missing provider records', icon: 'search', type: 'action' },
      { id: 'package', title: 'Prepare source-linked issue assessment', icon: 'clipboard', type: 'action' },
      { id: 'decide', title: 'Medico-legal authority decides position', icon: 'user', type: 'approval' },
      { id: 'record', title: 'Write decision & rationale to claim record', icon: 'database', type: 'system' },
      {
        id: 'monitor',
        title: 'New evidence reopens the issue, not the file',
        icon: 'circle-check',
        type: 'completion',
      },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Specialists keep the medical judgment; the evidence comes to them',
    description:
      'The issue assessment arrives with every statement linked to its source record, so review time goes to judgment rather than reconstruction.',
    people: [
      {
        id: 'medico-legal-reviewer',
        title: 'Medico-Legal Reviewer',
        description: 'Assesses allegation, causation and standard of care',
        icon: 'user',
      },
      {
        id: 'mpl-claims-specialist',
        title: 'MPL Claims Specialist',
        description: 'Owns claim strategy and the assessment request',
        icon: 'clipboard',
      },
      {
        id: 'claims-counsel',
        title: 'Claims Counsel',
        description: 'Holds liability, reserve and settlement authority',
        icon: 'shield',
      },
      {
        id: 'medical-expert',
        title: 'Medical Expert',
        description: 'External opinion provider whose reports are compared, not replaced',
        icon: 'users',
      },
    ],
    systems: [
      {
        id: 'claims-core',
        title: 'Claims system',
        description: 'Claim state, reserves, notes and diary',
        icon: 'database',
      },
      { id: 'dms', title: 'DMS / SharePoint', description: 'Records, reports and correspondence', icon: 'file' },
      {
        id: 'email-portals',
        title: 'Email & provider portals',
        description: 'Record requests and external follow-up',
        icon: 'headphones',
      },
      {
        id: 'legal-spend',
        title: 'Legal-spend / matter tools',
        description: 'Counsel engagement and invoices',
        icon: 'receipt',
      },
    ],
  },
}
