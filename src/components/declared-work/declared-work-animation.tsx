'use client'

import '@xyflow/react/dist/base.css'

import { motion, useInView, useReducedMotion, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { BlueprintBackground } from './blueprint-background'
import { ContextDeclaration } from './context-declaration'
import { InteractionDeclaration } from './interaction-declaration'
import { Manifest } from './manifest'
import { TimelineProvider, useTimeline } from './use-declaration-timeline'
import { WorkflowDeclaration } from './workflow-declaration'

export type DeclaredPillar = {
  id: 'context' | 'workflow' | 'interaction'
  ident: string
  heading: string
  copy: string
}

/** Fades the decorative canvas during the between-cycle crossfade. */
function Dimmed({ className, children }: { className?: string; children: ReactNode }) {
  const { dim } = useTimeline()
  const opacity = useTransform(dim, [0, 1], [1, 0])
  return (
    <motion.div aria-hidden="true" style={{ opacity }} className={className}>
      {children}
    </motion.div>
  )
}

const regions: Record<DeclaredPillar['id'], ReactNode> = {
  context: <ContextDeclaration />,
  workflow: <WorkflowDeclaration />,
  interaction: <InteractionDeclaration />,
}

/**
 * The Orcaworks "Declare the Work" homepage animation: three distinct pillars —
 * context, workflow and interaction — each with its own blueprint canvas,
 * declaration rail and manifest slice, all driven by one master timeline.
 */
export function DeclaredWorkAnimation({ pillars }: { pillars: DeclaredPillar[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  // Keep the threshold low: on stacked mobile layouts the root is several
  // viewports tall, so a large `amount` would never trigger on small screens.
  const inView = useInView(rootRef, { amount: 0.1 })
  const reduced = useReducedMotion() ?? false

  return (
    <div ref={rootRef}>
      <TimelineProvider active={inView} reduced={reduced}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="grid gap-6 lg:row-span-2 lg:grid-rows-subgrid">
              <div>
                <h3 className="font-display text-xl/8 text-olive-950 sm:text-2xl/9 dark:text-white">
                  {pillar.heading}
                </h3>
                <p className="mt-2 text-sm/7 text-olive-700 dark:text-orca-frost">{pillar.copy}</p>
              </div>

              <Dimmed className="pointer-events-none h-full select-none">
                <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-olive-950/10 dark:border-white/10">
                  <BlueprintBackground ident={pillar.ident} />
                  <div className="relative min-h-64 flex-1 lg:min-h-96">{regions[pillar.id]}</div>
                  <div className="relative m-3 mt-0">
                    <Manifest blockId={pillar.id} />
                  </div>
                </div>
              </Dimmed>
            </div>
          ))}
        </div>
      </TimelineProvider>
    </div>
  )
}
