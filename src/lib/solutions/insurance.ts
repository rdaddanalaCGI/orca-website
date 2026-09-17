import {
  claimsNextActionOrchestrationBlueprint,
  constructionProfessionalLiabilityAssessmentBlueprint,
  endorsementExceptionResolutionBlueprint,
  environmentalLongTailClaimAssessmentBlueprint,
  medicoLegalClaimAssessmentBlueprint,
  professionalLinesLitigationAuthorityReviewBlueprint,
  rwWiBreachLossAssessmentBlueprint,
  subrogationRecoveryOrchestrationBlueprint,
} from '@/lib/blueprints/insurance'
import type { ApplicationBlueprint } from '@/lib/blueprints/types'

import type { SolutionApplication, SolutionApplicationCta, SolutionVertical } from './types'

const href = '/solutions/insurance'

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

export const insurance: SolutionVertical = {
  id: 'insurance',
  name: 'Insurance',
  slug: 'insurance',
  href,
  image: '/img/verticals/briefs/insurance.jpg',
  solutionsPage: {
    positioning:
      'Build decision-ready specialty cases and keep recoveries, claim actions and endorsement exceptions moving across the claims, policy and document systems a specialty carrier already runs.',
  },
  hero: {
    eyebrow: 'SPECIALTY INSURANCE',
    headline: 'AI orchestration for complex insurance cases and operational exceptions',
    subheadline:
      'Build decision-ready cases across medical, legal, technical and policy evidence—and keep recoveries, claim actions and policy exceptions moving across the systems and people already in place.',
    primaryCta: { label: 'Explore applications', href: '#applications' },
    secondaryCta: { label: 'Get the 2-page brief', href: '#executive-brief' },
  },
  problems: {
    heading: 'The claims system records the claim. The decision-ready case still has to be built.',
    intro:
      'Claim state lives in the claims core, policy state in the PAS, evidence in documents, email, expert reports and the other party’s inbox. The expensive work begins when the next decision depends on what no single system holds—the chronology, the applicable wording, the missing record, the unanswered demand.',
    cards: [
      {
        eyebrow: 'COMPLEX CASES',
        heading: 'The claim became a case years ago. The current position lives in someone’s head.',
        body: `A medical-professional-liability, construction-defect or transactional-risk claim can run for years and accumulate hundreds or thousands of documents—treatment records, contracts, counsel reports and expert opinions stored by source and date, not by the issue being decided.

Before anyone can assess causation, coverage or breach, a senior specialist reconstructs the chronology and maps the evidence to the allegation by hand. The next authority review, expert report or handover restarts the work—and the file’s meaning walks out with the last reviewer. That is days of expert time before judgment even starts.`,
        terms: [
          'file review',
          'chronology',
          'current position',
          'allegation',
          'expert report',
          'authority',
          'material change',
        ],
      },
      {
        eyebrow: 'COVERAGE & WORDING',
        heading: 'Which wording applies is a reconstruction problem, not a lookup.',
        body: `The policy core holds the current state. But endorsements, manuscript wording, prior versions, the underlying contract and the facts of this claim are distributed across the PAS, the DMS, deal files and broker correspondence. None of it is a field in the claim record.

Coverage counsel and examiners rebuild the applicable policy state before every consequential position—whether the trigger is a breach notice, a decades-old pollution event or a litigated D&O matter. An inconsistent interpretation is a leakage and E&O risk, so the work cannot be skipped.`,
        terms: [
          'policy wording',
          'endorsement',
          'manuscript form',
          'coverage position',
          'trigger',
          'allocation',
          'disclosure',
        ],
      },
      {
        eyebrow: 'PENDING & RECOVERY',
        heading: 'The diary fired. What the claim actually needs next is still unclear.',
        body: `Adjusters carry open inventories in the hundreds, and every file has to be reopened to learn what changed, which dependency cleared and which action matters now. Recovery specialists run the same loop across demands, other carriers and arbitration—waiting, chasing, re-reading.

The follow-ups are relentless and the cycle time slips while nobody owns the gap between a diary date and a real action. Unanswered demands quietly become lost recovery, and overdue activities become service and compliance failures a manager only sees in the month-end report.`,
        terms: [
          'pending',
          'diary',
          'open inventory',
          'demand',
          'subrogation',
          'arbitration',
          'follow-up',
          'next action',
        ],
      },
      {
        eyebrow: 'POLICY SERVICING',
        heading: 'The endorsement request does not fit the straight-through path.',
        body: `The request is incomplete, ambiguous, backdated, unsupported by the portal or beyond the service team’s authority. Practitioners describe three-to-five follow-ups per exception—each one needing the current policy state, the evidence and the discrepancy explained.

Policy services and underwriting assistants research the request, chase the broker and build a referral; the change is keyed into the PAS only after someone with authority signs off. Clean transactions keep automating; the exception queue is what remains.`,
        terms: ['endorsement', 'mid-term change', 'backdated', 'discrepancy', 'referral', 'service authority', 'E&O'],
      },
    ],
  },
  applications: {
    eyebrow: 'APPLICATIONS',
    heading: 'Eight insurance workflows where the record exists but the case still has to be built.',
    intro:
      'Each application turns one recurring case or exception into a governed workflow: the evidence assembled and source-linked, the missing item requested, the decision routed to the specialist who holds the authority, and the approved outcome written back.',
    defaultId: 'medico-legal-claim-assessment',
    applications: [
      application(
        {
          id: 'medico-legal-claim-assessment',
          title: 'Medico-Legal / MPL Issue Assessment',
          shortLabel: 'Medico-Legal Assessment',
          category: 'COMPLEX CASE ASSESSMENT',
          headline: 'Turn years of clinical records into a source-linked issue assessment.',
          menuDescription:
            'Rebuild the clinical chronology around an allegation and hand the medico-legal reviewer a source-linked assessment.',
          description: `A medical professional liability claim can run for years: treatment records from multiple providers, changing allegations, adjuster notes, claimant correspondence and competing expert opinions. When a specific standard-of-care or causation issue has to be assessed, a one-time summary of the file is not enough—the question is what the evidence says about this issue.

Orcaworks maintains the claim and clinical chronology, connects the complaint and each allegation to its source evidence, separates supporting from contradicting facts, compares expert assumptions and highlights the records still missing—then prepares a source-linked issue-assessment package.

The medico-legal reviewer or claims counsel retains the substantive decision—causation, liability, reserve and settlement. New evidence triggers a material-change review of the affected issue rather than another full manual reread of the file.`,
        },
        medicoLegalClaimAssessmentBlueprint,
      ),
      application(
        {
          id: 'construction-professional-liability-assessment',
          title: 'Construction & A&E Professional Liability Assessment',
          shortLabel: 'Construction PI',
          category: 'COMPLEX CASE ASSESSMENT',
          headline: 'Organize the project record around each alleged defect, not the folder it was filed in.',
          menuDescription:
            'Reconstruct contract duty and project chronology, compare engineering reports and prepare the issue case for counsel.',
          description: `A design-error, defect or delay claim spans professional-services agreements, drawings and revisions, RFIs, variations, site reports, programme history and engineering experts who disagree. The evidence is filed by source and date; the decision is about a specific alleged duty or defect.

Orcaworks organizes the project record around each allegation: reconstructing the professional-duty and project chronology, mapping contract obligations to the claimed failure, comparing competing expert positions and identifying the project evidence still missing from the insured, the broker or the project team.

The professional-lines handler and claims counsel keep coverage, liability and expert strategy. The result is a decision-ready, issue-by-issue responsibility case—not another folder of documents—that cuts the reconstruction cost of every review cycle.`,
        },
        constructionProfessionalLiabilityAssessmentBlueprint,
      ),
      application(
        {
          id: 'rw-wi-breach-loss-assessment',
          title: 'R&W / W&I Breach & Loss Assessment',
          shortLabel: 'R&W / W&I Claims',
          category: 'COMPLEX CASE ASSESSMENT',
          headline: 'Test each alleged breach against the whole deal record—disclosure, diligence and loss included.',
          menuDescription:
            'Map the SPA, disclosure letter, data room and post-close evidence to each alleged breach for claims counsel.',
          description: `A notice of alleged warranty breach has to be tested across the SPA, the disclosure letter, the virtual data room, diligence reports, deal correspondence and post-close financial evidence—material the claims system never held. Severity makes the reconstruction consequential: the difference between a disclosed fact and a breached warranty can be a seven-figure position.

Orcaworks builds the warranty-specific case: the alleged breach beside the warranty language, what was actually disclosed, the diligence record, the pre-close facts, the loss evidence and the assumptions in dispute—with missing material identified and requested.

Breach, coverage, causation, quantum and settlement remain with transactional-risk claims counsel. The resolved state is a documented, source-linked position on each warranty the insurer can defend—or a named list of the evidence still required to take one.`,
        },
        rwWiBreachLossAssessmentBlueprint,
      ),
      application(
        {
          id: 'environmental-long-tail-claim-assessment',
          title: 'Environmental / Long-Tail Liability Assessment',
          shortLabel: 'Environmental & Long-Tail',
          category: 'COMPLEX CASE ASSESSMENT',
          headline: 'Hold decades of policies, site history and science in one trigger-and-allocation case.',
          menuDescription:
            'Reconstruct historic policy periods, site events and expert evidence into a long-tail issue case for coverage counsel.',
          description: `An environmental claim can reach back through decades of policy periods, site operations, contamination events, remediation records, scientific evidence and litigation. Which carrier, which period and which wording responds is a reconstruction problem before it is a legal one—and the file outlives the people who built it.

Orcaworks maintains the long-tail chronology: policy periods connected to site events, remediation and monitoring records linked to the scientific evidence, gaps in the historic record flagged, and the trigger, allocation and remediation issues prepared for review.

Coverage counsel keeps the trigger, allocation and coverage decisions. The case stays assembled across years of reviews and handovers instead of being rebuilt each time the file resurfaces or a new report lands.`,
        },
        environmentalLongTailClaimAssessmentBlueprint,
      ),
      application(
        {
          id: 'professional-lines-litigation-authority-review',
          title: 'Professional-Lines Litigation & Authority Review',
          shortLabel: 'Litigation Authority Review',
          category: 'COMPLEX CASE ASSESSMENT',
          headline: 'Show the claims authority exactly what changed since the last approved position.',
          menuDescription:
            'Reconstruct the litigated matter, reconcile counsel reports with the evidence and prepare the authority package.',
          description: `A D&O, E&O or other long-running professional-lines matter accumulates pleadings, counsel reports, expert evidence, defence spend, reserve changes and previous authority decisions. Every authority review means a senior specialist rebuilding the current posture by hand before the decision can even be discussed.

Orcaworks reconstructs the matter and shows what materially changed since the prior approved position—new rulings, evidence, demands, spend and reserve movement—alongside counsel’s recommendation and the evidence behind it.

The claims authority keeps reserve, settlement and strategy decisions; defence counsel keeps legal judgment; the legal-spend platform keeps the invoices. Orcaworks replaces the repeated reconstruction, not the decision—and the authority cycle shortens because the package arrives decision-ready.`,
        },
        professionalLinesLitigationAuthorityReviewBlueprint,
      ),
      application(
        {
          id: 'subrogation-recovery-orchestration',
          title: 'Subrogation & Recovery Orchestration',
          shortLabel: 'Subrogation & Recovery',
          category: 'OPERATIONAL ORCHESTRATION',
          headline:
            'Keep the demand, the evidence and the follow-up moving until the recovery lands—or is deliberately closed.',
          menuDescription:
            'Assemble liability and payment evidence, send the approved demand and chase it across carriers to negotiation or arbitration.',
          description: `A recovery case crosses claim state, liability evidence, payments, demand packages, other carriers and arbitration forums. Specialist networks may own the transaction rails, but the case still has to be assembled, sent, chased and reconciled—and unanswered demands quietly become lost recovery.

Orcaworks maintains the recovery case end to end: assembling liability and payment evidence, preparing the demand package, tracking every response and silence, reconciling replies against the evidence and keeping the follow-up on schedule instead of in someone’s inbox.

The recovery specialist keeps the consequential calls—pursue, negotiate, compromise, arbitrate or close. The resolved state is a recovery collected or deliberately abandoned, written back to the claim record with its evidence trail.`,
        },
        subrogationRecoveryOrchestrationBlueprint,
      ),
      application(
        {
          id: 'claims-next-action-orchestration',
          title: 'Claims Next-Action & Diary Orchestration',
          shortLabel: 'Claims Next Action',
          category: 'OPERATIONAL ORCHESTRATION',
          headline: 'Turn a fired diary into a named next action with a reason—not another reminder.',
          menuDescription:
            'Read each pending claim’s state, correspondence and dependencies, then route the meaningful next action to the handler.',
          description: `A handler carrying a pending inventory in the hundreds still has to open each file to learn what changed, which dependency cleared and what action actually matters now. The diary says when to look; it cannot say what to do.

Orcaworks monitors case state, correspondence and external-party status across the inventory. It distinguishes genuinely blocked files from actionable ones, prepares the permitted follow-up or evidence request and escalates what needs authority—so handler time goes to the files that can actually move.

The adjuster keeps consequential claim decisions. The resolved state is not another reminder: it is a recorded next action with a reason and a next checkpoint, and an overdue-activity rate the claims manager can finally trust.`,
        },
        claimsNextActionOrchestrationBlueprint,
      ),
      application(
        {
          id: 'endorsement-exception-resolution',
          title: 'Endorsement Exception Resolution',
          shortLabel: 'Endorsement Exceptions',
          category: 'OPERATIONAL ORCHESTRATION',
          headline: 'Work the endorsement the straight-through path refused—incomplete, backdated or beyond authority.',
          menuDescription:
            'Gather the request, policy state and evidence, chase the broker and route the exception to the authority that can decide.',
          description: `Modern policy admin handles clean changes well. The residue is the request that does not fit—incomplete, ambiguous, backdated, unsupported online, inconsistent with current policy state or beyond the service team’s authority. Each one is a small investigation with E&O exposure if the policy record ends up wrong.

Orcaworks gathers the current policy, the request, its evidence and the authority rules; identifies what is missing or conflicting; chases the broker for it; and prepares the exception for the correct human authority with a proposed resolution where policy permits.

The underwriter decides anything outside service authority. Approved changes are issued or prepared through supported interfaces, and the decision trail stays attached to the policy record for audit.`,
        },
        endorsementExceptionResolutionBlueprint,
      ),
    ],
  },
  integrations: {
    heading: 'Built around the claims, policy and evidence estate you already run.',
    intro:
      'Orcaworks treats your claims and policy cores, DMS and document stores, legal-spend and matter tools, fraud and recovery networks, expert channels and broker portals as the authoritative sources—and writes back only through permitted, configured interfaces. Read and write access is confirmed per system during discovery, not assumed.',
    items: [
      { name: 'Claims & policy cores (Guidewire, Duck Creek, Majesco, Sapiens, Origami Risk)', category: 'insurance' },
      { name: 'Underwriting workbenches & digital-risk processing', category: 'insurance' },
      { name: 'Legal-spend & matter platforms (ELM, TyMetrix, Passport)', category: 'insurance' },
      { name: 'Fraud / SIU analytics & identity networks', category: 'insurance' },
      { name: 'Recovery & arbitration networks', category: 'insurance' },
      { name: 'Medical, engineering & forensic expert reports', category: 'insurance' },
      { name: 'Broker, provider & counsel portals', category: 'insurance' },
      { name: 'Virtual data rooms & deal files', category: 'insurance' },
      { name: 'DMS, SharePoint & claim attachments', category: 'enterprise' },
      { name: 'Email & shared inboxes', category: 'enterprise' },
      { name: 'Microsoft Teams', category: 'enterprise' },
      { name: 'BI & reporting', category: 'enterprise' },
    ],
  },
  howOrcaworksFits: {
    eyebrow: 'HOW ORCAWORKS FITS',
    heading: 'Maintain the decision-ready case around the systems of record.',
    intro:
      'Orcaworks is not another claims or policy core, UW workbench, fraud platform, legal-spend tool or recovery network. It sits above the installed estate and does the case work that remains when the decision depends on evidence those systems do not hold together.',
    cards: [
      {
        id: 'systems-stay-authoritative',
        eyebrow: 'YOUR SYSTEMS STAY AUTHORITATIVE',
        heading: 'Claims and policy cores remain the records of truth.',
        body: 'The claims system owns the claim, the PAS the policy. Orcaworks works the case around them and writes back only the authorized change—a recorded position or an issued endorsement.',
        visualType: 'image',
        items: [
          'Claims & policy cores',
          'UW workbench',
          'Legal-spend & matter',
          'Fraud & recovery networks',
          'DMS, email & portals',
        ],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
      {
        id: 'case-around-the-claim',
        eyebrow: 'A CASE AROUND THE CLAIM',
        heading: 'Every allegation, demand and exception gets its evidence in one place.',
        body: 'The expert report beside the allegation. The carrier’s reply beside the demand. Orcaworks links every statement to its source and keeps fact, allegation, opinion and decision distinct.',
        visualType: 'context-converge',
        items: [
          'Claim & issue',
          'Clinical chronology',
          'Policy wording',
          'Expert reports',
          'Demand & response',
          'Authority history',
          'Documents',
          'Correspondence',
        ],
      },
      {
        id: 'named-decision-owners',
        eyebrow: 'NAMED DECISION OWNERS',
        heading: 'Reviewers, counsel, adjusters and underwriters keep the consequential calls.',
        body: 'Orcaworks reconstructs, compares, requests and prepares within the authority matrix. The medico-legal reviewer decides causation, claims counsel coverage, the adjuster the next action, the underwriter the exception.',
        visualType: 'workflow',
        items: ['Reconstruct', 'Compare', 'Request', 'Named authority', 'Write back'],
      },
      {
        id: 'audit-the-decision',
        eyebrow: 'AUDIT THE DECISION',
        heading: 'Every position keeps its evidence, authority and rationale.',
        body: 'Evidence used, requests sent, who held authority, what changed in the claim or policy record—retained per case so audit, reinsurance and compliance can replay why a decision moved.',
        visualType: 'image',
        items: [
          'Evidence used',
          'Requests sent',
          'Authority & rationale',
          'Decision & owner',
          'System write-back',
          'Material-change watch',
        ],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
    ],
  },
  resources: {
    eyebrow: 'INDUSTRY RESOURCES',
    heading: 'Go deeper on specialty insurance operations.',
    intro:
      'A two-page brief for the chief claims officer or COO and a detailed guide for the claims, recovery, policy-services and underwriting leads who own the queues.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Insurance — Executive Brief',
        description:
          'Why decision-ready cases and exception work persist after the claims and policy cores are in place; the eight ranked workflows from medico-legal assessment to endorsement exceptions; and how to baseline the first one.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'insurance-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Insurance — Use-Case Guide',
        description:
          'All eight applications in operating detail: trigger, evidence, decision owner, permitted system action, incumbent boundary and workflow metric across complex case assessment and operational orchestration.',
        cta: { label: 'Explore the use-case guide →', resourceId: 'insurance-use-case-guide' },
      },
    ],
  },
  closingCta: {
    eyebrow: 'GET STARTED',
    headline: 'Bring us one case. A medico-legal issue assessment is the usual first.',
    body: 'Start with a live MPL claim that needs an issue assessment, or a recovery queue with unanswered demands. We’ll baseline the review effort and show you how Orcaworks turns it into a governed workflow with a clear end state.',
    primaryCta: { label: 'Book a demo', href: '/contact' },
    secondaryCta: { label: 'Explore applications →', href: `${href}#applications` },
  },
  featuredUseCases: [],
}
