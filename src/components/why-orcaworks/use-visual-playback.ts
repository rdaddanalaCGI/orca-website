'use client'

import { useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

/**
 * Shared playback driver for the Understand Orcaworks card visuals: a one-time
 * sequence that starts when the canvas scrolls into view. With reduced motion
 * the visual renders straight into its final frame — `initial` starts at the
 * 'show' state so nothing animates.
 */
export function useVisualPlayback() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const play = reduced || inView

  return {
    ref,
    reduced,
    play,
    /** Spread onto the orchestrating motion element that owns hidden/show variants. */
    orchestration: {
      initial: reduced ? ('show' as const) : ('hidden' as const),
      animate: play ? ('show' as const) : ('hidden' as const),
    },
  }
}
