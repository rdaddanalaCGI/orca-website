import {
  approvalDocumentBookingReconciliationBlueprint,
  borrowingBaseExceptionInvestigationBlueprint,
  closingConditionOrchestrationBlueprint,
  dealPackageCompletionBlueprint,
  factoringVerificationExceptionResolutionBlueprint,
  portfolioChangeInvestigationBlueprint,
  renewalAnnualReviewAssemblyBlueprint,
  reportingCovenantExceptionManagementBlueprint,
} from '@/lib/blueprints/specialty-commercial-lending-finance'
import type { ApplicationBlueprint } from '@/lib/blueprints/types'

import type { SolutionApplication, SolutionApplicationCta, SolutionVertical } from './types'

const href = '/solutions/specialty-commercial-lending-finance'

const cta: SolutionApplicationCta = { label: 'Talk to us about this workflow →', href: '/contact', type: 'contact' }

type ApplicationCopy = Pick<
  SolutionApplication,
  'id' | 'title' | 'shortLabel' | 'category' | 'headline' | 'description' | 'menuDescription'
>

function application(copy: ApplicationCopy, blueprint: ApplicationBlueprint): SolutionApplication {
  return {
    ...copy,
    href: `${href}#${copy.id}`,
    categoryEyebrow: copy.category,
    workflowSteps: blueprint.workflow.steps.map((step) => step.title),
    contextItems: blueprint.context.items.map((item) => item.title),
    roles: blueprint.interaction.people?.map((person) => person.title) ?? [],
    systems: blueprint.interaction.systems?.map((system) => system.title) ?? [],
    blueprint,
    cta,
  }
}

export const specialtyCommercialLendingFinance: SolutionVertical = {
  id: 'specialty-commercial-lending-finance',
  name: 'Specialty Commercial Lending & Finance',
  shortName: 'Specialty Lending',
  slug: 'specialty-commercial-lending-finance',
  href,
  solutionsPage: {
    positioning:
      'Coordinate closing conditions, approval-to-booking reconciliation, covenant exceptions and renewal reviews across the LOS, ABL, factoring and document systems a specialty lender already runs—while credit and loan operations keep the decisions.',
  },
  hero: {
    eyebrow: 'SPECIALTY COMMERCIAL LENDING & FINANCE',
    headline: 'AI orchestration for complex specialty commercial lending operations',
    shortHeadline: 'Specialty commercial lending operations',
    subheadline:
      'Coordinate closing conditions, covenant exceptions, portfolio reviews and document reconciliation across lending systems, files and communications—so loan operations, portfolio managers and credit officers can act on a complete evidence trail.',
    primaryCta: { label: 'Explore applications', href: '#applications' },
    secondaryCta: { label: 'Get the 2-page brief', href: '#executive-brief' },
  },
  problems: {
    heading: 'The lending systems hold the transaction. The work starts when the evidence does not line up.',
    intro:
      'Your LOS holds the deal, the ABL platform the borrowing base, the document system the executed package and email the answers from borrowers, counsel and title parties. The expensive work begins when the approval, the documents, the reporting or the collateral data disagree—and a specialist has to reconstruct the case before anyone can clear, waive or fund.',
    cards: [
      {
        eyebrow: 'CLOSING & LOAN OPERATIONS',
        heading: 'The deal is approved. Clear to close still depends on five other parties.',
        body: `Title and UCC evidence, insurance certificates, appraisals, entity documents and legal language are owned by different parties and arrive through different channels. The closer keeps the checklist, chases each item and decides what genuinely satisfies the approval—while the funding date waits. Each item has to be matched back to the exact approval language before the file can move.

A missed condition becomes a post-close exception or a lien-perfection problem. A premature clear becomes a credit decision nobody made. Either way, the gap surfaces weeks later in audit or remediation.`,
        terms: [
          'clear to close',
          'closing conditions',
          'due diligence',
          'UCC',
          'title',
          'lien perfection',
          'post-close exception',
        ],
      },
      {
        eyebrow: 'DOCUMENT & BOOKING INTEGRITY',
        heading: 'The approval says one thing. The signed documents and the booked loan say another.',
        body: `Rate, term, collateral, guarantor, fee or covenant can drift between the credit approval, the generated documents and the fields boarded into the servicing system. Operations has to compare three versions of the same transaction, work out which is authoritative and coordinate the fix with credit or legal.

Left unresolved, the mismatch becomes an enforceability question, an audit finding or a remediation project. Found early, it is a documentation exception with a named owner, a correctable record and no client impact.`,
        terms: [
          'matches approval',
          'executed documents',
          'board the loan',
          'documentation exception',
          'booking error',
          'remediation',
        ],
      },
      {
        eyebrow: 'REPORTING & PORTFOLIO MONITORING',
        heading: 'The tickler says received. Nobody has shown whether the covenant actually passed.',
        body: `Financial statements, compliance certificates and borrowing-base support arrive late, incomplete or inconsistent with prior periods. A covenant result still needs the source evidence and facility context before a credit officer can call it a data problem, a waiver or a breach.

A dashboard can show that aging, availability or utilization moved. It cannot explain whether the change is noise or real deterioration—so the portfolio manager rebuilds the case by hand, across every borrower that flagged, every reporting cycle, before credit can act.`,
        terms: [
          'ticklers',
          'covenant compliance',
          'compliance certificate',
          'annual review',
          'waiver',
          'portfolio surveillance',
        ],
      },
      {
        eyebrow: 'ABL & FACTORING',
        heading: 'The system calculated availability. The aging still does not tie to the BBC.',
        body: `The ABL platform computes ineligibles and availability; the collateral analyst still has to explain why this month's certificate, aging and prior state disagree before an advance can be approved. In factoring, the verifier clears the clean invoices and leaves the unmatched, unconfirmed or suspicious ones.

The calculation was never the bottleneck—the explanation is. Those exception cases pull senior operations and credit staff into evidence reconstruction every funding cycle, and each disposition still needs a human authority with the evidence behind it.`,
        terms: [
          'borrowing base',
          'BBC',
          'ineligibles',
          'out of formula',
          'availability',
          'debtor verification',
          'duplicate financing',
        ],
      },
    ],
  },
  applications: {
    eyebrow: 'APPLICATIONS',
    heading: 'Eight specialty-lending workflows where the case has to be rebuilt before the decision.',
    intro:
      'Each application turns one recurring exception into a governed workflow: the evidence assembled across systems and communications, the missing item requested, the decision routed to the authorized specialist, and the approved outcome written back to the system of record.',
    defaultId: 'closing-condition-orchestration',
    applications: [
      application(
        {
          id: 'closing-condition-orchestration',
          title: 'Closing Condition Orchestration',
          shortLabel: 'Closing Conditions',
          category: 'CLOSING & LOAN OPERATIONS',
          headline: 'Turn the approved deal into a clear-to-close decision with every condition evidenced.',
          menuDescription:
            'Track title, UCC, insurance and legal evidence against each approval condition; loan operations clears or holds.',
          description: `A credit approval is complete, but the transaction is not ready to fund. Title or UCC evidence may still be outstanding; insurance, appraisal, entity documents or legal language may not satisfy the approved conditions; and counsel, the borrower and internal operations each hold part of the answer.

Orcaworks turns the approved conditions into a case-specific evidence set, tracks what has arrived, connects each document or response to the condition it satisfies and surfaces anything inconsistent or incomplete. It prepares follow-ups to the borrower, counsel or title party and brings the unresolved exception back with the approval language attached.

Loan operations keeps clear-to-close within delegated authority; credit or legal decides what exceeds it. The resolved state is every pre-funding condition evidenced—or an explicit hold with the open condition and decision owner named.`,
        },
        closingConditionOrchestrationBlueprint,
      ),
      application(
        {
          id: 'approval-document-booking-reconciliation',
          title: 'Approval, Document & Booking Reconciliation',
          shortLabel: 'Docs vs Booking',
          category: 'CLOSING & LOAN OPERATIONS',
          headline: 'Prove that what was approved is what was signed and what was booked.',
          menuDescription:
            'Compare the credit approval, executed documents and booked fields; credit or legal owns substantive deviations.',
          description: `A deal can be approved correctly and still be executed incorrectly. The rate, term, collateral, guarantor, fee, covenant or condition in the approval may not match the final legal documents or the record boarded into the servicing system—turning a clerical gap into a legal, audit or customer problem.

Orcaworks assembles the final approval, generated and executed documents and booked system state into one reconciliation case. It highlights material differences at the term level, links each mismatch to its source evidence and prepares the correction path for the right authority.

Operations corrects clerical and system errors under policy; credit and legal own substantive deviations and re-documentation. The resolved state is approval, documents and booking in agreement—or an explicitly authorized exception that explains why they are not.`,
        },
        approvalDocumentBookingReconciliationBlueprint,
      ),
      application(
        {
          id: 'reporting-covenant-exception-management',
          title: 'Reporting & Covenant Exception Management',
          shortLabel: 'Covenant Exceptions',
          category: 'PORTFOLIO & CREDIT MONITORING',
          headline: 'Know whether each reporting obligation is satisfied, waived, breached or outstanding—and why.',
          menuDescription:
            'Link borrower reporting to the obligation it satisfies and route covenant exceptions to the credit officer.',
          description: `Borrower reporting is not complete because a tickler changes from due to received. Financial statements, compliance certificates and borrowing-base support can arrive late, incomplete or inconsistent with prior periods—and a covenant result still needs its source evidence before anyone calls it a data problem, a waiver or a breach.

Orcaworks monitors each reporting requirement, connects every received item to the obligation it satisfies, identifies missing or stale evidence and assembles the facility context: the required term, submitted evidence, calculation, prior history and borrower correspondence. It requests what is missing and keeps the case current while the borrower responds.

The credit officer or committee keeps waiver and escalation authority. The resolved state is an obligation that is satisfied, formally waived, escalated or clearly outstanding—with the reason and evidence retained.`,
        },
        reportingCovenantExceptionManagementBlueprint,
      ),
      application(
        {
          id: 'renewal-annual-review-assembly',
          title: 'Renewal & Annual Review Assembly',
          shortLabel: 'Annual Reviews',
          category: 'PORTFOLIO & CREDIT MONITORING',
          headline: 'Rebuild the review package once—current evidence beside the last approved terms.',
          menuDescription:
            'Reassemble prior approval, current financials, covenant history and collateral trends into a decision-ready review.',
          description: `A renewal or annual review often rebuilds a relationship the lender already knows. The current financial package arrives separately from the prior credit memo, covenant history, collateral trends, payment behavior and prior exceptions—and analysts spend the time finding evidence again before deciding what changed.

Orcaworks creates the review case around the facility: last approved terms and rationale, new financial and collateral evidence, missing items and a sourced summary of material changes. Preparation stays preparation—it does not become an autonomous credit recommendation.

The underwriter or portfolio manager owns the analysis; the credit authority approves the renewal, amendment or waiver. The resolved state is a decision-ready package that shows what changed since the last approved state and what decision is now required.`,
        },
        renewalAnnualReviewAssemblyBlueprint,
      ),
      application(
        {
          id: 'portfolio-change-investigation',
          title: 'Portfolio Change Investigation',
          shortLabel: 'Portfolio Changes',
          category: 'PORTFOLIO & CREDIT MONITORING',
          headline: 'Turn a worsening signal into an explained case and a documented credit action.',
          menuDescription:
            'Explain what moved in aging, availability or covenants and route the bounded action to the credit officer.',
          description: `A dashboard can show that something changed. It cannot say whether the change is noise, a one-off operating event or durable deterioration—so the portfolio manager spends hours reconstructing prior state, collateral trends and recent communications before deciding anything.

Orcaworks turns the signal into an investigation case: the relevant current and prior evidence, the changes that matter, links to earlier exceptions and communications, and a sourced explanation of what is known, what is inconsistent and what still needs confirmation. It flags the missing evidence and prepares the referral for credit.

The portfolio manager investigates; the credit officer or committee decides whether rating, structure, limits or conditions change. The resolved state is a documented credit action—or a deliberately closed non-material event with the rationale retained.`,
        },
        portfolioChangeInvestigationBlueprint,
      ),
      application(
        {
          id: 'borrowing-base-exception-investigation',
          title: 'Borrowing-Base Exception Investigation',
          shortLabel: 'Borrowing Base',
          category: 'ASSET-BASED LENDING',
          headline: 'Explain the variance behind the calculated availability—before the advance is approved.',
          menuDescription:
            'Take the ABL system’s exception, assemble agreement, aging and prior-BBC evidence, and prepare the disposition.',
          description: `The ABL platform calculates availability. The difficult case starts when the submitted BBC, AR aging, inventory schedule, prior balances or facility rules do not reconcile—and the collateral analyst has to determine whether the variance is a data issue, an ineligible, a concentration effect or a real availability concern.

Orcaworks treats the system calculation as authoritative, then gathers the supporting schedules, agreement language, prior BBC and borrower correspondence to explain where the case diverges. It requests missing support and prepares the exception for delegated collateral or credit authority.

The resolved state is approved availability or an explicit hold—with the variance explanation, evidence and deciding authority retained. Orcaworks does not recalculate the borrowing base; the ABL platform stays the engine of record.`,
        },
        borrowingBaseExceptionInvestigationBlueprint,
      ),
      application(
        {
          id: 'deal-package-completion',
          title: 'Deal Package Completion',
          shortLabel: 'Deal Package',
          category: 'ORIGINATION',
          headline: 'Turn mixed portal, broker and email submissions into a decision-ready credit package.',
          menuDescription:
            'Apply the program’s evidence checklist to every submission and chase missing items until the underwriter accepts.',
          description: `In middle-ticket and bespoke lending, the application arrives through a mix of portal, broker or vendor email and attachments. Statements, tax returns, bank data, the equipment quote or guarantor documents can be missing, stale or inconsistent—and the underwriter repeatedly reopens the case.

Orcaworks applies the evidence requirements for the specific deal and program, identifies what is missing or inconsistent, keeps follow-up tied to the case and validates each arrival against the checklist and existing records. The underwriter receives the package when the required evidence is present, with unresolved questions explicitly called out.

Originations and credit operations determine checklist completion; the underwriter decides when the package is ready for credit and owns any acceptance of missing evidence. The resolved state is a decision-ready package—not an autonomous approval.`,
        },
        dealPackageCompletionBlueprint,
      ),
      application(
        {
          id: 'factoring-verification-exception-resolution',
          title: 'Factoring Verification Exception Resolution',
          shortLabel: 'Factoring Verification',
          category: 'FACTORING & RECEIVABLES',
          headline: 'Work the invoices the verifier cannot clear—before capital is advanced against them.',
          menuDescription:
            'Assemble invoice, POD, debtor and FMS evidence for flagged receivables; factoring operations approves or holds.',
          description: `Factoring platforms and specialist verifiers process most clean invoices. The cases that matter are the ones that do not match, cannot be confirmed, lack delivery or purchase support, conflict with the factoring record or show duplicate-financing or fraud signals.

Orcaworks uses the factoring system or installed verifier as the tool, then builds the exception case: invoice, PO and proof of delivery, debtor AP evidence, notice of assignment, credit memos and communications. It coordinates the confirmation request and presents the discrepancy with its evidence, keeping the exception tied to the receivable record as the case develops.

Factoring operations and credit approve, hold, reserve or escalate under policy. The resolved state is a fundable receivable or a clearly held exception with the reason and supporting evidence preserved.`,
        },
        factoringVerificationExceptionResolutionBlueprint,
      ),
    ],
  },
  integrations: {
    heading: 'Built around the LOS, ABL and factoring systems you already run.',
    intro:
      'Orcaworks treats your loan-origination system, ABL or factoring platform, servicing core, document stack, lien and verification specialists and shared inboxes as the authoritative sources—and writes back only through permitted, configured interfaces. Read and write access is confirmed per system during discovery, not assumed.',
    items: [
      { name: 'Loan origination system (LOS)', category: 'lending' },
      { name: 'ABL / collateral monitoring platform', category: 'lending' },
      { name: 'Factoring management system (FMS)', category: 'lending' },
      { name: 'Loan servicing & core', category: 'lending' },
      { name: 'Document generation & e-sign', category: 'lending' },
      { name: 'UCC, title & due-diligence providers', category: 'lending' },
      { name: 'Invoice verification specialists', category: 'lending' },
      { name: 'Financial spreading & credit analysis', category: 'lending' },
      { name: 'Credit, fraud & business data', category: 'lending' },
      { name: 'Borrower & debtor portals', category: 'lending' },
      { name: 'Syndication / funding-source channels', category: 'lending' },
      { name: 'Email & shared inboxes', category: 'enterprise' },
      { name: 'Microsoft Teams', category: 'enterprise' },
      { name: 'CRM', category: 'enterprise' },
      { name: 'Document repositories', category: 'enterprise' },
    ],
  },
  howOrcaworksFits: {
    eyebrow: 'HOW ORCAWORKS FITS',
    heading: 'Do the case work the LOS, ABL and factoring systems leave open.',
    intro:
      'Orcaworks is not another LOS, borrowing-base engine, factoring platform, spreading tool or e-signature product. It sits above the installed estate and works the exceptions that remain when approvals, documents, reporting and collateral data do not line up.',
    cards: [
      {
        id: 'systems-stay-authoritative',
        eyebrow: 'YOUR SYSTEMS STAY AUTHORITATIVE',
        heading: 'LOS, ABL and FMS remain the systems of record.',
        body: 'The LOS owns the deal, the ABL platform the availability, the FMS the receivable. Orcaworks works the case around them and writes back only the authorized disposition.',
        visualType: 'image',
        items: ['LOS / credit', 'ABL platform', 'Factoring FMS', 'Servicing & core', 'UCC, e-sign & portals'],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
      {
        id: 'case-around-the-credit-object',
        eyebrow: 'A CASE AROUND THE CREDIT OBJECT',
        heading: 'Every approval, BBC, covenant and invoice gets its evidence in one place.',
        body: 'The title email beside the closing condition. The debtor response beside the flagged invoice. Orcaworks links each fact to its source and requests what is missing.',
        visualType: 'context-converge',
        items: [
          'Approval & conditions',
          'BBC & aging',
          'Covenant & certificate',
          'Invoice & debtor',
          'Loan documents',
          'Prior reviews',
          'Emails & portals',
          'Facility rules',
        ],
      },
      {
        id: 'named-decision-owners',
        eyebrow: 'NAMED DECISION OWNERS',
        heading: 'Closers, collateral analysts and credit officers keep the consequential calls.',
        body: 'Orcaworks assembles, compares and requests within facility and policy rules. Loan operations clears to close, the credit officer decides the waiver, collateral authority approves the exception.',
        visualType: 'workflow',
        items: ['Assemble', 'Compare', 'Request', 'Named approval', 'Write back'],
      },
      {
        id: 'audit-the-decision',
        eyebrow: 'AUDIT THE DECISION',
        heading: 'Every cleared condition and waiver keeps its evidence and authority.',
        body: 'Evidence used, follow-up sent, rule applied, who decided, what changed in the system—retained per case so credit, compliance and audit can reconstruct why the decision was made.',
        visualType: 'image',
        items: [
          'Evidence used',
          'Follow-up sent',
          'Policy applied',
          'Decision & owner',
          'System write-back',
          'Final state',
        ],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
    ],
  },
  resources: {
    eyebrow: 'INDUSTRY RESOURCES',
    heading: 'Go deeper on specialty commercial lending operations.',
    intro:
      'A two-page brief for the chief credit officer or COO and a detailed guide for the loan operations, collateral, portfolio and factoring leads who own the queues.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Specialty Commercial Lending & Finance — Executive Brief',
        description:
          'Why closing, covenant and reconciliation work persists after the LOS and ABL platform are in place; the four highest-priority workflows; and how to baseline approval-to-clear-to-close before setting a target.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'specialty-commercial-lending-finance-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Specialty Commercial Lending & Finance — Use-Case Guide',
        description:
          'All eight applications in operating detail: trigger, evidence, decision owner, permitted system action, incumbent boundary and workflow metric for closing, booking reconciliation, covenant, renewal, portfolio, borrowing-base, deal-package and factoring cases.',
        cta: {
          label: 'Explore the use-case guide →',
          resourceId: 'specialty-commercial-lending-finance-use-case-guide',
        },
      },
    ],
  },
  closingCta: {
    eyebrow: 'GET STARTED',
    headline: 'Bring us one closing queue. Approval-to-clear-to-close is the usual first measure.',
    body: 'Start with a closing where conditions are spread across the LOS, title, insurance and email. We’ll baseline approval-to-clear-to-close time and post-close exceptions, then define the governed workflow with a clear end state.',
    primaryCta: { label: 'Book a demo', href: '/contact' },
    secondaryCta: { label: 'Explore applications →', href: `${href}#applications` },
  },
  featuredUseCases: [],
}
