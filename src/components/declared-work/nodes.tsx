'use client'

import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import { clsx } from 'clsx/lite'
import { motion, useTransform } from 'framer-motion'
import { Fragment, type ReactNode } from 'react'
import { NODE_SIZE_CONTEXT, NODE_SIZE_WORKFLOW } from './constants'
import type { EntityIcon, WorkflowKind } from './data'
import { EntityGlyph, WorkflowGlyph } from './icons'
import { RegistrationMark } from './registration-mark'
import type { TimeWindow } from './timeline'
import { useWindowProgress } from './use-declaration-timeline'
import { useDeclaredMotion } from './use-declared-motion'

const anchorPositions = [
  ['top', Position.Top],
  ['right', Position.Right],
  ['bottom', Position.Bottom],
  ['left', Position.Left],
] as const

const anchorClass = '!h-px !w-px !min-h-0 !min-w-0 !border-0 !bg-transparent opacity-0'

/** Invisible source + target anchors on all four sides, purely for edge routing. */
function Anchors() {
  return (
    <>
      {anchorPositions.map(([name, position]) => (
        <Fragment key={name}>
          <Handle type="source" id={`s-${name}`} position={position} isConnectable={false} className={anchorClass} />
          <Handle type="target" id={`t-${name}`} position={position} isConnectable={false} className={anchorClass} />
        </Fragment>
      ))}
    </>
  )
}

export function DeclaredNodeShell({
  window,
  guideWindow,
  seed,
  width,
  height,
  rounded = 'rounded-md',
  anchors,
  children,
}: {
  window: TimeWindow
  guideWindow: TimeWindow
  seed: number
  width: number
  height: number
  rounded?: string
  /** XYFlow handles — rendered on the static layer so edge anchors are measured at the declared position. */
  anchors?: ReactNode
  children: ReactNode
}) {
  const declared = useDeclaredMotion(window, seed)
  const guide = useWindowProgress(guideWindow)
  const targetOpacity = useTransform(() => guide.get() * (1 - declared.eased.get()) * 0.55)

  return (
    <div className="relative" style={{ width, height }}>
      {anchors}
      {/* Blueprint target: dashed outline + registration crosses at the declared position. */}
      <motion.div
        style={{ opacity: targetOpacity }}
        className={clsx('absolute inset-0 border border-dashed border-olive-950/20 dark:border-white/20', rounded)}
      />
      <motion.div style={{ opacity: targetOpacity }} className="text-olive-950/40 dark:text-white/40">
        <RegistrationMark className="absolute -top-1.5 -left-1.5 h-1.5 w-1.5" />
        <RegistrationMark className="absolute -right-1.5 -bottom-1.5 h-1.5 w-1.5" />
      </motion.div>

      {/* The loose object that settles onto the target. */}
      <motion.div style={{ x: declared.x, y: declared.y, filter: declared.filter }} className="absolute inset-0">
        <motion.div
          style={{ opacity: declared.dashedOpacity }}
          className={clsx('absolute inset-0 border border-dashed border-olive-950/30 dark:border-white/30', rounded)}
        />
        <motion.div
          style={{ opacity: declared.solidOpacity }}
          className={clsx(
            'absolute inset-0 border border-olive-950/15 bg-white/70 shadow-[0_1px_2px_rgb(0_0_0/0.04)] backdrop-blur-[2px] dark:border-white/15 dark:bg-white/5',
            rounded,
          )}
        />
        <div className="relative flex h-full items-center">{children}</div>
      </motion.div>

      {/* Registration flash on snap. */}
      <motion.div style={{ opacity: declared.flash }} className="pointer-events-none text-orca-orange">
        <RegistrationMark className="absolute -top-1.5 -left-1.5 h-1.5 w-1.5" />
        <RegistrationMark className="absolute -right-1.5 -bottom-1.5 h-1.5 w-1.5" />
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Context node                                                        */
/* ------------------------------------------------------------------ */

export type ContextNodeData = {
  label: string
  icon: EntityIcon
  window: TimeWindow
  guideWindow: TimeWindow
  seed: number
}

export type ContextFlowNode = Node<ContextNodeData, 'context'>

export function ContextNode({ data }: NodeProps<ContextFlowNode>) {
  return (
    <DeclaredNodeShell
      window={data.window}
      guideWindow={data.guideWindow}
      seed={data.seed}
      width={NODE_SIZE_CONTEXT.width}
      height={NODE_SIZE_CONTEXT.height}
      anchors={<Anchors />}
    >
      <div className="flex items-center gap-2.5 px-3">
        <EntityGlyph icon={data.icon} className="h-3.5 w-3.5 shrink-0 text-olive-950/70 dark:text-white/70" />
        <span className="text-[11px] font-medium tracking-wide text-olive-950 dark:text-white">{data.label}</span>
      </div>
    </DeclaredNodeShell>
  )
}

/* ------------------------------------------------------------------ */
/* Workflow node                                                       */
/* ------------------------------------------------------------------ */

export type WorkflowNodeData = {
  label: string
  kind: WorkflowKind
  window: TimeWindow
  guideWindow: TimeWindow
  seed: number
}

export type WorkflowFlowNode = Node<WorkflowNodeData, 'workflow'>

const kindGlyphClass: Record<WorkflowKind, string> = {
  trigger: 'text-orca-orange/80',
  action: 'text-olive-950/70 dark:text-white/70',
  decision: 'text-olive-950/70 dark:text-white/70',
  system: 'text-olive-950/70 dark:text-white/70',
  human: 'text-orca-teal-dark dark:text-orca-mist/80',
}

export function WorkflowNode({ data }: NodeProps<WorkflowFlowNode>) {
  return (
    <DeclaredNodeShell
      window={data.window}
      guideWindow={data.guideWindow}
      seed={data.seed}
      width={NODE_SIZE_WORKFLOW.width}
      height={NODE_SIZE_WORKFLOW.height}
      rounded={data.kind === 'trigger' ? 'rounded-full' : 'rounded-md'}
      anchors={<Anchors />}
    >
      <div className={clsx('flex items-center gap-2', data.kind === 'trigger' ? 'px-4' : 'px-3')}>
        <WorkflowGlyph kind={data.kind} className={clsx('h-3.5 w-3.5 shrink-0', kindGlyphClass[data.kind])} />
        <span className="text-[10.5px] font-medium tracking-wide text-olive-950 dark:text-white">{data.label}</span>
      </div>
    </DeclaredNodeShell>
  )
}
