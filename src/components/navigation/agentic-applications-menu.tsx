'use client'

import { clsx } from 'clsx/lite'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import type { SolutionVertical } from '@/lib/solutions'
import { solutions } from '@/lib/solutions'

import { Details } from './details'

function getMenuItems(vertical: SolutionVertical) {
  if (vertical.applications?.applications && vertical.applications.applications.length > 0) {
    return vertical.applications.applications.slice(0, 3).map((app) => ({
      id: app.id,
      href: app.href,
      title: app.shortLabel ?? app.title,
      description: app.menuDescription,
    }))
  }
  if (vertical.featuredUseCases.length > 0) {
    return vertical.featuredUseCases.slice(0, 3).map((useCase) => ({
      id: useCase.id,
      href: useCase.href,
      title: useCase.shortLabel ?? useCase.title,
      description: useCase.description,
    }))
  }
  return []
}

function closeMenu(event: React.MouseEvent<HTMLAnchorElement>) {
  const details = event.currentTarget.closest('details')
  if (details) {
    details.open = false
  }
}

export function AgenticApplicationsMenu() {
  const pathname = usePathname()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion() ?? false
  const [activeId, setActiveId] = useState(solutions[0].id)
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const [openMobileId, setOpenMobileId] = useState<string | null>(null)
  const [hashNonce, setHashNonce] = useState(0)
  const pendingHashRef = useRef<string | null>(null)
  const active = solutions.find((solution) => solution.id === activeId) ?? solutions[0]
  const activeItems = getMenuItems(active)
  const shownItemId = hoveredItemId ?? activeItems[0]?.id
  const executiveBrief = active.resources?.items.find((item) => item.eyebrow.toUpperCase() === '2-PAGE VERTICAL BRIEF')
  const hasActive = pathname.startsWith('/solutions')

  useEffect(() => {
    if (pendingHashRef.current) {
      window.location.hash = pendingHashRef.current
      pendingHashRef.current = null
    }
  }, [hashNonce])

  function activateVertical(id: string) {
    setActiveId(id)
    setHoveredItemId(null)
  }

  function handleApplicationClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const details = event.currentTarget.closest('details')
    if (details) {
      details.open = false
    }
    const [path, hash] = href.split('#')
    if (path === pathname) {
      event.preventDefault()
      if (hash) {
        pendingHashRef.current = hash
        setHashNonce((n) => n + 1)
      }
    } else {
      event.preventDefault()
      router.push(href)
    }
  }

  return (
    <Details>
      <summary
        className={clsx(
          'flex cursor-pointer list-none items-center gap-2 rounded-full px-3 py-1 text-xl/8 font-medium transition-colors lg:text-sm/7',
          hasActive ? 'text-orca-orange' : 'text-olive-950 dark:text-white',
          'group-open:text-orca-orange hover:text-orca-orange',
        )}
      >
        AI Solutions
        <ChevronIcon className="h-2 w-1.5 rotate-90 transition-transform group-open:rotate-180" />
      </summary>
      <div className="max-lg:mt-2 lg:fixed lg:inset-x-0 lg:top-21 lg:z-20 lg:bg-orca-page lg:py-8 lg:shadow-lg lg:ring-1 lg:ring-olive-950/10 dark:lg:bg-olive-950 dark:lg:ring-white/10">
        <Container>
          {/* Desktop mega-menu */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-6 lg:col-span-3 lg:border-r lg:border-olive-950/10 lg:pr-6 dark:lg:border-white/10">
              <div className="flex flex-col gap-4">
                <span className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">AI SOLUTIONS</span>
                <p className="font-display text-2xl/8 text-olive-950 dark:text-white">
                  Built around how your industry works.
                </p>
                <Text>Explore the industries and operational workflows where Orcaworks puts governed AI to work.</Text>
              </div>
              <div className="flex flex-col items-start gap-3">
                <Link
                  href="/solutions"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
                >
                  Explore all solutions <ArrowNarrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/solutions#agentic-process-automation"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
                >
                  Understand our process <ArrowNarrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3">
              <span className="text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-orca-frost">
                Industries
              </span>
              <ul className="mt-4 flex flex-col gap-1" role="list">
                {solutions.map((vertical) => {
                  const isActive = active.id === vertical.id
                  return (
                    <li key={vertical.id}>
                      <Link
                        href={vertical.href}
                        onMouseEnter={() => activateVertical(vertical.id)}
                        onFocus={() => activateVertical(vertical.id)}
                        onClick={closeMenu}
                        className={clsx(
                          'group flex items-center justify-between py-2 text-sm/7 font-medium transition-colors',
                          isActive ? 'text-orca-orange' : 'text-olive-950 dark:text-white',
                          'hover:text-orca-orange',
                        )}
                      >
                        <span className="pr-2">{vertical.name}</span>
                        <ArrowNarrowRightIcon
                          className={clsx(
                            'h-4 w-4 shrink-0 transition-opacity',
                            isActive ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-3 flex flex-col gap-1">
                <span className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">
                  {active.shortName ?? active.name}
                </span>
                <span className="text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-orca-frost">
                  Featured applications
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 8 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -8 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                  className="flex flex-col"
                  onMouseLeave={() => setHoveredItemId(null)}
                >
                  {activeItems.map((item) => {
                    const isShown = item.id === shownItemId && Boolean(item.description)
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={(event) => handleApplicationClick(event, item.href)}
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onFocus={() => setHoveredItemId(item.id)}
                        className="group -mx-2 flex items-start justify-between gap-2 rounded-lg px-2 py-3 transition-colors hover:bg-orca-mist dark:hover:bg-orca-teal-dark"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-olive-950 transition-colors group-hover:text-orca-orange dark:text-white">
                            {item.title}
                          </span>
                          <AnimatePresence initial={false}>
                            {isShown && (
                              <motion.span
                                key="description"
                                initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                                animate={shouldReduceMotion ? {} : { opacity: 1, height: 'auto' }}
                                exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
                                className="overflow-hidden text-xs/5 text-olive-700 dark:text-orca-frost"
                              >
                                <span className="block pt-0.5">{item.description}</span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <ArrowNarrowRightIcon className="mt-1.5 h-4 w-4 shrink-0 text-orca-orange transition-transform group-hover:translate-x-1" />
                      </Link>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
              <Link
                href={active.href}
                onClick={closeMenu}
                className="mt-3 inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
              >
                View all in {active.name} <ArrowNarrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-3">
              {active.image && (
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-orca-mist ring-1 ring-olive-950/5 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))] dark:ring-white/10">
                  <Image src={active.image} alt="" fill sizes="300px" className="object-cover" />
                </div>
              )}
              {executiveBrief && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-orca-frost">
                    {executiveBrief.eyebrow}
                  </span>
                  <p className="text-sm/6 text-olive-700 dark:text-orca-frost">{executiveBrief.description}</p>
                  {executiveBrief.cta.resourceId && (
                    <ButtonLink
                      href={`${active.href}#${executiveBrief.id}`}
                      onClick={(event) => handleApplicationClick(event, `${active.href}#${executiveBrief.id}`)}
                    >
                      {executiveBrief.cta.label}
                    </ButtonLink>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile drawer */}
          <div className="flex flex-col gap-3 lg:hidden">
            <span className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">AI SOLUTIONS</span>
            <Link
              href="/solutions"
              onClick={closeMenu}
              className="inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
            >
              Explore all solutions <ArrowNarrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions#agentic-process-automation"
              onClick={closeMenu}
              className="inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
            >
              Understand our process <ArrowNarrowRightIcon className="h-4 w-4" />
            </Link>
            <ul className="mt-3 flex flex-col" role="list">
              {solutions.map((vertical) => {
                const isOpen = openMobileId === vertical.id
                return (
                  <li
                    key={vertical.id}
                    className="border-t border-olive-950/10 py-3 first:border-t-0 dark:border-white/10"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={vertical.href}
                        onClick={closeMenu}
                        className="text-base/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
                      >
                        {vertical.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenMobileId((current) => (current === vertical.id ? null : vertical.id))}
                        aria-expanded={isOpen}
                        aria-controls={`mobile-solutions-${vertical.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-olive-950 hover:bg-orca-mist dark:text-white dark:hover:bg-orca-teal-dark"
                      >
                        <ChevronIcon
                          className={clsx('h-4 w-4 transition-transform', isOpen ? 'rotate-180' : 'rotate-90')}
                        />
                      </button>
                    </div>
                    {isOpen && (
                      <ul id={`mobile-solutions-${vertical.id}`} className="mt-2 flex flex-col gap-2 pl-3" role="list">
                        {getMenuItems(vertical).map((item) => (
                          <li key={item.id}>
                            <Link
                              href={item.href}
                              onClick={(event) => handleApplicationClick(event, item.href)}
                              className="block text-sm/7 text-olive-700 hover:text-orca-orange dark:text-orca-frost"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </div>
    </Details>
  )
}
