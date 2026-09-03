import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Eyebrow({
  children,
  variant = 'neutral',
  className,
  ...props
}: {
  variant?: 'neutral' | 'brand'
} & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'text-sm/7 font-semibold',
        variant === 'neutral' && 'text-olive-700 dark:text-olive-400',
        variant === 'brand' && 'text-orca-orange',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
