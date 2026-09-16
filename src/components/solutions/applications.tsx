'use client'

import { Fragment, useEffect, useState } from 'react'

import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
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
          requestAnimationFrame(() => section.scrollIntoView())
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

  const active = applications.applications.find((app) => app.id === selectedId) ?? applications.applications[0]
  if (!active) return null

  const handleSelect = (id: string) => {
    const app = applications.applications.find((a) => a.id === id)
    if (app) {
      window.history.replaceState(null, '', app.href)
      setSelectedId(id)
    }
  }

  const categories = groupByCategory(applications.applications)

  return (
    <section id="applications" className="scroll-mt-28 py-16">
      <Container>
        <div className="rounded-2xl border border-olive-950/10 bg-orca-mist dark:border-white/10 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="border-b border-olive-950/10 p-5 sm:p-8 lg:sticky lg:top-(--scroll-padding-top) lg:col-span-4 lg:flex lg:max-h-[calc(100dvh-var(--scroll-padding-top)-2rem)] lg:flex-col lg:self-start lg:border-r lg:border-b-0 dark:border-white/10">
              <div className="flex flex-col gap-3 sm:gap-4 lg:shrink-0">
                <Eyebrow variant="brand">{applications.eyebrow}</Eyebrow>
                <h2 className="font-display text-2xl text-olive-950 sm:text-3xl lg:text-4xl dark:text-white">
                  Application Explorer
                </h2>
                <p className="text-sm/6 text-olive-700 sm:text-base/7 dark:text-orca-frost">
                  Select an application to explore its governed workflow.
                </p>
              </div>

              <nav aria-label="Applications" className="mt-6 sm:mt-8 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
                {/* Mobile: horizontal scrollable tabs */}
                <div className="-mx-5 flex scroll-px-5 gap-1 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden">
                  {applications.applications.map((app) => {
                    const isActive = app.id === active.id
                    return (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => handleSelect(app.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={clsx(
                          'shrink-0 cursor-pointer snap-start rounded-lg px-3 py-2 font-display text-sm/6 whitespace-nowrap transition-colors',
                          isActive
                            ? 'font-semibold text-olive-950 dark:text-white'
                            : 'text-olive-700 hover:text-olive-950 dark:text-orca-frost dark:hover:text-white',
                        )}
                      >
                        {app.shortLabel ?? app.title}
                      </button>
                    )
                  })}
                </div>

                {/* Desktop: category list */}
                <ul className="hidden lg:flex lg:flex-col lg:gap-2" role="list">
                  {categories.map(([category, apps], categoryIndex) => (
                    <Fragment key={category}>
                      <li
                        className={clsx(
                          'mb-2',
                          categoryIndex > 0 && 'mt-6',
                          apps.some((app) => app.id === active.id) &&
                            'lg:sticky lg:top-0 lg:z-20 lg:bg-orca-mist lg:pb-1 lg:dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]',
                        )}
                      >
                        <Eyebrow variant="brand">{category}</Eyebrow>
                      </li>
                      {apps.map((app) => {
                        const isActive = app.id === active.id
                        return (
                          <li key={app.id} className={clsx(isActive && 'lg:sticky lg:top-8 lg:z-10')}>
                            <button
                              type="button"
                              onClick={() => handleSelect(app.id)}
                              aria-current={isActive ? 'true' : undefined}
                              className={clsx(
                                'group relative flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors sm:px-4 sm:py-3',
                                isActive
                                  ? 'bg-white font-semibold text-olive-950 shadow-sm ring-1 ring-olive-950/10 dark:bg-olive-800 dark:text-white dark:ring-white/10'
                                  : 'bg-white/50 text-olive-700 ring-1 ring-olive-950/10 hover:bg-white hover:text-olive-950 dark:bg-white/5 dark:text-orca-frost dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white',
                              )}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="active-application-indicator"
                                  className="absolute top-0 left-0 h-full w-1 rounded-l-lg bg-orca-orange"
                                  transition={
                                    shouldReduceMotion
                                      ? { duration: 0 }
                                      : { type: 'spring', stiffness: 400, damping: 30 }
                                  }
                                />
                              )}
                              <span className="font-display text-base sm:text-lg">{app.shortLabel ?? app.title}</span>
                              <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                aria-hidden="true"
                                className={clsx(
                                  'size-4 shrink-0 transition-colors',
                                  isActive
                                    ? 'text-orca-orange'
                                    : 'text-olive-400 group-hover:text-orca-orange dark:text-orca-frost/50',
                                )}
                              >
                                <path
                                  d="M6 3.5L10.5 8L6 12.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </li>
                        )
                      })}
                    </Fragment>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="p-5 sm:p-8 lg:col-span-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col gap-6 sm:gap-8"
                >
                  <div className="z-10 -mx-5 -mt-5 flex flex-col gap-4 border-b border-olive-950/10 bg-orca-mist px-5 pt-5 pb-5 sm:-mx-8 sm:-mt-8 sm:px-8 sm:pt-8 sm:pb-6 lg:sticky lg:top-(--scroll-padding-top) dark:border-white/10 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
                    <Eyebrow variant="brand">{active.shortLabel ?? active.title}</Eyebrow>
                    <h3 className="font-display text-3xl text-olive-950 sm:text-4xl dark:text-white">
                      {active.headline}
                    </h3>
                  </div>

                  <div className="relative z-0 flex flex-col gap-6 sm:gap-8">
                    <p className="text-base/7 whitespace-pre-line text-olive-700 dark:text-orca-frost">
                      {active.description}
                    </p>

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
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {integrations && <SolutionIntegrationsRail integrations={integrations} />}
      </Container>
    </section>
  )
}
