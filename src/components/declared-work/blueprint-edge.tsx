'use client'

import { getSmoothStepPath, getStraightPath, type Edge, type EdgeProps } from '@xyflow/react'
import { clsx } from 'clsx/lite'
import { motion, useTransform } from 'framer-motion'
import type { TimeWindow } from './timeline'
import { useWindowProgress } from './use-declaration-timeline'

export type BlueprintEdgeData = {
  window: TimeWindow
  guideWindow: TimeWindow
  variant: 'straight' | 'step'
  /** Tiny relationship label (context graph). */
  label?: string
  /** Decision branch label (workflow graph). */
  branchLabel?: string
  tone?: 'human'
}

export type BlueprintFlowEdge = Edge<BlueprintEdgeData, 'blueprint'>

export function BlueprintEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<BlueprintFlowEdge>) {
  const window: TimeWindow = data?.window ?? [0, 1]
  const guideWindow: TimeWindow = data?.guideWindow ?? [0, 0.01]
  const draw = useWindowProgress(window)
  const guide = useWindowProgress(guideWindow)

  const [path, labelX, labelY] =
    data?.variant === 'step'
      ? getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius: 6 })
      : getStraightPath({ sourceX, sourceY, targetX, targetY })

  // Dashed construction line: appears with the region guides, fades as the edge draws.
  const dashOpacity = useTransform(() => guide.get() * (1 - draw.get()) * 0.3)
  const solidOpacity = useTransform(draw, [0, 0.05], [0, 1])
  const arrowOpacity = useTransform(draw, [0.85, 1], [0, 1])
  const labelOpacity = useTransform(draw, [0.7, 1], [0, 1])

  return (
    <g
      className={clsx(
        data?.tone === 'human'
          ? 'text-orca-teal-dark/60 dark:text-orca-mist/40'
          : 'text-olive-950/35 dark:text-white/35',
      )}
    >
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="2 4"
        style={{ opacity: dashOpacity }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        style={{ pathLength: draw, opacity: solidOpacity }}
      />
      {data?.variant === 'step' && (
        <motion.path
          d={`M ${targetX - 3} ${targetY - 5} L ${targetX} ${targetY - 1} L ${targetX + 3} ${targetY - 5}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          style={{ opacity: arrowOpacity }}
        />
      )}
      {data?.label && (
        <motion.text
          x={labelX}
          y={labelY - 4}
          textAnchor="middle"
          style={{ opacity: labelOpacity }}
          className="fill-olive-950/40 font-mono text-[7px] tracking-[0.12em] uppercase dark:fill-white/40"
        >
          {data.label}
        </motion.text>
      )}
      {data?.branchLabel && (
        <motion.text
          x={labelX}
          y={labelY - 4}
          textAnchor="middle"
          style={{ opacity: labelOpacity }}
          className="fill-olive-950/50 font-mono text-[8px] tracking-[0.14em] uppercase dark:fill-white/50"
        >
          {data.branchLabel}
        </motion.text>
      )}
    </g>
  )
}
