import { cookies } from 'next/headers'

import { SoftButton, SoftButtonLink } from '@/components/elements/button'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Section } from '@/components/elements/section'
import { Text } from '@/components/elements/text'
import { GatedDownloadButton } from '@/components/gated/gated-download-button'
import { UNLOCK_COOKIE_NAME } from '@/lib/gated-resources'
import type { SolutionResources } from '@/lib/solutions'
import { verifyUnlockCookieValue } from '@/lib/unlock-cookie'

export async function SolutionResources({ resources }: { resources: SolutionResources }) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(UNLOCK_COOKIE_NAME)?.value
  const isUnlocked = cookie != null && verifyUnlockCookieValue(cookie)

  return (
    <Section eyebrow={resources.eyebrow} headline={resources.heading} subheadline={resources.intro}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {resources.items.map((item) => (
          <div
            key={item.id}
            className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-olive-950/10 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-olive-900"
          >
            <div className="flex flex-col gap-2">
              <Eyebrow variant="brand" className="text-xs/4 font-semibold tracking-wider uppercase">
                {item.eyebrow}
              </Eyebrow>
              <h3 className="font-display text-xl/7 text-olive-950 dark:text-white">{item.title}</h3>
              <Text className="text-pretty">{item.description}</Text>
            </div>
            {item.cta.resourceId ? (
              <GatedDownloadButton resourceId={item.cta.resourceId} label={item.cta.label} unlocked={isUnlocked} />
            ) : item.cta.comingSoon || !item.cta.href ? (
              <SoftButton disabled aria-disabled="true" size="lg">
                {item.cta.label}
              </SoftButton>
            ) : (
              <SoftButtonLink href={item.cta.href} size="lg">
                {item.cta.label}
              </SoftButtonLink>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
