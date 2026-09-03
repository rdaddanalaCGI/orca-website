'use client'

import { useActionState, useEffect, useState } from 'react'

import { unlockGate, type LeadGateFormState } from '@/app/_actions/unlock-gate'
import { Button } from '@/components/elements/button'
import { HoneypotField, TextField } from '@/components/forms/field'
import type { GatedResource } from '@/lib/gated-resources'

export function LeadGateForm({
  resource,
  sourcePath,
  onSuccess,
}: {
  resource: GatedResource
  sourcePath: string
  onSuccess?: () => void
}) {
  const [state, formAction, isPending] = useActionState<LeadGateFormState, FormData>(unlockGate, null)
  const fieldErrors = state?.status === 'error' ? state.fieldErrors : undefined

  const [utm] = useState(() => {
    if (typeof window === 'undefined') {
      return { utmSource: '', utmMedium: '', utmCampaign: '', utmContent: '' }
    }
    const params = new URLSearchParams(window.location.search)
    return {
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
      utmContent: params.get('utm_content') ?? '',
    }
  })
  const [referrer] = useState(() => (typeof document !== 'undefined' ? document.referrer : ''))

  useEffect(() => {
    if (state?.status === 'success' && onSuccess) {
      onSuccess()
    }
  }, [state, onSuccess])

  const heading = resource.gateHeading ?? 'Unlock Build + Scale'
  const description = resource.gateDescription ?? 'Get the implementation guidance, frameworks and the complete PDF.'

  return (
    <form action={formAction} noValidate className="grid gap-6">
      <input type="hidden" name="resourceId" value={resource.id} readOnly />
      <input type="hidden" name="sourcePath" value={sourcePath} readOnly />
      <input type="hidden" name="utmSource" value={utm.utmSource} readOnly />
      <input type="hidden" name="utmMedium" value={utm.utmMedium} readOnly />
      <input type="hidden" name="utmCampaign" value={utm.utmCampaign} readOnly />
      <input type="hidden" name="utmContent" value={utm.utmContent} readOnly />
      <input type="hidden" name="referrer" value={referrer} readOnly />

      <HoneypotField />

      <div>
        <p className="text-xs/4 font-semibold tracking-widest text-orca-orange uppercase">Ready to go deeper?</p>
        <h2 className="mt-2 text-2xl font-semibold text-olive-950 dark:text-white">{heading}</h2>
        <p className="mt-2 text-sm/6 text-olive-700 dark:text-olive-200">{description}</p>
      </div>

      <TextField
        name="firstName"
        label="First name"
        type="text"
        required
        maxLength={128}
        autoComplete="given-name"
        error={fieldErrors?.firstName}
      />

      <TextField
        name="workEmail"
        label="Work email"
        type="email"
        required
        maxLength={256}
        autoComplete="email"
        error={fieldErrors?.workEmail}
      />

      <TextField
        name="company"
        label="Company"
        type="text"
        required
        maxLength={128}
        autoComplete="organization"
        error={fieldErrors?.company}
      />

      {state?.status === 'error' && !fieldErrors && (
        <p role="alert" className="text-sm/6 font-medium text-red-700 dark:text-red-400">
          {state.message}
        </p>
      )}

      <Button color="brand" type="submit" disabled={isPending} className="justify-self-start">
        {isPending ? 'Unlocking…' : 'Unlock the guide →'}
      </Button>

      <p className="text-xs/4 text-olive-600 dark:text-olive-300">
        One registration unlocks all Orcaworks guides and handbooks.
      </p>
    </form>
  )
}
