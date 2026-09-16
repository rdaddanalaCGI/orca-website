import { pruneRateLimitStore, rateLimit } from '@/lib/rate-limit'
import { newsletterSchema } from '@/lib/schemas'

export type NewsletterFormState =
  { status: 'success' } | { status: 'error'; message: string; fieldErrors?: Record<string, string> } | null

const GENERIC_ERROR = 'Something went wrong. Please try again.'

function text(formData: FormData, key: string): string | undefined {
  const value = formData.get(key)
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/**
 * Server-side newsletter subscription validation, honeypot, rate limiting and
 * Payload persistence. The server action wraps this so it can also capture the
 * client IP from headers.
 */
export async function processNewsletterSubscription(formData: FormData, ip: string): Promise<NewsletterFormState> {
  // Honeypot: real users never fill this hidden field. Return success so bots
  // cannot distinguish a rejection from an accepted submission.
  if (text(formData, 'website')) {
    return { status: 'success' }
  }

  pruneRateLimitStore()
  const limit = rateLimit({ key: `newsletter:${ip}`, limit: 5, windowMs: 60_000 })

  if (!limit.ok) {
    return {
      status: 'error',
      message: `Too many submissions. Please try again in ${limit.retryAfterSeconds} seconds.`,
    }
  }

  const parsed = newsletterSchema.safeParse({
    email: text(formData, 'email'),
    sourcePage: text(formData, 'sourcePage'),
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
      collection: 'newsletter-subscribers',
      // This helper has already applied Zod validation, honeypot, and rate
      // limiting. Bypass Payload collection access so public users can subscribe
      // without needing a CMS account.
      overrideAccess: true,
      data: {
        email: data.email,
        sourcePage: data.sourcePage,
        ip,
        status: 'active',
      },
    })

    return { status: 'success' }
  } catch (error) {
    // Log server-side, but never leak internal details to the browser.
    console.error('[processNewsletterSubscription] failed to persist subscriber', error)
    return { status: 'error', message: GENERIC_ERROR }
  }
}
