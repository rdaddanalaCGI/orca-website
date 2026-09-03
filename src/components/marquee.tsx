'use client'

import { motion } from 'framer-motion'
import { Children } from 'react'

export function Marquee({ children, className }: { children: React.ReactNode; className?: string }) {
  const items = Children.toArray(children)

  return (
    <div className={className}>
      <div className="overflow-hidden">
        <motion.div
          className="flex w-fit items-center gap-16"
          initial={{ x: '0%' }}
          animate={{ x: '-50%' }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        >
          {items.map((child, i) => (
            <div key={`a-${i}`} className="flex h-8 shrink-0 items-center">
              {child}
            </div>
          ))}
          {items.map((child, i) => (
            <div key={`b-${i}`} className="flex h-8 shrink-0 items-center">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
