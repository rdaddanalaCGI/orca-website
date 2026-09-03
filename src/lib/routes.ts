import type { MetadataRoute } from 'next'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

export type StaticRoute = {
  path: string
  changeFrequency: ChangeFrequency
  priority: number
}

/**
 * Authoritative list of statically-rendered public routes.
 *
 * Adding a page? Add it here so it appears in the sitemap and is covered by the
 * SEO quality checks in `tests/seo.test.ts`.
 */
export const staticRoutes: StaticRoute[] = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/agentic-automation-platform', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/pricing', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/expert-column/abhinav-somaraju', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/press', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ai-applications/ai-for-logistics-and-transportation', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ai-applications/ai-for-insurance', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ai-applications/ai-for-financial-services', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ai-applications/agentic-ai-bids-and-proposals', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ai-applications/ai-for-hr', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ai-applications/ai-for-operations-teams', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/industries/agentic-ai-life-sciences-biotech', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/industries/agentic-ai-automation-for-architecture-engineering', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ai-agent-handbook', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/enterprise-ai-safety-handbook', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/solutions', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/solutions/logistics-and-distribution', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/solutions/insurance', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/solutions/clinical-research-organisations', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/solutions/architecture-construction-engineering', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/solutions/credit-unions-specialty-lending', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/industries', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
]

export const staticRoutePaths = staticRoutes.map((route) => route.path)
