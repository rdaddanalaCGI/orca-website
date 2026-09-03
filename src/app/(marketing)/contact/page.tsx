import { Heading } from '@/components/elements/heading'
import { Section } from '@/components/elements/section'
import { Text } from '@/components/elements/text'
import { ContactForm } from '@/components/forms/contact-form'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbJsonLd, createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Contact',
  description: 'Get in touch with the Orcaworks team. We reply within one business day.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <Section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <Heading>Contact us</Heading>
            <Text className="mt-6 text-lg/8 text-olive-600 dark:text-olive-300">
              Tell us what you&apos;re building. We&apos;ll get back to you within one business day.
            </Text>
          </div>
          <div className="rounded-3xl bg-olive-200 p-8 dark:bg-olive-900">
            <ContactForm sourcePage="/contact" />
          </div>
        </div>
      </Section>
    </>
  )
}
