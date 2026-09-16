'use client'

import { Section } from '@/components/elements/section'
import { motion, useReducedMotion } from 'framer-motion'

const targets = [
  { value: '20–40%', label: 'Less manual effort' },
  { value: '15–30%', label: 'Faster cycle time' },
  { value: '25–50%', label: 'Fewer manual touches' },
]

const baselineItems = ['Manual touches', 'Cycle time', 'Exceptions', 'Throughput']
const executionItems = ['Orca workflow', 'Trace', 'Decisions', 'Approvals']
const measureItems = ['Manual touches', 'Cycle time', 'Exceptions', 'Throughput']

export function MeasuredValueSection() {
  const reduced = useReducedMotion() ?? false

  return (
    <Section
      id="measured-value"
      eyebrow="MEASURABLE VALUE"
      eyebrowVariant="brand"
      headline="Know what changed."
      subheadline="Baseline the workflow before Orca. Measure effort, cycle time, manual touches and throughput as it runs."
    >
      <motion.div
        className="overflow-hidden rounded-2xl bg-orca-mist ring-1 ring-olive-950/5 backdrop-blur-sm dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))] dark:ring-white/10"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <RoiModel />
          <TargetMetrics />
        </div>
        <MeasurementStrip />
      </motion.div>
    </Section>
  )
}

function RoiModel() {
  return (
    <div className="flex flex-col justify-between border-b border-olive-950/10 p-8 sm:p-10 lg:col-span-3 lg:border-r lg:border-b-0 lg:p-12 dark:border-white/10">
      <div>
        <p className="font-mono text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-orca-frost">
          A workflow has economics.
        </p>
        <div className="mt-8 flex flex-col gap-4 font-mono text-sm/6 text-olive-950 dark:text-white">
          <EquationLine value="25 people" />
          <Operator>×</Operator>
          <EquationLine value="30 min / day" />
          <Operator>×</Operator>
          <EquationLine value="250 working days" />
        </div>
      </div>

      <div className="mt-10">
        <div className="h-px w-full bg-olive-950/10 dark:bg-white/10" />
        <div className="mt-6 flex flex-col">
          <span className="font-mono text-sm/6 text-olive-950/50 dark:text-white/50">=</span>
          <span className="font-display text-5xl font-medium tracking-tight text-olive-950 sm:text-6xl lg:text-7xl dark:text-white">
            3,125
          </span>
          <span className="font-mono text-base/6 text-olive-700 dark:text-orca-frost">hours / year</span>
        </div>
      </div>

      <p className="mt-8 text-xs/5 text-olive-700/70 dark:text-orca-frost/70">
        Illustrative workflow model. Actual results depend on the workflow and baseline.
      </p>
    </div>
  )
}

function EquationLine({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-lg/7 font-medium">{value}</span>
    </div>
  )
}

function Operator({ children }: { children: string }) {
  return <span className="pl-2 text-olive-950/30 dark:text-white/30">{children}</span>
}

function TargetMetrics() {
  return (
    <div className="p-8 sm:p-10 lg:col-span-2 lg:p-12">
      <p className="font-mono text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-orca-frost">
        Initial workflow targets
      </p>
      <div className="mt-8 flex flex-col divide-y divide-olive-950/10 dark:divide-white/10">
        {targets.map((target) => (
          <div key={target.label} className="py-5 first:pt-0 last:pb-0">
            <div className="font-display text-3xl/10 font-medium tracking-tight text-olive-950 dark:text-white">
              {target.value}
            </div>
            <div className="mt-1 text-base/6 text-olive-700 dark:text-orca-frost">{target.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs/5 text-olive-700/70 dark:text-orca-frost/70">
        Targets established against the existing workflow baseline.
      </p>
    </div>
  )
}

function MeasurementStrip() {
  return (
    <div className="border-t border-olive-950/10 p-8 sm:p-10 lg:p-12 dark:border-white/10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <StageBlock title="BASELINE" items={baselineItems} />
        <ArrowSeparator />
        <StageBlock title="EXECUTION" items={executionItems} />
        <ArrowSeparator />
        <StageBlock title="MEASURE" items={measureItems} />
      </div>
      <p className="mt-8 max-w-2xl text-sm/7 text-olive-700 dark:text-orca-frost">
        <strong className="text-olive-950 dark:text-white">The Blueprint defines the work.</strong> Execution gives us
        the evidence to measure what changed.
      </p>
    </div>
  )
}

function StageBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-mono text-xs/4 font-semibold tracking-wider text-olive-950 uppercase dark:text-white">
        {title}
      </h4>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item} className="text-sm/6 text-olive-700 dark:text-orca-frost">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ArrowSeparator() {
  return (
    <div className="hidden items-center justify-center self-center text-orca-orange lg:flex">
      <span aria-hidden="true">→</span>
    </div>
  )
}
