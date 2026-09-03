import { JsonLd } from '@/components/seo/json-ld'
import type { GatedResource } from '@/lib/gated-resources'
import { creativeWorkJsonLd } from '@/lib/seo'

import { GateReveal } from './gate-reveal'

export function GatedContent({
  resource,
  sourcePath,
  children,
}: {
  resource: GatedResource
  sourcePath: string
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={creativeWorkJsonLd({
          headline: resource.name,
          description: resource.gateDescription,
          path: sourcePath,
        })}
      />
      <GateReveal resource={resource} sourcePath={sourcePath}>
        {children}
      </GateReveal>
    </>
  )
}
