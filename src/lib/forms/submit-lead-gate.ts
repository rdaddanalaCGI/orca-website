import { getGatedResource, type GatedResource } from '@/lib/gated-resources'
import { pruneRateLimitStore, rateLimit } from '@/lib/rate-limit'
import { leadGateSchema } from '@/lib/schemas'

export type LeadGateFormState =
  | { status: 'success'; setCookie: boolean }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string> }
  | null

const GENERIC_ERROR = 'Something went wrong. Please try again.'

function text(formData: FormData, key: string): string | undefined {
  const value = formData.get(key)
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/**
 * Server-side lead-gate validation, honeypot, rate limiting and Payload upsert.
 * The server action wraps this so it can capture the client IP and set the
 * unlock cookie only on a genuine, successful submission.
 */
export async function processLeadGateSubmission(formData: FormData, ip: string): Promise<LeadGateFormState> {
  // Honeypot: real users never fill this hidden field. Return success so bots
  // cannot distinguish a rejection from an accepted submission, but do not set
  // an unlock cookie.
  if (text(formData, 'website')) {
    return { status: 'success', setCookie: false }
  }

  pruneRateLimitStore()
  const limit = rateLimit({ key: `lead-gate:${ip}`, limit: 5, windowMs: 60_000 })

  if (!limit.ok) {
    return {
      status: 'error',
      message: `Too many submissions. Please try again in ${limit.retryAfterSeconds} seconds.`,
    }
  }

  const parsed = leadGateSchema.safeParse({
    firstName: text(formData, 'firstName'),
    workEmail: text(formData, 'workEmail'),
    company: text(formData, 'company'),
    resourceId: text(formData, 'resourceId'),
    sourcePath: text(formData, 'sourcePath'),
    referrer: text(formData, 'referrer'),
    utmSource: text(formData, 'utmSource'),
    utmMedium: text(formData, 'utmMedium'),
    utmCampaign: text(formData, 'utmCampaign'),
    utmContent: text(formData, 'utmContent'),
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
  const resource = getGatedResource(data.resourceId) as GatedResource

  try {
    // Imported lazily so Payload's native Postgres modules stay out of the
    // static build graph.
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()

    const existing = await payload.find({
      collection: 'leads',
      where: { workEmail: { equals: data.workEmail } },
      limit: 1,
      depth: 0,
    })

    const existingDoc = existing.docs[0] as
      { id: number | string; submissionCount?: number; firstName?: string; company?: string } | undefined

    if (existingDoc) {
      await payload.update({
        collection: 'leads',
        id: existingDoc.id,
        overrideAccess: true,
        data: {
          submissionCount: (typeof existingDoc.submissionCount === 'number' ? existingDoc.submissionCount : 0) + 1,
          lastResourceId: data.resourceId,
          ...(data.firstName ? { firstName: data.firstName } : {}),
          ...(data.company ? { company: data.company } : {}),
        },
      })
    } else {
      await payload.create({
        collection: 'leads',
        overrideAccess: true,
        data: {
          firstName: data.firstName,
          workEmail: data.workEmail,
          company: data.company,
          firstResourceId: data.resourceId,
          firstResourceType: resource.type,
          firstSourcePath: data.sourcePath,
          referrer: data.referrer,
          utmSource: data.utmSource,
          utmMedium: data.utmMedium,
          utmCampaign: data.utmCampaign,
          utmContent: data.utmContent,
          submissionCount: 1,
          lastResourceId: data.resourceId,
          ip,
        },
      })
    }

    return { status: 'success', setCookie: true }
  } catch (error) {
    console.error('[processLeadGateSubmission] failed to persist lead', error)
    return { status: 'error', message: GENERIC_ERROR }
  }
}
