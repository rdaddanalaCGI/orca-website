/**
 * Every tunable for the "Declare the Work" animation lives here.
 */

/** Duration of one full declaration cycle in ms. */
export const CYCLE_DURATION = 11500
/** How long the fully declared frame holds before the loop restarts, in ms. */
export const CYCLE_HOLD = 2400
/** Cycles to play before the animation settles on the declared frame. */
export const LOOP_COUNT = 3
/** Crossfade between cycles in ms (fade out declared frame, fade in pre-state). */
export const LOOP_CROSSFADE = 600
/** Clamp per-frame delta so a backgrounded tab does not jump the timeline. */
export const MAX_FRAME_DELTA = 100

/** Master easing — precise, calm, no bounce. */
export const SNAP_EASE = [0.16, 1, 0.3, 1] as const

/** Barely-perceptible pre-declaration float, in px. */
export const DRIFT_AMPLITUDE = 3
/** Initial displacement range from the declared position, in px. */
export const PRE_OFFSET_MIN = 8
export const PRE_OFFSET_MAX = 20
/** Pre-declaration softness, in px of blur. */
export const PRE_BLUR = 2

/** Ghost-layer blur for the manifest crystallization, in px. */
export const MANIFEST_BLUR = 7
/** Ghost-layer opacity for the manifest crystallization. */
export const MANIFEST_GHOST_OPACITY = 0.2

/** Blueprint grid cell size in px. */
export const GRID_SIZE = 32

export const NODE_SIZE_CONTEXT = { width: 116, height: 40 } as const
export const NODE_SIZE_WORKFLOW = { width: 148, height: 36 } as const

/**
 * Normalized master-timeline windows (fractions of one cycle).
 * The sequence: context → workflow → interaction → complete hold.
 */
export const WINDOWS = {
  contextGuides: [0.0, 0.04],
  contextNodes: [0.04, 0.26],
  contextEdges: [0.14, 0.32],
  manifestContext: [0.24, 0.36],
  workflowGuides: [0.34, 0.38],
  workflowNodes: [0.38, 0.56],
  workflowEdges: [0.44, 0.62],
  manifestWorkflow: [0.54, 0.66],
  spine: [0.64, 0.68],
  interactionNodes: [0.68, 0.8],
  interactionConnectors: [0.7, 0.84],
  manifestInteraction: [0.78, 0.87],
  complete: [0.87, 1.0],
} as const satisfies Record<string, readonly [number, number]>
