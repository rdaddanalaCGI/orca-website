import type { ComponentProps } from 'react'
import type { EntityIcon, SurfaceIcon, WorkflowKind } from './data'

type GlyphProps = ComponentProps<'svg'>

function Glyph({ children, ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

function CustomerGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3.5 13.5c.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4" />
    </Glyph>
  )
}

function OrderGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <rect x="3.5" y="2.5" width="9" height="11" rx="1" />
      <path d="M6 6h4M6 8.5h4M6 11h2.5" />
    </Glyph>
  )
}

function ProductGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M8.6 2.5H13a.5.5 0 0 1 .5.5v4.4a1 1 0 0 1-.3.7l-5.9 5.9a1 1 0 0 1-1.4 0L2.5 10.6a1 1 0 0 1 0-1.4l5.4-5.4a1 1 0 0 1 .7-.3Z" />
      <circle cx="11" cy="5" r="0.9" />
    </Glyph>
  )
}

function InventoryGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <rect x="3" y="3" width="10" height="4.25" rx="0.75" />
      <rect x="3" y="8.75" width="10" height="4.25" rx="0.75" />
      <path d="M6.5 5.1h3M6.5 10.9h3" />
    </Glyph>
  )
}

function ShipmentGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M1.5 4.5h8v6h-8zM9.5 6.5h3l2 2.2v1.8h-5" />
      <circle cx="4.5" cy="12" r="1.4" />
      <circle cx="11.5" cy="12" r="1.4" />
    </Glyph>
  )
}

const entityGlyphs: Record<EntityIcon, (props: GlyphProps) => React.ReactElement> = {
  customer: CustomerGlyph,
  order: OrderGlyph,
  product: ProductGlyph,
  inventory: InventoryGlyph,
  shipment: ShipmentGlyph,
}

export function EntityGlyph({ icon, ...props }: { icon: EntityIcon } & GlyphProps) {
  const Component = entityGlyphs[icon]
  return <Component {...props} />
}

function TriggerGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M8.8 2.5 4.5 9h3l-.3 4.5L11.5 7h-3z" />
    </Glyph>
  )
}

function ActionGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
    </Glyph>
  )
}

function DecisionGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" />
    </Glyph>
  )
}

function SystemGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 2.75v2M8 11.25v2M2.75 8h2M11.25 8h2M4.3 4.3l1.4 1.4M10.3 10.3l1.4 1.4M11.7 4.3l-1.4 1.4M5.7 10.3l-1.4 1.4" />
    </Glyph>
  )
}

function HumanGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <circle cx="6.5" cy="5.5" r="2.25" />
      <path d="M2.5 13.5c.5-2.4 2.1-3.75 4-3.75s3.5 1.35 4 3.75" />
      <path d="M10.5 6.5 12 8l2.5-2.75" />
    </Glyph>
  )
}

const workflowGlyphs: Record<WorkflowKind, (props: GlyphProps) => React.ReactElement> = {
  trigger: TriggerGlyph,
  action: ActionGlyph,
  decision: DecisionGlyph,
  system: SystemGlyph,
  human: HumanGlyph,
}

export function WorkflowGlyph({ kind, ...props }: { kind: WorkflowKind } & GlyphProps) {
  const Component = workflowGlyphs[kind]
  return <Component {...props} />
}

function OutlookGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <rect x="2.5" y="4" width="11" height="8" rx="1" />
      <path d="m3 4.75 5 4 5-4" />
    </Glyph>
  )
}

function TeamsGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <circle cx="5.75" cy="5.75" r="2" />
      <circle cx="11" cy="6.5" r="1.5" />
      <path d="M2.5 13c.45-2.2 1.8-3.4 3.25-3.4S8.55 10.8 9 13" />
      <path d="M10 9.9c1.7 0 3 1 3.5 3.1" />
    </Glyph>
  )
}

function BrowserGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <rect x="2.5" y="3" width="11" height="10" rx="1" />
      <path d="M2.5 6h11M4.5 4.5h.01M6.25 4.5h.01" />
    </Glyph>
  )
}

const surfaceGlyphs: Record<SurfaceIcon, (props: GlyphProps) => React.ReactElement> = {
  outlook: OutlookGlyph,
  teams: TeamsGlyph,
  browser: BrowserGlyph,
}

export function SurfaceGlyph({ icon, ...props }: { icon: SurfaceIcon } & GlyphProps) {
  const Component = surfaceGlyphs[icon]
  return <Component {...props} />
}

export function AgentGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" />
      <circle cx="8" cy="8" r="1.25" />
    </Glyph>
  )
}
