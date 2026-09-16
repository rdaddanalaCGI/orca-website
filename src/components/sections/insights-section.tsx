import { PlainButtonLink } from '@/components/elements/button'
import { Section } from '@/components/elements/section'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { InsightsCarousel, type Insight } from '@/components/insights-carousel'

export function InsightsSection({ items }: { items: Insight[] }) {
  return (
    <Section
      id="insights"
      eyebrow="INSIGHTS"
      eyebrowVariant="brand"
      headline="Practical thinking for enterprise AI."
      subheadline={
        <>Guides and perspectives for teams putting AI to work safely, effectively and at enterprise scale.</>
      }
      cta={
        <PlainButtonLink href="/blog" size="lg" className="self-start">
          Explore All Insights <ArrowNarrowRightIcon />
        </PlainButtonLink>
      }
    >
      <InsightsCarousel items={items} />
    </Section>
  )
}
