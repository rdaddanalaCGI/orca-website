'use client'

import { cubicBezier, useAnimationFrame, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import { CYCLE_DURATION, CYCLE_HOLD, LOOP_COUNT, LOOP_CROSSFADE, MAX_FRAME_DELTA, SNAP_EASE } from './constants'
import { cycleState, segment, type TimeWindow } from './timeline'

export const snapEase = cubicBezier(...SNAP_EASE)

type Timeline = {
  /** Master normalized progress of the current cycle, 0..1. */
  progress: MotionValue<number>
  /** Loop-crossfade dimming, 0..1 (see `cycleState`). */
  dim: MotionValue<number>
  /** True when prefers-reduced-motion — the declared frame renders statically. */
  reduced: boolean
}

const TimelineContext = createContext<Timeline | null>(null)

export function TimelineProvider({
  active,
  reduced,
  children,
}: {
  active: boolean
  reduced: boolean
  children: ReactNode
}) {
  const progress = useMotionValue(reduced ? 1 : 0)
  const dim = useMotionValue(0)
  const elapsed = useRef(0)
  const settled = useRef(false)

  useEffect(() => {
    if (reduced) {
      progress.set(1)
      dim.set(0)
      settled.current = true
    }
  }, [reduced, progress, dim])

  useAnimationFrame((_, delta) => {
    if (reduced || settled.current || !active) return
    elapsed.current += Math.min(delta, MAX_FRAME_DELTA)
    const state = cycleState(elapsed.current, {
      cycleDuration: CYCLE_DURATION,
      hold: CYCLE_HOLD,
      loopCount: LOOP_COUNT,
      crossfade: LOOP_CROSSFADE,
    })
    progress.set(state.progress)
    dim.set(state.dim)
    if (state.settled) settled.current = true
  })

  return <TimelineContext.Provider value={{ progress, dim, reduced }}>{children}</TimelineContext.Provider>
}

export function useTimeline(): Timeline {
  const timeline = useContext(TimelineContext)
  if (!timeline) throw new Error('useTimeline must be used inside a TimelineProvider')
  return timeline
}

/** Raw clamped 0..1 progress of a master-timeline window. */
export function useWindowProgress(window: TimeWindow): MotionValue<number> {
  const { progress } = useTimeline()
  return useTransform(progress, (p) => segment(p, window))
}

/** Eased 0..1 progress of a window, using the master snap easing. */
export function useEasedWindowProgress(window: TimeWindow): MotionValue<number> {
  const raw = useWindowProgress(window)
  return useTransform(raw, snapEase)
}
