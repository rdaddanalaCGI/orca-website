/**
 * Mock logistics & distribution content for the "Declare the Work" animation.
 * Positions are normalized (0..1) within each region and mapped to px at render
 * time; timing windows are fractions of the master cycle.
 */

import { WINDOWS } from './constants'
import { stagger, type TimeWindow } from './timeline'

/* ------------------------------------------------------------------ */
/* 01 — Context                                                        */
/* ------------------------------------------------------------------ */

export type EntityIcon = 'customer' | 'order' | 'product' | 'inventory' | 'shipment'

export type ContextEntity = {
  id: string
  label: string
  icon: EntityIcon
  x: number
  y: number
  seed: number
  window: TimeWindow
}

const contextOrder: Omit<ContextEntity, 'window'>[] = [
  { id: 'customer', label: 'Customer', icon: 'customer', x: 0.24, y: 0.14, seed: 1 },
  { id: 'order', label: 'Order', icon: 'order', x: 0.5, y: 0.47, seed: 2 },
  { id: 'product', label: 'Product', icon: 'product', x: 0.76, y: 0.14, seed: 3 },
  { id: 'inventory', label: 'Inventory', icon: 'inventory', x: 0.76, y: 0.82, seed: 4 },
  { id: 'shipment', label: 'Shipment', icon: 'shipment', x: 0.24, y: 0.82, seed: 5 },
]

export const contextEntities: ContextEntity[] = contextOrder.map((entity, index) => ({
  ...entity,
  window: stagger(WINDOWS.contextNodes, index, contextOrder.length),
}))

export type ContextRelation = {
  id: string
  source: string
  target: string
  sourceHandle: string
  targetHandle: string
  label: string
  window: TimeWindow
}

const relationOrder: Omit<ContextRelation, 'window'>[] = [
  {
    id: 'places',
    source: 'customer',
    target: 'order',
    sourceHandle: 's-bottom',
    targetHandle: 't-left',
    label: 'places',
  },
  {
    id: 'contains',
    source: 'order',
    target: 'product',
    sourceHandle: 's-right',
    targetHandle: 't-bottom',
    label: 'contains',
  },
  {
    id: 'stocked-as',
    source: 'product',
    target: 'inventory',
    sourceHandle: 's-bottom',
    targetHandle: 't-top',
    label: 'stocked as',
  },
  {
    id: 'fulfilled-by',
    source: 'order',
    target: 'shipment',
    sourceHandle: 's-left',
    targetHandle: 't-top',
    label: 'fulfilled by',
  },
]

export const contextRelations: ContextRelation[] = relationOrder.map((relation, index) => ({
  ...relation,
  window: stagger(WINDOWS.contextEdges, index, relationOrder.length),
}))

/* ------------------------------------------------------------------ */
/* 02 — Workflow                                                       */
/* ------------------------------------------------------------------ */

export type WorkflowKind = 'trigger' | 'action' | 'decision' | 'system' | 'human'

export type WorkflowStep = {
  id: string
  label: string
  kind: WorkflowKind
  x: number
  y: number
  seed: number
  window: TimeWindow
}

const stepOrder: Omit<WorkflowStep, 'window'>[] = [
  { id: 'order-received', label: 'Order received', kind: 'trigger', x: 0.5, y: 0.07, seed: 11 },
  { id: 'check-inventory', label: 'Check inventory', kind: 'action', x: 0.5, y: 0.27, seed: 12 },
  { id: 'inventory-available', label: 'Inventory available?', kind: 'decision', x: 0.5, y: 0.47, seed: 13 },
  { id: 'create-shipment', label: 'Create shipment', kind: 'system', x: 0.26, y: 0.68, seed: 14 },
  { id: 'review-exception', label: 'Review exception', kind: 'human', x: 0.74, y: 0.68, seed: 15 },
  { id: 'confirm-order', label: 'Confirm order', kind: 'action', x: 0.5, y: 0.89, seed: 16 },
]

export const workflowSteps: WorkflowStep[] = stepOrder.map((step, index) => ({
  ...step,
  window: stagger(WINDOWS.workflowNodes, index, stepOrder.length),
}))

export type WorkflowTransition = {
  id: string
  source: string
  target: string
  sourceHandle: string
  targetHandle: string
  branchLabel?: string
  tone?: 'human'
  window: TimeWindow
}

const transitionOrder: Omit<WorkflowTransition, 'window'>[] = [
  {
    id: 'received-check',
    source: 'order-received',
    target: 'check-inventory',
    sourceHandle: 's-bottom',
    targetHandle: 't-top',
  },
  {
    id: 'check-decision',
    source: 'check-inventory',
    target: 'inventory-available',
    sourceHandle: 's-bottom',
    targetHandle: 't-top',
  },
  {
    id: 'decision-ship',
    source: 'inventory-available',
    target: 'create-shipment',
    sourceHandle: 's-bottom',
    targetHandle: 't-top',
    branchLabel: 'yes',
  },
  {
    id: 'decision-review',
    source: 'inventory-available',
    target: 'review-exception',
    sourceHandle: 's-bottom',
    targetHandle: 't-top',
    branchLabel: 'no',
    tone: 'human',
  },
  {
    id: 'ship-confirm',
    source: 'create-shipment',
    target: 'confirm-order',
    sourceHandle: 's-bottom',
    targetHandle: 't-top',
  },
  {
    id: 'review-confirm',
    source: 'review-exception',
    target: 'confirm-order',
    sourceHandle: 's-bottom',
    targetHandle: 't-top',
    tone: 'human',
  },
]

export const workflowTransitions: WorkflowTransition[] = transitionOrder.map((transition, index) => ({
  ...transition,
  window: stagger(WINDOWS.workflowEdges, index, transitionOrder.length),
}))

/* ------------------------------------------------------------------ */
/* 03 — Interaction                                                    */
/* ------------------------------------------------------------------ */

export type SurfaceIcon = 'outlook' | 'teams' | 'browser'

export type InteractionSurface = {
  id: string
  label: string
  icon: SurfaceIcon
  action: string
  side: 'left' | 'right'
  /** Normalized y position of the attachment point on the execution spine. */
  y: number
  seed: number
  window: TimeWindow
  connectorWindow: TimeWindow
}

const surfaceOrder: Omit<InteractionSurface, 'window' | 'connectorWindow'>[] = [
  { id: 'outlook', label: 'Outlook', icon: 'outlook', action: 'Review exception', side: 'right', y: 0.24, seed: 21 },
  { id: 'teams', label: 'Teams', icon: 'teams', action: 'Approve', side: 'left', y: 0.5, seed: 22 },
  {
    id: 'browser',
    label: 'Browser',
    icon: 'browser',
    action: 'Provide input / Take over',
    side: 'right',
    y: 0.76,
    seed: 23,
  },
]

export const interactionSurfaces: InteractionSurface[] = surfaceOrder.map((surface, index) => ({
  ...surface,
  window: stagger(WINDOWS.interactionNodes, index, surfaceOrder.length),
  connectorWindow: stagger(WINDOWS.interactionConnectors, index, surfaceOrder.length),
}))

/* ------------------------------------------------------------------ */
/* Manifest                                                            */
/* ------------------------------------------------------------------ */

export type ManifestToken = { text: string; role: 'key' | 'value' | 'punct' }

export type ManifestLine = { tokens: ManifestToken[]; window: TimeWindow }

const key = (text: string): ManifestToken => ({ text, role: 'key' })
const value = (text: string): ManifestToken => ({ text, role: 'value' })
const punct = (text: string): ManifestToken => ({ text, role: 'punct' })

function block(window: TimeWindow, lines: ManifestToken[][]): ManifestLine[] {
  return lines.map((tokens, index) => ({ tokens, window: stagger(window, index, lines.length, 0.4) }))
}

export const manifestBlocks: { id: string; lines: ManifestLine[] }[] = [
  {
    id: 'context',
    lines: block(WINDOWS.manifestContext, [
      [key('context'), punct(':')],
      [punct('  '), key('entities'), punct(': ['), value('customer, order, product, inventory, shipment'), punct(']')],
      [
        punct('  '),
        key('relationships'),
        punct(': ['),
        value('places, contains, stocked_as, fulfilled_by'),
        punct(']'),
      ],
    ]),
  },
  {
    id: 'workflow',
    lines: block(WINDOWS.manifestWorkflow, [
      [key('workflow'), punct(':')],
      [punct('  '), key('trigger'), punct(': '), value('order_received')],
      [punct('  '), key('steps'), punct(': ['), value('check_inventory, create_shipment, confirm_order'), punct(']')],
      [punct('  '), key('exception'), punct(': '), value('human_review')],
    ]),
  },
  {
    id: 'interaction',
    lines: block(WINDOWS.manifestInteraction, [
      [key('interaction'), punct(':')],
      [punct('  '), key('review'), punct(': '), value('outlook')],
      [punct('  '), key('approval'), punct(': '), value('teams')],
      [punct('  '), key('workspace'), punct(': '), value('browser')],
    ]),
  },
]
