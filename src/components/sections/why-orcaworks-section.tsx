'use client'

import { ButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Section } from '@/components/elements/section'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

type BentoCard = {
  eyebrow: string
  heading: string
  text: string
  image: string
  darkImage: string
}

const cards: BentoCard[] = [
  {
    eyebrow: 'OPERATING BLUEPRINT',
    heading: 'Define the whole application from one understanding of the work.',
    text: 'Capture the business context, workflow, system actions, human decisions and experience together—so every part of the application is built from the same operating blueprint.',
    image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-performance.png',
    darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-performance.png',
  },
  {
    eyebrow: 'FASTER DELIVERY',
    heading: 'Move from discovery to working software faster.',
    text: 'Because context, execution, controls and experience share the same blueprint, teams spend less time rebuilding and reconnecting each layer of every new application.',
    image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-releases.png',
    darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-releases.png',
  },
  {
    eyebrow: 'CONNECTED CONTEXT',
    heading: 'AI has the same view of the work as you.',
    text: 'Bring the right information together, preserve access controls, and give agents and users the same governed context.',
    image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-speed.png',
    darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-speed.png',
  },
  {
    eyebrow: 'GOVERNED EXECUTION',
    heading: 'AI knows what to do—and when to hand off.',
    text: 'Coordinate agents, system actions and human decisions in one governed workflow, with clear boundaries for what happens next.',
    image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-network.png',
    darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-network.png',
  },
  {
    eyebrow: 'WHERE WORK HAPPENS',
    heading: 'Works where your teams already work.',
    text: 'Bring governed workflows into Teams, Outlook, Chrome and your enterprise systems—without forcing people into another application.',
    image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
    darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
  },
]

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}

const imageVariants = {
  rest: { scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.025, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

function BentoCardItem({ card, index }: { card: BentoCard; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const topRow = index < 2
  const rowDelay = topRow ? 0 : 0.25
  const delay = rowDelay + (topRow ? index : index - 2) * 0.08
  const sizes = index < 2 ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 100vw, 33vw'

  const content = (
    <>
      <div className="relative h-56 w-full overflow-hidden">
        {shouldReduceMotion ? (
          <>
            <Image src={card.image} alt="" fill sizes={sizes} className="object-cover dark:hidden" />
            <Image src={card.darkImage} alt="" fill sizes={sizes} className="object-cover not-dark:hidden" />
          </>
        ) : (
          <motion.div className="relative h-56 w-full overflow-hidden" variants={imageVariants}>
            <Image src={card.image} alt="" fill sizes={sizes} className="object-cover dark:hidden" />
            <Image src={card.darkImage} alt="" fill sizes={sizes} className="object-cover not-dark:hidden" />
          </motion.div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-8 pt-6">
        <span className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">{card.eyebrow}</span>
        <h3 className="font-display text-xl/8 text-olive-950 transition-colors duration-300 group-hover:text-orca-orange dark:text-white dark:group-hover:text-orca-orange">
          {card.heading}
        </h3>
        <p className="text-base/6 text-olive-700 dark:text-olive-400">{card.text}</p>
      </div>
    </>
  )

  if (shouldReduceMotion) {
    return (
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-olive-950/5 dark:bg-olive-900 dark:ring-white/10">
        {content}
      </div>
    )
  }

  return (
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-olive-950/5 transition-shadow duration-300 group-hover:shadow-md dark:bg-olive-900 dark:ring-white/10">
        {content}
      </div>
    </motion.div>
  )
}

function BentoCtaCard({ index }: { index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const rowDelay = 0.25
  const delay = rowDelay + (index - 2) * 0.08

  const content = (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
      <span className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">
        FROM BLUEPRINT TO PRODUCTION
      </span>
      <h3 className="max-w-2xl font-display text-2xl/8 text-olive-950 transition-colors duration-300 group-hover:text-orca-orange dark:text-white dark:group-hover:text-orca-orange">
        Move faster. Keep the work—and the controls—connected.
      </h3>
      <p className="max-w-2xl text-base/7 text-olive-700 dark:text-olive-400">
        One shared blueprint keeps context, execution, governance and experience aligned from discovery through
        production, giving you a faster path to enterprise AI without sacrificing control.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/agentic-automation-platform" color="dark/light" size="lg">
          Explore the platform <ArrowNarrowRightIcon />
        </ButtonLink>
        <Link href="/contact" color="brand">
          Talk to us <ArrowNarrowRightIcon />
        </Link>
      </div>
    </div>
  )

  if (shouldReduceMotion) {
    return (
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-olive-950/5 dark:bg-olive-900 dark:ring-white/10">
        {content}
      </div>
    )
  }

  return (
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-olive-950/5 transition-shadow duration-300 group-hover:shadow-md dark:bg-olive-900 dark:ring-white/10">
        {content}
      </div>
    </motion.div>
  )
}

export function WhyOrcaworksSection() {
  return (
    <Section
      id="why-orcaworks"
      surface="mist"
      eyebrow="WHY ORCAWORKS"
      eyebrowVariant="brand"
      headline="One blueprint. From how the work operates to how the application runs."
      subheadline={
        <>
          Orcaworks captures context, workflow, controls and user experience together—so applications can be delivered
          faster, stay aligned with the business and remain governed as AI takes on more work.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-6">
        {cards.map((card, i) => (
          <div key={card.eyebrow} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
            <BentoCardItem card={card} index={i} />
          </div>
        ))}
        <div className="lg:col-span-6">
          <BentoCtaCard index={5} />
        </div>
      </div>
    </Section>
  )
}
