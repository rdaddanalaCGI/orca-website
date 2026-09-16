'use client'

import { useState } from 'react'

import { Button, ButtonLink } from '@/components/elements/button'
import { trackEvent } from '@/lib/analytics'
import { getDownloadResource } from '@/lib/gated-resources'

import { LeadGateForm } from './lead-gate-form'

export function GatedDownloadButton({
  resourceId,
  lockedBehavior = 'inline-form',
  label,
  unlocked: initialUnlocked = false,
}: {
  resourceId: string
  lockedBehavior?: 'anchor' | 'inline-form'
  label?: string
  unlocked?: boolean
}) {
  const [unlocked, setUnlocked] = useState(initialUnlocked)
  const [showForm, setShowForm] = useState(false)

  const resource = getDownloadResource(resourceId)
  if (!resource?.pdf) return null

  const sourcePath = typeof window !== 'undefined' ? window.location.pathname : '/'

  const eventParams = {
    resource_id: resource.id,
    resource_type: resource.type,
    resource_name: resource.name,
    source_path: sourcePath,
  }

  const buttonLabel = label ?? 'Download complete PDF ↓'

  if (unlocked) {
    return (
      <ButtonLink
        href={`/api/downloads/${resourceId}`}
        size="md"
        onClick={() => trackEvent('gated_pdf_download', eventParams)}
      >
        {buttonLabel}
      </ButtonLink>
    )
  }

  if (lockedBehavior === 'anchor') {
    return (
      <ButtonLink href="#lead-gate" size="md">
        {buttonLabel}
      </ButtonLink>
    )
  }

  return (
    <div className="grid gap-4">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>{buttonLabel}</Button>
      ) : (
        <div className="rounded-2xl bg-orca-mist p-6 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
          <LeadGateForm
            resource={resource}
            sourcePath={sourcePath}
            onSuccess={() => {
              setUnlocked(true)
              setShowForm(false)
              trackEvent('gated_content_unlock', eventParams)
            }}
          />
        </div>
      )}
    </div>
  )
}
