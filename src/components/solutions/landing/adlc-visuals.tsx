'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

import { BlueprintBackground } from '@/components/declared-work/blueprint-background'

import type { AdlcStageVisualType } from './adlc-stages'

const mistPanel = 'bg-orca-mist dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]'
const card = 'rounded-md border border-olive-950/10 bg-white dark:border-white/10 dark:bg-olive-950'
const hairline = 'rounded-full bg-olive-950/15 dark:bg-white/15'
const microLabel = 'text-[9px]/4 font-semibold tracking-[0.18em] text-olive-500 uppercase dark:text-orca-frost/70'

function useCanvasReveal(amount = 0.35) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  const reduced = useReducedMotion() ?? false
  return { ref, shown: reduced ? true : inView, reduced }
}

type VisualProps = { shown: boolean; reduced: boolean }

/* ---------------------------------- DEFINE --------------------------------- */

const defineFragments: {
  className: string
  from: { x: number; y: number; rotate: number }
  node: ReactNode
}[] = [
  {
    className: 'top-[8%] left-[6%] w-40',
    from: { x: -26, y: -14, rotate: -5 },
    node: (
      <div className={`${card} p-2.5`}>
        <span className={microLabel}>Process notes</span>
        <div className="mt-1.5 flex flex-col gap-1">
          <span className={`h-1 w-full ${hairline}`} />
          <span className={`h-1 w-4/5 ${hairline}`} />
          <span className={`h-1 w-3/5 ${hairline}`} />
        </div>
      </div>
    ),
  },
  {
    className: 'top-[6%] right-[8%]',
    from: { x: 24, y: -18, rotate: 4 },
    node: (
      <div className="flex gap-1.5">
        {['ERP', 'WMS', 'TMS'].map((s) => (
          <span
            key={s}
            className="rounded-sm border border-orca-teal-dark/40 bg-white px-1.5 py-1 text-[8px]/3 font-bold text-orca-teal-dark dark:border-orca-frost/40 dark:bg-olive-950 dark:text-orca-frost"
          >
            {s}
          </span>
        ))}
      </div>
    ),
  },
  {
    className: 'top-[38%] left-[12%]',
    from: { x: -30, y: 10, rotate: 3 },
    node: (
      <div className={`${card} flex items-center gap-2 px-2.5 py-2`}>
        <span className="h-5 w-4 rounded-xs border border-olive-950/20 dark:border-white/20" />
        <span className="text-[10px]/4 text-olive-700 dark:text-orca-frost">supplier-email.pdf</span>
      </div>
    ),
  },
  {
    className: 'top-[44%] right-[10%]',
    from: { x: 28, y: 16, rotate: -4 },
    node: (
      <div className={`${card} flex items-center gap-2 border-orca-orange/30 px-2.5 py-2`}>
        <span className="h-1.5 w-1.5 rounded-full bg-orca-orange" />
        <span className="text-[10px]/4 font-medium text-olive-800 dark:text-orca-frost">Exception — date changed</span>
      </div>
    ),
  },
  {
    className: 'bottom-[10%] left-[8%]',
    from: { x: -22, y: 20, rotate: -3 },
    node: (
      <div className={`${card} flex items-center gap-2 px-2.5 py-2`}>
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-olive-950/25 text-[7px] font-semibold text-olive-600 dark:border-white/25 dark:text-orca-frost">
          AK
        </span>
        <span className="text-[10px]/4 text-olive-700 dark:text-orca-frost">buyer · planner</span>
      </div>
    ),
  },
  {
    className: 'right-[14%] bottom-[12%]',
    from: { x: 20, y: 24, rotate: 5 },
    node: (
      <div className="rounded-md border border-orca-teal-dark/40 bg-white px-2.5 py-2 dark:border-orca-frost/40 dark:bg-olive-950">
        <span className={microLabel}>Outcome</span>
        <div className="mt-0.5 text-[10px]/4 font-medium text-olive-800 dark:text-orca-frost">clean order accepted</div>
      </div>
    ),
  },
]

function DefineVisual({ shown, reduced }: VisualProps) {
  return (
    <>
      {defineFragments.map((fragment, i) => (
        <motion.div
          key={i}
          className={`absolute ${fragment.className}`}
          initial={reduced ? false : { ...fragment.from, opacity: 0 }}
          animate={shown ? { x: 0, y: 0, rotate: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {fragment.node}
        </motion.div>
      ))}
    </>
  )
}

/* --------------------------------- DECLARE --------------------------------- */

const declareColumns: { title: string; rows: string[] }[] = [
  { title: 'Entities', rows: ['Order', 'SKU', 'Supplier'] },
  { title: 'Actions', rows: ['verify', 'update', 'notify'] },
  { title: 'Controls', rows: ['approval_required', 'threshold', 'human_review'] },
]

function DeclareVisual({ shown, reduced }: VisualProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        className={`${card} w-full max-w-md p-4`}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <span className={microLabel}>Operating blueprint</span>
          <span className="h-1.5 w-1.5 rounded-full bg-orca-orange" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {declareColumns.map((column, c) => (
            <div key={column.title} className="flex flex-col gap-1.5">
              <span className={microLabel}>{column.title}</span>
              {column.rows.map((row, r) => (
                <motion.span
                  key={row}
                  className="rounded-sm border border-olive-950/10 px-1.5 py-1 text-[9px]/4 font-medium text-olive-800 dark:border-white/10 dark:text-orca-frost"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={shown ? { opacity: 1 } : undefined}
                  transition={{ duration: 0.3, delay: 0.3 + (c * 3 + r) * 0.06 }}
                >
                  {row}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-olive-950/10 pt-3 dark:border-white/10">
          <span className={microLabel}>Workflow</span>
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            {['request', 'evaluate', 'decide', 'act', 'close'].map((step, i) => (
              <motion.span
                key={step}
                className="flex items-center gap-1"
                initial={reduced ? false : { opacity: 0, x: -4 }}
                animate={shown ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.3, delay: 1 + i * 0.09 }}
              >
                {i > 0 && <span className="h-px w-2 bg-olive-950/25 dark:bg-white/25" />}
                <span className="rounded-sm bg-orca-mist px-1.5 py-1 text-[9px]/4 font-medium text-olive-800 dark:bg-orca-teal-dark/25 dark:text-orca-frost">
                  {step}
                </span>
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ---------------------------------- BUILD ---------------------------------- */

function BuildVisual({ shown, reduced }: VisualProps) {
  const pieces = (delay: number) => ({
    initial: reduced ? (false as const) : { opacity: 0, y: 8 },
    animate: shown ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.4, delay },
  })
  return (
    <div className="flex h-full items-center justify-center gap-3 sm:gap-4">
      {/* Ghost of the declared blueprint */}
      <motion.div
        className="hidden w-24 shrink-0 flex-col gap-1.5 rounded-md border border-dashed border-olive-950/20 p-2.5 sm:flex dark:border-white/20"
        initial={reduced ? false : { opacity: 0 }}
        animate={shown ? { opacity: 0.55 } : undefined}
        transition={{ duration: 0.6 }}
      >
        <span className={microLabel}>Blueprint</span>
        <span className={`h-1 w-4/5 ${hairline}`} />
        <span className={`h-1 w-3/5 ${hairline}`} />
        <span className={`h-1 w-4/6 ${hairline}`} />
        <span className={`h-1 w-2/3 ${hairline}`} />
      </motion.div>
      <motion.span
        className="hidden text-olive-400 sm:block dark:text-orca-frost/60"
        initial={reduced ? false : { opacity: 0 }}
        animate={shown ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        →
      </motion.span>
      {/* The working application */}
      <div className={`${card} w-full max-w-sm p-3.5`}>
        <motion.div {...pieces(0.3)} className="flex items-center justify-between">
          <span className={microLabel}>Workspace · shipment exceptions</span>
          <span className="rounded-full border border-orca-orange/40 px-1.5 py-0.5 text-[8px]/3 font-semibold tracking-wider text-orca-link uppercase dark:text-orca-orange">
            Orca
          </span>
        </motion.div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <motion.div {...pieces(0.55)} className="flex flex-col gap-1">
            <span className={microLabel}>Context</span>
            {['Order', 'Carrier', 'Customer'].map((item) => (
              <span
                key={item}
                className="rounded-sm border border-olive-950/10 px-1.5 py-1 text-[9px]/4 text-olive-700 dark:border-white/10 dark:text-orca-frost"
              >
                {item}
              </span>
            ))}
          </motion.div>
          <div className="flex flex-col gap-1">
            <motion.span {...pieces(0.7)} className={microLabel}>
              Workflow
            </motion.span>
            {['assemble', 'decide', 'act'].map((step, i) => (
              <motion.span key={step} {...pieces(0.8 + i * 0.1)} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-orca-orange" />
                <span className="text-[9px]/4 font-medium text-olive-800 dark:text-orca-frost">{step}</span>
              </motion.span>
            ))}
          </div>
        </div>
        <motion.div {...pieces(1.15)} className="mt-3 border-t border-olive-950/10 pt-2.5 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={microLabel}>Activities</span>
            {['verify', 'update', 'notify'].map((tool) => (
              <span
                key={tool}
                className="rounded-sm border border-orca-teal-dark/40 px-1.5 py-0.5 text-[8px]/3 font-semibold text-orca-teal-dark dark:border-orca-frost/40 dark:text-orca-frost"
              >
                {tool}
              </span>
            ))}
            <span className="ml-auto text-[9px]/4 text-olive-500 dark:text-orca-frost/70">
              sample record · ORD-1187
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* --------------------------------- VALIDATE -------------------------------- */

const validateChecks = ['Context assembled', 'Workflow executed', 'Human approval', 'Expected result']

function ValidateVisual({ shown, reduced }: VisualProps) {
  return (
    <div className="flex h-full items-center justify-center gap-3 sm:gap-5">
      <motion.div
        className={`${card} w-32 shrink-0 p-2.5 sm:w-36`}
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4 }}
      >
        <span className={microLabel}>Sample case</span>
        <div className="mt-1 text-[10px]/4 font-semibold text-olive-900 dark:text-white">CASE-4471 · short pick</div>
        <div className="mt-2 flex flex-col gap-1">
          <span className={`h-1 w-full ${hairline}`} />
          <span className={`h-1 w-3/4 ${hairline}`} />
        </div>
        <span className="mt-2 inline-block rounded-sm border border-dashed border-olive-950/25 px-1.5 py-0.5 text-[8px]/3 font-semibold tracking-wider text-olive-500 uppercase dark:border-white/25 dark:text-orca-frost/70">
          representative data
        </span>
      </motion.div>
      <div className="flex w-full max-w-56 flex-col gap-2">
        {validateChecks.map((check, i) => (
          <motion.div
            key={check}
            className={`${card} flex items-center gap-2 px-2.5 py-2`}
            initial={reduced ? false : { opacity: 0, x: 10 }}
            animate={shown ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.35, delay: 0.35 + i * 0.35 }}
          >
            <motion.span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orca-teal-dark"
              initial={reduced ? false : { scale: 0 }}
              animate={shown ? { scale: 1 } : undefined}
              transition={{ type: 'spring', stiffness: 400, damping: 24, delay: 0.55 + i * 0.35 }}
            >
              <svg viewBox="0 0 8 8" className="h-2 w-2 text-white" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path d="M1.5 4.2 3.2 6 6.5 2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            <span className="text-[10px]/4 font-medium text-olive-800 dark:text-orca-frost">{check}</span>
          </motion.div>
        ))}
        <motion.div
          className="mt-1 text-[9px]/4 font-semibold tracking-wider text-orca-teal-dark uppercase dark:text-orca-frost"
          initial={reduced ? false : { opacity: 0 }}
          animate={shown ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.55 + validateChecks.length * 0.35 }}
        >
          4/4 checks — ready to connect
        </motion.div>
      </div>
    </div>
  )
}

/* ---------------------------------- DEPLOY --------------------------------- */

const deploySystems = [
  { name: 'ERP', x: 14, y: 16 },
  { name: 'CRM', x: 50, y: 9 },
  { name: 'Docs', x: 86, y: 16 },
  { name: 'Email', x: 14, y: 84 },
  { name: 'Teams', x: 50, y: 91 },
  { name: 'API', x: 86, y: 84 },
]

function DeployVisual({ shown, reduced }: VisualProps) {
  return (
    <>
      <svg
        className="absolute inset-0 h-full w-full text-orca-teal-dark/50 dark:text-orca-frost/40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {deploySystems.map((system, i) => (
          <motion.path
            key={system.name}
            d={`M50 50 L${system.x} ${system.y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.4}
            vectorEffect="non-scaling-stroke"
            initial={reduced ? false : { pathLength: 0 }}
            animate={shown ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
          />
        ))}
      </svg>
      <motion.div
        className={`${card} absolute top-1/2 left-1/2 w-36 -translate-x-1/2 -translate-y-1/2 p-3`}
        initial={reduced ? false : { opacity: 0, scale: 0.92 }}
        animate={shown ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.45 }}
      >
        <span className={microLabel}>Agentic application</span>
        <div className="mt-1.5 flex items-center gap-1">
          {['gather', 'decide', 'act'].map((step, i) => (
            <span key={step} className="flex items-center gap-1">
              {i > 0 && <span className="h-px w-1.5 bg-olive-950/25 dark:bg-white/25" />}
              <span className="rounded-[3px] bg-orca-mist px-1 py-0.5 text-[8px]/3 font-medium text-olive-800 dark:bg-orca-teal-dark/25 dark:text-orca-frost">
                {step}
              </span>
            </span>
          ))}
        </div>
      </motion.div>
      {deploySystems.map((system, i) => (
        <motion.span
          key={system.name}
          className={`${card} absolute -translate-x-1/2 -translate-y-1/2 border-orca-teal-dark/40 px-2 py-1.5 text-[9px]/4 font-bold text-orca-teal-dark dark:border-orca-frost/40 dark:text-orca-frost`}
          style={{ left: `${system.x}%`, top: `${system.y}%` }}
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={shown ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.35, delay: 0.5 + i * 0.12 }}
        >
          {system.name}
        </motion.span>
      ))}
    </>
  )
}

/* --------------------------------- IMPROVE --------------------------------- */

const improveMetrics = [
  { label: 'Execution history', value: 'Tracked' },
  { label: 'Cycle time', value: 'Trend ↓' },
  { label: 'Human intervention', value: 'Monitored' },
  { label: 'Exceptions', value: 'Pattern detected' },
  { label: 'Cost / usage', value: 'Metered' },
]

const improveRuns = [
  { id: 'run · shipment exception', note: 'resolved', state: 'automatic' },
  { id: 'run · record change', note: 'human review', state: 'approved' },
  { id: 'run · order update', note: 'resolved', state: 'automatic' },
]

function ImproveVisual({ shown, reduced }: VisualProps) {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex flex-wrap gap-1.5">
        {improveMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className={`${card} px-2.5 py-1.5`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.35, delay: i * 0.09 }}
          >
            <span className={microLabel}>{metric.label}</span>
            <div className="text-xs/5 font-semibold text-olive-900 tabular-nums dark:text-white">{metric.value}</div>
          </motion.div>
        ))}
      </div>
      <div className={`${card} flex flex-col divide-y divide-olive-950/5 dark:divide-white/5`}>
        {improveRuns.map((run, i) => (
          <motion.div
            key={run.id}
            className="flex items-center gap-2 px-2.5 py-1.5"
            initial={reduced ? false : { opacity: 0 }}
            animate={shown ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3, delay: 0.45 + i * 0.12 }}
          >
            <span className="text-[9px]/4 font-medium text-olive-800 dark:text-orca-frost">{run.id}</span>
            <span
              className={
                run.note === 'human review'
                  ? 'text-[9px]/4 font-semibold text-orca-link dark:text-orca-orange'
                  : 'text-[9px]/4 text-orca-teal-dark dark:text-orca-frost'
              }
            >
              {run.note}
            </span>
            <span className="ml-auto text-[9px]/4 text-olive-500 dark:text-orca-frost/70">{run.state}</span>
          </motion.div>
        ))}
        <motion.div
          className="flex items-center gap-2 px-2.5 py-1.5"
          initial={reduced ? false : { opacity: 0 }}
          animate={shown ? { opacity: 1 } : undefined}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <span className="h-1.5 w-1.5 rotate-45 border border-orca-orange" />
          <span className="text-[9px]/4 text-olive-700 dark:text-orca-frost">
            pattern — accessorial disputes on carrier invoices
          </span>
        </motion.div>
      </div>
      {/* Evidence loops back into the next deliberate definition. */}
      <div className="relative flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-orca-orange"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path d="M20 12a8 8 0 1 1-2.34-5.66" strokeLinecap="round" />
          <path d="M20 4v4h-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <motion.span
          className={`${card} px-2.5 py-1.5 text-[9px]/4 font-medium text-olive-800 dark:text-orca-frost`}
          initial={reduced ? false : { opacity: 0, x: 8 }}
          animate={shown ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.35, delay: 1.1 }}
        >
          v1.4 — redefined, validated, released
        </motion.span>
      </div>
    </div>
  )
}

/* ---------------------------------- SWITCH --------------------------------- */

const visuals: Record<AdlcStageVisualType, (props: VisualProps) => ReactNode> = {
  define: DefineVisual,
  declare: DeclareVisual,
  build: BuildVisual,
  validate: ValidateVisual,
  deploy: DeployVisual,
  improve: ImproveVisual,
}

/** Decorative canvas for one ADLC stage; animates once when scrolled into view. */
export function AdlcStageVisual({ type, ident }: { type: AdlcStageVisualType; ident: string }) {
  const { ref, shown, reduced } = useCanvasReveal()
  const Visual = visuals[type]
  return (
    <div ref={ref}>
      <div
        aria-hidden="true"
        className={`relative overflow-hidden rounded-xl border border-olive-950/10 select-none dark:border-white/10 ${mistPanel}`}
      >
        <BlueprintBackground ident={ident} />
        <div className="relative h-72 p-4 sm:h-80 sm:p-6">
          <Visual shown={shown} reduced={reduced} />
        </div>
      </div>
    </div>
  )
}
