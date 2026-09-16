import type { ApplicationBlueprint } from '../types'

export const shipmentExceptionResolutionBlueprint: ApplicationBlueprint = {
  label: 'Shipment Exception Resolution Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Reconstruct the shipment chronology',
    description:
      'Pull the load, its milestones, carrier messages, warehouse readiness and the customer promise into one case.',
    items: [
      {
        id: 'load-stop-appointment',
        title: 'Load, stop & appointment',
        description: 'Lane, scheduled pickup/delivery windows',
        icon: 'truck',
      },
      {
        id: 'tms-milestones-eta',
        title: 'TMS milestones & ETA',
        description: 'Recorded events and current ETA',
        icon: 'route',
      },
      {
        id: 'visibility-telematics',
        title: 'Visibility / telematics event',
        description: 'Tracking-network or ELD signal where available',
        icon: 'map-pin',
      },
      {
        id: 'carrier-message',
        title: 'Carrier / driver message',
        description: 'Email, call note or portal update',
        icon: 'headphones',
      },
      {
        id: 'bol-pod-condition',
        title: 'BOL / POD & condition evidence',
        description: 'Damage or temperature evidence if captured',
        icon: 'file',
      },
      {
        id: 'wms-readiness',
        title: 'WMS readiness / departure',
        description: 'Was the freight ready and shipped?',
        icon: 'warehouse',
      },
      {
        id: 'customer-promise',
        title: 'Customer promise & SLA',
        description: 'Committed date and account instructions',
        icon: 'shield',
      },
      {
        id: 'exception-history',
        title: 'Prior exception actions',
        description: 'Escalations and earlier recovery steps',
        icon: 'history',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From missing milestone to owned recovery',
    description:
      'The planner or logistics manager approves expedite, reschedule, hold, claim or a changed customer promise.',
    steps: [
      { id: 'trigger', title: 'Missing milestone or late ETA', icon: 'circle-alert', type: 'trigger' },
      { id: 'assemble', title: 'Assemble TMS, carrier & WMS context', icon: 'layers', type: 'action' },
      { id: 'gaps', title: 'Flag contradictory or missing proof', icon: 'search', type: 'action' },
      { id: 'request', title: 'Request carrier / driver evidence', icon: 'headphones', type: 'action' },
      { id: 'impact', title: 'Assess impact vs customer promise', icon: 'shield', type: 'decision' },
      { id: 'approve', title: 'Planner approves recovery', icon: 'user', type: 'approval' },
      { id: 'update', title: 'Update TMS / CRM & notify', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Close with evidence & decision', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Planners decide; the record and the customer are updated',
    description:
      'Work appears in the transport workspace or exception queue with the gap, recommended action and required authority.',
    people: [
      {
        id: 'transportation-planner',
        title: 'Transportation Planner',
        description: 'Approves expedite, reschedule or hold',
        icon: 'user',
      },
      {
        id: 'track-and-trace',
        title: 'Track & Trace Coordinator',
        description: 'Chases milestones and carrier proof',
        icon: 'headphones',
      },
      {
        id: 'logistics-manager',
        title: 'Logistics Manager',
        description: 'Owns customer-promise changes and claims',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'tms', title: 'TMS', description: 'Load, milestones, appointments', icon: 'route' },
      {
        id: 'visibility',
        title: 'Visibility / telematics',
        description: 'Tracking events and ETA',
        icon: 'map-pin',
      },
      { id: 'wms', title: 'WMS', description: 'Readiness and departure', icon: 'warehouse' },
      {
        id: 'email-teams',
        title: 'Email / Teams / CRM',
        description: 'Carrier and customer communication',
        icon: 'monitor',
      },
    ],
  },
}
