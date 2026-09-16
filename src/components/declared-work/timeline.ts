/**
 * Pure timing math for the "Declare the Work" animation.
 *
 * Everything on the canvas — XYFlow nodes and edges, the interaction spine,
 * the progress rail and the manifest crystallization — is derived from a single
 * normalized progress value (0 → 1 per cycle) via these helpers. Keeping this
 * module free of React and DOM APIs lets it run under the node-env unit tests.
 */

export type TimeWindow = readonly [number, number]

export type DeclarationPhase = 'idle' | 'context' | 'workflow' | 'interaction' | 'complete'

export const PHASE_BOUNDARIES = {
  workflow: 0.34,
  interaction: 0.64,
  complete: 0.87,
} as const

/** Master-timeline span of each declaration pillar (drives the per-pillar rails). */
export const PHASE_SPANS: Record<'context' | 'workflow' | 'interaction', TimeWindow> = {
  context: [0, PHASE_BOUNDARIES.workflow],
  workflow: [PHASE_BOUNDARIES.workflow, PHASE_BOUNDARIES.interaction],
  interaction: [PHASE_BOUNDARIES.interaction, PHASE_BOUNDARIES.complete],
}

/** Remap master progress into a clamped 0..1 value for a sub-window. */
export function segment(progress: number, [start, end]: TimeWindow): number {
  if (end <= start) return progress >= end ? 1 : 0
  return Math.min(1, Math.max(0, (progress - start) / (end - start)))
}

/**
 * Split a window into overlapping per-item slots so items resolve as a
 * stagger rather than all at once. `overlap` is the fraction of a slot shared
 * with the next item (0 = strictly sequential, 1 = simultaneous).
 */
export function stagger(window: TimeWindow, index: number, count: number, overlap = 0.55): TimeWindow {
  if (count <= 1) return window
  const [start, end] = window
  const span = end - start
  const slot = span / (1 + (count - 1) * (1 - overlap))
  const step = slot * (1 - overlap)
  const slotStart = start + index * step
  return [slotStart, slotStart + slot]
}

export function phaseAt(progress: number): DeclarationPhase {
  if (progress <= 0) return 'idle'
  if (progress < PHASE_BOUNDARIES.workflow) return 'context'
  if (progress < PHASE_BOUNDARIES.interaction) return 'workflow'
  if (progress < PHASE_BOUNDARIES.complete) return 'interaction'
  return 'complete'
}

export type CycleOptions = {
  /** Duration of one declaration cycle in ms (excluding hold and crossfade). */
  cycleDuration: number
  /** How long the fully declared frame holds before the loop crossfade, in ms. */
  hold: number
  /** Number of cycles to play before settling on the declared frame. */
  loopCount: number
  /** Crossfade duration between cycles in ms. */
  crossfade: number
}

export type CycleState = {
  /** Normalized progress of the current cycle, 0..1. */
  progress: number
  /** Zero-based index of the current cycle. */
  cycle: number
  /** True once all cycles have played; the declared frame holds forever. */
  settled: boolean
  /**
   * Crossfade dimming between cycles: rises 0 → 1 while the declared frame
   * fades out, falls 1 → 0 as the reset pre-declaration state fades back in.
   */
  dim: number
}

/**
 * Loop/settle model: each cycle plays for `cycleDuration`, holds the fully
 * declared frame for `hold`, then a `crossfade` fades the declared frame out,
 * resets progress at the midpoint and fades the pre-declaration state back in.
 * The final cycle has no crossfade — the animation settles on the declared frame.
 */
export function cycleState(elapsedMs: number, { cycleDuration, hold, loopCount, crossfade }: CycleOptions): CycleState {
  const period = cycleDuration + hold + crossfade
  const settleTime = Math.max(0, loopCount - 1) * period + cycleDuration
  if (elapsedMs >= settleTime) {
    return { progress: 1, cycle: Math.max(0, loopCount - 1), settled: true, dim: 0 }
  }
  const cycle = Math.floor(elapsedMs / period)
  const local = elapsedMs - cycle * period
  if (local <= cycleDuration) {
    return { progress: local / cycleDuration, cycle, settled: false, dim: 0 }
  }
  if (local <= cycleDuration + hold) {
    return { progress: 1, cycle, settled: false, dim: 0 }
  }
  const fade = (local - cycleDuration - hold) / crossfade
  return fade < 0.5
    ? { progress: 1, cycle, settled: false, dim: fade * 2 }
    : { progress: 0, cycle, settled: false, dim: (1 - fade) * 2 }
}
