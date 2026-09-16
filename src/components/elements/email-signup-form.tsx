'use client'

import { NewsletterForm } from '@/components/forms/newsletter-form'
import type { ComponentProps, ReactNode } from 'react'

export function EmailSignupForm({
  label = 'Email address',
  placeholder = 'Enter your email',
  cta,
  variant = 'normal',
  className,
  ...props
}: {
  label?: string
  placeholder?: string
  cta: ReactNode
  variant?: 'normal' | 'overlay'
} & Omit<ComponentProps<'form'>, 'action'>) {
  return (
    <NewsletterForm
      variant={variant}
      buttonLabel={cta}
      placeholder={placeholder}
      label={label}
      sourcePage="/agentic-automation-platform"
      className={className}
      {...props}
    />
  )
}
