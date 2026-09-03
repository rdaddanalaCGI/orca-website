import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI for Financial Services',
  description: 'AI for Financial Services — content coming soon.',
  path: '/ai-applications/ai-for-financial-services',
  noindex: true,
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Heading>AI for Financial Services</Heading>
        <Text>Page content coming soon.</Text>
      </Container>
    </section>
  )
}
