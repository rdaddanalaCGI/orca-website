import {
  changeEvidenceToDecisionBlueprint,
  claimsDelayChronologyBlueprint,
  closeoutReadinessBlueprint,
  crossPlatformRfiBlueprint,
  designChangeImpactBlueprint,
  payAppExceptionReviewBlueprint,
  planVsActualResolutionBlueprint,
  submittalProcurementReadinessBlueprint,
} from '@/lib/blueprints/architecture-construction-engineering'
import type { ApplicationBlueprint } from '@/lib/blueprints/types'

import type { SolutionApplication, SolutionApplicationCta, SolutionVertical } from './types'

const href = '/solutions/architecture-construction-engineering'

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

export const architectureConstructionEngineering: SolutionVertical = {
  id: 'architecture-construction-engineering',
  name: 'Architecture, Construction & Engineering',
  shortName: 'ACE',
  slug: 'architecture-construction-engineering',
  href,
  menuImage: '/img/verticals/briefs/architecture-construction-engineering.jpg',
  image: '/img/verticals/aec.avif',
  solutionsPage: {
    positioning:
      'Resolve potential changes, closeout gaps, schedule variance and cross-platform RFIs across the project platform, master schedule, cost system and email a general contractor already runs—with PMs, superintendents, designers and commercial leads keeping the decisions.',
  },
  hero: {
    eyebrow: 'ARCHITECTURE, CONSTRUCTION & ENGINEERING',
    headline: 'AI orchestration for complex construction project delivery',
    shortHeadline: 'Construction project delivery',
    subheadline:
      'Connect changes, RFIs, submittals, schedule variance and closeout across project platforms, schedules, cost systems and email—so project managers, superintendents, designers and commercial teams can act from the same evidence.',
    primaryCta: { label: 'Explore applications', href: '#applications' },
    secondaryCta: { label: 'Get the 2-page brief', href: '#executive-brief' },
  },
  problems: {
    heading: 'The project is fully documented. The decision still has to be rebuilt.',
    intro:
      'RFIs and submittals live in the project platform, the schedule in the planning system, cost and payment in project financials, drawings and models in design tools and the CDE, and the field in daily logs, photos and progress capture. The expensive work begins when a change, a slipped activity, an RFI or a handover gate depends on evidence spread across several of them—and several companies—and a project professional has to reconstruct the case before anyone can decide.',
    cards: [
      {
        eyebrow: 'CHANGE & COMMERCIAL',
        heading: 'The change log has the PCO. The reason it exists is in five other places.',
        body: `A field condition, owner instruction, RFI response or revised sheet raises a potential change. Before the PM or commercial manager can take a position, someone has to find the governing revision and the one it superseded, the related RFI, the site photos and daily report, the subcontractor's quote, the affected schedule activity and whatever the owner already said in email.

While that case is rebuilt by hand, work proceeds at risk, pending change exposure grows and the notice clock keeps running.`,
        terms: ['potential change', 'PCO', 'variation', 'work at risk', 'pending exposure', 'notice', 'scope delta'],
      },
      {
        eyebrow: 'SCHEDULE & FIELD',
        heading: 'The schedule shows the slip. The reason is in an RFI, a submittal or a delivery.',
        body: `The master schedule, the lookahead and progress capture agree that an activity is late. None of them says why. The superintendent and scheduler trace it back through an unanswered RFI, a revise-and-resubmit cycle, a delivery past its required-on-site date, an unreleased constraint or a recent variation—each in a different system.

Until the cause is established, the weekly plan is re-promised on assumptions, constraints age past their removal date and follow-on trades stack up behind the same unresolved question.`,
        terms: ['lookahead', 'PPC', 'constraint', 'planned vs actual', 'required-on-site', 'reasons for variance'],
      },
      {
        eyebrow: 'RFIs, SUBMITTALS & REVISIONS',
        heading: 'Answered in the owner’s platform. Still open in yours.',
        body: `The owner runs one platform, the contractor another, and trades ask questions by email and on site. Project engineers re-key RFIs, attach the right sheet and spec section, relay the architect's answer and update the internal record so it matches the external decision. A submittal can be approved while the product is unreleased and its delivery has slipped past the need date.

A design revision lands and someone has to work out which sheets, specs, RFIs, submittals and trades it touches before the superseded detail gets built.`,
        terms: ['RFI', 'ball in court', 'approved as noted', 'revise and resubmit', 'transmittal', 'superseded', 'ASI'],
      },
      {
        eyebrow: 'HANDOVER & PAYMENT',
        heading: 'The closeout folder is full. Half of it hasn’t been accepted.',
        body: `O&Ms, warranties, as-builts, test certificates and training records arrive from dozens of subcontractors and vendors. The project team has to know what each trade and asset actually requires, whether the document is project-specific and the right revision, who still owes what, and whether the party with authority has accepted it—before retention and final payment can move.

Pay applications carry the same problem monthly: the arithmetic is easy; the lines where claimed progress, approved changes and waivers disagree are not.`,
        terms: ['O&Ms', 'as-builts', 'warranties', 'turnover', 'retention', 'schedule of values', 'lien waiver'],
      },
    ],
  },
  applications: {
    eyebrow: 'APPLICATIONS',
    heading: 'Eight construction workflows where the decision outgrows any one system.',
    intro:
      'Each application turns one recurring cross-system project case into a governed workflow: evidence assembled with source and revision kept, the missing piece requested, the decision routed to the project role with authority, and the approved outcome written back to the records already running the job.',
    defaultId: 'change-evidence-to-decision',
    applications: [
      application(
        {
          id: 'change-evidence-to-decision',
          title: 'Change / Variation Evidence-to-Decision',
          shortLabel: 'Change Evidence-to-Decision',
          category: 'CHANGE, PAYMENT & CLAIMS',
          headline: 'Rebuild the change from RFI, revision, field and pricing—then let the PM set the position.',
          menuDescription:
            'Assemble the RFI, revisions, field evidence, pricing and schedule behind a potential change, then route the position to the PM.',
          description: `A potential change rarely starts as a clean change-order record. A field condition, owner instruction, RFI response or revised drawing raises it, and the team must establish what changed, which contract provisions apply, whether work has started, what it does to the schedule, what the trade has priced and whether the owner has authorised it. The cost system holds the PCO only once somebody has built that case.

Orcaworks builds the change case around the systems already running the project: governing and superseded revisions, the related RFI, site photos and daily reports, the subcontractor quote, the affected schedule activity and prior approvals—with source and revision kept. It flags missing or superseded support and prepares the scope delta and open questions. The PM or commercial lead sets the contractor position; the owner approves owner-controlled changes where the contract requires. Approved outcomes drive permitted change-log updates and controlled communications.

The resolved state is not “AI approved a change.” It is a complete evidence package, an explicit position, identified approvals and synchronised next actions.`,
        },
        changeEvidenceToDecisionBlueprint,
      ),
      application(
        {
          id: 'closeout-readiness',
          title: 'Closeout Readiness & External-Party Chase',
          shortLabel: 'Closeout Readiness',
          category: 'HANDOVER',
          headline: 'Know what handover requires, what has arrived and who has actually accepted it.',
          menuDescription:
            'Reconcile required O&Ms, warranties and as-builts against what arrived and was accepted, and chase the trades who still owe.',
          description: `Closeout does not fail because there is nowhere to upload a PDF. The project platform already holds O&Ms, warranties, as-builts, test certificates and training records. The hard part is knowing what each trade, system and asset requires, what has actually arrived, whether it is project-specific and the current revision, who still owes something and whether the party with authority has accepted it.

Orcaworks builds a live closeout case from the contract and specification requirements, trade-package obligations, submittal history, the asset list and the documents received to date. It reconciles expected against received against accepted, checks the digitally verifiable fields, sends targeted requests to subcontractors and vendors, interprets the replies and routes technical items to the PM, designer, commissioning lead or owner representative who can accept them. Accepted states are updated in the project platform.

The resolved state is a turnover package accounted for, an acceptance state on every item and outstanding external actions made explicit before the handover, retention and final-payment gates arrive.`,
        },
        closeoutReadinessBlueprint,
      ),
      application(
        {
          id: 'plan-vs-actual-resolution',
          title: 'Plan-vs-Actual Exception Investigation',
          shortLabel: 'Plan-vs-Actual',
          category: 'SCHEDULE & FIELD',
          headline: 'Give the superintendent the reason for the variance, not just the variance.',
          menuDescription:
            'Trace a slipped activity back through RFIs, submittals, deliveries and constraints so the superintendent decides the fix.',
          description: `The master schedule, the lookahead and progress-capture tools can show planned state and actual state. They do not necessarily explain why the two have diverged. A missed activity may trace back to an unanswered RFI, a revise-and-resubmit cycle, a delivery outside the required-on-site date, unavailable access, a recent variation or a prerequisite captured in a different system.

Orcaworks does not replace the planning system, the lookahead process or visual progress intelligence; it uses them as authoritative inputs. When a meaningful variance or missed weekly commitment appears, it gathers the RFI, submittal, procurement, change and field context around the affected work, separates missing evidence from plausible cause and prepares the reasons-for-variance case with the follow-on work exposed. The superintendent, PM and project controls decide whether the event is transient, needs resequencing, needs a constraint escalated or means a planning assumption should change.

The approved response is recorded and communicated to the trades and controls team, and Orcaworks tracks whether the intervention actually cleared the variance.`,
        },
        planVsActualResolutionBlueprint,
      ),
      application(
        {
          id: 'cross-platform-rfi',
          title: 'Cross-Platform RFI Decision Continuity',
          shortLabel: 'Cross-Platform RFIs',
          category: 'RFIs, SUBMITTALS & REVISIONS',
          headline: 'Keep one technical answer consistent across the owner’s platform, yours and the trade’s inbox.',
          menuDescription:
            'Carry an RFI and its answer across owner, contractor and trade platforms with the governing sheet attached; the PE reviews.',
          description: `This is not another RFI log. Project platforms already provide mature RFI workflows. The problem appears when the owner, designer, GC and subcontractor do not live in the same platform—or when the question begins in email, a site conversation or a trade's internal record. Project engineers then rebuild the formal record, attach the right sheet and spec section, relay the answer and make the internal record match the external decision.

Orcaworks maintains one governed RFI case across those boundaries. It identifies the authoritative source, attaches the governing sheet, spec section and prior related answers, flags missing or ambiguous fields before anything is re-keyed, routes an open technical question to the architect or engineer and prepares the target record with source attribution. The project engineer reviews before it is written into the other platform; affected trades are notified and downstream change, schedule or submittal actions are linked where supported.

The designer remains the technical authority. The resolved state is the same decision represented consistently in every project system that needs it.`,
        },
        crossPlatformRfiBlueprint,
      ),
      application(
        {
          id: 'submittal-procurement-readiness',
          title: 'Submittal-to-Procurement Readiness',
          shortLabel: 'Submittal Readiness',
          category: 'RFIs, SUBMITTALS & REVISIONS',
          headline: 'Approved as noted is not on site. Show the PM which packages are actually at risk.',
          menuDescription:
            'Combine submittal disposition, PO release, vendor status and need date so the PM decides expedite, substitute or resequence.',
          description: `A submittal can be “approved” while the project still has a material problem. The designer may have completed the technical review, but the product has not been released, the vendor has not confirmed fabrication, or the committed delivery date has moved past when the schedule needs it. That state is split between the submittal log, procurement or ERP, the master schedule and vendor emails.

Orcaworks treats the technical disposition as one state in a broader material-readiness workflow. It compares the package to the governing spec and prior review state, routes technical exceptions to the architect or engineer, then reconciles PO release, fabrication status and committed delivery against the required-on-site date. It requests missing vendor or subcontractor confirmations and presents the PM or procurement lead with a clear approved, released, committed or at-risk case and the decision paths open.

The technical decision stays with the architect or engineer. Expedite, substitution and resequencing stay with project and procurement leadership; the approved decision is recorded and the field notified.`,
        },
        submittalProcurementReadinessBlueprint,
      ),
      application(
        {
          id: 'claims-delay-chronology',
          title: 'Claims & Delay Chronology',
          shortLabel: 'Claims & Delay Chronology',
          category: 'CHANGE, PAYMENT & CLAIMS',
          headline:
            'Build the contemporaneous record before the claim does—and leave entitlement to the people who decide it.',
          menuDescription:
            'Assemble a dated, source-linked chronology from schedules, RFIs, changes, logs and minutes for the commercial team to review.',
          description: `When a delay or claim becomes material, the team often has to reconstruct the project after the fact. The baseline and updated schedules show one part of the story. RFIs, submittals, change events, daily reports, meeting minutes, correspondence, photos and payment records hold the rest—differently timestamped, differently versioned and spread across project, schedule, cost and email systems.

Orcaworks assembles the contemporaneous record around the defined event or period, normalises dates, sources and versions into a source-linked chronology, and identifies missing records, contradictory events and candidate causal links for human review. The scheduler and commercial lead review the factual chronology; contract and notice provisions are applied where they are available. Bounded notices or information requests can be drafted only from approved facts.

Orcaworks does not determine legal entitlement. Final claims, notices and settlement positions remain with authorised commercial or legal leadership, and the chronology and evidence trail are preserved for whatever follows.`,
        },
        claimsDelayChronologyBlueprint,
      ),
      application(
        {
          id: 'pay-app-exception-review',
          title: 'Pay Application Exception Review',
          shortLabel: 'Pay App Exceptions',
          category: 'CHANGE, PAYMENT & CLAIMS',
          headline:
            'Isolate the lines where progress, approved changes and waivers disagree—then let the reviewer certify.',
          menuDescription:
            'Reconcile the pay app against the SOV, approved changes, waivers and accepted progress so the reviewer approves, reduces or holds.',
          description: `Most monthly pay applications are not difficult because the arithmetic is hard. The difficult cases are the ones where claimed progress, approved scope, change status or supporting evidence do not agree. The reviewer needs the current schedule of values, the previous application, approved and pending changes, field progress, stored-material evidence, lien waivers and the project-system records before deciding what can be certified or paid.

Orcaworks assembles that exception package: it reconciles application lines against prior billing and approved scope, isolates pending or unapproved change amounts, checks waiver and support completeness and compares claimed progress with accepted digital progress evidence where it exists. Where field truth is required, it must come from accepted site evidence or a specialist progress source—Orcaworks does not invent installed progress. The exception list, each line linked to its source, goes to the authorised reviewer.

The PM, owner's representative, architect or finance approves, reduces or holds the amount under the contract. Orcaworks then performs permitted payment-record updates and requests the missing support.`,
        },
        payAppExceptionReviewBlueprint,
      ),
      application(
        {
          id: 'design-change-impact',
          title: 'Design / Revision Impact Coordination',
          shortLabel: 'Revision Impact',
          category: 'RFIs, SUBMITTALS & REVISIONS',
          headline: 'When a revision lands, show the design manager every sheet, RFI, submittal and trade it touches.',
          menuDescription:
            'Trace an approved design change to the dependent sheets, RFIs, submittals and trades; discipline leads confirm the impact.',
          description: `The project does not need another place to store the latest drawing. The CDE and document register already manage revision and transmittal state. The remaining problem begins after a meaningful design change: which other sheets, specifications, RFIs, submittals, model issues, schedule commitments or field packages are affected, and who must act before the superseded detail gets built?

Orcaworks starts from the authoritative revision, bulletin or resolved model issue and assembles the digitally linked project context: transmittal history, related RFIs and submittals, clash and coordination issues, consultant packages and the work packages consuming the sheets. It proposes the affected records for the design manager and discipline leads to confirm or strike. Document control then completes the controlled issue and transmittal, affected roles are notified, permitted linked records are updated and unacknowledged impacts are tracked.

This application is strongest on multidisciplinary design-build and infrastructure projects. Designers decide what must technically change; Orcaworks makes sure nobody has to discover the consequence on site.`,
        },
        designChangeImpactBlueprint,
      ),
    ],
  },
  integrations: {
    heading: 'Built around the project platform, schedule and cost estate you already run.',
    intro:
      'Orcaworks treats your project management platform or CDE, master schedule, lookahead tool, cost and change management or ERP, payment system, design documents and models, captured field progress, shared drives and email as the authoritative sources—and writes back only through permitted, configured interfaces. Read and write access is confirmed per system during discovery, not assumed.',
    items: [
      { name: 'Project management platform / CDE', category: 'construction' },
      { name: 'Master schedule (CPM)', category: 'construction' },
      { name: 'Lookahead / lean planning tools', category: 'construction' },
      { name: 'Cost, change & project financials / ERP', category: 'construction' },
      { name: 'Payment & lien-waiver platforms', category: 'construction' },
      { name: 'Design authoring, models & PDF markup', category: 'construction' },
      { name: 'Captured field progress & daily logs', category: 'construction' },
      { name: 'Commissioning & asset systems', category: 'construction' },
      { name: 'Owner & client CDEs', category: 'construction' },
      { name: 'Document repositories / SharePoint', category: 'enterprise' },
      { name: 'Email & shared inboxes', category: 'enterprise' },
      { name: 'Microsoft Teams', category: 'enterprise' },
    ],
  },
  howOrcaworksFits: {
    eyebrow: 'HOW ORCAWORKS FITS',
    heading: 'Close the cross-system loop the project platform, schedule and cost system leave open.',
    intro:
      'Orcaworks is not another CDE, RFI log, scheduling engine, clash detector, progress-capture tool or payment platform. It sits around the installed estate and does the case work that remains when a decision depends on records held by several systems and several companies.',
    cards: [
      {
        id: 'systems-stay-authoritative',
        eyebrow: 'YOUR SYSTEMS STAY AUTHORITATIVE',
        heading: 'The project platform, schedule and cost system remain the records of truth.',
        body: 'The CDE owns the RFI and revision, the planning system the activity, the ERP the PCO. Orcaworks works the case around them and writes back only the authorised change.',
        visualType: 'image',
        items: [
          'Project platform / CDE',
          'Master schedule',
          'Cost & payment',
          'Design & models',
          'Field capture & email',
        ],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
      {
        id: 'case-around-the-object',
        eyebrow: 'A CASE AROUND THE PROJECT OBJECT',
        heading: 'Every change, RFI, submittal, activity and deliverable gets its evidence together.',
        body: 'The superseded sheet beside the governing one. The vendor’s email beside the submittal. Orcaworks builds the chronology, keeps the source and revision, and requests what is missing.',
        visualType: 'context-converge',
        items: [
          'Change / PCO',
          'RFI',
          'Submittal',
          'Schedule activity',
          'Closeout item',
          'Drawings & specs',
          'Field evidence',
          'Correspondence',
        ],
      },
      {
        id: 'named-decision-owners',
        eyebrow: 'NAMED DECISION OWNERS',
        heading: 'Designers, superintendents, PMs and owners keep the consequential calls.',
        body: 'Orcaworks compares, requests and prepares within policy. The architect answers the RFI, the superintendent resequences, the PM sets the position, the owner approves the change.',
        visualType: 'workflow',
        items: ['Assemble', 'Request', 'Prepare', 'Named approval', 'Write back'],
      },
      {
        id: 'audit-the-resolution',
        eyebrow: 'A DEFENSIBLE RECORD',
        heading: 'Every closed case keeps its evidence, decision and write-back.',
        body: 'Revisions used, evidence requested, contract clause applied, who decided, what changed—retained per case so the record can defend a change, a payment or a claim later.',
        visualType: 'image',
        items: [
          'Evidence & revisions used',
          'Requests sent',
          'Contract rule applied',
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
    heading: 'Go deeper on construction project delivery.',
    intro:
      'A two-page brief for the project executive or commercial sponsor and a detailed guide for the PMs, superintendents, project controls, document control and commercial leads who own the queues.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Architecture, Construction & Engineering — Executive Brief',
        description:
          'Why cross-system project decisions stay slow after the CDE, schedule and cost systems are in place; the top four workflows from change evidence to cross-platform RFIs; and how to baseline the first one before setting a target.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'architecture-construction-engineering-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Architecture, Construction & Engineering — Use-Case Guide',
        description:
          'The same eight applications in operating detail: trigger, evidence, decision owner, permitted system action, incumbent boundary and workflow metric for change, closeout, plan-vs-actual, RFI, submittal, claims, pay-app and revision-impact cases.',
        cta: {
          label: 'Explore the use-case guide →',
          resourceId: 'architecture-construction-engineering-use-case-guide',
        },
      },
    ],
  },
  closingCta: {
    eyebrow: 'GET STARTED',
    headline: 'Bring us one queue. Potential changes are the usual first.',
    body: 'Start with a set of recent potential changes or variations—their RFIs, revisions, field evidence, schedule and cost records and the change log. We’ll baseline change-identification-to-disposition and show how Orcaworks turns it into a governed case with an explicit position and approvals.',
    primaryCta: { label: 'Book a demo', href: '/contact' },
    secondaryCta: { label: 'Explore applications →', href: `${href}#applications` },
  },
  featuredUseCases: [],
}
