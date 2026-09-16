import type { ApplicationBlueprint } from '../types'

export const environmentalLongTailClaimAssessmentBlueprint: ApplicationBlueprint = {
  label: 'Environmental / Long-Tail Assessment Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Assemble decades of policies, site history and science',
    description:
      'Policy archaeology made durable: every policy period, site event, remediation record and expert position in one case.',
    items: [
      {
        id: 'site-events',
        title: 'Site & contamination events',
        description: 'Known releases, operations and cleanup history',
        icon: 'map-pin',
      },
      {
        id: 'policy-tower',
        title: 'Historical policy tower',
        description: 'Decades of policy periods, terms and carriers',
        icon: 'layers',
      },
      {
        id: 'remediation-records',
        title: 'Remediation & monitoring records',
        description: 'Cleanup work, sampling results and regulatory filings',
        icon: 'clipboard',
      },
      {
        id: 'scientific-evidence',
        title: 'Scientific & expert evidence',
        description: 'Environmental consultants and competing expert positions',
        icon: 'users',
      },
      {
        id: 'litigation-regulatory',
        title: 'Litigation & regulatory record',
        description: 'Suits, orders and agency correspondence',
        icon: 'file',
      },
      {
        id: 'trigger-allocation',
        title: 'Trigger & allocation analysis',
        description: 'Which periods and policies may respond, and why',
        icon: 'route',
      },
      {
        id: 'prior-positions',
        title: 'Claim notes & prior positions',
        description: 'Reserves, decisions and authority history',
        icon: 'history',
      },
      {
        id: 'missing-evidence',
        title: 'Missing-evidence requests',
        description: 'Historic policies and site records still being sought',
        icon: 'search',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From long-tail claim to trigger, allocation and remediation positions',
    description:
      'Coverage counsel keeps trigger, allocation and coverage decisions; the case stays assembled across years of reviews.',
    steps: [
      { id: 'trigger', title: 'New environmental claim or material evidence', icon: 'circle-alert', type: 'trigger' },
      { id: 'chronology', title: 'Rebuild site & event chronology', icon: 'history', type: 'action' },
      { id: 'periods', title: 'Reconstruct applicable policy periods', icon: 'layers', type: 'action' },
      { id: 'link', title: 'Link contamination evidence to periods', icon: 'route', type: 'action' },
      { id: 'gaps', title: 'Identify gaps in the historic record', icon: 'search', type: 'action' },
      { id: 'package', title: 'Prepare trigger / allocation issue case', icon: 'clipboard', type: 'action' },
      { id: 'decide', title: 'Coverage counsel decides the position', icon: 'user', type: 'approval' },
      { id: 'record', title: 'Record position & update reserves', icon: 'database', type: 'system' },
      { id: 'monitor', title: 'Case stays current across reviews', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Coverage counsel decides; the decades are already reconstructed',
    description:
      'Trigger, allocation and remediation issues arrive with the policy periods and site evidence linked to source.',
    people: [
      {
        id: 'environmental-specialist',
        title: 'Environmental Claims Specialist',
        description: 'Owns the claim and the remediation response',
        icon: 'user',
      },
      {
        id: 'coverage-counsel',
        title: 'Coverage Counsel',
        description: 'Trigger, allocation and coverage authority',
        icon: 'shield',
      },
      {
        id: 'environmental-expert',
        title: 'Environmental Consultant / Expert',
        description: 'Site science and remediation evidence',
        icon: 'users',
      },
      {
        id: 'policyholder-regulators',
        title: 'Policyholder & Regulators',
        description: 'Site data, filings and correspondence',
        icon: 'headphones',
      },
    ],
    systems: [
      { id: 'claims-core', title: 'Claims system', description: 'Claim, reserves and activity', icon: 'database' },
      {
        id: 'policy-archives',
        title: 'Policy & legacy archives',
        description: 'Historic policies and endorsements',
        icon: 'layers',
      },
      {
        id: 'dms',
        title: 'DMS & document stores',
        description: 'Decades of reports and correspondence',
        icon: 'file',
      },
      {
        id: 'email-agency',
        title: 'Email & agency portals',
        description: 'Regulatory and expert correspondence',
        icon: 'monitor',
      },
    ],
  },
}
