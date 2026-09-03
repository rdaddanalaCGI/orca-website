import type { SolutionVertical } from './types'

export const logisticsAndDistribution: SolutionVertical = {
  id: 'logistics-and-distribution',
  name: 'Logistics & Distribution',
  shortName: 'Logistics',
  slug: 'logistics-and-distribution',
  href: '/solutions/logistics-and-distribution',
  image: '/img/verticals/logistics.jpeg',
  solutionsPage: {
    positioning:
      'Resolve warehouse inventory exceptions, supplier product changes and freight billing workflows across your existing logistics operation.',
  },
  hero: {
    eyebrow: 'LOGISTICS & DISTRIBUTION',
    headline: 'AI orchestration for complex distribution and logistics operations',
    subheadline:
      'Resolve warehouse inventory exceptions, supplier product changes and freight billing workflows across your WMS, TMS, ERP and product systems—with the evidence, approvals and controlled updates each case requires.',
    primaryCta: { label: 'Explore applications', href: '#applications' },
    secondaryCta: { label: 'Get the industry brief', href: '/contact' },
  },
  problems: {
    heading: 'Where warehouse, product and freight operations get stuck.',
    intro:
      'Short picks, count variances, supplier changes and freight billing issues often need evidence, approvals and updates across multiple systems before the work can move forward.',
    cards: [
      {
        eyebrow: 'WAREHOUSE INVENTORY',
        heading: 'The WMS knows the pick failed. The hard part is closing the exception safely.',
        body: `A picker records a short pick because the SKU is not available at the expected location. The WMS has the exception, but the supervisor may still need to determine whether another location can satisfy the order, whether a recent receipt or move explains the mismatch, whether a cycle count is required and whether a material adjustment needs approval.

The work is not closed when somebody receives another task. It is closed when the order can recover and the underlying inventory state is corrected with the right evidence and controls.`,
        terms: ['short pick', 'SKU', 'LPN', 'cycle count', 'count variance', 'reallocation'],
      },
      {
        eyebrow: 'PRODUCT OPERATIONS',
        heading: 'The product master has the SKU. The workflow starts when the supplier changes it.',
        body: `A supplier sends a new SKU or revises a product specification. The product-data steward still has to work out which attributes changed, which required fields are missing, who owns the gap and which downstream ERP, WMS or commerce records are now stale.

A PIM can hold the master record. It does not automatically make every ambiguous supplier change complete, approved and synchronized across the operation.`,
        terms: ['item master', 'product attributes', 'supplier specification', 'data steward', 'required fields'],
      },
      {
        eyebrow: 'FREIGHT BILLING & AP',
        heading: 'Delivered is not the same as billing-ready.',
        body: `A load can be marked delivered in the TMS while billing is still waiting for a usable POD or BOL. A carrier invoice can exist in AP while the user still needs the rate con, timestamps, authorization or receipt evidence required to approve or dispute an accessorial.

The loop becomes: find → compare → request → wait → review → approve or dispute → update → document why.`,
        terms: ['POD', 'BOL', 'rate con', 'accessorial', 'detention', 'invoice hold'],
      },
    ],
  },
  applications: {
    eyebrow: 'APPLICATIONS',
    heading: 'Built for the exceptions that slow distribution and logistics operations.',
    intro: 'Explore practical warehouse, product and freight-financial applications',
    defaultId: 'short-pick',
    applications: [
      {
        id: 'short-pick',
        title: 'Short Pick to Corrected Inventory',
        shortLabel: 'Short Pick Resolution',
        href: '/solutions/logistics-and-distribution#short-pick',
        category: 'WAREHOUSE OPERATIONS',
        categoryEyebrow: 'WAREHOUSE OPERATIONS',
        headline: 'Turn a short pick into corrected inventory—not another open task.',
        description: `The picker has already short-picked the SKU. Now the supervisor has to recover the order and decide whether the inventory record itself is wrong.

Orcaworks turns the WMS exception into a governed case. Assemble the SKU/location history, order impact, supporting evidence and policy; route the right next action; then record the approved correction in the systems that own warehouse and financial state.`,
        workflowSteps: [
          'Short pick',
          'Check alternate stock',
          'Count if required',
          'Supervisor approval',
          'Update WMS / ERP',
          'Close exception',
        ],
        contextItems: [
          'SKU + Location',
          'Order Priority',
          'Inventory History',
          'Count Evidence',
          'Adjustment Policy',
          'WMS / ERP',
        ],
        roles: ['Warehouse Supervisor', 'Inventory Control', 'Control Desk'],
        systems: ['WMS', 'ERP', 'RF / Mobile', 'Physical Inventory Evidence'],
        cta: { label: 'Explore this application →', href: '/contact', type: 'contact' },
      },
      {
        id: 'count-variance',
        title: 'Count Variance to Approved Adjustment',
        shortLabel: 'Count Variance & Adjustment',
        href: '/solutions/logistics-and-distribution#count-variance',
        category: 'WAREHOUSE OPERATIONS',
        categoryEyebrow: 'WAREHOUSE OPERATIONS',
        headline:
          'The physical count and the WMS disagree. Before changing inventory, someone has to understand the history, apply the tolerance policy and approve a material correction.',
        description: `A cycle count exceeds the accepted tolerance. The discrepancy may not be obvious: the count, the WMS quantity and the recent movement history all need to be compared before anyone can safely change the record.

Orcaworks assembles the evidence around the variance, explains the recent source-backed history, routes the appropriate recount or approval path and preserves the reason for the correction when WMS/ERP state changes.`,
        workflowSteps: [
          'Variance recorded',
          'Compare physical/system state',
          'Recount if needed',
          'Route material approval',
          'Post approved correction',
          'Record evidence',
          'Close',
        ],
        contextItems: [
          'Physical Count',
          'WMS Quantity',
          'Accepted Variance',
          'Movement History',
          'ERP Impact',
          'Approval Policy',
        ],
        roles: ['Inventory Control', 'Warehouse Supervisor'],
        systems: ['WMS', 'ERP', 'RF / Mobile', 'Count Evidence'],
        cta: { label: 'Explore this application →', href: '/contact', type: 'contact' },
      },
      {
        id: 'supplier-spec-change',
        title: 'Supplier Spec Change to Synchronized SKU',
        shortLabel: 'Supplier Specification Changes',
        href: '/solutions/logistics-and-distribution#supplier-spec-change',
        category: 'PRODUCT OPERATIONS',
        categoryEyebrow: 'PRODUCT OPERATIONS',
        headline:
          'The product master already contains the SKU. The work begins when a supplier changes the specification and teams have to determine what changed, what is missing and which downstream records are now stale.',
        description: `A supplier sends a new or revised product specification. The data steward must work out which attributes changed, which required fields are missing and who owns the gaps before every downstream ERP, WMS and commerce record can be updated.

Orcaworks gives the product-data steward a complete change case instead of a collection of documents and follow-up messages. Show what changed, what is missing, where it matters downstream and who must approve it, then record the approved changes with provenance.`,
        workflowSteps: [
          'Supplier change arrives',
          'Compare to product master',
          'Identify changed/missing fields',
          'Request missing evidence',
          'Data steward approves',
          'Queue downstream updates',
          'Retain provenance',
        ],
        contextItems: [
          'Supplier Specification',
          'Product Master',
          'Required Attributes',
          'Old/New Values',
          'Downstream ERP',
          'WMS',
          'Commerce',
        ],
        roles: ['Product-Data Steward', 'Item-Master Steward', 'Supplier/Onboarding Team', 'Data Governance'],
        systems: ['PIM/MDM', 'ERP', 'WMS', 'E-commerce', 'Supplier Documents'],
        cta: { label: 'Explore this application →', href: '/contact', type: 'contact' },
      },
      {
        id: 'billing-ready',
        title: 'Delivered Load to Billing-Ready',
        shortLabel: 'Delivered to Billing-Ready',
        href: '/solutions/logistics-and-distribution#billing-ready',
        category: 'FREIGHT FINANCIAL OPERATIONS',
        categoryEyebrow: 'FREIGHT FINANCIAL OPERATIONS',
        headline:
          'The TMS says the load is delivered. Billing still cannot move until the required delivery evidence is usable and linked to the right load.',
        description: `The TMS marks delivery complete, but billing is still waiting for a usable POD or BOL that is correctly linked to the load. Until that evidence is validated and attached, the load cannot be released to billing.

Orcaworks moves the freight object from an operational state to a financial-ready state. Assemble the load and delivery evidence, request precisely what is missing, validate and link the evidence and update the billing/TMS state once the case is actually ready.`,
        workflowSteps: [
          'Delivery complete',
          'Check billing requirements',
          'Identify missing POD/BOL',
          'Request evidence',
          'Validate and link document',
          'Release or hold',
          'Record closure',
        ],
        contextItems: [
          'Delivery Status',
          'POD / BOL',
          'Document Quality',
          'Load Linkage',
          'Billing Rules',
          'TMS State',
        ],
        roles: ['Billing / AR', 'Back Office', 'Transportation Operations'],
        systems: ['TMS', 'ERP / Billing / AR', 'Document Repository', 'Email'],
        cta: { label: 'Explore this application →', href: '/contact', type: 'contact' },
      },
      {
        id: 'accessorial-review',
        title: 'Accessorial Invoice to Supported Decision',
        shortLabel: 'Accessorial Review & Dispute',
        href: '/solutions/logistics-and-distribution#accessorial-review',
        category: 'FREIGHT FINANCIAL OPERATIONS',
        categoryEyebrow: 'FREIGHT FINANCIAL OPERATIONS',
        headline: 'The invoice is in the system. The evidence for the decision may not be.',
        description: `A carrier invoice contains an accessorial or detention charge, but the rate con, timestamps, authorization and receipt evidence needed to approve or dispute the charge are not in one place.

Orcaworks gives the AP/freight-audit user a freight case, not just an extracted invoice. Put the load, terms, proof, timestamps, missing evidence and next permitted action together, then retain the basis for the final decision.`,
        workflowSteps: [
          'Invoice received',
          'Join load and rate terms',
          'Assemble evidence',
          'Multi-way match',
          'Calculate supported variance',
          'Identify missing proof',
          'Route decision',
          'Update TMS/AP',
          'Preserve evidence packet',
        ],
        contextItems: [
          'Rate Confirmation',
          'POD / BOL',
          'GPS / ELD Timestamps',
          'Gate Evidence',
          'Authorization',
          'TMS State',
          'AP State',
        ],
        roles: ['Carrier AP', 'Freight-Audit Analyst', 'Billing Coordinator', 'Transportation Operations'],
        systems: ['TMS', 'ERP / AP', 'Documents / Email', 'Telemetry / Gate Evidence'],
        cta: { label: 'Explore this application →', href: '/contact', type: 'contact' },
      },
    ],
  },
  integrations: {
    heading: 'Works with the systems already running your operation.',
    intro: 'Connect Orcaworks across your logistics stack and the enterprise tools your teams already use.',
    items: [
      { name: 'Stibo Systems', category: 'logistics' },
      { name: 'AccuLinc', category: 'logistics' },
      { name: '3G TMS', category: 'logistics' },
      { name: 'Dexory / DexoryView', category: 'logistics' },
      { name: 'Infor WMS', category: 'logistics' },
      { name: 'YardView', category: 'logistics' },
      { name: 'MasterMind', category: 'logistics' },
      { name: 'MercuryGate / MercuryEdge', category: 'logistics' },
      { name: 'SAP TM', category: 'logistics' },
      { name: 'CargoWise', category: 'logistics' },
      { name: 'SAP ECC', category: 'logistics' },
      { name: 'HighJump', category: 'logistics' },
      { name: 'Salesforce', category: 'enterprise' },
      { name: 'HubSpot', category: 'enterprise' },
      { name: 'Microsoft Teams', category: 'enterprise' },
      { name: 'Outlook', category: 'enterprise' },
      { name: 'SharePoint', category: 'enterprise' },
      { name: 'Databases / Data Platforms', category: 'enterprise' },
    ],
  },
  howOrcaworksFits: {
    eyebrow: 'HOW ORCAWORKS FITS',
    heading: 'Keep your systems of record. Add the workflow layer around them.',
    intro:
      'Orcaworks brings together the context, actions, decisions and controls needed to resolve work across your existing logistics operation.',
    cards: [
      {
        id: 'systems-stay-in-place',
        eyebrow: 'YOUR SYSTEMS STAY IN PLACE',
        heading: 'Work around the systems that already run your operation.',
        body: 'WMS, TMS, ERP, PIM, documents and communications remain the systems of record. Orcaworks coordinates the work that needs to happen across them.',
        visualType: 'image',
        items: ['WMS', 'TMS', 'ERP', 'PIM / MDM', 'Documents', 'Email / Teams'],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
      {
        id: 'connected-context',
        eyebrow: 'CONNECTED CONTEXT',
        heading: 'Give every exception the context needed to resolve it.',
        body: 'Bring together the SKU, order, load, invoice, evidence, history and policy relevant to the work.',
        visualType: 'context-converge',
        items: ['SKU', 'Location', 'Order', 'Load', 'Invoice', 'POD / BOL', 'Policy', 'History'],
      },
      {
        id: 'governed-execution',
        eyebrow: 'GOVERNED EXECUTION',
        heading: 'Move the workflow forward with clear decision boundaries.',
        body: 'AI can check, request, recommend and act while approvals and controlled updates remain explicit.',
        visualType: 'workflow',
        items: ['Check', 'Request', 'Recommend', 'Approve', 'Update'],
      },
      {
        id: 'one-operating-blueprint',
        eyebrow: 'ONE OPERATING BLUEPRINT',
        heading: 'Keep context, workflow, controls and experience aligned.',
        body: 'The same definition of the work drives what AI can see, what it can do, where people decide and how the application behaves.',
        visualType: 'image',
        items: ['Context', 'Workflow', 'Actions', 'Human decisions', 'Controls', 'Experience'],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
    ],
  },
  resources: {
    eyebrow: 'INDUSTRY RESOURCES',
    heading: 'Go deeper on logistics & distribution.',
    intro: 'Download guides for your team and your stakeholders.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Logistics & Distribution — Executive Brief',
        description:
          'A concise view of the operational exceptions, priority workflows and practical starting points for governed AI across warehouse, product and freight operations.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'logistics-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Logistics & Distribution — Use-Case Guide',
        description:
          'A deeper operational guide to warehouse inventory exceptions, supplier/SKU changes and freight financial readiness—including the systems, evidence, users, decisions and metrics behind each workflow.',
        cta: { label: 'Explore the use-case guide →', resourceId: 'logistics-use-case-guide' },
      },
    ],
  },
  closingCta: {
    eyebrow: 'GET STARTED',
    headline: 'Bring us one logistics workflow.',
    body: 'Start with a short pick, a supplier SKU change or a freight billing exception that crosses systems, evidence and people. We’ll show you how Orcaworks can turn it into a governed workflow with a clear end state.',
    primaryCta: { label: 'Get a demo', href: '/contact' },
    secondaryCta: { label: 'Explore applications →', href: '/solutions/logistics-and-distribution#applications' },
  },
  featuredUseCases: [],
}
