import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

export const metadata = createMetadata({
  title: 'Architecture, Construction & Engineering',
  description: 'AI solutions for Architecture, Construction & Engineering — content coming soon.',
  path: '/solutions/architecture-construction-engineering',
  noindex: true,
})

export default function Page() {
  const solution = getSolutionBySlug('architecture-construction-engineering')
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
