'use client'

import { ReactFlow } from '@xyflow/react'
import { useMemo } from 'react'
import { BlueprintEdge, type BlueprintFlowEdge } from './blueprint-edge'
import { NODE_SIZE_WORKFLOW, WINDOWS } from './constants'
import { workflowSteps, workflowTransitions } from './data'
import { WorkflowNode, type WorkflowFlowNode } from './nodes'
import { useRegionSize } from './use-region-size'

const nodeTypes = { workflow: WorkflowNode }
const edgeTypes = { blueprint: BlueprintEdge }

/** 02 — separate workflow fragments settle into a declared executable workflow. */
export function WorkflowDeclaration() {
  const [ref, size] = useRegionSize()

  const nodes = useMemo<WorkflowFlowNode[]>(() => {
    if (!size) return []
    return workflowSteps.map((step) => ({
      id: step.id,
      type: 'workflow' as const,
      position: {
        x: step.x * size.width - NODE_SIZE_WORKFLOW.width / 2,
        y: step.y * size.height - NODE_SIZE_WORKFLOW.height / 2,
      },
      width: NODE_SIZE_WORKFLOW.width,
      height: NODE_SIZE_WORKFLOW.height,
      draggable: false,
      selectable: false,
      connectable: false,
      focusable: false,
      data: {
        label: step.label,
        kind: step.kind,
        window: step.window,
        guideWindow: WINDOWS.workflowGuides,
        seed: step.seed,
      },
    }))
  }, [size])

  const edges = useMemo<BlueprintFlowEdge[]>(
    () =>
      workflowTransitions.map((transition) => ({
        id: transition.id,
        type: 'blueprint' as const,
        source: transition.source,
        target: transition.target,
        sourceHandle: transition.sourceHandle,
        targetHandle: transition.targetHandle,
        selectable: false,
        focusable: false,
        data: {
          window: transition.window,
          guideWindow: WINDOWS.workflowGuides,
          variant: 'step' as const,
          branchLabel: transition.branchLabel,
          tone: transition.tone,
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
