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
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Enterprise AI Safety Handbook' },
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
    gateDescription:
      'Download the use-case guide for shipment, supplier, order, inventory, freight-audit and 3PL billing workflows.',
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
    gateDescription:
      'Download the use-case guide for medico-legal, construction PI, R&W/W&I, environmental, litigation-authority, subrogation, claims next-action and endorsement-exception workflows.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Insurance — Use-Case Guide' },
    analyticsId: 'insurance_use_case_guide',
  },
  'legal-executive-brief': {
    id: 'legal-executive-brief',
    type: 'vertical-guide',
    name: 'Legal — Executive Brief',
    canonicalPath: '/solutions/legal',
    gateHeading: 'Get the 2-page brief',
    gateDescription: 'Download the executive brief with practical starting points for governed AI.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Legal — Executive Brief' },
    analyticsId: 'legal_executive_brief',
  },
  'legal-use-case-guide': {
    id: 'legal-use-case-guide',
    type: 'vertical-guide',
    name: 'Legal — Use-Case Guide',
    canonicalPath: '/solutions/legal',
    gateHeading: 'Explore the use-case guide',
    gateDescription:
      'Download the use-case guide for intake, records, case assignment, stalled-case, closeout, scheduling, support and legal IT workflows.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Legal — Use-Case Guide' },
    analyticsId: 'legal_use_case_guide',
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
    gateDescription:
      'Download the use-case guide for change evidence, closeout, plan-vs-actual, RFI, submittal, claims, pay-app and revision-impact workflows.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Architecture, Construction & Engineering — Use-Case Guide' },
    analyticsId: 'ace_use_case_guide',
  },
  'specialty-commercial-lending-finance-executive-brief': {
    id: 'specialty-commercial-lending-finance-executive-brief',
    type: 'vertical-guide',
    name: 'Specialty Commercial Lending & Finance — Executive Brief',
    canonicalPath: '/solutions/specialty-commercial-lending-finance',
    gateHeading: 'Get the 2-page brief',
    gateDescription: 'Download the executive brief with practical starting points for governed AI.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Specialty Commercial Lending & Finance — Executive Brief' },
    analyticsId: 'specialty_lending_executive_brief',
  },
  'specialty-commercial-lending-finance-use-case-guide': {
    id: 'specialty-commercial-lending-finance-use-case-guide',
    type: 'vertical-guide',
    name: 'Specialty Commercial Lending & Finance — Use-Case Guide',
    canonicalPath: '/solutions/specialty-commercial-lending-finance',
    gateHeading: 'Explore the use-case guide',
    gateDescription:
      'Download the use-case guide for closing conditions, document reconciliation, covenant exceptions, renewals, portfolio, borrowing-base, deal-package and factoring workflows.',
    pdf: { filename: 'ai-agent-handbook.pdf', title: 'Specialty Commercial Lending & Finance — Use-Case Guide' },
    analyticsId: 'specialty_lending_use_case_guide',
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
