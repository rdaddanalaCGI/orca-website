'use client'

import { ChevronIcon } from '@/components/icons/chevron-icon'
import { clsx } from 'clsx/lite'
import { animate, motion, useMotionValue, type PanInfo } from 'framer-motion'
import { Children, useCallback, useEffect, useRef, useState } from 'react'

export function Carousel({ children, className }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const [itemWidth, setItemWidth] = useState(0)
  const [index, setIndex] = useState(0)

  const count = Children.count(children)
  const maxIndex = Math.max(0, count - itemsPerView)

  const updateSize = useCallback(() => {
    const w = containerRef.current?.clientWidth ?? 0
    let per = 1
    if (w >= 1024) per = 3
    else if (w >= 768) per = 2
    setItemsPerView(per)
    setItemWidth(w / per)
    setIndex(0)
    x.set(0)
  }, [x])

  useEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize])

  const snapTo = (target: number) => {
    const next = Math.min(Math.max(target, 0), maxIndex)
    setIndex(next)
    animate(x, -next * itemWidth, { type: 'spring', stiffness: 300, damping: 30 })
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const current = x.get()
    const moved = -current / itemWidth + (info.offset.x < 0 ? 0.35 : -0.35)
    snapTo(Math.round(moved))
  }

  const go = (dir: number) => snapTo(index + dir)

  return (
    <div ref={containerRef} className={clsx('flex h-full w-full flex-col overflow-x-clip', className)}>
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-olive-950 shadow-sm ring-1 ring-olive-950/10 backdrop-blur-sm transition-colors hover:bg-white disabled:opacity-40 dark:bg-olive-950/90 dark:text-white dark:ring-white/10 dark:hover:bg-olive-900"
          aria-label="Scroll left"
        >
          <ChevronIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === maxIndex}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-olive-950 shadow-sm ring-1 ring-olive-950/10 backdrop-blur-sm transition-colors hover:bg-white disabled:opacity-40 dark:bg-olive-950/90 dark:text-white dark:ring-white/10 dark:hover:bg-olive-900"
          aria-label="Scroll right"
        >
          <ChevronIcon className="h-4 w-4 rotate-180" />
        </button>
      </div>
      <div className="relative h-full w-full overflow-x-clip overflow-y-visible">
        <motion.div
          drag="x"
          dragConstraints={{ left: -(maxIndex * itemWidth), right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="flex h-full w-full"
        >
          {Children.map(children, (child, i) => (
            <div key={i} className="h-full px-3" style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
