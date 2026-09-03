import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI for Logistics and Transportation',
  description: 'AI for Logistics and Transportation — content coming soon.',
  path: '/ai-applications/ai-for-logistics-and-transportation',
  noindex: true,
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Heading>AI for Logistics and Transportation</Heading>
        <Text>Page content coming soon.</Text>
      </Container>
    </section>
  )
}
