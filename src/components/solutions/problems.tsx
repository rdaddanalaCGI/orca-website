'use client'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { MinusIcon } from '@/components/icons/minus-icon'
import { PlusIcon } from '@/components/icons/plus-icon'
import { clsx } from 'clsx/lite'
import { useState } from 'react'

import type { SolutionProblems } from '@/lib/solutions'

export function SolutionProblems({ problems }: { problems: SolutionProblems }) {
  const [open, setOpen] = useState<string | null>(problems.cards[0]?.eyebrow ?? null)

  return (
    <section id="problems" className="py-16">
      <Container className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="flex flex-col gap-6 self-start">
          <Subheading>{problems.heading}</Subheading>
          <Text className="text-pretty">{problems.intro}</Text>
        </div>

        <div className="divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
          {problems.cards.map((card) => {
            const isOpen = open === card.eyebrow
            return (
              <div key={card.eyebrow}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : card.eyebrow)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-4 text-left"
                >
                  <span className="flex flex-col items-start gap-1">
                    <Eyebrow variant="brand">{card.eyebrow}</Eyebrow>
                    <span className="font-display text-lg text-olive-950 dark:text-white">{card.heading}</span>
                  </span>
                  {isOpen ? (
                    <MinusIcon className="h-5 w-5 text-olive-950 dark:text-white" />
                  ) : (
                    <PlusIcon className="h-5 w-5 text-olive-950 dark:text-white" />
                  )}
                </button>

                {isOpen && (
                  <div className="-mt-2 flex flex-col gap-4 pr-12 pb-4">
                    <Text className="text-pretty whitespace-pre-line">{card.body}</Text>
                    {card.terms && card.terms.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {card.terms.map((term) => (
                          <span
                            key={term}
                            className={clsx(
                              'rounded-full bg-olive-950/5 px-2.5 py-1 text-xs/5 font-medium text-olive-700',
                              'dark:bg-white/10 dark:text-olive-400',
                            )}
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
