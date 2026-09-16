'use client'

import { clsx } from 'clsx/lite'
import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import { WINDOWS } from './constants'
import { interactionSurfaces, type InteractionSurface } from './data'
import { AgentGlyph, SurfaceGlyph } from './icons'
import { DeclaredNodeShell } from './nodes'
import { useEasedWindowProgress, useWindowProgress } from './use-declaration-timeline'
import { useRegionSize, type RegionSize } from './use-region-size'

const CHIP = { width: 104, height: 32 }
const SPINE_TOP = 0.1
const SPINE_BOTTOM = 0.92
const CHIP_INSET = 0.03

/** 03 — human interaction surfaces plug into the execution spine. */
export function InteractionDeclaration() {
  const [ref, size] = useRegionSize()
  return (
    <div ref={ref} className="relative h-full w-full">
      {size && <InteractionCanvas size={size} />}
    </div>
  )
}

function InteractionCanvas({ size }: { size: RegionSize }) {
  const spineX = size.width / 2
  const spineDraw = useEasedWindowProgress(WINDOWS.spine)
  const agentOpacity = useTransform(spineDraw, [0.6, 1], [0, 1])

  return (
    <>
      <svg
        className="absolute inset-0"
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width} ${size.height}`}
        aria-hidden="true"
      >
        <motion.path
          d={`M ${spineX} ${SPINE_TOP * size.height} L ${spineX} ${SPINE_BOTTOM * size.height}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="text-olive-950/35 dark:text-white/35"
          style={{ pathLength: spineDraw }}
        />
        {interactionSurfaces.map((surface) => (
          <Connector key={surface.id} surface={surface} size={size} spineX={spineX} />
        ))}
      </svg>

      {/* Agent mark on the execution spine. */}
      <motion.div
        style={{ opacity: agentOpacity, left: spineX, top: SPINE_TOP * size.height }}
        className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-olive-950/15 bg-white/70 backdrop-blur-[2px] dark:border-white/15 dark:bg-white/5"
      >
        <AgentGlyph className="h-3.5 w-3.5 text-orca-orange/80" />
      </motion.div>

      {interactionSurfaces.map((surface) => (
        <SurfaceChip key={surface.id} surface={surface} size={size} />
      ))}
      {interactionSurfaces.map((surface) => (
        <ActionLabel key={surface.id} surface={surface} size={size} />
      ))}
    </>
  )
}

function chipEdgeX(surface: InteractionSurface, size: RegionSize): number {
  const inset = CHIP_INSET * size.width
  return surface.side === 'left' ? inset + CHIP.width : size.width - inset - CHIP.width
}

function Connector({ surface, size, spineX }: { surface: InteractionSurface; size: RegionSize; spineX: number }) {
  const t = useEasedWindowProgress(surface.connectorWindow)
  const y = surface.y * size.height
  const startX = chipEdgeX(surface, size)
  const pointScale = useTransform(t, [0.7, 1], [0, 1])
  const pointOpacity = useTransform(t, [0.7, 1], [0, 1])
  const transform = useMotionTemplate`scale(${pointScale})`

  return (
    <g className="text-olive-950/35 dark:text-white/35">
      <motion.path
        d={`M ${startX} ${y} L ${spineX} ${y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        style={{ pathLength: t }}
      />
      <motion.g style={{ opacity: pointOpacity, transform, transformOrigin: `${spineX}px ${y}px` }}>
        <circle cx={spineX} cy={y} r={6} className="fill-orca-orange/15" />
        <circle cx={spineX} cy={y} r={2.5} className="fill-orca-orange" />
      </motion.g>
    </g>
  )
}

function SurfaceChip({ surface, size }: { surface: InteractionSurface; size: RegionSize }) {
  const inset = CHIP_INSET * size.width
  return (
    <div
      className="absolute -translate-y-1/2"
      style={{
        top: surface.y * size.height,
        ...(surface.side === 'left' ? { left: inset } : { right: inset }),
      }}
    >
      <DeclaredNodeShell
        window={surface.window}
        guideWindow={WINDOWS.spine}
        seed={surface.seed}
        width={CHIP.width}
        height={CHIP.height}
      >
        <div className="flex items-center gap-2 px-3">
          <SurfaceGlyph
            icon={surface.icon}
            className="h-3.5 w-3.5 shrink-0 text-orca-teal-dark dark:text-orca-mist/70"
          />
          <span className="text-[10.5px] font-medium tracking-wide text-olive-950 dark:text-white">
            {surface.label}
          </span>
        </div>
      </DeclaredNodeShell>
    </div>
  )
}

function ActionLabel({ surface, size }: { surface: InteractionSurface; size: RegionSize }) {
  const t = useWindowProgress(surface.connectorWindow)
  const opacity = useTransform(t, [0.75, 1], [0, 1])
  const blur = useTransform(t, [0.75, 1], [3, 0])
  const filter = useMotionTemplate`blur(${blur}px)`
  const y = useTransform(t, [0.75, 1], [2, 0])

  return (
    <motion.div
      style={{
        opacity,
        filter,
        y,
        top: surface.y * size.height,
        ...(surface.side === 'left' ? { left: 'calc(50% + 14px)' } : { right: 'calc(50% + 14px)' }),
      }}
      className={clsx(
        'absolute max-w-[42%] -translate-y-1/2 text-[10px]/4 text-olive-600 dark:text-orca-frost',
        surface.side === 'left' ? 'text-left' : 'text-right',
      )}
    >
      {surface.action}
    </motion.div>
  )
}
