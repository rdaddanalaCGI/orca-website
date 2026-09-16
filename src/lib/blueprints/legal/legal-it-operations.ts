import type { ApplicationBlueprint } from '../types'

export const legalItOperationsBlueprint: ApplicationBlueprint = {
  label: 'Legal IT Operations Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Gather user, device, application and matter context',
    description:
      'A simple-looking ticket needs identity, device, Microsoft 365, case-system and DMS permission context before a safe action is possible.',
    items: [
      {
        id: 'ticket',
        title: 'Ticket or joiner / mover / leaver event',
        description: 'Access issue, new hire, role change or departure',
        icon: 'clipboard',
      },
      {
        id: 'user-role',
        title: 'User, role & office',
        description: 'Attorney, paralegal, staff; practice group',
        icon: 'user',
      },
      {
        id: 'entra-intune',
        title: 'Entra identity & Intune device',
        description: 'Account state, groups, device compliance',
        icon: 'smartphone',
      },
      {
        id: 'm365-state',
        title: 'Microsoft 365 state',
        description: 'Mailbox, Teams and SharePoint access',
        icon: 'monitor',
      },
      {
        id: 'case-dms-permissions',
        title: 'Case system & DMS permissions',
        description: 'Case-system roles; iManage / NetDocuments workspaces',
        icon: 'shield',
      },
      {
        id: 'ethical-walls',
        title: 'Ethical walls & matter restrictions',
        description: 'Matters the user must not see',
        icon: 'network',
      },
      {
        id: 'runbook',
        title: 'Approved runbook',
        description: 'The firm’s permitted steps for this ticket type',
        icon: 'settings',
      },
      {
        id: 'app-status',
        title: 'Application & integration status',
        description: 'Known outages and recurring failures',
        icon: 'circle-alert',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From ticket to authorized, audited action',
    description:
      'Privileged access, security exceptions and matter-permission changes require explicit approval from the IT or security owner.',
    steps: [
      { id: 'trigger', title: 'Ticket or joiner / mover / leaver event', icon: 'circle-alert', type: 'trigger' },
      { id: 'context', title: 'Gather identity, device & app context', icon: 'layers', type: 'action' },
      { id: 'diagnose', title: 'Diagnose against approved runbook', icon: 'search', type: 'action' },
      { id: 'privileged', title: 'Privileged or matter-permission change?', icon: 'shield', type: 'decision' },
      { id: 'approve', title: 'IT / security owner approves', icon: 'user', type: 'approval' },
      { id: 'execute', title: 'Execute or revert permitted action', icon: 'settings', type: 'action' },
      { id: 'verify', title: 'Verify result with user', icon: 'check', type: 'action' },
      { id: 'document', title: 'Document & close ticket', icon: 'database', type: 'system' },
      { id: 'close', title: 'Flag recurring problem', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Service desk executes; IT and security owners approve',
    description:
      'Tickets appear with the assembled context, the matched runbook step and the approval still required before action.',
    people: [
      {
        id: 'service-desk',
        title: 'Service Desk Analyst',
        description: 'Works the ticket and verifies with the user',
        icon: 'headphones',
      },
      {
        id: 'it-director',
        title: 'IT Director / Security Owner',
        description: 'Approves privileged and matter-permission changes',
        icon: 'user',
      },
      {
        id: 'app-admin',
        title: 'Applications Administrator',
        description: 'Owns case system, DMS and integration health',
        icon: 'settings',
      },
    ],
    systems: [
      { id: 'ticketing', title: 'ServiceNow / Jira', description: 'Ticket and audit trail', icon: 'clipboard' },
      {
        id: 'microsoft',
        title: 'Microsoft Entra / Intune / Defender / M365',
        description: 'Identity, device, mailbox and security',
        icon: 'monitor',
      },
      { id: 'case-system', title: 'Case management system', description: 'Case-system roles', icon: 'database' },
      {
        id: 'dms',
        title: 'iManage / NetDocuments / SharePoint',
        description: 'Workspaces and ethical walls',
        icon: 'shield',
      },
    ],
  },
}
