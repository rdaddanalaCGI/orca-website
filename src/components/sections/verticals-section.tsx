'use client'

import { Eyebrow } from '@/components/elements/eyebrow'
import { Link } from '@/components/elements/link'
import { Section } from '@/components/elements/section'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { clsx } from 'clsx/lite'
import { animate, LayoutGroup, motion, useMotionValue, type PanInfo } from 'framer-motion'
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { solutions } from '@/lib/solutions'

type Vertical = {
  href: string
  shortLabel: string
  image: string
  useCases: string[]
}

const useCasesBySlug: Record<string, string[]> = {
  'logistics-and-distribution': ['Exceptions', 'routing', 'warehouse tasks', 'freight audit'],
  insurance: ['Claims', 'underwriting', 'servicing', 'investigations', 'evidence review'],
  'credit-unions-specialty-lending': ['Onboarding', 'KYC', 'fraud', 'servicing', 'compliance operations'],
  'clinical-research-organisations': ['Intake', 'prior authorization', 'care coordination', 'claims review'],
  'architecture-construction-engineering': ['Project intake', 'document review', 'field coordination', 'approvals'],
}

const verticals: Vertical[] = solutions.map((solution) => ({
  href: solution.href,
  shortLabel: solution.shortName ?? solution.name,
  image: solution.image ?? '',
  useCases: useCasesBySlug[solution.slug] ?? [],
}))

function VerticalCard({ vertical, isDragging }: { vertical: Vertical; isDragging: boolean }) {
  return (
    <NextLink
      href={vertical.href}
      className="group block h-full overflow-hidden rounded-lg bg-olive-950/2.5 ring-1 ring-olive-950/5 select-none dark:bg-white/5 dark:ring-white/10"
      onClick={(e) => {
        if (isDragging) e.preventDefault()
      }}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={vertical.image}
          alt={vertical.shortLabel}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex h-full flex-col p-6 sm:p-8">
        <h3 className="font-display text-xl/8 text-olive-950 dark:text-white">{vertical.shortLabel}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {vertical.useCases.map((useCase) => (
            <span
              key={useCase}
              className="rounded-full bg-olive-950/5 px-2.5 py-1 text-xs/5 font-medium text-olive-700 dark:bg-white/10 dark:text-olive-400"
            >
              {useCase}
            </span>
          ))}
        </div>
        <div className="mt-4 inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 dark:text-white">
          Explore
          <ArrowNarrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <div className="mt-3 h-0.5 w-0 bg-orca-orange transition-all duration-300 group-hover:w-12" />
      </div>
    </NextLink>
  )
}

function VerticalCarousel({
  initialIndex,
  onIndexChange,
}: {
  initialIndex: number
  onIndexChange: (index: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [gap, setGap] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const count = verticals.length
  const maxIndex = count - 1

  useEffect(() => {
    const measure = () => {
      const w = containerRef.current?.clientWidth ?? 0
      setItemWidth(w)
      const track = trackRef.current
      if (track) {
        const computed = getComputedStyle(track)
        setGap(parseFloat(computed.gap || computed.columnGap) || 0)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (itemWidth > 0) {
      const slotWidth = itemWidth + gap
      animate(x, -initialIndex * slotWidth, { type: 'spring', stiffness: 300, damping: 30 })
    }
  }, [itemWidth, gap, initialIndex, x])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const current = x.get()
    const slotWidth = itemWidth + gap
    if (slotWidth === 0) return
    const moved = -current / slotWidth + (info.offset.x < 0 ? 0.35 : -0.35)
    const next = Math.min(Math.max(Math.round(moved), 0), maxIndex)
    onIndexChange(next)
  }

  const go = (dir: number) => onIndexChange(Math.min(Math.max(initialIndex + dir, 0), maxIndex))

  return (
    <div className="flex flex-col gap-6">
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={itemWidth > 0 ? { left: -(maxIndex * (itemWidth + gap)), right: 0 } : { left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            handleDragEnd(_, info)
            setTimeout(() => setIsDragging(false), 100)
          }}
          style={{ x }}
          className="flex w-full touch-pan-y gap-6"
        >
          {verticals.map((vertical) => (
            <div key={vertical.href} style={{ flex: `0 0 ${itemWidth}px` }}>
              <VerticalCard vertical={vertical} isDragging={isDragging} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative h-0.5 w-32 overflow-hidden rounded-full bg-olive-950/10 dark:bg-white/10">
          <motion.div
            className="absolute top-0 left-0 h-full bg-orca-orange"
            initial={false}
            animate={{ width: `${((initialIndex + 1) / count) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous vertical"
            onClick={() => go(-1)}
            disabled={initialIndex === 0}
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full bg-olive-950/5 text-olive-950 transition-colors hover:bg-olive-950/10 disabled:opacity-30 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
              initialIndex === 0 && 'cursor-not-allowed',
            )}
          >
            <ChevronIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next vertical"
            onClick={() => go(1)}
            disabled={initialIndex === maxIndex}
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full bg-olive-950/5 text-olive-950 transition-colors hover:bg-olive-950/10 disabled:opacity-30 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
              initialIndex === maxIndex && 'cursor-not-allowed',
            )}
          >
            <ChevronIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function VerticalsSection() {
  const [active, setActive] = useState(0)

  return (
    <Section id="verticals" surface="mist">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-16 lg:col-span-4 lg:self-start">
          <div className="flex flex-col gap-6">
            <Eyebrow variant="brand">INDUSTRIES</Eyebrow>
            <Subheading>Built around how your industry actually works.</Subheading>
            <Text size="lg">
              Orcaworks starts with the workflows, systems, terminology and decisions your teams deal with every day.
            </Text>
            <Link href="/solutions" color="brand">
              Explore industries <ArrowNarrowRightIcon />
            </Link>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-8 lg:col-span-8">
          <LayoutGroup>
            <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto py-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {verticals.map((vertical, i) => (
                <button
                  key={vertical.href}
                  type="button"
                  onClick={() => setActive(i)}
                  className={clsx(
                    'relative z-10 cursor-pointer rounded-full px-4 py-2 text-sm/7 font-medium whitespace-nowrap transition-colors',
                    active === i
                      ? 'bg-transparent text-white dark:text-olive-950'
                      : 'bg-white text-olive-700 shadow-sm ring-1 ring-olive-950/20 hover:bg-olive-950/5 hover:text-olive-950 dark:bg-olive-950/40 dark:text-olive-100 dark:ring-white/20 dark:hover:bg-olive-900/60 dark:hover:text-white',
                  )}
                >
                  {active === i && (
                    <motion.div
                      layoutId="active-vertical-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-olive-950 shadow-sm dark:bg-white"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {vertical.shortLabel}
                </button>
              ))}
            </div>
          </LayoutGroup>

          <VerticalCarousel initialIndex={active} onIndexChange={setActive} />
        </div>
      </div>
    </Section>
  )
}
