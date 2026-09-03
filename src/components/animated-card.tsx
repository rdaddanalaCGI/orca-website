'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function AnimatedCard({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className="h-full rounded-3xl bg-olive-50 p-8 shadow-sm ring-1 ring-olive-950/10 dark:bg-olive-900 dark:ring-white/10"
    >
      {children}
    </motion.div>
  )
}
