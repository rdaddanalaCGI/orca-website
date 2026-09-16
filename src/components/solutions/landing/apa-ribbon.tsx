'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/** Stacked records/documents. */
function ContextGlyph() {
  return (
    <span className="relative block h-9 w-8">
      <span className="absolute top-0 left-1 h-7 w-6 rounded-[3px] border border-olive-950/20 bg-white dark:border-white/20 dark:bg-olive-950" />
      <span className="absolute top-1 left-0 h-7 w-6 rounded-[3px] border border-olive-950/20 bg-white dark:border-white/20 dark:bg-olive-900" />
      <span className="absolute top-2 left-2 h-7 w-6 rounded-[3px] border border-olive-950/25 bg-white dark:border-white/25 dark:bg-olive-950">
        <span className="absolute top-1.5 left-1 h-0.5 w-3.5 rounded-full bg-olive-950/20 dark:bg-white/20" />
        <span className="absolute top-3 left-1 h-0.5 w-2.5 rounded-full bg-olive-950/15 dark:bg-white/15" />
      </span>
    </span>
  )
}

/** Small connected workflow. */
function WorkflowGlyph() {
  return (
    <span className="flex items-center gap-1">
      <span className="h-3 w-3 rounded-[3px] border border-olive-950/25 bg-white dark:border-white/25 dark:bg-olive-950" />
      <span className="h-px w-2.5 bg-olive-950/25 dark:bg-white/25" />
      <span className="h-3 w-3 rounded-[3px] border border-orca-orange/60 bg-white dark:bg-olive-950" />
      <span className="h-px w-2.5 bg-olive-950/25 dark:bg-white/25" />
      <span className="h-3 w-3 rounded-full border border-olive-950/25 bg-white dark:border-white/25 dark:bg-olive-950" />
    </span>
  )
}

/** System/API action blocks — teal marks controlled system elements. */
function ActGlyph() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-[3px] border border-orca-teal-dark/50 text-[7px] font-bold text-orca-teal-dark dark:border-orca-frost/50 dark:text-orca-frost">
        S1
      </span>
      <span className="relative h-px w-3 bg-orca-orange">
        <span className="absolute top-1/2 right-0 h-1 w-1 -translate-y-1/2 rotate-45 border-t border-r border-orca-orange" />
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded-[3px] border border-orca-teal-dark/50 text-[7px] font-bold text-orca-teal-dark dark:border-orca-frost/50 dark:text-orca-frost">
        S2
      </span>
    </span>
  )
}

/** Approval/avatar treatment. */
function InvolveGlyph() {
  return (
    <span className="relative block h-8 w-8">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-olive-950/25 bg-white text-[8px] font-semibold text-olive-700 dark:border-white/25 dark:bg-olive-950 dark:text-orca-frost">
        AK
      </span>
      <span className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-orca-orange">
        <svg viewBox="0 0 8 8" className="h-1.5 w-1.5 text-white" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M1.5 4.2 3.2 6 6.5 2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  )
}

/** Checked/completed case. */
function ResolveGlyph() {
  return (
    <span className="relative block h-8 w-9 rounded-[3px] border border-olive-950/20 bg-white dark:border-white/20 dark:bg-olive-950">
      <span className="absolute top-1.5 left-1.5 h-0.5 w-4 rounded-full bg-olive-950/20 dark:bg-white/20" />
      <span className="absolute top-3 left-1.5 h-0.5 w-2.5 rounded-full bg-olive-950/15 dark:bg-white/15" />
      <span className="absolute right-1 bottom-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orca-teal-dark">
        <svg viewBox="0 0 8 8" className="h-1.5 w-1.5 text-white" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M1.5 4.2 3.2 6 6.5 2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  )
}

const stages: { id: string; label: string; sub: string; glyph: ReactNode }[] = [
  { id: 'understand', label: 'Understand', sub: 'Context', glyph: <ContextGlyph /> },
  { id: 'coordinate', label: 'Coordinate', sub: 'Workflow', glyph: <WorkflowGlyph /> },
  { id: 'act', label: 'Act', sub: 'Across systems', glyph: <ActGlyph /> },
  { id: 'involve', label: 'Involve', sub: 'People where needed', glyph: <InvolveGlyph /> },
  { id: 'resolve', label: 'Resolve', sub: 'Outcome', glyph: <ResolveGlyph /> },
]

function StageText({ label, sub, align }: { label: string; sub: string; align?: 'center' }) {
  return (
    <span className={align === 'center' ? 'flex flex-col items-center gap-0.5' : 'flex flex-col gap-0.5'}>
      <span className="text-xs/4 font-semibold tracking-[0.14em] text-olive-950 uppercase dark:text-white">
        {label}
      </span>
      <span className="text-xs/5 text-olive-600 dark:text-orca-frost">{sub}</span>
    </span>
  )
}

/**
 * One horizontal process ribbon on desktop — context, workflow, systems, people
 * and outcome joined by a single line — collapsing to a left-railed vertical
 * sequence on small screens. Animates once when it enters the viewport.
 */
export function ApaRibbon() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion() ?? false
  const shown = !reduced ? inView : true

  return (
    <div ref={ref} aria-hidden="true" className="select-none">
      {/* Desktop: horizontal ribbon */}
      <div className="relative hidden md:block">
        <div className="absolute top-9 right-[10%] left-[10%] h-px bg-olive-950/15 dark:bg-white/15" />
        <motion.div
          className="absolute top-9 right-[10%] left-[10%] h-px origin-left bg-orca-orange"
          initial={reduced ? false : { scaleX: 0 }}
          animate={shown ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3 }}
        />
        <ol className="relative grid grid-cols-5" role="list">
          {stages.map((stage, i) => (
            <li key={stage.id}>
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={shown ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.35 }}
              >
                <span className="relative flex h-18 items-center justify-center bg-orca-page px-3 dark:bg-olive-950">
                  <span className="relative flex h-10 items-center justify-center rounded-lg bg-orca-mist px-3 ring-1 ring-olive-950/5 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))] dark:ring-white/10">
                    {stage.glyph}
                  </span>
                </span>
                <StageText label={stage.label} sub={stage.sub} align="center" />
              </motion.div>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: vertical rail */}
      <ol
        className="relative flex flex-col gap-6 border-l border-olive-950/15 pl-8 md:hidden dark:border-white/15"
        role="list"
      >
        {stages.map((stage, i) => (
          <li key={stage.id} className="relative">
            <motion.div
              className="flex items-center gap-4"
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={shown ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.18 }}
            >
              <span className="absolute top-1/2 -left-8 h-px w-4 bg-olive-950/15 dark:bg-white/15" />
              <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-orca-mist ring-1 ring-olive-950/5 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))] dark:ring-white/10">
                {stage.glyph}
              </span>
              <StageText label={stage.label} sub={stage.sub} />
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  )
}
