import { DeclaredWorkAnimation } from '@/components/declared-work/declared-work-animation'
import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Section } from '@/components/elements/section'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { MeasuredValueSection } from '@/components/measured-value/measured-value-section'
import { ApplicationsSection } from '@/components/sections/applications-section'
import { ClosingCtaSection } from '@/components/sections/closing-cta-section'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { InsightsSection } from '@/components/sections/insights-section'
import { WhyOrcaworksSection } from '@/components/sections/why-orcaworks-section'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { cmsImageUrl, getLatestPosts } from '@/lib/payload'
import { createMetadata } from '@/lib/seo'

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
        eyebrow={
          <AnnouncementBadge
            href="/solutions"
            text="AI that works the way your enterprise works."
            cta="Explore applications."
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

      <Section id="give-ai-context">
        <div className="flex flex-col gap-10 sm:gap-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-6">
              <Subheading>Governance starts with visibility and control.</Subheading>
              <Text className="text-pretty">
                <span className="flex flex-col gap-4">
                  <p>
                    The Orcaworks Blueprint makes the context, workflow, actions and controls behind enterprise AI
                    explicit — so teams can see how it operates, review what it can do and govern it before it runs.
                  </p>
                  <p>
                    <strong className="text-olive-950 dark:text-white">What you review is what runs.</strong>
                  </p>
                </span>
              </Text>
              <Link href="/agentic-automation-platform">
                Explore the platform <ArrowNarrowRightIcon />
              </Link>
            </div>
            <YouTubeEmbed videoId="M7lc1UVf-VE" title="Orcaworks governance overview (placeholder)" />
          </div>
          <div className="h-px w-full bg-olive-950/10 dark:bg-white/10" />
          <DeclaredWorkAnimation
            pillars={[
              {
                id: 'context',
                ident: '01',
                heading: 'Declare the context',
                copy: 'Bring together the data, documents, systems and relationships AI needs to understand the work.',
              },
              {
                id: 'workflow',
                ident: '02',
                heading: 'Declare the workflow',
                copy: 'Define the actions, system calls, decisions and handoffs that move the work forward.',
              },
              {
                id: 'interaction',
                ident: '03',
                heading: 'Declare the interaction',
                copy: 'Define where people meet the agents — in the tools they already use — to review, approve or take over.',
              },
            ]}
          />
        </div>
      </Section>

      <ApplicationsSection />

      <WhyOrcaworksSection />

      <MeasuredValueSection />

      <InsightsSection items={insights} />

      <ClosingCtaSection />
    </>
  )
}
