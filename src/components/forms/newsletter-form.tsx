'use client'

import { useActionState } from 'react'

import { subscribeNewsletter, type NewsletterFormState } from '@/app/_actions/subscribe-newsletter'
import { Button } from '@/components/elements/button'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

export function NewsletterForm({
  headline,
  subheadline,
  sourcePage,
  buttonLabel = 'Subscribe',
  placeholder = 'Email',
  label = 'Email',
  variant = 'normal',
  className,
  ...props
}: {
  headline?: ReactNode
  subheadline?: ReactNode
  sourcePage?: string
  buttonLabel?: ReactNode
  placeholder?: string
  label?: string
  variant?: 'normal' | 'overlay'
} & Omit<ComponentProps<'form'>, 'action'>) {
  const [state, formAction, isPending] = useActionState<NewsletterFormState, FormData>(subscribeNewsletter, null)

  if (state?.status === 'success') {
    return (
      <div className={clsx('max-w-sm', className)} role="status">
        {headline && <p className="font-display text-lg/7 text-white">{headline}</p>}
        <p className="mt-1 text-sm/6 text-white/80 dark:text-orca-frost">
          You&apos;re subscribed. Watch your inbox for updates.
        </p>
      </div>
    )
  }

  const fieldErrors = state?.status === 'error' ? state.fieldErrors : undefined
  const error = fieldErrors?.email ?? (state?.status === 'error' && !fieldErrors ? state.message : undefined)

  return (
    <form
      action={formAction}
      noValidate
      data-testid="newsletter-form"
      className={clsx('flex max-w-sm flex-col gap-2', className)}
      {...props}
    >
      {headline && <p className="font-display text-lg/7 text-white">{headline}</p>}
      {subheadline && <div className="flex flex-col gap-4 text-white/80 dark:text-orca-frost">{subheadline}</div>}

      {sourcePage ? <input type="hidden" name="sourcePage" value={sourcePage} /> : null}

      <div
        className={clsx(
          'flex items-center',
          variant === 'normal' && 'border-b border-white/30 py-2 has-[input:focus]:border-white',
          variant === 'overlay' &&
            'rounded-full bg-white/15 p-1 inset-ring-1 inset-ring-white/10 has-[input:focus]:inset-ring-white/30',
        )}
      >
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          aria-label={label}
          required
          autoComplete="email"
          disabled={isPending}
          className={clsx(
            'min-w-0 flex-1 bg-transparent px-3 text-sm/7 text-white placeholder:text-white/60 focus:outline-hidden disabled:opacity-60',
          )}
        />
        <Button type="submit" color={variant === 'overlay' ? 'light' : 'dark/light'} disabled={isPending}>
          {buttonLabel}
        </Button>
      </div>

      {error && (
        <p role="alert" className="text-sm/6 font-medium text-red-300 dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  )
}
