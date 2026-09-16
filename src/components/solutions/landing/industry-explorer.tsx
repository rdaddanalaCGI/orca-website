'use client'

import { clsx } from 'clsx/lite'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState, type KeyboardEvent } from 'react'

import { Link } from '@/components/elements/link'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

export type ExplorerVertical = {
  id: string
  name: string
  shortName?: string
  href: string
  positioning?: string
  image?: string
  applications: { id: string; title: string; shortLabel?: string; href: string; category?: string }[]
}

export function IndustryExplorer({ verticals }: { verticals: ExplorerVertical[] }) {
  const shouldReduceMotion = useReducedMotion() ?? false
  const [active, setActive] = useState(0)
  const current = verticals[active] ?? verticals[0]
  if (!current) return null

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const last = verticals.length - 1
    let next: number | null = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = active === last ? 0 : active + 1
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last
    if (next === null) return
    event.preventDefault()
    setActive(next)
    document.getElementById(`industry-tab-${verticals[next].id}`)?.focus()
  }

  const tabProps = (index: number, id: string) => ({
    role: 'tab' as const,
    id: `industry-tab-${id}`,
    'aria-selected': index === active,
    'aria-controls': `industry-panel-${id}`,
    tabIndex: index === active ? 0 : -1,
    onClick: () => setActive(index),
    onKeyDown,
  })

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      {/* Mobile: horizontal scroll tabs */}
      <div
        role="tablist"
        aria-label="Solutions by industry"
        aria-orientation="horizontal"
        className="-mx-6 flex gap-1 overflow-x-auto px-6 pb-2 lg:hidden"
      >
        {verticals.map((vertical, i) => (
          <button
            key={vertical.id}
            type="button"
            {...tabProps(i, vertical.id)}
            className={clsx(
              'shrink-0 rounded-lg px-3 py-2 font-display text-sm/6 whitespace-nowrap transition-colors',
              i === active
                ? 'font-semibold text-olive-950 dark:text-white'
                : 'text-olive-600 hover:text-olive-950 dark:text-orca-frost dark:hover:text-white',
            )}
          >
            <span className="mr-2 text-xs text-olive-400 dark:text-orca-frost/60">
              {String(i + 1).padStart(2, '0')}
            </span>
            {vertical.shortName ?? vertical.name}
          </button>
        ))}
      </div>

      {/* Desktop: vertical selector */}
      <div
        role="tablist"
        aria-label="Solutions by industry"
        aria-orientation="vertical"
        className="hidden lg:col-span-4 lg:block"
      >
        <ol role="list" className="flex flex-col">
          {verticals.map((vertical, i) => (
            <li key={vertical.id}>
              <button
                type="button"
                {...tabProps(i, vertical.id)}
                className={clsx(
                  'relative flex w-full items-baseline gap-4 border-b border-olive-950/10 px-4 py-5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none dark:border-white/10',
                  i === active
                    ? 'text-olive-950 dark:text-white'
                    : 'text-olive-500 hover:text-olive-900 dark:text-orca-frost/70 dark:hover:text-white',
                )}
              >
                {i === active && (
                  <motion.span
                    layoutId="industry-explorer-active"
                    className="absolute top-0 left-0 h-full w-0.5 bg-orca-orange"
                    transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={clsx(
                    'text-xs/6 tabular-nums',
                    i === active ? 'text-orca-link dark:text-orca-orange' : 'text-olive-400 dark:text-orca-frost/50',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl/7">{vertical.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Active vertical panel */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`industry-panel-${current.id}`}
            aria-labelledby={`industry-tab-${current.id}`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-6 rounded-2xl border border-olive-950/10 bg-orca-mist p-6 sm:p-8 dark:border-white/10 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h3 className="font-display text-2xl/8 text-olive-950 dark:text-white">{current.name}</h3>
              <Link
                href={current.href}
                color="brand"
                className="group/cta text-sm/7"
                aria-label={`Explore ${current.name}`}
              >
                Explore {current.shortName ?? current.name}
                <ArrowNarrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>

            {current.positioning && (
              <p className="max-w-2xl text-base/7 text-pretty text-olive-700 dark:text-orca-frost">
                {current.positioning}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-5">
              {current.image && (
                <div className="relative aspect-4/3 overflow-hidden rounded-lg sm:col-span-2">
                  <Image
                    src={current.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>
              )}
              <ul
                className={clsx(
                  'flex flex-col divide-y divide-olive-950/10 dark:divide-white/10',
                  current.image ? 'sm:col-span-3' : 'sm:col-span-5',
                )}
                role="list"
              >
                {current.applications.map((application) => (
                  <li key={application.id}>
                    <NextLink
                      href={application.href}
                      className="group flex items-center justify-between gap-4 py-3 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none"
                      aria-label={`${application.shortLabel ?? application.title} in ${current.name}`}
                    >
                      <span className="flex min-w-0 flex-col">
                        {application.category && (
                          <span className="text-[10px]/4 font-semibold tracking-[0.14em] text-olive-500 uppercase dark:text-orca-frost/70">
                            {application.category}
                          </span>
                        )}
                        <span className="truncate text-sm/6 font-medium text-olive-950 dark:text-white">
                          {application.shortLabel ?? application.title}
                        </span>
                      </span>
                      <ArrowNarrowRightIcon className="h-4 w-4 shrink-0 text-orca-orange transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
