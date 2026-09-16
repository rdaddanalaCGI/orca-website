import type { ApplicationBlueprint } from '../types'

export const subrogationRecoveryOrchestrationBlueprint: ApplicationBlueprint = {
  label: 'Subrogation & Recovery Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Keep the recovery case together across carriers and parties',
    description: 'Liability evidence, payments, the demand package and every reply—or silence—in one persistent case.',
    items: [
      {
        id: 'recovery-opportunity',
        title: 'Recovery opportunity',
        description: 'A paid claim with a potentially responsible third party',
        icon: 'circle-alert',
      },
      {
        id: 'liability-evidence',
        title: 'Liability evidence',
        description: 'Reports, photos and contracts establishing responsibility',
        icon: 'file',
      },
      {
        id: 'payment-record',
        title: 'Claim & payment record',
        description: 'What was paid, to whom and under which coverage',
        icon: 'receipt',
      },
      {
        id: 'demand-package',
        title: 'Demand package',
        description: 'The evidence-backed demand sent to the other party',
        icon: 'clipboard',
      },
      {
        id: 'party-responses',
        title: 'Party & carrier responses',
        description: 'Replies, disputes, offers—and silence',
        icon: 'headphones',
      },
      {
        id: 'arbitration-status',
        title: 'Arbitration & network status',
        description: 'Forum rules, filings and deadlines',
        icon: 'route',
      },
      {
        id: 'follow-up-history',
        title: 'Follow-up history',
        description: 'Every chase, promise and unanswered demand',
        icon: 'history',
      },
      {
        id: 'authority-thresholds',
        title: 'Authority & thresholds',
        description: 'When negotiation, compromise or arbitration needs sign-off',
        icon: 'shield',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From identified opportunity to collected recovery',
    description:
      'The recovery specialist keeps the consequential calls—pursue, negotiate, compromise, arbitrate or close.',
    steps: [
      { id: 'trigger', title: 'Payment or review flags recovery potential', icon: 'circle-alert', type: 'trigger' },
      { id: 'assemble', title: 'Assemble liability & payment evidence', icon: 'layers', type: 'action' },
      { id: 'prepare', title: 'Prepare the demand package', icon: 'clipboard', type: 'action' },
      { id: 'send', title: 'Send approved demand to responsible party', icon: 'headphones', type: 'action' },
      { id: 'track', title: 'Track response; chase unanswered demands', icon: 'search', type: 'action' },
      { id: 'evaluate', title: 'Evaluate reply against the evidence', icon: 'route', type: 'decision' },
      { id: 'decide', title: 'Specialist decides negotiate / arbitrate / close', icon: 'user', type: 'approval' },
      { id: 'writeback', title: 'Write recovery to the claim record', icon: 'database', type: 'system' },
      { id: 'close', title: 'Recovery collected or deliberately closed', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Recovery specialists decide; nothing waits silently',
    description:
      'The recovery queue shows each demand’s evidence, the counterparty’s latest response and how long it has gone unanswered.',
    people: [
      {
        id: 'recovery-specialist',
        title: 'Subrogation / Recovery Specialist',
        description: 'Owns the recovery case and the negotiation',
        icon: 'user',
      },
      {
        id: 'recovery-manager',
        title: 'Recovery Manager',
        description: 'Approves arbitration and compromise decisions',
        icon: 'shield',
      },
      {
        id: 'claims-handler',
        title: 'Claims Handler',
        description: 'Provides claim context and payment history',
        icon: 'clipboard',
      },
      {
        id: 'responsible-party',
        title: 'Responsible Party / Carrier',
        description: 'Demand recipient and negotiation counterparty',
        icon: 'headphones',
      },
    ],
    systems: [
      {
        id: 'claims-core',
        title: 'Claims system',
        description: 'Payments, subrogation fields and claim state',
        icon: 'database',
      },
      {
        id: 'recovery-networks',
        title: 'Recovery / arbitration networks',
        description: 'Transaction rails, filings and forum deadlines',
        icon: 'network',
      },
      {
        id: 'dms-email',
        title: 'DMS & email',
        description: 'Liability evidence and party correspondence',
        icon: 'file',
      },
      {
        id: 'finance',
        title: 'Payment / finance systems',
        description: 'Recovery receipt and write-back',
        icon: 'receipt',
      },
    ],
  },
}
