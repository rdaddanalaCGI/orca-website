import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Careers',
  description: 'Careers at Orcaworks — content coming soon.',
  path: '/careers',
  noindex: true,
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Heading>Careers</Heading>
        <Text>Page content coming soon.</Text>
      </Container>
    </section>
  )
}
