'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Container } from './elements/container'
import { Text } from './elements/text'
import { ChevronIcon } from './icons/chevron-icon'

const tabs = [
  {
    id: 'platform',
    title: 'Orcaworks Platform',
    description:
      'Enterprise AI Control Plane: Orcaworks explicitly declares, tests, and enforces policies, permissions, and decision logic before any action occurs, ensuring every AI-driven task follows approved rules and stays aligned with enterprise standards.',
    image: '/img/platform/Enterprise-Grade-AI-Stack.jpg',
  },
  {
    id: 'context',
    title: 'Trusted Context',
    description:
      'Trusted Context for Decisions: Orcaworks connects to knowledge bases and real-time systems, injecting the exact data agents need at execution so outcomes stay grounded in truth and free from hallucination.',
    image: '/img/platform/Trusted-Context-That-Drives-Decisions.jpg',
  },
  {
    id: 'outcomes',
    title: 'Predictable Outcomes',
    description:
      'Deterministic Manifests: Orcaworks maps exactly how a process should run using declarative manifests, guaranteeing complex workflows execute consistently every time for mission-critical enterprise operations.',
    image: '/img/platform/Deterministic-Manifests-Achieve.jpg',
  },
  {
    id: 'governance',
    title: 'Built-in Governance',
    description:
      'Automated Compliance and Policy Enforcement: Governance is baked into the execution layer, not added as an afterthought. Orcaworks automatically checks every action against corporate policies and regulatory requirements, flagging risks and blocking unauthorized actions in real-time.',
    image: '/img/platform/Governance-Built-Into-Execution.jpg',
  },
  {
    id: 'observability',
    title: 'Observability',
    description:
      'Full Visibility into Every Run: Orcaworks provides an audit-ready trail of every decision and action, with detailed logging and monitoring that makes troubleshooting and compliance reporting seamless.',
    image: '/img/platform/Full-Visibility-Into-Every-Run.jpg',
  },
  {
    id: 'embedded',
    title: 'Works Alongside You',
    description:
      'Execution Embedded in Your Systems: Orca works inside CRMs, ERPs, ITSM platforms, and document tools, coordinating actions without pulling teams into new interfaces or breaking existing workflows.',
    image: '/img/platform/Execution-Embedded-Where-Work-Happens.jpg',
  },
]

export function FeatureTabs({ className }: { className?: string }) {
  const [active, setActive] = useState(0)

  return (
    <section className={className}>
      <Container className="flex flex-col gap-6 py-16">
        <h2 className="max-w-3xl text-[32px] leading-10 font-bold text-olive-950 dark:text-white">
          Govern every workflow. Orchestrate every agent.
        </h2>

        <div className="flex flex-col gap-0">
          <div className="rounded-sm border border-olive-950/20 p-2.5 dark:border-white/20">
            <div className="grid grid-cols-2 divide-x divide-olive-950/20 md:grid-cols-3 lg:grid-cols-6 dark:divide-white/20">
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex h-full w-full items-center justify-center gap-1.5 px-4 py-2 text-center text-base transition-colors ${
                    active === i
                      ? 'bg-orca-orange text-olive-950'
                      : 'text-olive-700 hover:bg-orca-orange/10 hover:text-olive-950 dark:text-olive-300 dark:hover:text-white'
                  }`}
                >
                  {tab.title}
                  <ChevronIcon className="h-2 w-2 rotate-90" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-olive-950/20 p-6 dark:border-white/20">
            <Text>{tabs[active].description}</Text>
          </div>

          <div className="rounded-sm border border-olive-950/20 p-0 dark:border-white/20">
            <Image
              key={tabs[active].image}
              src={tabs[active].image}
              alt={tabs[active].title}
              unoptimized
              width={1200}
              height={675}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
