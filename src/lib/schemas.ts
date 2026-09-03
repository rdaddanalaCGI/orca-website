import { z } from 'zod'

import { getGatedResource } from './gated-resources'

export const SUBMISSION_TYPES = ['contact', 'demo', 'partner'] as const
export type SubmissionType = (typeof SUBMISSION_TYPES)[number]

/** Only relative in-site paths are accepted, to avoid storing attacker-controlled URLs. */
const relativePath = z
  .string()
  .max(512)
  .regex(/^\/[\w\-/.?=&%]*$/, 'sourcePage must be a relative path')
  .optional()

const utmValue = z.string().max(128).optional()

const baseFields = {
  name: z.string().trim().min(1, 'Name is required').max(128),
  email: z.email('Enter a valid email address').max(256),
  sourcePage: relativePath,
  utmSource: utmValue,
  utmMedium: utmValue,
  utmCampaign: utmValue,
}

export const contactSchema = z.object({
  ...baseFields,
  company: z.string().trim().max(128).optional(),
  message: z.string().trim().min(1, 'Message is required').max(5000),
})

export const demoSchema = z.object({
  ...baseFields,
  company: z.string().trim().min(1, 'Company is required').max(128),
  message: z.string().trim().max(5000).optional(),
})

export const partnerSchema = z.object({
  ...baseFields,
  company: z.string().trim().min(1, 'Company is required').max(128),
  message: z.string().trim().min(1, 'Message is required').max(5000),
})

export const submissionSchemas = {
  contact: contactSchema,
  demo: demoSchema,
  partner: partnerSchema,
} satisfies Record<SubmissionType, z.ZodType>

export function isSubmissionType(value: unknown): value is SubmissionType {
  return typeof value === 'string' && (SUBMISSION_TYPES as readonly string[]).includes(value)
}

export const leadGateSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(128),
  workEmail: z.email('Enter a valid work email address').max(256).toLowerCase(),
  company: z.string().trim().min(1, 'Company is required').max(128),
  resourceId: z.string().refine((value) => getGatedResource(value) !== null, {
    message: 'Unknown resource',
  }),
  sourcePath: relativePath,
  referrer: z.string().max(512).optional(),
  utmSource: utmValue,
  utmMedium: utmValue,
  utmCampaign: utmValue,
  utmContent: utmValue,
})
