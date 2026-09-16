'use server'

import { headers } from 'next/headers'

import { processNewsletterSubscription } from '@/lib/forms/subscribe-newsletter'

export type { NewsletterFormState } from '@/lib/forms/subscribe-newsletter'

async function clientIp(): Promise<string> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return headerList.get('x-real-ip') ?? 'unknown'
}

export async function subscribeNewsletter(
  _prevState: { status: 'success' } | { status: 'error'; message: string; fieldErrors?: Record<string, string> } | null,
  formData: FormData,
) {
  const ip = await clientIp()
  return processNewsletterSubscription(formData, ip)
}
