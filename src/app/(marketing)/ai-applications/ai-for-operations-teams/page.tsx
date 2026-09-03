import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI for Operations Teams',
  description: 'AI for Operations Teams — content coming soon.',
  path: '/ai-applications/ai-for-operations-teams',
  noindex: true,
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Heading>AI for Operations Teams</Heading>
        <Text>Page content coming soon.</Text>
      </Container>
    </section>
  )
}
