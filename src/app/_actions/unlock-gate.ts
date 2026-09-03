'use server'

import { cookies, headers } from 'next/headers'

import { isProduction } from '@/lib/env'
import { processLeadGateSubmission, type LeadGateFormState } from '@/lib/forms/submit-lead-gate'
import { UNLOCK_COOKIE_NAME } from '@/lib/gated-resources'
import { createUnlockCookieValue, UNLOCK_MAX_AGE_SECONDS } from '@/lib/unlock-cookie'
export type { LeadGateFormState } from '@/lib/forms/submit-lead-gate'

async function clientIp(): Promise<string> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return headerList.get('x-real-ip') ?? 'unknown'
}

export async function unlockGate(_prevState: LeadGateFormState, formData: FormData): Promise<LeadGateFormState> {
  const ip = await clientIp()
  const result = await processLeadGateSubmission(formData, ip)

  if (result?.status === 'success' && result.setCookie) {
    const cookieStore = await cookies()
    cookieStore.set(UNLOCK_COOKIE_NAME, createUnlockCookieValue(), {
      path: '/',
      maxAge: UNLOCK_MAX_AGE_SECONDS,
      sameSite: 'lax',
      secure: isProduction,
      httpOnly: false,
    })
  }

  return result
}
