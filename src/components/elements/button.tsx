import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const sizes = {
  md: 'px-3 py-1',
  lg: 'px-4 py-2',
}

const base =
  'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium outline-hidden transition-colors duration-150 motion-safe:active:scale-[0.97] focus-visible:[--tw-outline-style:solid] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orca-orange'

const disabled = 'disabled:pointer-events-none disabled:opacity-50'

// Shared dark-mode fill for every solid/soft button surface, so "primary",
// "secondary", and "light" all read as one consistent button language in dark mode.
const darkFill = 'dark:bg-frost dark:text-olive-950 dark:hover:bg-[#c0d9dc] dark:active:bg-[#b2c9cb]'

export function Button({
  size = 'md',
  type = 'button',
  color = 'dark/light',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        base,
        disabled,
        color === 'dark/light' && `bg-olive-950 text-white hover:bg-olive-800 active:bg-olive-900 ${darkFill}`,
        color === 'light' && `bg-white text-olive-950 hover:bg-olive-100 active:bg-olive-200 ${darkFill}`,
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function ButtonLink({
  size = 'md',
  color = 'dark/light',
  className,
  href,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        base,
        color === 'dark/light' && `bg-olive-950 text-white hover:bg-olive-800 active:bg-olive-900 ${darkFill}`,
        color === 'light' && `bg-white text-olive-950 hover:bg-olive-100 active:bg-olive-200 ${darkFill}`,
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SoftButton({
  size = 'md',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        base,
        disabled,
        `bg-olive-950/10 text-olive-950 hover:bg-olive-950/15 active:bg-olive-950/20 ${darkFill}`,
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SoftButtonLink({
  size = 'md',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        base,
        `bg-olive-950/10 text-olive-950 hover:bg-olive-950/15 active:bg-olive-950/20 ${darkFill}`,
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function PlainButton({
  size = 'md',
  color = 'dark/light',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light' | 'brand'
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        base,
        disabled,
        'gap-2',
        color === 'dark/light' &&
          'text-olive-950 hover:bg-olive-950/10 active:bg-olive-950/15 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/15',
        color === 'light' &&
          'text-white hover:bg-white/15 active:bg-white/20 dark:hover:bg-white/10 dark:active:bg-white/15',
        color === 'brand' && 'text-[#cc3a00] hover:bg-orca-orange/10 active:bg-orca-orange/15 dark:text-orca-orange',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function PlainButtonLink({
  size = 'md',
  color = 'dark/light',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light' | 'brand'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        base,
        'gap-2',
        color === 'dark/light' &&
          'text-olive-950 hover:bg-olive-950/10 active:bg-olive-950/15 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/15',
        color === 'light' &&
          'text-white hover:bg-white/15 active:bg-white/20 dark:hover:bg-white/10 dark:active:bg-white/15',
        color === 'brand' && 'text-[#cc3a00] hover:bg-orca-orange/10 active:bg-orca-orange/15 dark:text-orca-orange',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
