'use client'

import { motion, useTransform } from 'framer-motion'
import type { TimeWindow } from './timeline'
import { useWindowProgress } from './use-declaration-timeline'

/**
 * A thin declaration progress rail for one pillar: an almost invisible track,
 * a brighter completed section and a small luminous point that travels across
 * as that pillar's declaration happens.
 */
export function DeclarationRail({ window }: { window: TimeWindow }) {
  const t = useWindowProgress(window)
  const scaleX = t
  const markerLeft = useTransform(t, (v) => `${v * 100}%`)
  const markerOpacity = useTransform(t, [0, 0.02, 0.98, 1], [0, 1, 1, 0.5])

  return (
    <div className="relative h-px w-full bg-olive-950/10 dark:bg-white/10">
      <motion.div style={{ scaleX }} className="absolute inset-0 origin-left bg-orca-orange/50" />
      <motion.div
        style={{ left: markerLeft, opacity: markerOpacity }}
        className="absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orca-orange shadow-[0_0_8px_2px_color-mix(in_oklab,var(--color-orca-orange)_40%,transparent)]"
      />
    </div>
  )
}
