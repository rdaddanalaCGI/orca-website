'use client'

import { motion, type Variants } from 'framer-motion'
import { Fragment } from 'react'
import { useVisualPlayback } from './use-visual-playback'

const STEPS = [
  { n: '01', label: 'Discovery', accent: false },
  { n: '02', label: 'Blueprint', accent: true },
  { n: '03', label: 'Application', accent: false },
] as const

const EASE = [0.16, 1, 0.3, 1] as const

const stepIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.25, duration: 0.45, ease: EASE },
  }),
}

const connectorIn: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: { delay: 0.35 + i * 0.25, duration: 0.4, ease: 'easeOut' },
  }),
}

function FlowConnector({ index, play, reduced }: { index: number; play: boolean; reduced: boolean }) {
  return (
    <motion.div
      variants={connectorIn}
      custom={index}
      aria-hidden="true"
      className="relative h-4 min-w-5 flex-1 origin-left"
    >
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-olive-950/15 dark:bg-white/15" />
      <svg
        className="absolute inset-x-0 top-1/2 h-2 w-full -translate-y-1/2 overflow-visible"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.line
          x1="0"
          y1="4"
          x2="100"
          y2="4"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 5"
          vectorEffect="non-scaling-stroke"
          className="text-olive-950/40 dark:text-white/35"
          animate={play && !reduced ? { strokeDashoffset: [0, -16] } : { strokeDashoffset: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
      <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rotate-45 border-t border-r border-olive-950/40 dark:border-white/35" />
    </motion.div>
  )
}

/**
 * Why delivery is faster: discovery flows straight into one blueprint and out
 * as a working application — a single continuous path, no re-documenting.
 */
export function FasterDeliveryVisual() {
  const { ref, reduced, play, orchestration } = useVisualPlayback()

  return (
    <motion.div
      ref={ref}
      {...orchestration}
      className="flex h-full items-center justify-center gap-1.5 p-4 sm:gap-2.5 lg:gap-3"
    >
      {STEPS.map((step, i) => (
        <Fragment key={step.label}>
          <motion.div variants={stepIn} custom={i} className="flex shrink-0 flex-col items-center gap-1.5">
            <span
              className={`font-mono text-[8px] tracking-[0.22em] ${
                step.accent ? 'text-orca-orange' : 'text-olive-400 dark:text-white/35'
              }`}
            >
              {step.n}
            </span>
            <span
              className={`rounded-lg px-3.5 py-2 text-[11px]/4 font-medium shadow-sm ring-1 sm:px-4 ${
                step.accent
                  ? 'bg-white text-orca-link ring-orca-orange/35 dark:bg-white/10 dark:text-orca-orange dark:ring-orca-orange/50'
                  : 'bg-white text-olive-900 ring-olive-950/10 dark:bg-white/10 dark:text-white dark:ring-white/15'
              }`}
            >
              {step.label}
            </span>
          </motion.div>
          {i < STEPS.length - 1 && <FlowConnector index={i} play={play} reduced={reduced} />}
        </Fragment>
      ))}
    </motion.div>
  )
}
