import { pruneRateLimitStore, rateLimit } from '@/lib/rate-limit'
import { isSubmissionType, submissionSchemas } from '@/lib/schemas'

export type FormState =
  { status: 'success' } | { status: 'error'; message: string; fieldErrors?: Record<string, string> } | null

const GENERIC_ERROR = 'Something went wrong. Please try again.'

function text(formData: FormData, key: string): string | undefined {
  const value = formData.get(key)
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/**
 * Server-side form validation, honeypot, rate limiting and Payload persistence.
 * The server action wraps this so it can also capture the client IP from headers.
 */
export async function processFormSubmission(
  submissionType: string,
  formData: FormData,
  ip: string,
): Promise<FormState> {
  if (!isSubmissionType(submissionType)) {
    return { status: 'error', message: GENERIC_ERROR }
  }

  // Honeypot: real users never fill this hidden field. Return success so bots
  // cannot distinguish a rejection from an accepted submission.
  if (text(formData, 'website')) {
    return { status: 'success' }
  }

  pruneRateLimitStore()
  const limit = rateLimit({ key: `form:${submissionType}:${ip}`, limit: 5, windowMs: 60_000 })

  if (!limit.ok) {
    return {
      status: 'error',
      message: `Too many submissions. Please try again in ${limit.retryAfterSeconds} seconds.`,
    }
  }

  const parsed = submissionSchemas[submissionType].safeParse({
    name: text(formData, 'name'),
    email: text(formData, 'email'),
    company: text(formData, 'company'),
    message: text(formData, 'message'),
    sourcePage: text(formData, 'sourcePage'),
    utmSource: text(formData, 'utmSource'),
    utmMedium: text(formData, 'utmMedium'),
    utmCampaign: text(formData, 'utmCampaign'),
  })

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      if (typeof field === 'string' && !fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }
    return { status: 'error', message: 'Please correct the highlighted fields.', fieldErrors }
  }

  const data = parsed.data

  try {
    // Imported lazily so Payload's native Postgres modules stay out of the
    // static build graph.
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()

    await payload.create({
      collection: 'form-submissions',
      // This helper has already applied Zod validation, honeypot, and rate
      // limiting. Bypass Payload collection access so public users can submit
      // without needing a CMS account.
      overrideAccess: true,
      data: {
        submissionType,
        name: data.name,
        email: data.email,
        company: data.company ?? '',
        message: data.message ?? '',
        sourcePage: data.sourcePage,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        status: 'new',
        ip,
      },
    })

    return { status: 'success' }
  } catch (error) {
    // Log server-side, but never leak internal details to the browser.
    console.error('[processFormSubmission] failed to persist submission', error)
    return { status: 'error', message: GENERIC_ERROR }
  }
}
