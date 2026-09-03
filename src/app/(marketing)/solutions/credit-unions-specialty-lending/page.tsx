import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

export const metadata = createMetadata({
  title: 'Credit Unions & Specialty Lending',
  description: 'AI solutions for Credit Unions & Specialty Lending — content coming soon.',
  path: '/solutions/credit-unions-specialty-lending',
  noindex: true,
})

export default function Page() {
  const solution = getSolutionBySlug('credit-unions-specialty-lending')
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
