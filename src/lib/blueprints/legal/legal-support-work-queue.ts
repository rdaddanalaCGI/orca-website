import type { ApplicationBlueprint } from '../types'

export const legalSupportWorkQueueBlueprint: ApplicationBlueprint = {
  label: 'Legal Support Work Queue Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Turn the request into a matter-aware work item',
    description:
      'Attach the matter, task type, deadline, documents and review requirements to the request before it is routed.',
    items: [
      {
        id: 'request',
        title: 'Attorney request',
        description: 'Email, Teams message or case-stage trigger',
        icon: 'headphones',
      },
      {
        id: 'matter-context',
        title: 'Matter & permitted case context',
        description: 'Only what the assignee is allowed to see',
        icon: 'shield',
      },
      {
        id: 'task-type',
        title: 'Task type & deliverable',
        description: 'Records, drafting, filing, coordination',
        icon: 'clipboard',
      },
      {
        id: 'deadline',
        title: 'Deadline & priority',
        description: 'Court date, tickler or attorney target',
        icon: 'circle-alert',
      },
      {
        id: 'documents',
        title: 'Relevant documents & templates',
        description: 'Pulled from the DMS with source links',
        icon: 'file',
      },
      {
        id: 'skills-capacity',
        title: 'Support team skills & capacity',
        description: 'Who is eligible and who has room',
        icon: 'users',
      },
      {
        id: 'review-requirements',
        title: 'Review & sign-off requirements',
        description: 'What the attorney must approve before it leaves',
        icon: 'check',
      },
      {
        id: 'matter-history',
        title: 'Prior work on this matter',
        description: 'Earlier requests and their outcomes',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From buried email to completed, reviewed support work',
    description:
      'The support manager owns routing; the requesting attorney supervises substantive output and approves any filing.',
    steps: [
      { id: 'trigger', title: 'Attorney request received', icon: 'circle-alert', type: 'trigger' },
      { id: 'context', title: 'Attach matter context', icon: 'layers', type: 'action' },
      { id: 'classify', title: 'Classify task & deadline', icon: 'clipboard', type: 'action' },
      { id: 'route', title: 'Route to eligible support pool', icon: 'users', type: 'action' },
      { id: 'complete', title: 'Complete bounded work', icon: 'settings', type: 'action' },
      { id: 'review', title: 'Attorney reviews legal output', icon: 'user', type: 'approval' },
      { id: 'deliver', title: 'File, send or update case record', icon: 'database', type: 'system' },
      { id: 'close', title: 'Close item; notify requester', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Support completes; attorneys supervise the output',
    description:
      'The queue shows each request with its matter, deadline, assignee and review state so managers see load and turnaround.',
    people: [
      {
        id: 'requesting-attorney',
        title: 'Requesting Attorney',
        description: 'Sets the task; approves substantive output and filings',
        icon: 'user',
      },
      {
        id: 'support-specialist',
        title: 'Support Specialist / Paralegal',
        description: 'Completes the routed work',
        icon: 'clipboard',
      },
      {
        id: 'support-manager',
        title: 'Support Services Manager',
        description: 'Owns routing rules, load and turnaround',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'outlook-teams', title: 'Outlook / Teams', description: 'Request intake and status', icon: 'monitor' },
      { id: 'case-system', title: 'Case management system', description: 'Matter record and task', icon: 'database' },
      { id: 'dms-word', title: 'DMS / Word', description: 'Documents and drafts', icon: 'file' },
      {
        id: 'efiling-portals',
        title: 'E-filing / provider portals',
        description: 'Filings and submissions',
        icon: 'network',
      },
      {
        id: 'resource-tools',
        title: 'BigHand or resource tools',
        description: 'Where installed, as the allocation source',
        icon: 'settings',
      },
    ],
  },
}
