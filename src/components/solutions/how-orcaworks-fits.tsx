'use client'

import { Eyebrow } from '@/components/elements/eyebrow'
import { Section } from '@/components/elements/section'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { clsx } from 'clsx/lite'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

import type { SolutionHowOrcaworksFits, SolutionHowOrcaworksFitsCard } from '@/lib/solutions'

const cardPositions = [
  'lg:col-start-1 lg:row-span-2',
  'lg:col-start-2',
  'lg:col-start-2 lg:row-start-2',
  'lg:col-start-3 lg:row-span-2',
]

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function SystemStackVisual({ items }: { items: string[] }) {
  return (
    <div className="flex w-full max-w-[16rem] flex-col items-stretch gap-2">
      {items.map((label) => (
        <div
          key={label}
          className="rounded-lg border border-olive-950/10 bg-olive-50 px-4 py-2 text-center text-sm/6 font-medium text-olive-950 dark:border-white/10 dark:bg-olive-950 dark:text-white"
        >
          {label}
        </div>
      ))}
      <div className="mt-1 text-center text-xs/4 font-semibold tracking-wider text-olive-600 uppercase dark:text-olive-400">
        Systems of record
      </div>
    </div>
  )
}

function BlueprintVisual({ items }: { items: string[] }) {
  return (
    <div className="flex w-full max-w-[20rem] flex-col items-center gap-4">
      <div className="rounded-xl border border-olive-950/10 bg-olive-50 px-5 py-2.5 text-center text-sm/6 font-semibold text-olive-950 dark:border-white/10 dark:bg-olive-950 dark:text-white">
        Operating Blueprint
      </div>
      <ArrowNarrowRightIcon className="h-5 w-5 rotate-90 text-orca-orange" />
      <div className="grid w-full grid-cols-2 gap-2">
        {items.map((label) => (
          <div
            key={label}
            className="rounded-lg border border-olive-950/10 bg-white px-2 py-2 text-center text-sm/5 font-medium text-olive-950 dark:border-white/10 dark:bg-olive-950 dark:text-white"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageVisual({ image, darkImage }: { image: string; darkImage?: string }) {
  return (
    <div className="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
      <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover dark:hidden" />
      <Image
        src={darkImage ?? image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover not-dark:hidden"
      />
    </div>
  )
}

function CardVisual({ card }: { card: SolutionHowOrcaworksFitsCard }) {
  switch (card.visualType) {
    case 'system-stack':
      return <SystemStackVisual items={card.items} />
    case 'blueprint':
      return <BlueprintVisual items={card.items} />
    case 'image':
      return card.image ? <ImageVisual image={card.image} darkImage={card.darkImage} /> : null
    default:
      return null
  }
}

function BentoCard({ card, index }: { card: SolutionHowOrcaworksFitsCard; index: number }) {
  const shouldReduceMotion = useReducedMotion() ?? false
  const hasVisual = card.visualType === 'system-stack' || card.visualType === 'blueprint' || card.visualType === 'image'
  const visualOnTop = index === 3

  return (
    <motion.div
      variants={item}
      whileHover={shouldReduceMotion ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={clsx(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-olive-950/10 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8 dark:border-white/10 dark:bg-olive-900',
        cardPositions[index],
      )}
    >
      {hasVisual && visualOnTop && (
        <div className="mb-6 flex items-center justify-center">
          <CardVisual card={card} />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Eyebrow variant="brand" className="text-xs/4 font-semibold tracking-wider uppercase">
          {card.eyebrow}
        </Eyebrow>
        <h3 className="font-display text-xl/7 text-olive-950 dark:text-white">{card.heading}</h3>
        <p className="text-sm/6 text-olive-700 dark:text-olive-300">{card.body}</p>
      </div>
      {hasVisual && !visualOnTop && (
        <div className="mt-6 flex items-center justify-center">
          <CardVisual card={card} />
        </div>
      )}
    </motion.div>
  )
}

export function HowOrcaworksFitsSection({ fits }: { fits: SolutionHowOrcaworksFits }) {
  const shouldReduceMotion = useReducedMotion() ?? false

  return (
    <Section
      id="how-orcaworks-fits"
      eyebrow={fits.eyebrow}
      eyebrowVariant="brand"
      headline={fits.heading}
      subheadline={fits.intro}
      className="py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2"
      >
        {fits.cards.map((card, index) => (
          <BentoCard key={card.id} card={card} index={index} />
        ))}
      </motion.div>
    </Section>
  )
}
