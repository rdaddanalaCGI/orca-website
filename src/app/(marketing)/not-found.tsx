import { ButtonLink } from '@/components/elements/button'
import { Heading } from '@/components/elements/heading'
import { Section } from '@/components/elements/section'
import { Text } from '@/components/elements/text'

export default function NotFound() {
  return (
    <Section className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Heading className="text-8xl sm:text-9xl">404</Heading>
        <Text className="mt-6 text-lg/8 text-olive-600 dark:text-olive-300">
          We couldn&apos;t find the page you were looking for.
        </Text>
        <div className="mt-10">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </div>
    </Section>
  )
}
