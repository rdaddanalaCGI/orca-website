import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from './container'
import { Eyebrow } from './eyebrow'
import { Subheading } from './subheading'
import { Text } from './text'

export function Section({
  eyebrow,
  headline,
  subheadline,
  cta,
  surface = 'neutral',
  eyebrowVariant = 'neutral',
  headerClassName,
  className,
  children,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  cta?: ReactNode
  surface?: 'neutral' | 'mist'
  eyebrowVariant?: 'neutral' | 'brand'
  headerClassName?: string
} & ComponentProps<'section'>) {
  return (
    <section
      className={clsx(
        'py-16',
        surface === 'mist' &&
          'bg-orca-mist dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]',
        className,
      )}
      {...props}
    >
      <Container className="flex flex-col gap-10 sm:gap-16">
        {headline && (
          <div className={clsx('flex flex-col gap-6', headerClassName ?? 'max-w-2xl')}>
            <div className="flex flex-col gap-2">
              {eyebrow && <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>}
              <Subheading>{headline}</Subheading>
            </div>
            {subheadline && <Text className="text-pretty">{subheadline}</Text>}
            {cta}
          </div>
        )}
        <div>{children}</div>
      </Container>
    </section>
  )
}
