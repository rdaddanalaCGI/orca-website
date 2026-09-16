'use client'

import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import { CrystallizingLine } from './crystallizing-text'
import { manifestBlocks } from './data'
import { DeclarationRail } from './declaration-rail'
import { PHASE_SPANS } from './timeline'
import { useWindowProgress } from './use-declaration-timeline'

/**
 * One pillar's slice of the declarative manifest, presented as a small codebox:
 * what you see above is the result of what has been declared below. The header
 * resolves together with its first line; the content area is fixed-height so
 * the three boxes match across pillars.
 */
export function Manifest({ blockId }: { blockId: string }) {
  const block = manifestBlocks.find((candidate) => candidate.id === blockId)
  const phaseStart = PHASE_SPANS[blockId as keyof typeof PHASE_SPANS][0]
  const lineStart = block?.lines[0]?.window[0] ?? 0.01
  const headerT = useWindowProgress([phaseStart, lineStart])
  const headerOpacity = useTransform(headerT, [0, 1], [0, 1])
  const headerBlur = useTransform(headerT, (v) => (1 - v) * 3)
  const headerFilter = useMotionTemplate`blur(${headerBlur}px)`
  if (!block) return null

  return (
    <div className="rounded-md border border-olive-950/10 bg-white/60 backdrop-blur-[2px] dark:border-white/10 dark:bg-white/5">
      <div className="relative px-3 py-1.5">
        <motion.div style={{ opacity: headerOpacity, filter: headerFilter }} className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orca-orange/60" />
          <span className="font-mono text-[9px] tracking-[0.08em] text-olive-950/45 dark:text-white/45">
            {block.id}.yaml
          </span>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0">
          <DeclarationRail window={PHASE_SPANS[blockId as keyof typeof PHASE_SPANS]} />
        </div>
      </div>
      <div className="h-30 overflow-hidden px-3 py-2.5 font-mono text-[10px]/5">
        {block.lines.map((line, index) => (
          <CrystallizingLine key={index} tokens={line.tokens} window={line.window} />
        ))}
      </div>
    </div>
  )
}
