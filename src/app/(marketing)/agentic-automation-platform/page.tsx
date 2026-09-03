import Image from 'next/image'

import { AnimatedCard } from '@/components/animated-card'
import { Carousel } from '@/components/carousel'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { EmailSignupForm } from '@/components/elements/email-signup-form'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Section } from '@/components/elements/section'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { FeatureTabs } from '@/components/feature-tabs'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Marquee } from '@/components/marquee'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { Faq } from '@/components/sections/faqs-accordion'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
import { HeroWithDemoOnBackground } from '@/components/sections/hero-with-demo-on-background'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Orca Lattice',
  description:
    'The Control Plane for Agentic Execution. Turn rules and context into governed, durable AI runs that are repeatable, auditable and on-policy.',
  path: '/agentic-automation-platform',
})

export default function Page() {
  return (
    <>
      <HeroWithDemoOnBackground
        id="hero"
        headline="The Control Plane for Agentic Execution"
        subheadline={
          <p>
            Turn rules and context into governed, durable AI runs. Orcaworks is the Declarative AI Execution Platform
            that defines, tests, and enforces how agents act across your systems—repeatable, auditable, inside the tools
            your teams already use.
          </p>
        }
        cta={
          <EmailSignupForm
            className="max-w-full"
            variant="overlay"
            cta={
              <>
                Request a demo <ArrowNarrowRightIcon />
              </>
            }
          />
        }
        demo={
          <Image
            unoptimized
            src="/img/orca-frontend/context-hub-mock.png"
            alt="Context hub mockup"
            width={3024}
            height={1556}
            priority
            className="h-full w-auto"
          />
        }
      />

      <Section id="delivery-model" surface="neutral" className="pt-4">
        <div className="grid grid-cols-1 items-start gap-10 rounded-3xl bg-orca-mist p-8 lg:grid-cols-2 lg:p-12 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
          <div className="flex flex-col gap-6">
            <Eyebrow variant="brand">Delivery Model</Eyebrow>
            <Subheading>The Orca Delivery Model: Platform + Services + Ecosystem</Subheading>
            <Text className="text-pretty">
              ROI first, not someday. Orcaworks pairs a declarative execution platform with hands-on experts to push AI
              into production fast. Self-serve, co-design, or partner—your policies stay in control. Enterprise-safe
              deployments in under 90 days. You do not build Orca alone: together we design governed workflows
              end-to-end, from blueprint to live, measurable outcomes.
            </Text>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink color="brand" href="/contact" size="md">
                Get started
              </ButtonLink>
              <PlainButtonLink href="/blog" size="md">
                Read insights <ArrowNarrowRightIcon />
              </PlainButtonLink>
            </div>
          </div>
          <div className="mt-10 divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
            <Faq
              question="Orca Studio"
              answer={
                <p>
                  Orca Studio is your command room: design, review, and operate your Orca without touching raw files.
                  Create and manage manifests, curate business context, and preview every step, so you know exactly what
                  will run before anything moves, with real confidence.
                </p>
              }
            />
            <Faq
              question="Orca Registry"
              answer={
                <p>
                  Orca Registry stores and governs manifests, using a DSL to encode rules, decisions, guardrails, and
                  execution paths as explicit, versioned artifacts, making AI behavior reviewable, testable, auditable,
                  and change-controlled across your enterprise through deployment.
                </p>
              }
            />
            <Faq
              question="Launchpod"
              answer={
                <p>
                  Launchpod takes Orca live and keeps it getting better. Flow Architects and Context Engineers co-design
                  high-impact flows, encode decisions, and embed them in your systems. After go-live, Launchpod iterates
                  safely, expanding coverage and measurable outcomes without disrupting operations today.
                </p>
              }
            />
            <Faq
              question="Lattice"
              answer={
                <p>
                  Lattice is where work actually runs. It applies your declarative logic and curated context to every
                  step, coordinates AI capabilities across multi-agent systems, and routes approvals to humans when
                  required. The result: consistent, on-policy outcomes at operational scale – traceable, repeatable, and
                  ready for audit.
                </p>
              }
            />
          </div>
        </div>
      </Section>

      <section id="problem" className="py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Subheading className="max-w-3xl">Struggling With AI Pilots That Drift Off-Policy?</Subheading>
          <Text size="lg" className="max-w-2xl">
            Deterministic agents that follow your playbook and deliver results your auditors can verify.
          </Text>
        </Container>
      </section>

      <FeaturesThreeColumn
        id="control-plane"
        features={
          <>
            <AnimatedCard index={0}>
              <Feature
                headline="A Control Plane, Not an Agentic Black Box."
                subheadline={
                  <p>
                    Orcaworks turns approved policies and trusted knowledge into deterministic workflows that run inside
                    your systems. It reads, decides, and acts—on policy, with full oversight and audit trails.
                  </p>
                }
              />
            </AnimatedCard>
            <AnimatedCard index={1}>
              <Feature
                headline="From Rules to Results."
                subheadline={
                  <p>
                    Encode business rules and context once. Orcaworks executes work end-to-end—no brittle scripts—so
                    outcomes are consistent, repeatable, and measurable across teams.
                  </p>
                }
              />
            </AnimatedCard>
            <AnimatedCard index={2}>
              <Feature
                headline="On-Policy by Design."
                subheadline={
                  <p>
                    Every action is permissioned, logged, and auditable. Human approvals where required; transparent
                    traces your auditors can verify.
                  </p>
                }
              />
            </AnimatedCard>
            <AnimatedCard index={3}>
              <Feature
                headline="Works Inside Your Stack."
                subheadline={
                  <p>
                    Runs directly in Outlook, SAP, Salesforce, Jira, and more—so your teams keep their tools and your
                    data stays governed.
                  </p>
                }
              />
            </AnimatedCard>
            <AnimatedCard index={4}>
              <Feature
                headline="Speed Without Losing Control."
                subheadline={
                  <p>
                    Faster cycle times, fewer errors, predictable through outcome-driven automation. Real work done
                    exactly the way your enterprise requires.
                  </p>
                }
              />
            </AnimatedCard>
            <AnimatedCard index={5}>
              <Feature
                headline="The Face and the Engine."
                subheadline={
                  <p>
                    If Orca is your digital coworker, Orcaworks is the brain and muscle behind it—executing safely,
                    consistently, and at scale.
                  </p>
                }
              />
            </AnimatedCard>
          </>
        }
      />

      <FeatureTabs />

      <Section id="platform-capabilities">
        <div className="flex flex-col items-center gap-6 text-center">
          <Subheading className="max-w-3xl">Platform Capabilities</Subheading>
          <Text size="lg" className="max-w-2xl">
            Orcaworks meets the toughest enterprise standards by fusing AI flexibility with the rigor of software
            engineering and governance. You gain both speed and control – automation that reasons and adapts, always
            within the guardrails you define.
          </Text>
        </div>
        <Carousel>
          <AnimatedCard index={0}>
            <Feature
              className="items-center text-center"
              headline="Manifest-driven AI Behavior"
              subheadline={
                <p>
                  Define exactly how agents act with versioned, declarative manifests. Reuse approved rules and
                  guardrails across flows, and audit every change and decision, delivering consistent, on-policy
                  execution you can review, test, and trust.
                </p>
              }
            />
          </AnimatedCard>
          <AnimatedCard index={1}>
            <Feature
              className="items-center text-center"
              headline="Orchestrated Agent Execution"
              subheadline={
                <p>
                  Coordinate multiple AI capabilities through deterministic flows and AI agent orchestration – no
                  improvisation, no drift. Orcaworks executes complex, multi-step work reliably and in the right order,
                  so every run follows the playbook and delivers the same, trusted outcome.
                </p>
              }
            />
          </AnimatedCard>
          <AnimatedCard index={2}>
            <Feature
              className="items-center text-center"
              headline="Governance as Code"
              subheadline={
                <p>
                  Turn policy into DSL-defined manifests so agents cannot act outside approved rules. Decisions stay
                  context-grounded and consistent across teams. Keep humans in control with configurable approvals,
                  deterministic escalations, and complete, searchable audit trails.
                </p>
              }
            />
          </AnimatedCard>
          <AnimatedCard index={3}>
            <Feature
              className="items-center text-center"
              headline="Seamless Data Connectivity"
              subheadline={
                <p>
                  Connect to CRMs, ERPs, email, PDFs, spreadsheets, and APIs – structured or unstructured. Orcaworks
                  ingests quickly via an extensive connector library while enforcing least-privilege access and full
                  audit trails, keeping data controlled, compliant, and ready for execution.
                </p>
              }
            />
          </AnimatedCard>
          <AnimatedCard index={4}>
            <Feature
              className="items-center text-center"
              headline="Context-Aware Intelligence"
              subheadline={
                <p>
                  Turns scattered documents, policies, and prior decisions into a curated, governed knowledge base.
                  Agents reason with context – not scripts – to choose the next best action, producing explainable,
                  auditable outcomes with clear traces your teams can review and trust.
                </p>
              }
            />
          </AnimatedCard>
          <AnimatedCard index={5}>
            <Feature
              className="items-center text-center"
              headline="Autonomous Decision-Making"
              subheadline={
                <p>
                  Orcaworks combines advanced language models with evaluation engines to make governed, deterministic
                  decisions at every step. Agents act accurately and independently inside your rules, reducing delays
                  and errors while keeping outcomes consistent, auditable, and on-policy.
                </p>
              }
            />
          </AnimatedCard>
          <AnimatedCard index={6}>
            <Feature
              className="items-center text-center"
              headline="Continuous Learning & Optimization"
              subheadline={
                <p>
                  Orcaworks improves with every run. Governed updates refine workflows and decision logic, reducing
                  manual intervention while preserving predictable behavior. The result is steadily better outcomes,
                  delivered safely and consistently at operational scale.
                </p>
              }
            />
          </AnimatedCard>
          <AnimatedCard index={7}>
            <Feature
              className="items-center text-center"
              headline="Embedded Execution"
              subheadline={
                <p>
                  Orca works inside your existing tools, so teams do not switch context. It thinks, decides, and acts in
                  the flow of enabling enterprise AI integration without disrupting existing operations, with governance
                  and full traceability.
                </p>
              }
            />
          </AnimatedCard>
        </Carousel>
      </Section>

      <Section id="seamless-integrations">
        <div className="mb-8 flex flex-col items-center gap-6 text-center">
          <Subheading className="max-w-3xl">Seamless Integrations</Subheading>
          <Text size="lg" className="max-w-2xl">
            Orcaworks connects effortlessly inside your enterprise ecosystem. Orca operates natively across CRMs, ERPs,
            ticketing systems, documents, and data platforms, executing governed workflows without disrupting existing
            processes.
          </Text>
        </div>
        <Marquee className="mt-8">
          <Image
            unoptimized
            priority
            src="/img/logos/9-color-black-height-32.svg"
            className="h-8 w-auto dark:hidden"
            alt=""
            width={51}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/9-color-white-height-32.svg"
            className="hidden h-8 w-auto dark:block"
            alt=""
            width={51}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/10-color-black-height-32.svg"
            className="h-8 w-auto dark:hidden"
            alt=""
            width={70}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/10-color-white-height-32.svg"
            className="hidden h-8 w-auto dark:block"
            alt=""
            width={70}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/11-color-black-height-32.svg"
            className="h-8 w-auto dark:hidden"
            alt=""
            width={100}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/11-color-white-height-32.svg"
            className="hidden h-8 w-auto dark:block"
            alt=""
            width={100}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/12-color-black-height-32.svg"
            className="h-8 w-auto dark:hidden"
            alt=""
            width={85}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/12-color-white-height-32.svg"
            className="hidden h-8 w-auto dark:block"
            alt=""
            width={85}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/13-color-black-height-32.svg"
            className="h-8 w-auto dark:hidden"
            alt=""
            width={75}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/13-color-white-height-32.svg"
            className="hidden h-8 w-auto dark:block"
            alt=""
            width={75}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/8-color-black-height-32.svg"
            className="h-8 w-auto dark:hidden"
            alt=""
            width={85}
            height={32}
          />
          <Image
            unoptimized
            priority
            src="/img/logos/8-color-white-height-32.svg"
            className="hidden h-8 w-auto dark:block"
            alt=""
            width={85}
            height={32}
          />
        </Marquee>
      </Section>

      <CallToActionSimple
        id="ready"
        className="text-center [&>div>div>div]:mx-auto [&>div>div>p]:mx-auto"
        eyebrow="Experience Consistent Outcomes with Full Auditable Control"
        eyebrowVariant="brand"
        headline="Ready to Operationalize AI with Confidence?"
        subheadline={
          <p>
            Orcaworks was built precisely to provide these “right controls” while still accelerating your operations.
            It’s not a proof-of-concept toy – It’s not a proof‑of‑concept, it’s a production‑grade, intelligent
            automation platform for scaling AI in the enterprise with confidence. .
          </p>
        }
        cta={
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink color="brand" href="/contact" size="lg">
              Meet an expert
            </ButtonLink>
            <PlainButtonLink href="/ai-agent-handbook" size="lg">
              Read the AI handbook <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
