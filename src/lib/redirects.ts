export type Redirect = {
  source: string
  destination: string
  permanent: true
}

export function getRedirects(): Redirect[] {
  return [
    // Old Nextra preview route -> new enterprise safety handbook.
    { source: '/handbook-preview', destination: '/enterprise-ai-safety-handbook', permanent: true },
    {
      source: '/handbook-preview/designing-controlled-ai',
      destination: '/enterprise-ai-safety-handbook',
      permanent: true,
    },
    // Old WordPress insights routes -> new /blog.
    // The root, category archives, and pagination pages are redirected to the
    // new /blog root. Individual post URLs with trailing slashes are not
    // redirected here because /blog/:slug is a dynamic route and the
    // url-completeness test requires every redirect target to be a static
    // path in staticRoutePaths. For a fully trailing-slash match, the site
    // would need trailingSlash: true in next.config.ts.
    { source: '/blog/', destination: '/blog', permanent: true },
    { source: '/blog/category/:slug', destination: '/blog', permanent: true },
    { source: '/blog/category/:slug/', destination: '/blog', permanent: true },
    { source: '/blog/page/:page', destination: '/blog', permanent: true },
    { source: '/blog/page/:page/', destination: '/blog', permanent: true },
    // Example migration redirects.
    // Replace with entries from .local/urls/required-urls.csv during migration.
    { source: '/old-insurance-page', destination: '/about', permanent: true },
    // AI Applications index and navigation migration.
    { source: '/ai-applications', destination: '/solutions', permanent: true },
    { source: '/ai-applications/', destination: '/solutions', permanent: true },
    {
      source: '/ai-applications/ai-for-logistics-and-transportation',
      destination: '/solutions/logistics-and-distribution',
      permanent: true,
    },
    {
      source: '/ai-applications/ai-for-logistics-and-transportation/',
      destination: '/solutions/logistics-and-distribution',
      permanent: true,
    },
    {
      source: '/ai-applications/ai-for-operations-teams',
      destination: '/solutions/logistics-and-distribution',
      permanent: true,
    },
    {
      source: '/ai-applications/ai-for-operations-teams/',
      destination: '/solutions/logistics-and-distribution',
      permanent: true,
    },
    {
      source: '/solutions/logistics-and-transportation',
      destination: '/solutions/logistics-and-distribution',
      permanent: true,
    },
    { source: '/ai-applications/ai-for-insurance', destination: '/solutions/insurance', permanent: true },
    { source: '/ai-applications/ai-for-insurance/', destination: '/solutions/insurance', permanent: true },
    {
      source: '/ai-applications/ai-for-financial-services',
      destination: '/solutions/specialty-commercial-lending-finance',
      permanent: true,
    },
    {
      source: '/ai-applications/ai-for-financial-services/',
      destination: '/solutions/specialty-commercial-lending-finance',
      permanent: true,
    },
    // Previous vertical slug -> renamed specialty lending vertical.
    {
      source: '/solutions/credit-unions-specialty-lending',
      destination: '/solutions/specialty-commercial-lending-finance',
      permanent: true,
    },
    {
      source: '/solutions/credit-unions-specialty-lending/',
      destination: '/solutions/specialty-commercial-lending-finance',
      permanent: true,
    },
    // Industries index and vertical redirects.
    { source: '/industries', destination: '/solutions', permanent: true },
    { source: '/industries/', destination: '/solutions', permanent: true },
    {
      source: '/industries/agentic-ai-life-sciences-biotech',
      destination: '/solutions/clinical-research-organisations',
      permanent: true,
    },
    {
      source: '/industries/agentic-ai-life-sciences-biotech/',
      destination: '/solutions/clinical-research-organisations',
      permanent: true,
    },
    {
      source: '/industries/agentic-ai-automation-for-architecture-engineering',
      destination: '/solutions/architecture-construction-engineering',
      permanent: true,
    },
    {
      source: '/industries/agentic-ai-automation-for-architecture-engineering/',
      destination: '/solutions/architecture-construction-engineering',
      permanent: true,
    },
    {
      source: '/industries/agentic-ai-automation-for-facilities-management',
      destination: '/solutions/facilities-management',
      permanent: true,
    },
    {
      source: '/industries/agentic-ai-automation-for-facilities-management/',
      destination: '/solutions/facilities-management',
      permanent: true,
    },
    // Expert/meeting and demo redirects.
    { source: '/meet-an-expert', destination: '/expert-column/abhinav-somaraju', permanent: true },
    { source: '/meet-an-expert/', destination: '/expert-column/abhinav-somaraju', permanent: true },
    { source: '/see-orca-in-action', destination: '/contact', permanent: true },
    { source: '/see-orca-in-action/', destination: '/contact', permanent: true },
  ]
}
