'use client'

import { clsx } from 'clsx/lite'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
      description: app.categoryEyebrow ?? app.category,
    }))
  }
  return vertical.featuredUseCases.slice(0, 3).map((useCase) => ({
    id: useCase.id,
    href: useCase.href,
    title: useCase.shortLabel ?? useCase.title,
    description: useCase.description,
  }))
}

export function AgenticApplicationsMenu() {
  const pathname = usePathname()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion() ?? false
  const [activeId, setActiveId] = useState(solutions[0].id)
  const [openMobileId, setOpenMobileId] = useState<string | null>(null)
  const [hashNonce, setHashNonce] = useState(0)
  const pendingHashRef = useRef<string | null>(null)
  const active = solutions.find((solution) => solution.id === activeId) ?? solutions[0]
  const hasActive = pathname.startsWith('/solutions')

  useEffect(() => {
    if (pendingHashRef.current) {
      window.location.hash = pendingHashRef.current
      pendingHashRef.current = null
    }
  }, [hashNonce])

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
          'flex cursor-pointer list-none items-center gap-2 rounded-full px-3 py-1 text-3xl/10 font-medium transition-colors hover:bg-olive-950/10 lg:text-sm/7 dark:hover:bg-white/10',
          hasActive ? 'text-orca-orange' : 'text-olive-950 dark:text-white',
          'group-open:text-orca-orange hover:text-orca-orange',
        )}
      >
        AI Solutions
        <ChevronIcon className="h-2 w-1.5 rotate-90 transition-transform group-open:rotate-180" />
      </summary>
      <div className="max-lg:mt-2 lg:fixed lg:inset-x-0 lg:top-[5.25rem] lg:z-20 lg:bg-olive-100 lg:py-8 lg:shadow-lg lg:ring-1 lg:ring-olive-950/10 dark:lg:bg-olive-950 dark:lg:ring-white/10">
        <Container>
          {/* Desktop mega-menu */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-6 lg:col-span-3 lg:border-r lg:border-olive-950/10 lg:pr-8 dark:lg:border-white/10">
              <div className="flex flex-col gap-4">
                <span className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">AI SOLUTIONS</span>
                <p className="font-display text-2xl/8 text-olive-950 dark:text-white">
                  Built around how your industry works.
                </p>
                <Text>Explore the industries and operational workflows where Orcaworks puts governed AI to work.</Text>
              </div>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
              >
                Explore all solutions <ArrowNarrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="lg:col-span-3">
              <span className="text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-olive-400">
                Industries
              </span>
              <LayoutGroup>
                <ul className="mt-4 flex flex-col gap-1" role="list">
                  {solutions.map((vertical) => {
                    const isActive = active.id === vertical.id
                    return (
                      <li key={vertical.id}>
                        <Link
                          href={vertical.href}
                          onMouseEnter={() => setActiveId(vertical.id)}
                          onFocus={() => setActiveId(vertical.id)}
                          className={clsx(
                            'group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-sm/7 font-medium transition-colors',
                            isActive ? 'text-orca-orange' : 'text-olive-950 dark:text-white',
                            'hover:text-orca-orange',
                          )}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="active-solution-row"
                              className="absolute inset-0 -z-10 rounded-lg bg-olive-950/5 dark:bg-white/5"
                              initial={false}
                              transition={
                                shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }
                              }
                            />
                          )}
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
              </LayoutGroup>
            </div>

            <div className="lg:col-span-6">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">
                  {active.shortName ?? active.name}
                </span>
                <span className="text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-olive-400">
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
                  className="grid gap-3"
                >
                  {getMenuItems(active).map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={(event) => handleApplicationClick(event, item.href)}
                      className="group flex items-start justify-between gap-4 rounded-lg border border-olive-950/5 bg-olive-950/2.5 p-4 transition-colors hover:border-orca-orange/30 hover:bg-olive-950/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-lg/7 text-olive-950 dark:text-white">{item.title}</span>
                        {item.description && (
                          <span className="text-sm/6 text-olive-700 dark:text-olive-400">{item.description}</span>
                        )}
                      </div>
                      <ArrowNarrowRightIcon className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
              <Link
                href={active.href}
                className="mt-4 inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
              >
                View all in {active.name} <ArrowNarrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Mobile drawer */}
          <div className="flex flex-col gap-4 lg:hidden">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
            >
              Explore all solutions <ArrowNarrowRightIcon className="h-4 w-4" />
            </Link>
            <ul className="flex flex-col gap-2" role="list">
              {solutions.map((vertical) => {
                const isOpen = openMobileId === vertical.id
                return (
                  <li
                    key={vertical.id}
                    className="border-t border-olive-950/10 pt-3 first:border-t-0 first:pt-0 dark:border-white/10"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={vertical.href}
                        className="text-lg/7 font-medium text-olive-950 hover:text-orca-orange dark:text-white"
                      >
                        {vertical.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenMobileId((current) => (current === vertical.id ? null : vertical.id))}
                        aria-expanded={isOpen}
                        aria-controls={`mobile-solutions-${vertical.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-olive-950 hover:bg-olive-950/10 dark:text-white dark:hover:bg-white/10"
                      >
                        <ChevronIcon
                          className={clsx('h-4 w-4 transition-transform', isOpen ? 'rotate-180' : 'rotate-90')}
                        />
                      </button>
                    </div>
                    {isOpen && (
                      <ul id={`mobile-solutions-${vertical.id}`} className="mt-3 flex flex-col gap-2 pl-4" role="list">
                        {getMenuItems(vertical).map((item) => (
                          <li key={item.id}>
                            <Link
                              href={item.href}
                              onClick={(event) => handleApplicationClick(event, item.href)}
                              className="block text-sm/7 text-olive-700 hover:text-orca-orange dark:text-olive-400"
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
