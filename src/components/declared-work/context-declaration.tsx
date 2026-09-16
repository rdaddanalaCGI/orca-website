'use client'

import { ReactFlow } from '@xyflow/react'
import { useMemo } from 'react'
import { BlueprintEdge, type BlueprintFlowEdge } from './blueprint-edge'
import { NODE_SIZE_CONTEXT, WINDOWS } from './constants'
import { contextEntities, contextRelations } from './data'
import { ContextNode, type ContextFlowNode } from './nodes'
import { useRegionSize } from './use-region-size'

const nodeTypes = { context: ContextNode }
const edgeTypes = { blueprint: BlueprintEdge }

/** 01 — scattered enterprise entities settle into a declared context graph. */
export function ContextDeclaration() {
  const [ref, size] = useRegionSize()

  const nodes = useMemo<ContextFlowNode[]>(() => {
    if (!size) return []
    return contextEntities.map((entity) => ({
      id: entity.id,
      type: 'context' as const,
      position: {
        x: entity.x * size.width - NODE_SIZE_CONTEXT.width / 2,
        y: entity.y * size.height - NODE_SIZE_CONTEXT.height / 2,
      },
      width: NODE_SIZE_CONTEXT.width,
      height: NODE_SIZE_CONTEXT.height,
      draggable: false,
      selectable: false,
      connectable: false,
      focusable: false,
      data: {
        label: entity.label,
        icon: entity.icon,
        window: entity.window,
        guideWindow: WINDOWS.contextGuides,
        seed: entity.seed,
      },
    }))
  }, [size])

  const edges = useMemo<BlueprintFlowEdge[]>(
    () =>
      contextRelations.map((relation) => ({
        id: relation.id,
        type: 'blueprint' as const,
        source: relation.source,
        target: relation.target,
        sourceHandle: relation.sourceHandle,
        targetHandle: relation.targetHandle,
        selectable: false,
        focusable: false,
        data: {
          window: relation.window,
          guideWindow: WINDOWS.contextGuides,
          variant: 'straight' as const,
          label: relation.label,
        },
      })),
    [],
  )

  return (
    <div ref={ref} className="h-full w-full">
      {size && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          disableKeyboardA11y
          minZoom={1}
          maxZoom={1}
          viewport={{ x: 0, y: 0, zoom: 1 }}
          proOptions={{ hideAttribution: true }}
          style={{ background: 'transparent' }}
        />
      )}
    </div>
  )
}
