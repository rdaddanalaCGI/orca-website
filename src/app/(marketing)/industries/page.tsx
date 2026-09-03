import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Industries',
  description: 'Orcaworks industries — content coming soon.',
  path: '/industries',
  noindex: true,
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Heading>Industries</Heading>
        <Text>Page content coming soon.</Text>
      </Container>
    </section>
  )
}
