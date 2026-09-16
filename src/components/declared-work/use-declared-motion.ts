'use client'

import { useMotionTemplate, useTime, useTransform, type MotionValue } from 'framer-motion'
import { DRIFT_AMPLITUDE, PRE_BLUR, PRE_OFFSET_MAX, PRE_OFFSET_MIN } from './constants'
import type { TimeWindow } from './timeline'
import { useEasedWindowProgress, useWindowProgress } from './use-declaration-timeline'

const GOLDEN_ANGLE = 2.399963

/** Deterministic pre-declaration displacement for a given seed. */
export function preOffset(seed: number): { x: number; y: number } {
  const angle = seed * GOLDEN_ANGLE
  const radius = PRE_OFFSET_MIN + ((seed * 37) % (PRE_OFFSET_MAX - PRE_OFFSET_MIN))
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
}

export type DeclaredMotion = {
  x: MotionValue<number>
  y: MotionValue<number>
  filter: MotionValue<string>
  /** Loose pre-declaration outline: dashed, fades out as the item settles. */
  dashedOpacity: MotionValue<number>
  /** Declared surface: fades in as the item settles. */
  solidOpacity: MotionValue<number>
  /** Registration-mark flash as the item snaps into position. */
  flash: MotionValue<number>
  raw: MotionValue<number>
  eased: MotionValue<number>
}

/**
 * Magnetic-settling motion for a declared item: a deterministic offset with a
 * barely-perceptible drift that eases precisely onto the blueprint coordinate
 * as the item's window of the master timeline elapses.
 */
export function useDeclaredMotion(window: TimeWindow, seed: number): DeclaredMotion {
  const raw = useWindowProgress(window)
  const eased = useEasedWindowProgress(window)
  const time = useTime()
  const offset = preOffset(seed)

  const x = useTransform(() => {
    const loose = 1 - eased.get()
    return loose * (offset.x + Math.sin(time.get() / 1100 + seed * 1.7) * DRIFT_AMPLITUDE)
  })
  const y = useTransform(() => {
    const loose = 1 - eased.get()
    return loose * (offset.y + Math.cos(time.get() / 1400 + seed * 2.3) * DRIFT_AMPLITUDE)
  })

  const blur = useTransform(eased, (v) => (1 - v) * PRE_BLUR)
  const filter = useMotionTemplate`blur(${blur}px)`
  const dashedOpacity = useTransform(eased, [0.15, 0.85], [1, 0])
  const solidOpacity = useTransform(eased, [0.35, 1], [0, 1])
  const flash = useTransform(raw, [0.72, 0.9, 1], [0, 0.9, 0.3])

  return { x, y, filter, dashedOpacity, solidOpacity, flash, raw, eased }
}
