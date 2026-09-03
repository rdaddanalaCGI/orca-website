import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Expert Column: Dr. Abhinav Somaraju',
  description:
    'Expert perspectives from Dr. Abhinav Somaraju on agentic AI, enterprise automation, and building safe AI systems.',
  path: '/expert-column/abhinav-somaraju',
})

export default function Page() {
  return (
    <section className="py-16">
      <Container className="flex max-w-3xl flex-col gap-6">
        <Heading>Expert Column</Heading>
        <p className="text-lg/8 text-pretty text-olive-700 dark:text-olive-400">
          Contributions and perspectives from <strong>Dr. Abhinav Somaraju</strong> on agentic AI, enterprise
          automation, and building safe, effective AI systems.
        </p>
        <Text>
          This is a placeholder page. The marketing team can replace it with a full author archive and curated articles
          once the remaining content is ready.
        </Text>
      </Container>
    </section>
  )
}
