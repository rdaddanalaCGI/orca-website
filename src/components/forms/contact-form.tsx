'use client'

import { useActionState } from 'react'

import { submitForm, type FormState } from '@/app/_actions/submit-form'
import { Button } from '@/components/elements/button'
import { HoneypotField, TextAreaField, TextField } from '@/components/forms/field'
import type { SubmissionType } from '@/lib/schemas'

export function ContactForm({
  submissionType = 'contact',
  sourcePage,
}: {
  submissionType?: SubmissionType
  sourcePage: string
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(submitForm, null)

  if (state?.status === 'success') {
    return (
      <div className="rounded-2xl bg-olive-100 p-6 dark:bg-olive-800" role="status">
        <p className="font-medium text-olive-950 dark:text-white">Thanks for reaching out.</p>
        <p className="mt-1 text-sm/6 text-olive-700 dark:text-olive-200">
          We&apos;ve received your message and will reply within one business day.
        </p>
      </div>
    )
  }

  const fieldErrors = state?.status === 'error' ? state.fieldErrors : undefined

  return (
    <form action={formAction} noValidate data-testid="contact-form" className="grid gap-6">
      <input type="hidden" name="submissionType" value={submissionType} />
      <input type="hidden" name="sourcePage" value={sourcePage} />

      <TextField
        name="name"
        label="Name"
        type="text"
        required
        maxLength={128}
        autoComplete="name"
        error={fieldErrors?.name}
      />

      <TextField
        name="email"
        label="Email"
        type="email"
        required
        maxLength={256}
        autoComplete="email"
        error={fieldErrors?.email}
      />

      <TextField
        name="company"
        label="Company"
        type="text"
        required={submissionType !== 'contact'}
        maxLength={128}
        autoComplete="organization"
        error={fieldErrors?.company}
      />

      <TextAreaField
        name="message"
        label="Message"
        required={submissionType !== 'demo'}
        maxLength={5000}
        rows={4}
        error={fieldErrors?.message}
      />

      <HoneypotField />

      {state?.status === 'error' && !fieldErrors && (
        <p role="alert" className="text-sm/6 font-medium text-red-700 dark:text-red-400">
          {state.message}
        </p>
      )}

      <Button color="brand" type="submit" disabled={isPending} className="justify-self-start">
        {isPending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
