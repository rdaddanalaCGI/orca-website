'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

function NodeLabel({ children }: { children: string }) {
  return (
    <span className="text-[10px]/4 font-semibold tracking-[0.2em] text-olive-500 uppercase dark:text-orca-frost/70">
      {children}
    </span>
  )
}

/** A small object that travels down one connector segment once the visual is in view. */
function Connector({ delay, animate }: { delay: number; animate: boolean }) {
  return (
    <div className="relative mx-auto h-12 w-px bg-olive-950/15 dark:bg-white/15">
      <motion.span
        className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-orca-orange"
        initial={false}
        animate={animate ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] } : { top: '0%', opacity: 0 }}
        transition={animate ? { duration: 0.55, delay, times: [0, 0.15, 0.85, 1], ease: 'easeInOut' } : { duration: 0 }}
      />
    </div>
  )
}

/**
 * Small abstract operational visual for the /solutions hero: business process
 * material enters at the top, resolves through an agentic application and comes
 * out as an operational outcome. One-shot, motion-safe.
 */
export function HeroProcessVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduced = useReducedMotion() ?? false
  const animate = inView && !reduced
  const shown = !reduced ? inView : true

  return (
    <div ref={ref} aria-hidden="true" className="mx-auto flex w-full max-w-sm flex-col select-none">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.45 }}
        className="flex flex-col gap-2"
      >
        <NodeLabel>Business process</NodeLabel>
        <div className="flex flex-col gap-2 rounded-xl border border-olive-950/10 bg-orca-mist p-3 dark:border-white/10 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
          <div className="flex items-center gap-2.5 rounded-md border border-olive-950/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-olive-950">
            <span className="h-6 w-5 shrink-0 rounded-[3px] border border-olive-950/15 dark:border-white/15" />
            <span className="flex min-w-0 flex-col gap-1">
              <span className="h-1 w-24 rounded-full bg-olive-950/15 dark:bg-white/15" />
              <span className="h-1 w-16 rounded-full bg-olive-950/10 dark:bg-white/10" />
            </span>
            <span className="ml-auto text-[10px]/4 whitespace-nowrap text-olive-500 dark:text-orca-frost/70">
              supplier email
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-md border border-olive-950/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-olive-950">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border border-orca-teal-dark/40 text-[8px] font-semibold text-orca-teal-dark dark:border-orca-frost/40 dark:text-orca-frost">
              ERP
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="h-1 w-20 rounded-full bg-olive-950/15 dark:bg-white/15" />
              <span className="h-1 w-28 rounded-full bg-olive-950/10 dark:bg-white/10" />
            </span>
            <span className="ml-auto text-[10px]/4 whitespace-nowrap text-olive-500 dark:text-orca-frost/70">
              open order
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-md border border-orca-orange/30 bg-white px-2.5 py-2 dark:bg-olive-950">
            <span className="h-2 w-2 shrink-0 rotate-45 border border-orca-orange" />
            <span className="text-[11px]/4 font-medium text-olive-800 dark:text-orca-frost">
              Exception — promise date changed
            </span>
          </div>
        </div>
      </motion.div>

      <Connector delay={0.7} animate={animate} />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.45, delay: reduced ? 0 : 0.45 }}
        className="flex flex-col gap-2"
      >
        <NodeLabel>Agentic application</NodeLabel>
        <motion.div
          animate={shown ? { borderColor: 'rgba(255,72,0,0.4)' } : undefined}
          transition={{ duration: 0.4, delay: reduced ? 0 : 1.25 }}
          className="rounded-xl border border-olive-950/10 bg-white p-3 dark:bg-olive-950"
        >
          <div className="flex items-center gap-1.5">
            {['gather', 'decide', 'act'].map((step, i) => (
              <span key={step} className="flex items-center gap-1.5">
                {i > 0 && <span className="h-px w-2.5 bg-olive-950/20 dark:bg-white/20" />}
                <span className="rounded-md border border-olive-950/15 bg-orca-mist px-2 py-1 text-[10px]/4 font-medium text-olive-800 dark:border-white/15 dark:bg-orca-teal-dark/25 dark:text-orca-frost">
                  {step}
                </span>
              </span>
            ))}
            <span className="ml-auto rounded-full border border-orca-orange/40 px-2 py-0.5 text-[9px]/4 font-semibold tracking-wider text-orca-link uppercase dark:text-orca-orange">
              Orca
            </span>
          </div>
        </motion.div>
      </motion.div>

      <Connector delay={1.55} animate={animate} />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.45, delay: reduced ? 0 : 0.9 }}
        className="flex flex-col gap-2"
      >
        <NodeLabel>Operational outcome</NodeLabel>
        <div className="flex items-center gap-2.5 rounded-xl border border-olive-950/10 bg-white p-3 dark:border-white/10 dark:bg-olive-950">
          <motion.span
            initial={reduced ? false : { scale: 0 }}
            animate={shown ? { scale: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 380, damping: 22, delay: reduced ? 0 : 2.05 }}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orca-teal-dark"
          >
            <svg
              viewBox="0 0 10 10"
              className="h-2.5 w-2.5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M2 5.5 4.2 7.5 8 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
          <span className="flex min-w-0 flex-col gap-1">
            <span className="text-[11px]/4 font-medium text-olive-800 dark:text-orca-frost">Exception resolved</span>
            <span className="h-1 w-24 rounded-full bg-olive-950/10 dark:bg-white/10" />
          </span>
        </div>
      </motion.div>
    </div>
  )
}
