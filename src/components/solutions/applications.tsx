'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'

import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { Details } from '@/components/navigation/details'
import { clsx } from 'clsx/lite'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import type {
  SolutionApplication,
  SolutionApplications as SolutionApplicationsData,
  SolutionIntegrations,
} from '@/lib/solutions'

import { ApplicationBlueprintPanel } from '@/components/application-blueprint/application-blueprint-panel'
import { WorkflowStepper } from '@/components/application-blueprint/workflow-stepper'

import { SolutionIntegrationsRail } from './integrations-rail'

function groupByCategory(applications: SolutionApplication[]) {
  const groups = new Map<string, SolutionApplication[]>()
  for (const app of applications) {
    const list = groups.get(app.category) ?? []
    list.push(app)
    groups.set(app.category, list)
  }
  return [...groups.entries()]
}

function resolveSelectedId(applications: SolutionApplication[], defaultId: string, hash: string) {
  const id = hash.replace('#', '')
  return applications.find((app) => app.id === id)?.id ?? defaultId
}

export function SolutionApplications({
  applications,
  integrations,
}: {
  applications: SolutionApplicationsData
  integrations?: SolutionIntegrations
}) {
  const defaultId = applications.defaultId ?? applications.applications[0]?.id ?? ''
  const shouldReduceMotion = useReducedMotion() ?? false
  const [selectedId, setSelectedId] = useState(defaultId)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onHash = () => {
      const id = window.location.hash.replace('#', '')
      setSelectedId(resolveSelectedId(applications.applications, defaultId, window.location.hash))
      if (applications.applications.some((app) => app.id === id)) {
        const section = document.getElementById('applications')
        if (section) {
          requestAnimationFrame(() => requestAnimationFrame(() => section.scrollIntoView()))
        }
      }
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onHash)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', onHash)
    }
  }, [applications.applications, defaultId])

  const tabsRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef<HTMLButtonElement>(null)
  const [tabsFade, setTabsFade] = useState({ left: false, right: false })

  const categories = groupByCategory(applications.applications)
  const active = applications.applications.find((app) => app.id === selectedId) ?? applications.applications[0]
  const activeCategoryIndex = Math.max(
    0,
    categories.findIndex(([, apps]) => apps.some((app) => app.id === active?.id)),
  )
  const activeCategory = categories[activeCategoryIndex]?.[0] ?? ''

  const updateTabsFade = useCallback(() => {
    const el = tabsRef.current
    if (!el) return
    setTabsFade({
      left: el.scrollLeft > 1,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    })
  }, [])

  useEffect(() => {
    const strip = tabsRef.current
    const tab = activeTabRef.current
    if (!strip || !tab) return
    const left = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2
    strip.scrollTo({ left, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }, [selectedId, shouldReduceMotion])

  useEffect(() => {
    const el = tabsRef.current
    if (!el) return
    updateTabsFade()
    const observer = new ResizeObserver(updateTabsFade)
    observer.observe(el)
    for (const child of el.children) observer.observe(child)
    return () => observer.disconnect()
  }, [selectedId, updateTabsFade])

  const prevCategoryRef = useRef('')
  useEffect(() => {
    const el = tabsRef.current
    const isNewCategory = prevCategoryRef.current !== activeCategory
    prevCategoryRef.current = activeCategory
    if (!el || shouldReduceMotion || !isNewCategory) return
    let settle: number | undefined
    const nudge = window.setTimeout(() => {
      if (el.scrollWidth <= el.clientWidth + 1) return
      el.scrollBy({ left: 40, behavior: 'smooth' })
      settle = window.setTimeout(() => el.scrollBy({ left: -40, behavior: 'smooth' }), 500)
    }, 400)
    return () => {
      window.clearTimeout(nudge)
      window.clearTimeout(settle)
    }
  }, [activeCategory, shouldReduceMotion])

  if (!active) return null

  const activeCategoryApps = categories[activeCategoryIndex]?.[1] ?? []
  const tabsScrollable = tabsFade.left || tabsFade.right
  const tabsMask = tabsFade.left
    ? tabsFade.right
      ? 'linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)'
      : 'linear-gradient(to right, transparent 0, black 20px)'
    : tabsFade.right
      ? 'linear-gradient(to right, black calc(100% - 20px), transparent 100%)'
      : undefined

  const handleSelect = (id: string) => {
    const app = applications.applications.find((a) => a.id === id)
    if (app) {
      window.history.replaceState(null, '', app.href)
      setSelectedId(id)
    }
  }

  const handleCategorySelect = (event: MouseEvent<HTMLElement>, index: number) => {
    const details = event.currentTarget.closest('details')
    if (details) details.open = false
    const first = categories[index]?.[1]?.[0]
    if (!first || index === activeCategoryIndex) return
    handleSelect(first.id)
  }

  const scrollTabs = (direction: 1 | -1) => {
    tabsRef.current?.scrollBy({
      left: direction * 160,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section id="applications" className="scroll-mt-28 py-16">
      <Container>
        <div className="rounded-2xl border border-olive-950/10 bg-orca-mist dark:border-white/10 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
          <div className="sticky top-(--scroll-padding-top) z-20 flex flex-col gap-5 rounded-t-2xl border-b border-olive-950/10 bg-orca-mist px-5 py-5 sm:px-8 sm:py-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-10 lg:gap-y-5 dark:border-white/10 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
            <h2 className="font-display text-2xl text-orca-orange sm:text-3xl lg:text-4xl">Application Explorer</h2>

            <div className="flex max-w-full flex-col items-start gap-2 lg:items-end">
              <Details className="relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full px-3 py-1 text-sm/7 font-medium text-olive-950 transition-colors group-open:text-orca-orange hover:text-orca-orange focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none dark:text-white">
                  {categories[activeCategoryIndex]?.[0]}
                  <ChevronIcon
                    className="h-2 w-1.5 rotate-90 transition-transform group-open:-rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <div className="absolute top-full left-0 z-30 mt-2 w-56 rounded-xl bg-orca-page p-4 shadow-lg ring-1 ring-olive-950/10 lg:right-0 lg:left-auto dark:bg-olive-950 dark:ring-white/10">
                  <ul className="flex flex-col gap-2 text-sm/7" role="list">
                    {categories.map(([category], index) => (
                      <li key={category}>
                        <button
                          type="button"
                          onClick={(event) => handleCategorySelect(event, index)}
                          aria-current={index === activeCategoryIndex ? 'true' : undefined}
                          className={clsx(
                            'block w-full cursor-pointer text-left transition-colors focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none',
                            index === activeCategoryIndex
                              ? 'text-orca-orange'
                              : 'text-olive-950 hover:text-orca-orange dark:text-white',
                          )}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Details>

              <div className="flex max-w-full items-center gap-1">
                {tabsScrollable && (
                  <button
                    type="button"
                    onClick={() => scrollTabs(-1)}
                    aria-label="Scroll applications back"
                    className="shrink-0 cursor-pointer rounded-full p-1.5 text-olive-400 transition-colors hover:text-orca-orange focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none dark:text-orca-frost/60"
                  >
                    <ChevronIcon className="h-2 w-1.5 rotate-180" aria-hidden="true" />
                  </button>
                )}
                <div
                  ref={tabsRef}
                  onScroll={updateTabsFade}
                  style={{ maskImage: tabsMask, WebkitMaskImage: tabsMask }}
                  className="relative flex max-w-56 snap-x snap-proximity scrollbar-none gap-1 overflow-x-auto sm:max-w-64"
                >
                  {activeCategoryApps.map((app) => {
                    const isActive = app.id === active.id
                    return (
                      <button
                        key={app.id}
                        type="button"
                        ref={isActive ? activeTabRef : undefined}
                        onClick={() => handleSelect(app.id)}
                        aria-current={isActive ? 'true' : undefined}
                        aria-controls="application-explorer-detail"
                        className={clsx(
                          'relative shrink-0 cursor-pointer snap-center px-2.5 py-1.5 font-display text-sm/6 whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none',
                          isActive
                            ? 'font-semibold text-olive-950 dark:text-white'
                            : 'text-olive-500 hover:text-olive-950 dark:text-orca-frost/70 dark:hover:text-white',
                        )}
                      >
                        {app.shortLabel ?? app.title}
                        {isActive && (
                          <motion.span
                            layoutId="active-application-indicator"
                            className="absolute inset-x-2.5 bottom-0 h-0.5 bg-orca-orange"
                            transition={
                              shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }
                            }
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
                {tabsScrollable && (
                  <button
                    type="button"
                    onClick={() => scrollTabs(1)}
                    aria-label="Scroll applications forward"
                    className="shrink-0 cursor-pointer rounded-full p-1.5 text-olive-400 transition-colors hover:text-orca-orange focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none dark:text-orca-frost/60"
                  >
                    <ChevronIcon className="h-2 w-1.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div id="application-explorer-detail" className="p-5 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gap-6 sm:gap-8"
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="font-display text-3xl text-olive-950 sm:text-4xl dark:text-white">
                    {active.headline}
                  </h3>
                  <p className="max-w-3xl text-sm/6 text-olive-700 sm:text-base/7 dark:text-orca-frost">
                    {active.description.split('\n\n')[0]}
                  </p>
                </div>

                {active.blueprint ? (
                  <ApplicationBlueprintPanel blueprint={active.blueprint} />
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      <span className="text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-orca-frost">
                        Workflow
                      </span>
                      <WorkflowStepper
                        workflow={{
                          title: active.shortLabel ?? active.title,
                          steps: active.workflowSteps.map((step, i) => ({
                            id: `${active.id}-step-${i}`,
                            title: step,
                          })),
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div className="flex flex-col gap-2">
                        <span className="text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-orca-frost">
                          Working context
                        </span>
                        <ul className="flex flex-col gap-1">
                          {active.contextItems.map((item) => (
                            <li key={item} className="text-sm/6 text-olive-700 dark:text-orca-frost">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-orca-frost">
                          Built for
                        </span>
                        <ul className="flex flex-col gap-1">
                          {active.roles.map((role) => (
                            <li key={role} className="text-sm/6 text-olive-700 dark:text-orca-frost">
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-orca-frost">
                          Works across
                        </span>
                        <ul className="flex flex-col gap-1">
                          {active.systems.map((system) => (
                            <li key={system} className="text-sm/6 text-olive-700 dark:text-orca-frost">
                              {system}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                <ButtonLink
                  href={active.cta.href}
                  size="lg"
                  target={active.cta.type === 'external' ? '_blank' : undefined}
                  rel={active.cta.type === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {active.cta.label}
                </ButtonLink>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {integrations && <SolutionIntegrationsRail integrations={integrations} />}
      </Container>
    </section>
  )
}
