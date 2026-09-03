'use client'

import { useState } from 'react'

import { Button } from '@/components/elements/button'
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

  const buttonLinkClasses =
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-orca-orange px-3 py-1 text-sm/7 font-medium text-white hover:bg-orca-orange-hover'

  if (unlocked) {
    return (
      <a
        className={buttonLinkClasses}
        href={`/api/downloads/${resourceId}`}
        onClick={() => trackEvent('gated_pdf_download', eventParams)}
      >
        {buttonLabel}
      </a>
    )
  }

  if (lockedBehavior === 'anchor') {
    return (
      <a className={buttonLinkClasses} href="#lead-gate">
        {buttonLabel}
      </a>
    )
  }

  return (
    <div className="grid gap-4">
      {!showForm ? (
        <Button color="brand" onClick={() => setShowForm(true)}>
          {buttonLabel}
        </Button>
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
