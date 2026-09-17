'use client'

import { Link } from '@/components/elements/link'
import { Section } from '@/components/elements/section'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { VerticalImage } from '@/components/solutions/vertical-image'
import { getFeaturedVerticals, type FeaturedVertical } from '@/lib/solutions'
import { motion } from 'framer-motion'
import NextLink from 'next/link'

const verticals = getFeaturedVerticals()

const cardVariants = { rest: {}, hover: {} }
const imageVariants = { rest: { scale: 1 }, hover: { scale: 1.05 } }
const useCaseVariants = { rest: { opacity: 0, height: 0 }, hover: { opacity: 1, height: 'auto' } }
const arrowVariants = { rest: { x: 0 }, hover: { x: 4 } }
const lineVariants = { rest: { width: 0 }, hover: { width: 48 } }

function VerticalCard({ vertical }: { vertical: FeaturedVertical }) {
  return (
    <NextLink href={vertical.href} className="group block h-full">
      <motion.div
        className="flex h-full flex-col overflow-hidden rounded-lg bg-orca-mist ring-1 ring-olive-950/5 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))] dark:ring-white/10"
        initial="rest"
        whileHover="hover"
        variants={cardVariants}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <motion.div
            className="relative h-full w-full"
            variants={imageVariants}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <VerticalImage
              image={vertical.image}
              name={vertical.name}
              alt={vertical.name}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
          <div className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">{vertical.eyebrow}</div>
          <h3 className="font-display text-xl/8 text-olive-950 sm:text-2xl/9 dark:text-white">{vertical.headline}</h3>
          {vertical.subheadline && (
            <p className="text-sm/6 text-olive-700 sm:text-base/7 dark:text-orca-frost">{vertical.subheadline}</p>
          )}

          <div className="block lg:hidden">
            <ul className="flex flex-col gap-2">
              {vertical.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-2 text-sm/6 text-olive-700 dark:text-orca-frost">
                  <span className="mt-2 h-1 w-1 rounded-full bg-orca-orange" aria-hidden />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            className="hidden overflow-hidden lg:block"
            variants={useCaseVariants}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {vertical.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-2 text-sm/6 text-olive-700 dark:text-orca-frost">
                  <span className="mt-2 h-1 w-1 rounded-full bg-orca-orange" aria-hidden />
                  {useCase}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-auto flex items-center justify-between gap-4">
            <div className="text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-orca-frost">
              {vertical.count} USE CASES
            </div>
            <div className="inline-flex items-center gap-2 text-sm/7 font-medium text-olive-950 dark:text-white">
              Explore guide
              <motion.span variants={arrowVariants} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
                <ArrowNarrowRightIcon className="h-4 w-4" />
              </motion.span>
            </div>
          </div>

          <div className="h-0.5 bg-olive-950/10 dark:bg-white/10">
            <motion.div
              className="h-full bg-orca-orange"
              variants={lineVariants}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>
      </motion.div>
    </NextLink>
  )
}

export function ApplicationsSection() {
  return (
    <Section
      id="applications"
      eyebrow="APPLICATIONS"
      eyebrowVariant="brand"
      headline="Start with the work that matters."
      subheadline={
        <>
          Explore practical applications built around the operational problems, exceptions, evidence and decisions your
          teams deal with every day.
        </>
      }
      cta={
        <Link href="/solutions" color="brand">
          Explore all applications <ArrowNarrowRightIcon />
        </Link>
      }
    >
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {verticals.map((vertical, i) => (
          <div key={vertical.href} className={i === 0 ? 'lg:col-span-2' : ''}>
            <VerticalCard vertical={vertical} />
          </div>
        ))}
      </div>
    </Section>
  )
}
