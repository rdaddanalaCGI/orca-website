'use client'

import { motion, type Variants } from 'framer-motion'
import { useVisualPlayback } from './use-visual-playback'
import { MetaLabel, ObjectChip } from './visual-frame'

const MANIFEST = [
  { key: 'context', value: 'shipment · carrier · customer' },
  { key: 'workflow', value: 'detect · investigate · decide' },
  { key: 'decision', value: 'planner approval' },
  { key: 'interaction', value: 'teams' },
] as const

const DERIVED = [
  { label: 'Context', items: ['Shipment', 'Carrier', 'Customer'] },
  { label: 'Execution', items: ['Detect', 'Investigate', 'Decide'] },
  { label: 'Interaction', items: ['Planner', 'Teams', 'Approval'] },
] as const

const EASE = [0.16, 1, 0.3, 1] as const

const manifestLine: Variants = {
  hidden: { opacity: 0, filter: 'blur(5px)' },
  show: (i: number) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: { delay: 0.15 + i * 0.09, duration: 0.5, ease: EASE },
  }),
}

const derivedRow: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.85 + i * 0.14, duration: 0.45, ease: EASE },
  }),
}

const connector: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay, duration: 0.4, ease: 'easeOut' },
  }),
}

const junction: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.3, ease: EASE },
  }),
}

// Derived rows are equal thirds of the canvas height, so the spine branches
// sit at the row centers: 1/6, 1/2 and 5/6 of a normalized 100-unit viewBox.
const ROW_CENTERS = [100 / 6, 50, 500 / 6] as const

/**
 * One operating blueprint — a small manifest — deriving the context, execution
 * and interaction surfaces of the application through a single drawn spine.
 */
export function OperatingBlueprintVisual() {
  const { ref, orchestration } = useVisualPlayback()

  return (
    <motion.div
      ref={ref}
      {...orchestration}
      className="flex h-full flex-col justify-center gap-2.5 p-3.5 lg:flex-row lg:items-stretch lg:gap-0 lg:p-4"
    >
      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }}
        className="w-full shrink-0 self-center rounded-md border border-olive-950/10 bg-white/75 backdrop-blur-[1px] lg:w-[46%] dark:border-white/10 dark:bg-white/6"
      >
        <div className="flex items-center gap-1.5 border-b border-olive-950/10 px-2.5 py-1.5 dark:border-white/10">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-orca-orange/70" />
          <span className="font-mono text-[9px] tracking-[0.08em] text-olive-950/55 dark:text-white/55">
            shipment_exception
          </span>
        </div>
        <div className="flex flex-col gap-1 px-2.5 py-2 font-mono text-[9px]/4">
          {MANIFEST.map((line, i) => (
            <motion.div key={line.key} variants={manifestLine} custom={i} className="flex gap-2 whitespace-nowrap">
              <span className="w-14 shrink-0 text-olive-950/40 dark:text-white/40">{line.key}</span>
              <span className="text-olive-950/85 dark:text-white/85">{line.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div aria-hidden="true" className="mx-auto h-2.5 w-px shrink-0 bg-olive-950/20 lg:hidden dark:bg-white/20" />

      <svg
        viewBox="0 0 40 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="hidden w-9 shrink-0 self-stretch text-olive-950/25 lg:block dark:text-white/20"
      >
        <motion.path variants={connector} custom={0.95} d="M0 50H20" vectorEffect="non-scaling-stroke" />
        <motion.path
          variants={connector}
          custom={1.05}
          d={`M20 ${ROW_CENTERS[0]}V${ROW_CENTERS[2]}`}
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          variants={connector}
          custom={1.15}
          d={`M20 ${ROW_CENTERS[0]}H40M20 ${ROW_CENTERS[1]}H40M20 ${ROW_CENTERS[2]}H40`}
          vectorEffect="non-scaling-stroke"
        />
        {ROW_CENTERS.map((y, i) => (
          <motion.circle
            key={y}
            variants={junction}
            custom={1.2 + i * 0.06}
            cx="20"
            cy={y}
            r="2"
            fill="currentColor"
            stroke="none"
          />
        ))}
        <motion.circle
          variants={junction}
          custom={1.1}
          cx="0"
          cy="50"
          r="2"
          fill="var(--color-orca-orange)"
          stroke="none"
        />
      </svg>

      <div className="flex flex-col gap-2 lg:h-full lg:flex-1 lg:gap-0">
        {DERIVED.map((row, i) => (
          <motion.div key={row.label} variants={derivedRow} custom={i} className="flex items-center gap-2 lg:flex-1">
            <MetaLabel className="w-16 shrink-0">{row.label}</MetaLabel>
            <div className="flex flex-wrap gap-1">
              {row.items.map((item) => (
                <ObjectChip key={item}>{item}</ObjectChip>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
