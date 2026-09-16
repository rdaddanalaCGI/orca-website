'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import { blueprintIcons } from '@/lib/blueprints/icon-resolver'
import type { BlueprintWorkflow, BlueprintWorkflowStep } from '@/lib/blueprints/types'

const MIN_CARD_WIDTH = 125
const CONNECTOR_GAP = 28

function BlueprintIcon({
  name,
  className = 'size-4',
  strokeWidth = 1.5,
}: {
  name: keyof typeof blueprintIcons
  className?: string
  strokeWidth?: number
}) {
  const Icon = blueprintIcons[name]
  if (!Icon) return null
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}

function WorkflowConnector({ direction }: { direction: 'right' | 'left' | 'down' }) {
  const isHorizontal = direction === 'right' || direction === 'left'

  return (
    <div
      className={
        'absolute z-10 bg-orca-orange ' +
        (isHorizontal ? 'top-1/2 h-px w-3 -translate-y-1/2 ' : 'left-1/2 h-3 w-px -translate-x-1/2 ') +
        (direction === 'right'
          ? 'left-[calc(100%+0.375rem)]'
          : direction === 'left'
            ? 'right-[calc(100%+0.375rem)]'
            : 'top-[calc(100%+0.375rem)]')
      }
      aria-hidden="true"
    >
      <div
        className={
          'absolute size-1.5 border-t border-r border-orca-orange ' +
          (direction === 'right'
            ? 'top-1/2 right-0 -translate-y-1/2 rotate-45'
            : direction === 'left'
              ? 'top-1/2 left-0 -translate-y-1/2 -rotate-135'
              : 'bottom-0 left-1/2 -translate-x-1/2 rotate-135')
        }
      />
    </div>
  )
}

function WorkflowStepCard({ step }: { step: BlueprintWorkflowStep }) {
  return (
    <div className="min-w-0 flex-1 rounded-lg border border-olive-950/10 bg-white p-3.5 dark:border-white/10 dark:bg-olive-950">
      <div className="flex min-w-0 items-start gap-3">
        {step.icon && (
          <BlueprintIcon name={step.icon} className="size-4 shrink-0 text-olive-600 dark:text-orca-frost" />
        )}
        <span className="min-w-0 text-sm/5 font-medium wrap-break-word text-olive-950 dark:text-white">
          {step.title}
        </span>
      </div>
    </div>
  )
}

function getSnakeColumns(total: number): number {
  if (total <= 4) return 2
  if (total <= 6) return 3
  return 4
}

function getLayout(total: number, width: number): 'horizontal' | 'snake' | 'vertical' {
  const horizontalRequired = total * MIN_CARD_WIDTH + (total - 1) * CONNECTOR_GAP
  if (width >= horizontalRequired) return 'horizontal'

  const snakeColumns = getSnakeColumns(total)
  const snakeRequired = snakeColumns * MIN_CARD_WIDTH + (snakeColumns - 1) * CONNECTOR_GAP
  if (width >= snakeRequired) return 'snake'

  return 'vertical'
}

function getPosition(
  index: number,
  total: number,
  mode: 'horizontal' | 'snake' | 'vertical',
): { row: number; col: number } {
  if (mode === 'vertical') return { row: index + 1, col: 1 }
  if (mode === 'horizontal') return { row: 1, col: index + 1 }

  const columns = getSnakeColumns(total)
  const row = Math.floor(index / columns)
  const colInRow = index % columns
  const visualCol = row % 2 === 0 ? colInRow : columns - 1 - colInRow
  return { row: row + 1, col: visualCol + 1 }
}

function getConnectorDirection(
  index: number,
  total: number,
  mode: 'horizontal' | 'snake' | 'vertical',
): 'right' | 'left' | 'down' | null {
  if (index === total - 1) return null
  if (mode === 'vertical') return 'down'
  if (mode === 'horizontal') return 'right'

  const columns = getSnakeColumns(total)
  const row = Math.floor(index / columns)
  const colInRow = index % columns
  const isEndOfRow = colInRow === columns - 1

  if (row % 2 === 0) {
    return isEndOfRow ? 'down' : 'right'
  }
  return isEndOfRow ? 'down' : 'left'
}

export function WorkflowStepper({ workflow }: { workflow: BlueprintWorkflow }) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const total = workflow.steps.length

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      setWidth(rect.width)
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const mode = getLayout(total, width)
  const columns = mode === 'horizontal' ? total : mode === 'snake' ? getSnakeColumns(total) : 1

  return (
    <div ref={ref} className="w-full">
      <ol className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} role="list">
        {workflow.steps.map((step, index) => {
          const position = getPosition(index, total, mode)
          const connector = getConnectorDirection(index, total, mode)
          return (
            <li key={step.id} className="relative min-w-0" style={{ gridRow: position.row, gridColumn: position.col }}>
              <WorkflowStepCard step={step} />
              {connector && <WorkflowConnector direction={connector} />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
