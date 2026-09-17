'use client'

import { motion, type Variants } from 'framer-motion'
import { useVisualPlayback } from './use-visual-playback'

const EASE = [0.16, 1, 0.3, 1] as const

// All geometry is in percent of the canvas so the composition scales with the
// card. Node cards are ~20% wide and ~13% tall; edges join node centers and
// hide beneath the opaque cards.
const NODES = [
  { id: 'customer', label: 'Customer', sub: 'ACME · #4821', x: 8, y: 18 },
  { id: 'order', label: 'Order', sub: 'SO-18424', x: 38, y: 10 },
  { id: 'shipment', label: 'Shipment', sub: 'ATL → DEN', x: 54, y: 24 },
  { id: 'product', label: 'Product', sub: 'SKU-8814', x: 33, y: 48 },
  { id: 'carrier', label: 'Carrier', sub: 'Apex Freight', x: 57, y: 60 },
  { id: 'inventory', label: 'Inventory', sub: 'DC-East', x: 18, y: 74 },
] as const

const RESTRICTED = { label: 'Finance', sub: 'payroll', x: 79, y: 42 } as const

const EDGES = [
  { x1: 18, y1: 24.5, x2: 48, y2: 16.5, label: 'placed by', lx: 30, ly: 13 },
  { x1: 48, y1: 16.5, x2: 64, y2: 30.5, label: 'fulfilled by', lx: 61, ly: 19 },
  { x1: 48, y1: 16.5, x2: 43, y2: 54.5, label: 'contains', lx: 52, ly: 36 },
  { x1: 43, y1: 54.5, x2: 28, y2: 80.5, label: 'available at', lx: 23, ly: 63 },
  { x1: 64, y1: 30.5, x2: 67, y2: 66.5, label: 'served by', lx: 74, ly: 48 },
] as const

const nodeIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 0.4, ease: EASE },
  }),
}

const edgeIn: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.55 + i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({ opacity: 1, transition: { delay, duration: 0.4 } }),
}

function NodeCard({ label, sub, className = '' }: { label: string; sub: string; className?: string }) {
  return (
    <div
      className={`w-[20%] min-w-14 rounded border border-olive-950/12 bg-white/90 px-1.5 py-1 dark:border-white/15 dark:bg-white/8 ${className}`}
    >
      <div className="truncate font-mono text-[7.5px] tracking-widest text-olive-400 uppercase dark:text-orca-frost/50">
        {label}
      </div>
      <div className="truncate text-[9px]/4 font-medium text-olive-900 dark:text-white">{sub}</div>
    </div>
  )
}

/**
 * A compact enterprise context graph: governed objects connected inside an
 * access boundary, with one object outside it rendered unavailable.
 */
export function ConnectedContextVisual() {
  const { ref, orchestration } = useVisualPlayback()

  return (
    <motion.div ref={ref} {...orchestration} className="relative h-full w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        fill="none"
        className="absolute inset-0 h-full w-full text-olive-950/25 dark:text-white/15"
      >
        {EDGES.map((edge, i) => (
          <motion.path
            key={edge.label}
            variants={edgeIn}
            custom={i}
            d={`M${edge.x1} ${edge.y1}L${edge.x2} ${edge.y2}`}
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <motion.path
          variants={edgeIn}
          custom={EDGES.length + 1}
          d={`M${RESTRICTED.x + 10} ${RESTRICTED.y + 6.5}L78 ${RESTRICTED.y + 6.5}`}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
          vectorEffect="non-scaling-stroke"
          className="text-olive-950/20 dark:text-white/10"
        />
      </svg>

      {EDGES.map((edge, i) => (
        <motion.span
          key={edge.label}
          variants={fadeIn}
          custom={0.75 + i * 0.1}
          className="absolute -translate-x-1/2 -translate-y-1/2 bg-orca-page/85 px-0.5 font-mono text-[7px] tracking-[0.14em] text-olive-400 uppercase dark:bg-olive-950/80 dark:text-orca-frost/50"
          style={{ left: `${edge.lx}%`, top: `${edge.ly}%` }}
        >
          {edge.label}
        </motion.span>
      ))}
      <motion.span
        variants={fadeIn}
        custom={1.7}
        className="absolute -translate-x-1/2 -translate-y-1/2 bg-orca-page/85 px-0.5 font-mono text-[7px] tracking-[0.14em] text-olive-400 uppercase dark:bg-olive-950/80 dark:text-orca-frost/50"
        style={{ left: '83.5%', top: '40%' }}
      >
        restricted
      </motion.span>

      {NODES.map((node, i) => (
        <motion.div
          key={node.id}
          variants={nodeIn}
          custom={i}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <NodeCard label={node.label} sub={node.sub} />
        </motion.div>
      ))}

      <motion.div
        variants={fadeIn}
        custom={1.55}
        className="absolute opacity-45"
        style={{ left: `${RESTRICTED.x}%`, top: `${RESTRICTED.y}%` }}
      >
        <NodeCard label={RESTRICTED.label} sub={RESTRICTED.sub} className="border-dashed" />
      </motion.div>

      <motion.div
        variants={fadeIn}
        custom={1.35}
        aria-hidden="true"
        className="absolute rounded-md border border-dashed border-olive-950/25 dark:border-white/15"
        style={{ left: '4%', top: '5%', width: '74%', height: '88%' }}
      />
      <motion.span
        variants={fadeIn}
        custom={1.45}
        className="absolute top-[5%] left-[6%] -translate-y-1/2 bg-orca-page px-1 font-mono text-[7px] tracking-[0.16em] text-olive-500 uppercase dark:bg-olive-950 dark:text-orca-frost/60"
      >
        access · operations
      </motion.span>

      <motion.span
        variants={fadeIn}
        custom={1.9}
        className="absolute right-2.5 bottom-1.5 flex items-center gap-1 font-mono text-[7.5px] tracking-[0.14em] text-olive-500 uppercase dark:text-orca-frost/60"
      >
        <span aria-hidden="true" className="size-1 rounded-full bg-orca-teal-dark dark:bg-orca-frost" />
        context ready
      </motion.span>
    </motion.div>
  )
}
