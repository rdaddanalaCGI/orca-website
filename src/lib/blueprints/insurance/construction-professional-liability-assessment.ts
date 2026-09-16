import type { ApplicationBlueprint } from '../types'

export const constructionProfessionalLiabilityAssessmentBlueprint: ApplicationBlueprint = {
  label: 'Construction & A&E Assessment Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Rebuild the project record around each alleged defect or duty',
    description:
      'Contracts, drawings, RFIs, variations, site history and expert reports organized by allegation—not by the folder they were filed in.',
    items: [
      {
        id: 'allegation-defect',
        title: 'Allegation / defect issue',
        description: 'The design error, defect or delay under assessment',
        icon: 'circle-alert',
      },
      {
        id: 'psa',
        title: 'Professional-services agreement',
        description: 'Scope of duty, standard of care and contract terms',
        icon: 'file',
      },
      {
        id: 'drawings',
        title: 'Drawings & design revisions',
        description: 'Issued versions, revisions and design changes over time',
        icon: 'layers',
      },
      {
        id: 'rfi-variations',
        title: 'RFIs & variations',
        description: 'Site queries, instructions and change orders',
        icon: 'clipboard',
      },
      {
        id: 'project-chronology',
        title: 'Project & site chronology',
        description: 'Programme, site reports, correspondence and delay events',
        icon: 'history',
      },
      {
        id: 'expert-reports',
        title: 'Engineering expert reports',
        description: 'Competing technical opinions and their assumptions',
        icon: 'users',
      },
      {
        id: 'policy-coverage',
        title: 'PI policy & coverage position',
        description: 'Wording, period and prior coverage decisions',
        icon: 'shield',
      },
      {
        id: 'claim-correspondence',
        title: 'Claim & counsel correspondence',
        description: 'Handler notes, defence counsel reports and demands',
        icon: 'headphones',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From alleged defect to decision-ready issue case',
    description: 'The professional-lines handler and claims counsel keep coverage, liability and expert strategy.',
    steps: [
      {
        id: 'trigger',
        title: 'Design-error, defect or delay claim opens an issue',
        icon: 'circle-alert',
        type: 'trigger',
      },
      { id: 'chronology', title: 'Reconstruct project & duty chronology', icon: 'history', type: 'action' },
      { id: 'map', title: 'Map contract duty to each allegation', icon: 'layers', type: 'action' },
      { id: 'compare', title: 'Compare competing engineering reports', icon: 'users', type: 'action' },
      { id: 'gaps', title: 'Identify & request missing project evidence', icon: 'search', type: 'action' },
      { id: 'package', title: 'Prepare issue-by-issue responsibility case', icon: 'clipboard', type: 'action' },
      { id: 'decide', title: 'Handler & counsel decide the position', icon: 'user', type: 'approval' },
      { id: 'record', title: 'Write approved position to claim & matter', icon: 'database', type: 'system' },
      { id: 'close', title: 'Issue resolved with a defensible record', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Handlers and counsel decide; engineers supply the technical record',
    description:
      'Each issue case arrives with the duty, the project history and the competing expert positions already source-linked.',
    people: [
      {
        id: 'prolines-handler',
        title: 'Professional-Lines Claims Handler',
        description: 'Owns claim strategy and the issue list',
        icon: 'user',
      },
      {
        id: 'claims-counsel',
        title: 'Claims Counsel',
        description: 'Coverage, liability and settlement authority',
        icon: 'shield',
      },
      {
        id: 'engineer-reviewer',
        title: 'Engineer / Technical Reviewer',
        description: 'External expert whose opinions are compared, not replaced',
        icon: 'users',
      },
      {
        id: 'insured-broker',
        title: 'Insured & Broker',
        description: 'Source of project evidence and clarifications',
        icon: 'headphones',
      },
    ],
    systems: [
      {
        id: 'claims-core',
        title: 'Claims system',
        description: 'Claim state, reserves and activity',
        icon: 'database',
      },
      {
        id: 'dms-project',
        title: 'DMS & project repositories',
        description: 'Drawings, contracts and site records',
        icon: 'file',
      },
      {
        id: 'legal-spend',
        title: 'Legal-spend / matter tools',
        description: 'Defence counsel engagement and spend',
        icon: 'receipt',
      },
      {
        id: 'email-portals',
        title: 'Email & portals',
        description: 'Expert, broker and insured correspondence',
        icon: 'monitor',
      },
    ],
  },
}
