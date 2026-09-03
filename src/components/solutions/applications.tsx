'use client'

import { useEffect, useState } from 'react'

import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { clsx } from 'clsx/lite'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import type {
  SolutionApplication,
  SolutionApplications as SolutionApplicationsData,
  SolutionIntegrations,
} from '@/lib/solutions'

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
    <section
      id="applications"
      className="scroll-mt-28 bg-orca-mist py-24 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]"
    >
      <Container>
        <div className="rounded-2xl border border-olive-950/10 dark:border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="border-b border-olive-950/10 p-8 lg:sticky lg:top-28 lg:col-span-4 lg:self-start lg:border-r lg:border-b-0 dark:border-white/10">
              <div className="flex flex-col gap-4">
                <Eyebrow variant="brand">{applications.eyebrow}</Eyebrow>
                <h2 className="font-display text-3xl text-olive-950 sm:text-4xl dark:text-white">
                  Application Explorer
                </h2>
                <p className="text-base/7 text-olive-700 dark:text-olive-300">{applications.intro}</p>
              </div>

              <nav aria-label="Applications" className="mt-8">
                <div className="flex flex-col gap-8">
                  {categories.map(([category, apps]) => (
                    <div key={category} className="flex flex-col gap-4">
                      <Eyebrow variant="brand">{category}</Eyebrow>
                      <ul className="flex flex-col gap-2" role="list">
                        {apps.map((app) => {
                          const isActive = app.id === active.id
                          return (
                            <li key={app.id}>
                              <button
                                type="button"
                                onClick={() => handleSelect(app.id)}
                                aria-current={isActive ? 'true' : undefined}
                                className={clsx(
                                  'group relative w-full rounded-lg px-4 py-3 text-left transition-colors',
                                  isActive
                                    ? 'font-semibold text-olive-950 dark:text-white'
                                    : 'text-olive-700 hover:text-olive-950 dark:text-olive-300 dark:hover:text-white',
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
                                <span className="block font-display text-lg">{app.shortLabel ?? app.title}</span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </nav>
            </div>

            <div className="p-8 lg:col-span-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-4">
                    <Eyebrow variant="brand">{active.categoryEyebrow ?? active.category}</Eyebrow>
                    <h3 className="font-display text-3xl text-olive-950 sm:text-4xl dark:text-white">
                      {active.headline}
                    </h3>
                    <p className="text-base/7 whitespace-pre-line text-olive-700 dark:text-olive-300">
                      {active.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-olive-400">
                      Workflow
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {active.workflowSteps.map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="shrink-0 rounded-full border border-olive-950/20 px-3 py-1 text-sm/6 whitespace-nowrap text-olive-950 dark:border-white/20 dark:text-white">
                            {step}
                          </span>
                          {i < active.workflowSteps.length - 1 && (
                            <ArrowNarrowRightIcon className="h-4 w-4 shrink-0 text-orca-orange" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-olive-400">
                        Working context
                      </span>
                      <ul className="flex flex-col gap-1">
                        {active.contextItems.map((item) => (
                          <li key={item} className="text-sm/6 text-olive-700 dark:text-olive-300">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-olive-400">
                        Built for
                      </span>
                      <ul className="flex flex-col gap-1">
                        {active.roles.map((role) => (
                          <li key={role} className="text-sm/6 text-olive-700 dark:text-olive-300">
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-olive-400">
                        Works across
                      </span>
                      <ul className="flex flex-col gap-1">
                        {active.systems.map((system) => (
                          <li key={system} className="text-sm/6 text-olive-700 dark:text-olive-300">
                            {system}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <ButtonLink
                    href={active.cta.href}
                    color="brand"
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
        </div>

        {integrations && <SolutionIntegrationsRail integrations={integrations} />}
      </Container>
    </section>
  )
}
