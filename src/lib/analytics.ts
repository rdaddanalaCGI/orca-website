'use client'

type GatedEvent = 'gated_content_view' | 'gated_content_unlock' | 'gated_pdf_download'

export type GatedEventParams = {
  resource_id: string
  resource_type: string
  resource_name: string
  source_path: string
}

export function trackEvent(name: GatedEvent, params: GatedEventParams) {
  const gtag = typeof window !== 'undefined' ? (window as { gtag?: (...args: unknown[]) => void }).gtag : undefined
  gtag?.('event', name, params)
}
