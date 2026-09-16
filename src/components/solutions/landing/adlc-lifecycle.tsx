'use client'

import { clsx } from 'clsx/lite'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'

import { adlcStages } from './adlc-stages'
import { AdlcStageVisual } from './adlc-visuals'

/**
 * The Agentic Development Lifecycle: a sticky stage index on the left tracking a
 * scroll-driven sequence of stage canvases on the right. On small screens the
 * same stages render as a railed vertical sequence. All stage content is always
 * rendered — scroll position only drives emphasis, never disclosure.
 */
export function AdlcLifecycle() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion() ?? false
  const stageRefs = useRef<(HTMLElement | null)[]>([])

  // Align the stage heading with the clicked index label rather than the
  // article's top edge (stage content is vertically centered in its block).
  const scrollToStage = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const article = document.getElementById(`adlc-stage-${id}`)
    if (!article) return
    event.preventDefault()
    const target = article.querySelector('h3') ?? article
    const anchorRect = event.currentTarget.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const top = window.scrollY + targetRect.top - anchorRect.top - (anchorRect.height - targetRect.height) / 2
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
    window.history.replaceState(null, '', `#adlc-stage-${id}`)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = stageRefs.current.indexOf(entry.target as HTMLElement)
            if (index >= 0) setActive(index)
          }
        }
      },
      // A stage is "active" while it occupies the middle band of the viewport.
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )
    for (const el of stageRefs.current) {
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const progress = adlcStages.length > 1 ? active / (adlcStages.length - 1) : 0

  return (
    <section id="lifecycle" className="scroll-mt-24 pb-16 sm:pb-24">
      <Container>
        {/* A hairline + whitespace carry the industries → lifecycle transition. */}
        <div aria-hidden="true" className="h-px w-full bg-olive-950/10 dark:bg-white/10" />
        <div className="mt-16 flex max-w-2xl flex-col gap-6 sm:mt-24">
          <div className="flex flex-col gap-2">
            <Eyebrow variant="brand">AGENTIC DEVELOPMENT LIFECYCLE</Eyebrow>
            <Subheading>From business process to production AI.</Subheading>
          </div>
          <Text className="text-pretty">
            The Orcaworks Agentic Development Lifecycle takes a workflow from operational understanding to a declared,
            tested and governed application — then uses production evidence to improve it deliberately.
          </Text>
        </div>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* Desktop: sticky lifecycle index */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <ol role="list" className="relative flex flex-col">
                {/* Track + progress between the first and last markers */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 bottom-4 left-1.25 w-px bg-olive-950/10 dark:bg-white/10"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-1.25 w-px bg-orca-orange transition-[height] duration-300 motion-reduce:transition-none dark:bg-orca-orange"
                  style={{ height: `calc((100% - 2rem) * ${progress})` }}
                />
                {adlcStages.map((stage, i) => {
                  const isActive = i === active
                  const isPassed = i < active
                  return (
                    <li key={stage.id}>
                      <a
                        href={`#adlc-stage-${stage.id}`}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={(event) => scrollToStage(event, stage.id)}
                        className="group flex items-center gap-4 py-4 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:outline-none"
                      >
                        <span
                          aria-hidden="true"
                          className={clsx(
                            'relative z-10 h-2.75 w-2.75 shrink-0 rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none',
                            isActive
                              ? 'border-orca-orange bg-orca-orange'
                              : isPassed
                                ? 'border-orca-orange bg-orca-page dark:bg-olive-950'
                                : 'border-olive-950/20 bg-orca-page dark:border-white/20 dark:bg-olive-950',
                          )}
                        />
                        <span className="flex items-baseline gap-3">
                          <span
                            className={clsx(
                              'text-xs/6 tabular-nums transition-colors duration-300 motion-reduce:transition-none',
                              isActive || isPassed
                                ? 'text-orca-link dark:text-orca-orange'
                                : 'text-olive-400 dark:text-orca-frost/50',
                            )}
                          >
                            {stage.number}
                          </span>
                          <span
                            className={clsx(
                              'font-display text-xl/7 tracking-wide transition-colors duration-300 motion-reduce:transition-none',
                              isActive
                                ? 'font-medium text-olive-950 dark:text-white'
                                : isPassed
                                  ? 'text-olive-800 dark:text-orca-frost'
                                  : 'text-olive-400 group-hover:text-olive-700 dark:text-orca-frost/50 dark:group-hover:text-orca-frost',
                            )}
                          >
                            {stage.label}
                          </span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ol>
              <p className="mt-6 flex items-center gap-2 text-xs/5 text-olive-500 dark:text-orca-frost/70">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path d="M20 12a8 8 0 1 1-2.34-5.66" strokeLinecap="round" />
                  <path d="M20 4v4h-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Improve feeds the next definition.
              </p>
            </div>
          </div>

          {/* Stage sequence */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-12 lg:gap-0">
              {adlcStages.map((stage, i) => (
                <article
                  key={stage.id}
                  id={`adlc-stage-${stage.id}`}
                  ref={(el) => {
                    stageRefs.current[i] = el
                  }}
                  className="relative scroll-mt-28 border-l border-olive-950/15 pl-6 lg:flex lg:min-h-[60vh] lg:flex-col lg:justify-center lg:border-0 lg:py-8 lg:pl-0 dark:border-white/15"
                >
                  {/* Mobile rail marker */}
                  <span
                    aria-hidden="true"
                    className={clsx(
                      'absolute top-1 -left-1.5 h-2.75 w-2.75 rounded-full border-2 lg:hidden',
                      i === active
                        ? 'border-orca-orange bg-orca-orange'
                        : 'border-olive-950/20 bg-orca-page dark:border-white/20 dark:bg-olive-950',
                    )}
                  />
                  <div className="mb-4 flex items-baseline gap-3 lg:hidden">
                    <span className="text-xs/6 text-orca-link tabular-nums dark:text-orca-orange">{stage.number}</span>
                    <span className="font-display text-base/7 font-medium tracking-wide text-olive-950 dark:text-white">
                      {stage.label}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl/8 font-medium tracking-[-0.02em] text-pretty text-olive-950 dark:text-white">
                    {stage.headline}
                  </h3>
                  <p className="mt-3 max-w-xl text-base/7 text-pretty text-olive-700 dark:text-orca-frost">
                    {stage.description}
                  </p>
                  <div className="mt-6">
                    <AdlcStageVisual type={stage.visual} ident={stage.number} />
                  </div>
                  <p className="mt-3 flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-orca-orange" />
                    <span className="text-xs/5 font-semibold tracking-[0.14em] text-olive-500 uppercase dark:text-orca-frost/70">
                      {stage.artifact}
                    </span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Governance spans the lifecycle rather than sitting at the end. */}
        <div className="mt-12 flex items-center gap-4 sm:mt-16">
          <span aria-hidden="true" className="h-px flex-1 bg-olive-950/10 dark:bg-white/10" />
          <span className="text-xs/5 font-semibold tracking-[0.2em] text-olive-500 uppercase dark:text-orca-frost/70">
            Governance · Human control · Traceability
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-olive-950/10 dark:bg-white/10" />
        </div>
      </Container>
    </section>
  )
}
