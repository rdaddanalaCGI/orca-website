import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ApplicationsSection } from '@/components/sections/applications-section'
import { ClosingCtaSection } from '@/components/sections/closing-cta-section'
import { FeatureThreeColumnWithDemos, Features } from '@/components/sections/features-three-column-with-demos'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { InsightsSection } from '@/components/sections/insights-section'
import { VerticalsSection } from '@/components/sections/verticals-section'
import { WhyOrcaworksSection } from '@/components/sections/why-orcaworks-section'
import { cmsImageUrl, getLatestPosts } from '@/lib/payload'
import { createMetadata } from '@/lib/seo'
import Image from 'next/image'

export const metadata = createMetadata({
  path: '/',
  title: 'Enterprise AI that you can read',
  description:
    'See what your AI knows, what it can do, how work moves and where people stay in control. Orcaworks makes the operating definition behind enterprise AI explicit and declarative — so your teams can understand it, govern it and change it before it runs.',
})

export default async function Page() {
  const latestPosts = await getLatestPosts(4)

  const postInsights = latestPosts.map((post) => {
    const category =
      post.categories && typeof post.categories[0] === 'object'
        ? (post.categories[0] as { name: string }).name
        : 'Insight'
    return {
      eyebrow: category.toUpperCase(),
      title: post.title,
      text: post.excerpt ?? '',
      image: cmsImageUrl(post.heroImage),
      href: `/blog/${post.slug}`,
    }
  })

  const insights = [
    {
      eyebrow: 'AI AGENT HANDBOOK',
      title: 'Build a practical understanding of enterprise AI agents.',
      text: 'From models and tools to context, orchestration and enterprise deployment.',
      image: '/img/photos/1.webp',
      href: '/ai-agent-handbook',
      featured: true,
    },
    {
      eyebrow: 'ENTERPRISE AI SAFETY HANDBOOK',
      title: 'Put powerful AI to work without giving up control.',
      text: 'A practical guide to governance, risk and safe enterprise deployment.',
      image: '/enterprise-ai-safety-handbook/agent-framework.png',
      href: '/enterprise-ai-safety-handbook',
      featured: true,
    },
    ...postInsights,
  ]

  return (
    <>
      <HeroCenteredWithDemo
        id="hero"
        className="bg-orca-paper dark:bg-olive-950"
        eyebrow={
          <AnnouncementBadge
            href="/solutions"
            text="AI that works the way your enterprise works."
            cta="Explore applications"
          />
        }
        headline="Enterprise AI that you can read."
        subheadline={
          <p>
            See what your AI knows, what it can do, how work moves and where people stay in control. Orcaworks makes the
            operating definition behind enterprise AI explicit and declarative — so your teams can understand it, govern
            it and change it before it runs.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Get a demo
            </ButtonLink>

            <PlainButtonLink href="/agentic-automation-platform" size="lg">
              See how it works <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
      />

      <Features
        id="give-ai-context"
        headerClassName="mx-auto max-w-4xl items-center text-center"
        headline="Governance starts with visibility and control."
        subheadline={
          <div className="flex flex-col gap-4">
            <p>
              The Orcaworks Blueprint makes the context, workflow, actions and controls behind enterprise AI explicit —
              so teams can see how it operates, review what it can do and govern it before it runs.
            </p>
            <p>
              <strong>What you review is what runs.</strong>
            </p>
          </div>
        }
        cta={
          <Link href="/agentic-automation-platform">
            Explore the platform <ArrowNarrowRightIcon />
          </Link>
        }
        features={
          <>
            <FeatureThreeColumnWithDemos
              demo={
                <Screenshot wallpaper="teal" placement="bottom-right">
                  <div className="relative aspect-3/2 w-full">
                    <Image
                      src="/img/screenshots/1.webp"
                      alt="Declare the context"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="bg-white/75 object-cover dark:hidden"
                      style={{ objectPosition: 'right bottom' }}
                    />
                    <Image
                      src="/img/screenshots/1-color-olive.webp"
                      alt="Declare the context"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="bg-black/75 object-cover not-dark:hidden"
                      style={{ objectPosition: 'right bottom' }}
                    />
                  </div>
                </Screenshot>
              }
              headline="Declare the context"
              subheadline={
                <p>Bring together the data, documents, systems and relationships AI needs to understand the work.</p>
              }
            />
            <FeatureThreeColumnWithDemos
              demo={
                <Screenshot wallpaper="teal" placement="top-left">
                  <div className="relative aspect-3/2 w-full">
                    <Image
                      src="/img/screenshots/1.webp"
                      alt="Declare the workflow"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="bg-white/75 object-cover dark:hidden"
                      style={{ objectPosition: 'left top' }}
                    />
                    <Image
                      src="/img/screenshots/1-color-olive.webp"
                      alt="Declare the workflow"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="bg-black/75 object-cover not-dark:hidden"
                      style={{ objectPosition: 'left top' }}
                    />
                  </div>
                </Screenshot>
              }
              headline="Declare the workflow"
              subheadline={
                <p>Make the actions, system calls, handoffs and workflow steps that move work forward explicit.</p>
              }
            />
            <FeatureThreeColumnWithDemos
              demo={
                <Screenshot wallpaper="teal" placement="bottom-left">
                  <div className="relative aspect-3/2 w-full">
                    <Image
                      src="/img/screenshots/1.webp"
                      alt="Declare the controls"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="bg-white/75 object-cover dark:hidden"
                      style={{ objectPosition: 'left bottom' }}
                    />
                    <Image
                      src="/img/screenshots/1-color-olive.webp"
                      alt="Declare the controls"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="bg-black/75 object-cover not-dark:hidden"
                      style={{ objectPosition: 'left bottom' }}
                    />
                  </div>
                </Screenshot>
              }
              headline="Declare the controls"
              subheadline={
                <p>Build permissions, boundaries, approvals, evidence and human decisions directly into execution.</p>
              }
            />
          </>
        }
      />

      <VerticalsSection />

      <ApplicationsSection />

      <WhyOrcaworksSection />

      <InsightsSection items={insights} />

      <ClosingCtaSection />
    </>
  )
}
