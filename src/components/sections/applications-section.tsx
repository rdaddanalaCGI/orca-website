'use client'

import { Link } from '@/components/elements/link'
import { Section } from '@/components/elements/section'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { motion } from 'framer-motion'
import Image from 'next/image'
import NextLink from 'next/link'

type Application = {
  href: string
  vertical: string
  name: string
  problem: string
  useCases: string[]
  count: number
  image: string
}

const applications: Application[] = [
  {
    href: '/solutions/logistics-and-distribution#shipment-exceptions',
    vertical: 'LOGISTICS',
    name: 'Shipment Exception Resolution',
    problem:
      'When a shipment goes off plan, operations teams chase updates across the TMS, carrier emails, PODs and warehouse systems before they can work out what happened and who needs to act.',
    useCases: ['Reconcile carrier updates', 'Verify warehouse status', 'Reroute and notify customers'],
    count: 6,
    image: '/img/verticals/logistics.jpeg',
  },
  {
    href: '/solutions/insurance#claims',
    vertical: 'INSURANCE',
    name: 'Claims Investigation',
    problem:
      'Adjusters have to piece together claim data, correspondence, medical records and supporting evidence across multiple systems before they can make a defensible decision.',
    useCases: ['Build the claim evidence pack', 'Identify missing evidence', 'Prepare issues for adjuster review'],
    count: 7,
    image: '/img/verticals/insurance.jpeg',
  },
  {
    href: '/solutions/credit-unions-specialty-lending#client-onboarding',
    vertical: 'CREDIT UNIONS',
    name: 'Client Onboarding & KYC',
    problem:
      'Onboarding teams manually verify customer identity, source documents, risk signals and policy exceptions across KYC portals, email and internal systems before an account can be approved.',
    useCases: ['Assemble KYC evidence', 'Flag missing documents', 'Route exceptions to compliance'],
    count: 5,
    image: '/img/verticals/fintech.jpeg',
  },
  {
    href: '/solutions/clinical-research-organisations#prior-authorization',
    vertical: 'CRO',
    name: 'Prior Authorization',
    problem:
      'Care coordinators collect clinical notes, patient history, payer policies and formulary rules from EHRs, faxes and portals before a prior authorization request can be submitted cleanly.',
    useCases: ['Build the auth packet', 'Check coverage and formulary', 'Track status and appeal'],
    count: 6,
    image: '/img/verticals/healthtech.png',
  },
  {
    href: '/solutions/architecture-construction-engineering#project-coordination',
    vertical: 'ACE',
    name: 'Project Coordination',
    problem:
      'Project managers pull RFIs, submittals, field reports and schedule updates from email, project tools and shared drives before they can see what is blocked and who must act.',
    useCases: [
      'Compile the daily field report',
      'Track open RFIs and submittals',
      'Route issues to the responsible party',
    ],
    count: 6,
    image: '/img/verticals/aec.jpeg',
  },
]

const cardVariants = { rest: {}, hover: {} }
const imageVariants = { rest: { scale: 1 }, hover: { scale: 1.05 } }
const useCaseVariants = { rest: { opacity: 0, height: 0 }, hover: { opacity: 1, height: 'auto' } }
const arrowVariants = { rest: { x: 0 }, hover: { x: 4 } }
const lineVariants = { rest: { width: 0 }, hover: { width: 48 } }

function ApplicationCard({ application }: { application: Application }) {
  return (
    <NextLink href={application.href} className="group block h-full">
      <motion.div
        className="flex h-full flex-col overflow-hidden rounded-lg bg-olive-950/2.5 ring-1 ring-olive-950/5 dark:bg-white/5 dark:ring-white/10"
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
            <Image
              src={application.image}
              alt={application.name}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <div className="text-xs/4 font-semibold tracking-wider text-orca-orange uppercase">
            {application.vertical}
          </div>
          <h3 className="font-display text-2xl/9 text-olive-950 dark:text-white">{application.name}</h3>
          <p className="text-base/7 text-olive-700 dark:text-olive-400">{application.problem}</p>

          <motion.div
            className="overflow-hidden"
            variants={useCaseVariants}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {application.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-2 text-sm/6 text-olive-700 dark:text-olive-400">
                  <span className="mt-2 h-1 w-1 rounded-full bg-orca-orange" aria-hidden />
                  {useCase}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-auto flex items-center justify-between gap-4">
            <div className="text-xs/4 font-semibold tracking-wider text-olive-700 uppercase dark:text-olive-400">
              {application.count} USE CASES
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
      <div className="grid gap-6 lg:grid-cols-3">
        {applications.map((application, i) => (
          <div key={application.href} className={i === 0 ? 'lg:col-span-2' : ''}>
            <ApplicationCard application={application} />
          </div>
        ))}
      </div>
    </Section>
  )
}
