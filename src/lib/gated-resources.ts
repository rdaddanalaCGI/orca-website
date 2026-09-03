export const UNLOCK_COOKIE_NAME = 'ow_unlock'

export type GatedResourceType = 'handbook' | 'vertical-guide' | 'application-guide' | 'report' | 'other-resource'

export type GatedResource = {
  id: string
  type: GatedResourceType
  name: string
  canonicalPath: string
  gatedPathPrefixes?: string[]
  gateHeading?: string
  gateDescription?: string
  pdf?: { filename: string; title: string }
  analyticsId: string
}

export const gatedResources: Record<string, GatedResource> = {
  'ai-agent-handbook': {
    id: 'ai-agent-handbook',
    type: 'handbook',
    name: 'AI Agent Handbook',
    canonicalPath: '/ai-agent-handbook',
    gatedPathPrefixes: ['/ai-agent-handbook/build', '/ai-agent-handbook/scale'],
    gateHeading: 'Unlock Build + Scale',
    gateDescription: 'Get the implementation guidance, frameworks and the complete PDF.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'AI Agent Handbook' },
    analyticsId: 'ai_agent_handbook',
  },
  'enterprise-ai-safety-handbook': {
    id: 'enterprise-ai-safety-handbook',
    type: 'handbook',
    name: 'Enterprise AI Safety Handbook',
    canonicalPath: '/enterprise-ai-safety-handbook',
    gatedPathPrefixes: ['/enterprise-ai-safety-handbook/build', '/enterprise-ai-safety-handbook/scale'],
    gateHeading: 'Unlock Build + Scale',
    gateDescription: 'Get the implementation guidance, frameworks and the complete PDF.',
    pdf: { filename: 'enterprise-ai-safety-handbook.pdf', title: 'Enterprise AI Safety Handbook' },
    analyticsId: 'enterprise_ai_safety_handbook',
  },
}

export const downloadResources: Record<string, GatedResource> = {
  ...gatedResources,

  // Vertical solution downloads (all currently use the same dummy PDF for local verification).
  'logistics-executive-brief': {
    id: 'logistics-executive-brief',
    type: 'vertical-guide',
    name: 'Logistics & Distribution — Executive Brief',
    canonicalPath: '/solutions/logistics-and-distribution',
    gateHeading: 'Get the 2-page brief',
    gateDescription: 'Download the executive brief with practical starting points for governed AI.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Logistics & Distribution — Executive Brief' },
    analyticsId: 'logistics_executive_brief',
  },
  'logistics-use-case-guide': {
    id: 'logistics-use-case-guide',
    type: 'vertical-guide',
    name: 'Logistics & Distribution — Use-Case Guide',
    canonicalPath: '/solutions/logistics-and-distribution',
    gateHeading: 'Explore the use-case guide',
    gateDescription: 'Download the use-case guide for warehouse, freight and supplier workflows.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Logistics & Distribution — Use-Case Guide' },
    analyticsId: 'logistics_use_case_guide',
  },
  'insurance-executive-brief': {
    id: 'insurance-executive-brief',
    type: 'vertical-guide',
    name: 'Insurance — Executive Brief',
    canonicalPath: '/solutions/insurance',
    gateHeading: 'Get the 2-page brief',
    gateDescription: 'Download the executive brief with practical starting points for governed AI.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Insurance — Executive Brief' },
    analyticsId: 'insurance_executive_brief',
  },
  'insurance-use-case-guide': {
    id: 'insurance-use-case-guide',
    type: 'vertical-guide',
    name: 'Insurance — Use-Case Guide',
    canonicalPath: '/solutions/insurance',
    gateHeading: 'Explore the use-case guide',
    gateDescription: 'Download the use-case guide for claims, underwriting and investigations.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Insurance — Use-Case Guide' },
    analyticsId: 'insurance_use_case_guide',
  },
  'clinical-research-organisations-executive-brief': {
    id: 'clinical-research-organisations-executive-brief',
    type: 'vertical-guide',
    name: 'Clinical Research Organisations — Executive Brief',
    canonicalPath: '/solutions/clinical-research-organisations',
    gateHeading: 'Get the 2-page brief',
    gateDescription: 'Download the executive brief with practical starting points for governed AI.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Clinical Research Organisations — Executive Brief' },
    analyticsId: 'cro_executive_brief',
  },
  'clinical-research-organisations-use-case-guide': {
    id: 'clinical-research-organisations-use-case-guide',
    type: 'vertical-guide',
    name: 'Clinical Research Organisations — Use-Case Guide',
    canonicalPath: '/solutions/clinical-research-organisations',
    gateHeading: 'Explore the use-case guide',
    gateDescription: 'Download the use-case guide for patient intake, prior auth and care coordination.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Clinical Research Organisations — Use-Case Guide' },
    analyticsId: 'cro_use_case_guide',
  },
  'architecture-construction-engineering-executive-brief': {
    id: 'architecture-construction-engineering-executive-brief',
    type: 'vertical-guide',
    name: 'Architecture, Construction & Engineering — Executive Brief',
    canonicalPath: '/solutions/architecture-construction-engineering',
    gateHeading: 'Get the 2-page brief',
    gateDescription: 'Download the executive brief with practical starting points for governed AI.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Architecture, Construction & Engineering — Executive Brief' },
    analyticsId: 'ace_executive_brief',
  },
  'architecture-construction-engineering-use-case-guide': {
    id: 'architecture-construction-engineering-use-case-guide',
    type: 'vertical-guide',
    name: 'Architecture, Construction & Engineering — Use-Case Guide',
    canonicalPath: '/solutions/architecture-construction-engineering',
    gateHeading: 'Explore the use-case guide',
    gateDescription: 'Download the use-case guide for project coordination, document review and field coordination.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Architecture, Construction & Engineering — Use-Case Guide' },
    analyticsId: 'ace_use_case_guide',
  },
  'credit-unions-specialty-lending-executive-brief': {
    id: 'credit-unions-specialty-lending-executive-brief',
    type: 'vertical-guide',
    name: 'Credit Unions & Specialty Lending — Executive Brief',
    canonicalPath: '/solutions/credit-unions-specialty-lending',
    gateHeading: 'Get the 2-page brief',
    gateDescription: 'Download the executive brief with practical starting points for governed AI.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Credit Unions & Specialty Lending — Executive Brief' },
    analyticsId: 'credit_unions_executive_brief',
  },
  'credit-unions-specialty-lending-use-case-guide': {
    id: 'credit-unions-specialty-lending-use-case-guide',
    type: 'vertical-guide',
    name: 'Credit Unions & Specialty Lending — Use-Case Guide',
    canonicalPath: '/solutions/credit-unions-specialty-lending',
    gateHeading: 'Explore the use-case guide',
    gateDescription: 'Download the use-case guide for onboarding, KYC and fraud prevention.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Credit Unions & Specialty Lending — Use-Case Guide' },
    analyticsId: 'credit_unions_use_case_guide',
  },
}

export function getGatedResource(id: string): GatedResource | null {
  return gatedResources[id] ?? null
}

export function getDownloadResource(id: string): GatedResource | null {
  return downloadResources[id] ?? null
}

export function findGatedResourceByPath(path: string): { resource: GatedResource; isGatedPath: boolean } | null {
  for (const resource of Object.values(gatedResources)) {
    if (path === resource.canonicalPath || path.startsWith(`${resource.canonicalPath}/`)) {
      const isGatedPath =
        resource.gatedPathPrefixes?.some((prefix) => path === prefix || path.startsWith(`${prefix}/`)) ?? false
      return { resource, isGatedPath }
    }
  }
  return null
}
