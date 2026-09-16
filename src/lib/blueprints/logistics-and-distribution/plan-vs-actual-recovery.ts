import type { ApplicationBlueprint } from '../types'

export const planVsActualRecoveryBlueprint: ApplicationBlueprint = {
  label: 'Plan-vs-Actual Transportation Recovery Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'See the plan, the actual and what broke',
    description:
      'Combine the optimizer plan with route status, driver and vehicle availability, order readiness and customer appointments.',
    items: [
      {
        id: 'optimizer-plan',
        title: 'Original TMS / optimizer plan',
        description: 'Routes, stops and sequence',
        icon: 'route',
      },
      {
        id: 'route-status',
        title: 'Current route status & telematics',
        description: 'Where each vehicle actually is',
        icon: 'map-pin',
      },
      {
        id: 'driver-vehicle',
        title: 'Driver / vehicle / capacity',
        description: 'Who and what is available now',
        icon: 'truck',
      },
      {
        id: 'order-readiness',
        title: 'Warehouse order readiness',
        description: 'Which loads are staged and which are late',
        icon: 'warehouse',
      },
      {
        id: 'appointments',
        title: 'Customer appointment & priority',
        description: 'Windows that must not be missed',
        icon: 'shield',
      },
      {
        id: 'constraints',
        title: 'Service / cost constraints',
        description: 'Overtime, miles, expedite limits',
        icon: 'receipt',
      },
      {
        id: 'tender-carrier',
        title: 'Failed tender / carrier availability',
        description: 'Outside capacity where relevant',
        icon: 'network',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From broken route to approved replan',
    description:
      'The optimizer proposes feasible alternatives; the dispatcher or transportation manager decides the service, spend and workforce trade-off.',
    steps: [
      { id: 'trigger', title: 'Stop or load becomes infeasible', icon: 'circle-alert', type: 'trigger' },
      { id: 'gather', title: 'Gather plan & actual state', icon: 'layers', type: 'action' },
      { id: 'constraint', title: 'Identify violated constraint & impact', icon: 'search', type: 'action' },
      { id: 'alternatives', title: 'Ask optimizer for alternatives', icon: 'route', type: 'action' },
      { id: 'context', title: 'Add warehouse & customer context', icon: 'warehouse', type: 'action' },
      { id: 'options', title: 'Prepare replan / expedite / defer', icon: 'file', type: 'decision' },
      { id: 'approve', title: 'Dispatcher approves trade-off', icon: 'user', type: 'approval' },
      { id: 'execute', title: 'Update TMS / dispatch & notify', icon: 'settings', type: 'system' },
      { id: 'close', title: 'Record cause, decision & outcome', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Plan vs actual with the affected stops and orders',
    description: 'Dispatchers see the broken constraint, each alternative and the customer impact of choosing it.',
    people: [
      {
        id: 'dispatcher',
        title: 'Dispatcher',
        description: 'Approves reassignment and sequence changes',
        icon: 'user',
      },
      {
        id: 'transportation-planner',
        title: 'Transportation Planner',
        description: 'Evaluates replan options',
        icon: 'route',
      },
      {
        id: 'transportation-manager',
        title: 'Transportation / Fleet Manager',
        description: 'Owns expedite, overtime and service trade-offs',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'tms-dispatch', title: 'TMS / dispatch', description: 'Plan of record and assignments', icon: 'route' },
      {
        id: 'optimizer',
        title: 'Route optimizer',
        description: 'Feasible alternatives',
        icon: 'network',
      },
      { id: 'telematics', title: 'Telematics', description: 'Vehicle position and progress', icon: 'map-pin' },
      { id: 'wms', title: 'WMS', description: 'Order readiness', icon: 'warehouse' },
    ],
  },
}
