'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/elements/button'
import { trackEvent } from '@/lib/analytics'
import type { GatedResource } from '@/lib/gated-resources'

import { GatedDownloadButton } from './gated-download-button'
import { LeadGateForm } from './lead-gate-form'

export function GateReveal({
  resource,
  sourcePath,
  children,
}: {
  resource: GatedResource
  sourcePath: string
  children: React.ReactNode
}) {
  const [unlocked, setUnlocked] = useState(
    () =>
      typeof document !== 'undefined' &&
      (document.documentElement.dataset.owUnlock === '1' || document.cookie.includes('ow_unlock=')),
  )
  const [showSuccess, setShowSuccess] = useState(false)
  const regionRef = useRef<HTMLDivElement>(null)
  const submitUnlockedRef = useRef(false)

  useEffect(() => {
    trackEvent('gated_content_view', {
      resource_id: resource.id,
      resource_type: resource.type,
      resource_name: resource.name,
      source_path: sourcePath,
    })
  }, [resource.id, resource.name, resource.type, sourcePath])

  useEffect(() => {
    const el = regionRef.current
    if (!el) return

    if (unlocked) {
      el.removeAttribute('inert')
      el.removeAttribute('aria-hidden')
    } else {
      el.setAttribute('inert', '')
      el.setAttribute('aria-hidden', 'true')
    }
  }, [unlocked])

  useEffect(() => {
    if (unlocked && submitUnlockedRef.current && regionRef.current) {
      regionRef.current.focus({ preventScroll: true })
      submitUnlockedRef.current = false
    }
  }, [unlocked])

  const handleSuccess = () => {
    submitUnlockedRef.current = true
    setUnlocked(true)
    setShowSuccess(true)
    trackEvent('gated_content_unlock', {
      resource_id: resource.id,
      resource_type: resource.type,
      resource_name: resource.name,
      source_path: sourcePath,
    })
  }

  return (
    <div className="gated-wrapper">
      <div
        ref={regionRef}
        tabIndex={-1}
        data-gated-region
        className="gated-content"
        data-unlocked={unlocked ? 'true' : undefined}
      >
        {children}
      </div>

      {!unlocked && (
        <div
          id="lead-gate"
          className="gate-card mt-6 rounded-2xl bg-orca-mist p-6 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]"
        >
          <LeadGateForm resource={resource} sourcePath={sourcePath} onSuccess={handleSuccess} />
        </div>
      )}

      {unlocked && showSuccess && (
        <div className="mt-6 rounded-2xl bg-orca-mist p-6 dark:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))]">
          <p className="font-medium text-olive-950 dark:text-white">You&apos;re in.</p>
          <p className="mt-1 text-sm/6 text-olive-700 dark:text-olive-200">Enjoy the full guide below.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" color="brand" onClick={() => setShowSuccess(false)} className="justify-self-start">
              Continue reading online
            </Button>
            {resource.pdf && (
              <GatedDownloadButton resourceId={resource.id} lockedBehavior="anchor" unlocked={unlocked} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
