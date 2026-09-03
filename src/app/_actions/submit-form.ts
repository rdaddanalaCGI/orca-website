'use server'

import { headers } from 'next/headers'

import type { FormState } from '@/lib/forms/submit-form'
import { processFormSubmission } from '@/lib/forms/submit-form'

export type { FormState } from '@/lib/forms/submit-form'

async function clientIp(): Promise<string> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return headerList.get('x-real-ip') ?? 'unknown'
}

export async function submitForm(_prevState: FormState, formData: FormData): Promise<FormState> {
  const submissionType = formData.get('submissionType')

  if (typeof submissionType !== 'string') {
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  const ip = await clientIp()
  return processFormSubmission(submissionType, formData, ip)
}
