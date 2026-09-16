import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI for Facilities Management',
  description: 'AI for facilities management — page placeholder.',
  path: '/solutions/facilities-management',
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Heading>AI for Facilities Management</Heading>
      </Container>
    </section>
  )
}
