import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI for Architecture and Engineering',
  description: 'AI for Architecture and Engineering — content coming soon.',
  path: '/industries/agentic-ai-automation-for-architecture-engineering',
  noindex: true,
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Heading>AI for Architecture and Engineering</Heading>
        <Text>Page content coming soon.</Text>
      </Container>
    </section>
  )
}
