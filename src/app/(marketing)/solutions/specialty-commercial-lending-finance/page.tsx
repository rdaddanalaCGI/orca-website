import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

export const metadata = createMetadata({
  title: 'Specialty Commercial Lending & Finance',
  description:
    'AI orchestration for specialty commercial lending — closing conditions, covenant exceptions, document reconciliation and portfolio reviews across the lending systems you already run.',
  path: '/solutions/specialty-commercial-lending-finance',
  noindex: true,
})

export default function Page() {
  const solution = getSolutionBySlug('specialty-commercial-lending-finance')
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
