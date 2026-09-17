import { ButtonLink } from '@/components/elements/button'

const themes = {
  teal: 'bg-orca-teal-dark text-white',
  orange: 'bg-orca-orange text-white',
  dark: 'bg-olive-950 text-white dark:bg-orca-mist dark:text-olive-950',
} as const

export function CtaBannerBlock({
  title,
  buttonLabel,
  buttonHref,
  theme = 'teal',
}: {
  title: string
  buttonLabel: string
  /** Omitted (rather than falling back to "#") when the source data has no real href. */
  buttonHref?: string
  theme?: keyof typeof themes
}) {
  return (
    <div
      className={`not-prose flex flex-col items-start gap-4 rounded-3xl px-8 py-8 sm:flex-row sm:items-center sm:justify-between ${themes[theme] ?? themes.teal}`}
    >
      <p className="font-display text-xl/8 text-balance">{title}</p>
      {buttonHref ? (
        <ButtonLink href={buttonHref} color="light" size="lg">
          {buttonLabel}
        </ButtonLink>
      ) : null}
    </div>
  )
}
