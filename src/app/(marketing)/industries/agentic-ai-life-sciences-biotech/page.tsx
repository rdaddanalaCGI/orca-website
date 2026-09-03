import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI for Health Care and Life Sciences',
  description: 'AI for Health Care and Life Sciences — content coming soon.',
  path: '/industries/agentic-ai-life-sciences-biotech',
  noindex: true,
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Heading>AI for Health Care and Life Sciences</Heading>
        <Text>Page content coming soon.</Text>
      </Container>
    </section>
  )
}
