'use client'

import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { clsx } from 'clsx/lite'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import NextLink from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

export type Insight = {
  eyebrow: string
  title: string
  text: string
  image?: string
  href: string
  featured?: boolean
}

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}

const imageVariants = {
  rest: { scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.02, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}

function InsightCard({ item, index }: { item: Insight; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const isFeatured = item.featured
  const cta =
    item.href === '/ai-agent-handbook' || item.href === '/enterprise-ai-safety-handbook'
      ? 'Read the handbook'
      : 'Read more'

  const cardClass = clsx(
    'group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm',
    isFeatured
      ? 'bg-olive-950 text-white ring-1 ring-white/10'
      : 'bg-white text-olive-950 ring-1 ring-olive-950/5 dark:bg-olive-900 dark:ring-white/10',
  )

  const content = (
    <>
      <div className="relative aspect-video w-full overflow-hidden">
        {item.image ? (
          shouldReduceMotion ? (
            <Image
              src={item.image}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-cover"
            />
          ) : (
            <motion.div className="relative h-full w-full" variants={imageVariants}>
              <Image
                src={item.image}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          )
        ) : (
          <div className={clsx('h-full w-full', isFeatured ? 'bg-olive-800' : 'bg-olive-200/50')} />
        )}
      </div>
      <div className="flex flex-col gap-2 p-5 pt-3">
        <span className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">{item.eyebrow}</span>
        <h3
          className={clsx(
            'font-display text-xl/8 transition-colors duration-300 group-hover:text-orca-orange',
            isFeatured ? 'text-white' : 'text-olive-950 dark:text-white dark:group-hover:text-orca-orange',
          )}
        >
          {item.title}
        </h3>
        {isFeatured ? <p className="text-base/6 text-olive-300">{item.text}</p> : null}
      </div>
      <div className="mt-auto p-5 pt-0">
        <span
          className={clsx(
            'inline-flex items-center gap-1 text-sm font-medium',
            isFeatured ? 'text-white' : 'text-olive-950 dark:text-white',
          )}
        >
          {cta}
          {!shouldReduceMotion ? (
            <motion.span variants={arrowVariants}>
              <ArrowNarrowRightIcon className="h-4 w-4" />
            </motion.span>
          ) : (
            <ArrowNarrowRightIcon className="h-4 w-4" />
          )}
        </span>
      </div>
    </>
  )

  if (shouldReduceMotion) {
    return (
      <NextLink href={item.href} className="w-[75%] shrink-0 snap-start sm:w-[46%] lg:w-[35%]">
        <div className={cardClass}>{content}</div>
      </NextLink>
    )
  }

  return (
    <NextLink href={item.href} className="w-[75%] shrink-0 snap-start sm:w-[46%] lg:w-[35%]">
      <motion.div
        className={cardClass}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        whileHover="hover"
        variants={cardVariants}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {content}
      </motion.div>
    </NextLink>
  )
}

export function InsightsCarousel({ items }: { items: Insight[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5)
    const max = scrollWidth - clientWidth
    setProgress(max > 0 ? scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    updateScroll()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateScroll, { passive: true })
    return () => el.removeEventListener('scroll', updateScroll)
  }, [updateScroll])

  const scrollBy = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, clientWidth } = el
    el.scrollTo({ left: Math.max(0, scrollLeft + dir * clientWidth * 0.5), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex w-max snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth"
      >
        {items.map((item, i) => (
          <InsightCard key={item.href} item={item} index={i} />
        ))}
      </div>
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-olive-950 shadow-sm ring-1 ring-olive-950/10 backdrop-blur-sm hover:bg-white dark:bg-olive-950/90 dark:text-white dark:ring-white/10 dark:hover:bg-olive-900"
          aria-label="Scroll left"
        >
          <ChevronIcon className="h-4 w-4" />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-olive-950 shadow-sm ring-1 ring-olive-950/10 backdrop-blur-sm hover:bg-white dark:bg-olive-950/90 dark:text-white dark:ring-white/10 dark:hover:bg-olive-900"
          aria-label="Scroll right"
        >
          <ChevronIcon className="h-4 w-4 rotate-180" />
        </button>
      )}
      <div className="mt-6 h-1 w-full max-w-7xl overflow-hidden rounded-full bg-olive-200/50">
        <motion.div
          className="h-full w-full origin-left bg-orca-orange"
          animate={{ scaleX: progress }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </div>
  )
}
