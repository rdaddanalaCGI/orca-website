import {
  caseAssignmentBlueprint,
  caseProgressionResolutionBlueprint,
  dispositionCloseoutBlueprint,
  intakeToRetainerBlueprint,
  legalItOperationsBlueprint,
  legalSchedulingCoordinationBlueprint,
  legalSupportWorkQueueBlueprint,
  recordsEvidenceReadinessBlueprint,
} from '@/lib/blueprints/legal'
import type { ApplicationBlueprint } from '@/lib/blueprints/types'

import type { SolutionApplication, SolutionApplicationCta, SolutionVertical } from './types'

const href = '/solutions/legal'

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

export const legal: SolutionVertical = {
  id: 'legal',
  name: 'Legal',
  shortName: 'Legal',
  slug: 'legal',
  href,
  // Placeholder: no legal vertical image exists yet; design team to supply /img/verticals/legal.*
  image: '/img/verticals/insurance.jpeg',
  solutionsPage: {
    positioning:
      'Coordinate intake, records requests, case assignment, stalled matters and settlement closeout across the case-management system, calendars, e-signature and document platforms a litigation firm already runs—while attorneys keep the decisions only lawyers should make.',
  },
  hero: {
    eyebrow: 'LAW FIRMS & LITIGATION',
    headline: 'AI orchestration for complex litigation and case operations',
    subheadline:
      'Move matters from qualified lead through records, assignment, scheduling and closeout across your case system, Outlook, DocuSign and DMS—with attorneys keeping representation, legal judgment, settlement and money decisions.',
    primaryCta: { label: 'Explore applications', href: '#applications' },
    secondaryCta: { label: 'Get the 2-page brief', href: '#executive-brief' },
  },
  problems: {
    heading: 'The case system knows the matter. The firm still has to move it.',
    intro:
      'Your case management system holds the intake record, stages, checklists, deadlines and documents. The expensive work begins where the record stops: an attorney has to accept, a provider has to respond, several calendars have to agree, or a settled matter still waits on liens and signatures—and someone has to gather the people, evidence and approval before the matter can move.',
    cards: [
      {
        eyebrow: 'INTAKE & RETAINER',
        heading: 'The lead is qualified. Nobody has accepted it, and the retainer is still unsigned.',
        body: `A prospective client clears screening, but becoming a retained matter needs an attorney to accept, a conflict check to clear, an investigator to be dispatched and confirmed, a retainer to go out and come back signed, and onboarding documents to arrive. Each handoff lives in a different place: the intake record, a voicemail, Outlook, DocuSign, an investigator's text.

The intake specialist chases all of it by hand while the lead ages, the prospective client calls another firm, and the Intake Director cannot see which step is actually holding the case.`,
        terms: [
          'PNC',
          'qualified lead',
          'conflict clear',
          'attorney acceptance',
          'investigator dispatch',
          'retainer',
          'signing',
          'retained',
        ],
      },
      {
        eyebrow: 'RECORDS & EVIDENCE',
        heading: 'The checklist says records are needed. The provider has not answered in six weeks.',
        body: `A demand, deposition or trial cannot proceed until medical records, itemized bills, police reports and discovery material are complete. Requests go out by portal, fax and mail; responses arrive partial, illegible, wrongly dated or with a fee request instead of the records.

Paralegals and records coordinators re-read the file to work out what is still missing, call the provider again, check the returned pages and update the case—repeating the cycle for every provider on every matter while the case stage waits.`,
        terms: [
          'records request',
          'HIPAA authorization',
          'itemized bills',
          'certification',
          'demand package',
          'medical chronology',
          'discovery cut-off',
        ],
      },
      {
        eyebrow: 'CASE INVENTORY',
        heading: 'The dashboard shows a stale case. It cannot say why—or whether it is truly stuck.',
        body: `A matter sits in the same stage for months, shows no recent case touch, or is marked settled while liens, releases, client signatures and disbursement are still outstanding. Reporting identifies the symptom. Operations still has to open the case, read the notes and emails, ask the case manager, and decide whether the record is stale, an external party is holding it, or the matter is genuinely blocked.

Managing partners and COOs review inventory they cannot fully trust, and settled-not-closed matters delay client payment and distort revenue reporting.`,
        terms: [
          'case stage',
          'no-touch age',
          'stale case',
          'settled-not-closed',
          'lien',
          'release',
          'disbursement',
          'closeout',
        ],
      },
      {
        eyebrow: 'COORDINATION & SUPPORT',
        heading: 'The deposition needs five calendars to agree. The attorney’s request is buried in email.',
        body: `Depositions, mediations, independent medical exams and signings need opposing counsel, clients, witnesses, court reporters and internal calendars to line up—then the confirmed date has to reach Outlook, the case event and everyone involved. Meanwhile attorney requests for records, drafting or filing arrive by email and Teams, and the right paralegal may not see them for days.

Legal support managers cannot see load or turnaround, attorneys re-ask, and a compact legal IT team fields access and permission tickets that touch Microsoft 365, the case system and ethical walls at once.`,
        terms: [
          'deposition notice',
          'mediation',
          'IME',
          'request-to-confirm',
          'support queue',
          'ethical wall',
          'matter permissions',
          'joiner / leaver',
        ],
      },
    ],
  },
  applications: {
    eyebrow: 'APPLICATIONS',
    heading: 'Eight case-operations workflows where the matter waits on people, evidence or approval.',
    intro:
      'Each application turns one recurring gap around the case record into a governed workflow: the matter-specific evidence assembled, the missing item requested, the decision routed to the accountable attorney or manager, and the verified result written back to the case system.',
    defaultId: 'intake-to-retainer',
    applications: [
      application(
        {
          id: 'intake-to-retainer',
          title: 'Intake-to-Retainer Coordination',
          shortLabel: 'Intake to Retainer',
          category: 'INTAKE & ASSIGNMENT',
          headline:
            'Get the qualified lead accepted, signed and onboarded—without the intake team chasing five systems.',
          menuDescription:
            'Track attorney acceptance, investigator dispatch and DocuSign state for each qualified lead; the intake attorney decides representation.',
          description: `A prospective client clears screening, but becoming a retained matter requires several handoffs: complete the first-contact record, reach the attorney for an acceptance decision, dispatch and confirm an investigator where the case needs one, send the retainer, chase the signature and onboarding documents, and return the final state to the case system.

Orcaworks assembles the intake case across the case management system, phone and SMS history, email, calendars, the investigator roster and e-signature state. It identifies what is still missing, coordinates permitted follow-ups with the client and investigator, and presents the intake attorney with the evidence needed for the acceptance and assignment decision. Once authorized, it sends the retainer and onboarding communications and tracks them to completion.

Representation, conflict clearance and acceptance remain with the intake attorney. The resolved state is an accepted or declined lead with a documented decision—and, if accepted, an assigned, retained matter with its onboarding state recorded in the case system.`,
        },
        intakeToRetainerBlueprint,
      ),
      application(
        {
          id: 'records-evidence-readiness',
          title: 'Records & Evidence Readiness',
          shortLabel: 'Records & Evidence',
          category: 'RECORDS & EVIDENCE',
          headline:
            'Know exactly which records are still missing, chase them on schedule and hand the attorney a complete, source-linked file.',
          menuDescription:
            'Compare returned records and bills against the evidence checklist, chase providers and link every page to its source for attorney review.',
          description: `A case cannot reach demand, deposition or trial because medical records, itemized bills, police reports, affidavits or discovery material are incomplete. Staff repeatedly inspect the file to work out what is missing, contact the provider, court or insurer, follow up, check the returned pages and update the case stage.

Orcaworks maintains an evidence-readiness case tied to the matter. It compares received material against the required evidence set, identifies gaps, sends approved requests and scheduled follow-ups, checks returned documents for page counts, dates and readability, links each record to its source in the DMS and updates the matter when evidence arrives. Specialist chronology and review tools can then run on a complete set.

Attorneys determine legal sufficiency, evidentiary significance and how the material affects strategy. The resolved state is a case whose required evidence is received and traceable—or an explicit, named blocker escalated to the paralegal or attorney.`,
        },
        recordsEvidenceReadinessBlueprint,
      ),
      application(
        {
          id: 'case-assignment',
          title: 'Governed Case Assignment',
          shortLabel: 'Case Assignment',
          category: 'INTAKE & ASSIGNMENT',
          headline:
            'Assign the matter by the firm’s rotation and capacity rules—and route the special cases to the partner who should choose.',
          menuDescription:
            'Apply rotation, venue, language and caseload rules to unassigned matters; the intake attorney or partner approves the owner.',
          description: `A qualified matter needs an attorney, but the information that should drive the choice is scattered: case type, venue, client language, referral or federal flags, who is admitted where, current on-desk counts, recent assignments and the firm's rotation rules. Informal assignment ends up depending on memory or lagging workload reports.

Orcaworks builds the assignment case and applies the firm's explicit rotation, eligibility and capacity logic for standard matters. Referral, catastrophic, federal and other special matters are identified and routed to the intake attorney or partner for deliberate selection. Every assignment is approved before it is written to the case system, and the eligible set, each attorney's load and the rule that produced the recommendation are recorded with it.

Attorney acceptance, conflict decisions and special-case judgment stay human. The resolved state is a matter with an approved attorney owner and a traceable assignment basis in the case system.`,
        },
        caseAssignmentBlueprint,
      ),
      application(
        {
          id: 'case-progression-resolution',
          title: 'Stalled-Case Progression',
          shortLabel: 'Stalled Cases',
          category: 'CASE INVENTORY',
          headline:
            'Turn the stale-case report into an explained blocker and a named next action—not another dashboard.',
          menuDescription:
            'Reconstruct a stale matter from stage, notes, emails and open requests, then route the next step to the supervising attorney.',
          description: `A report shows a matter with an old stage, no recent case touch, an overdue checklist item or an unexpected gap. The dashboard identifies the symptom; operations still has to determine whether the case is truly stalled, the record is stale, or a provider, court or opposing party is holding it.

Orcaworks turns the reporting exception into an investigation. It reconstructs the current state from the case stage, tasks, notes, emails and SMS, open records requests, appointments and settlement or discovery activity; asks the case owner for missing context; identifies the blocker; and prepares the follow-up or record correction. Where the answer is a legal or strategic change, it routes that to the supervising attorney.

The resolved state is a matter that is correctly represented in the case system, with an evidence-backed status, a named owner and a next action—so partners and the COO review inventory they can trust.`,
        },
        caseProgressionResolutionBlueprint,
      ),
      application(
        {
          id: 'disposition-closeout',
          title: 'Settlement & Case Closeout Readiness',
          shortLabel: 'Settlement Closeout',
          category: 'CASE INVENTORY',
          headline:
            'Move settled matters to a clean close—liens, releases, signatures and approvals accounted for before disbursement.',
          menuDescription:
            'Assemble liens, releases, client signatures and trust state for settled matters; the attorney approves closure and accounting authorizes disbursement.',
          description: `A matter can be marked settled while still waiting on final lien letters, the signed release, the client's closing statement, attorney approval, cost reconciliation or disbursement. Settled is not closed, and every open dependency delays the client's payment and distorts the firm's reporting.

Orcaworks builds the closeout checklist around the authoritative case record: settlement terms, release status, medical, Medicare and ERISA lien balances, client signatures, the costs ledger and trust state. It identifies the missing releases, lien letters, signatures or approvals, coordinates follow-up with lienholders, insurers and the client, reconciles case and accounting state, and presents a closure-ready packet to the responsible attorney and settlement team.

The attorney approves release and lien treatment; the settlement or accounting lead authorizes disbursement. Orcaworks updates permitted status fields after approval and never moves money. The resolved state is a closed matter—or one whose remaining dependencies are explicitly named.`,
        },
        dispositionCloseoutBlueprint,
      ),
      application(
        {
          id: 'legal-scheduling-coordination',
          title: 'Legal Scheduling Coordination',
          shortLabel: 'Scheduling',
          category: 'COORDINATION & SUPPORT',
          headline: 'Get the deposition, mediation or IME confirmed across every calendar—and recorded in the case.',
          menuDescription:
            'Collect availability from counsel, clients and witnesses, propose permitted dates and update calendars once the attorney confirms.',
          description: `Depositions, mediations, hearings, client signings, independent medical examinations and expert meetings require several internal and external calendars to agree. Legal assistants exchange proposed times, reconcile conflicts, book the court reporter or interpreter, update Outlook and the case event, send the notice and supporting documents, and chase confirmation.

Orcaworks coordinates the logistics around the event. It identifies participants and constraints from the case event, court notice and docketing system, collects availability from opposing counsel, the client and witnesses, proposes permitted options, tracks responses, escalates unresolved conflicts and—once the attorney confirms—updates the calendars and case event and distributes the approved notice and materials.

Attorneys keep strategic timing decisions, and the docketing system remains authoritative for deadlines. The resolved state is a confirmed event represented consistently in Outlook and the case system, with every party notified.`,
        },
        legalSchedulingCoordinationBlueprint,
      ),
      application(
        {
          id: 'legal-support-work-queue',
          title: 'Legal Support Work Queue',
          shortLabel: 'Support Queue',
          category: 'COORDINATION & SUPPORT',
          headline:
            'Turn the attorney’s emailed request into routed, matter-aware support work with a visible turnaround.',
          menuDescription:
            'Convert attorney requests into matter-aware work items routed by skill and capacity; the attorney reviews the legal output.',
          description: `Attorneys and case teams generate a constant stream of records, drafting, filing, coordination and administrative requests. When those arrive through email, Teams or a hallway conversation, the right paralegal may not see them for days, and support managers have little visibility into load, aging or turnaround.

Orcaworks converts each request into a matter-aware work item, attaches only the case context the assignee is permitted to see, classifies the task and deadline, routes it to the eligible support pool by skill and capacity, tracks completion, and returns the output and status to the requesting attorney and the case record. Where a firm runs BigHand or another resource tool, that remains the allocation source.

The requesting attorney supervises substantive legal output and approves any filing. The resolved state is a support request completed, reviewed where required, reflected in the matter and visible to the support services manager as load and turnaround.`,
        },
        legalSupportWorkQueueBlueprint,
      ),
      application(
        {
          id: 'legal-it-operations',
          title: 'Legal IT Operations',
          shortLabel: 'Legal IT Operations',
          category: 'LEGAL TECHNOLOGY',
          headline:
            'Resolve the access ticket that touches Entra, Microsoft 365, the case system and an ethical wall—under the right approval.',
          menuDescription:
            'Assemble identity, device, case-system and DMS permission context for a ticket, then act under the approved runbook and IT sign-off.',
          description: `A compact legal IT team owns identity, devices, Microsoft 365, the case-management system, the DMS, telephony, security, vendors and support. A ticket that looks simple—a new paralegal, a lateral moving practice groups, a departing attorney, a user who cannot open a workspace—needs user, device, application, matter-permission and ethical-wall context before a safe action is possible.

Orcaworks creates a governed IT operations case. It gathers Entra, Intune and Microsoft 365 state, case-system roles, iManage or NetDocuments workspace permissions and matter restrictions; diagnoses the ticket against the firm's approved runbook; requests IT or security-owner approval where the action is privileged or changes matter permissions; performs or coordinates the permitted action; verifies the result with the user; and documents it in the ticket.

Privileged access, security exceptions and matter-permission changes remain explicitly approved. The resolved state is a resolved or escalated ticket with an authorized action and a complete audit record—and recurring problems flagged for the applications administrator.`,
        },
        legalItOperationsBlueprint,
      ),
    ],
  },
  integrations: {
    heading: 'Built around the case system, DMS and Microsoft estate your firm already runs.',
    intro:
      'Orcaworks treats your case-management system, document management system, Microsoft 365, e-signature, telephony, docketing, accounting and ticketing platforms as the authoritative sources—and writes back only through permitted, configured interfaces inside matter-level permissions. Read and write access is confirmed per system during discovery, not assumed.',
    items: [
      { name: 'Case management system', category: 'legal' },
      { name: 'Document management (iManage, NetDocuments, SharePoint)', category: 'legal' },
      { name: 'Docketing & deadline systems', category: 'legal' },
      { name: 'Conflicts & resource allocation (Intapp, BigHand)', category: 'legal' },
      { name: 'Provider, court & insurer portals / fax', category: 'legal' },
      { name: 'E-filing portals', category: 'legal' },
      { name: 'Chronology & document review tools', category: 'legal' },
      { name: 'Trust & legal accounting', category: 'legal' },
      { name: 'Microsoft 365, Outlook & Teams', category: 'enterprise' },
      { name: 'Microsoft Entra, Intune & Defender', category: 'enterprise' },
      { name: 'DocuSign / e-signature', category: 'enterprise' },
      { name: 'Telephony & SMS', category: 'enterprise' },
      { name: 'ServiceNow / Jira', category: 'enterprise' },
      { name: 'BI & reporting', category: 'enterprise' },
    ],
  },
  howOrcaworksFits: {
    eyebrow: 'HOW ORCAWORKS FITS',
    heading: 'Complete the work around the case record the case system leaves open.',
    intro:
      'Orcaworks is not another case-management system, DMS, docketing engine, conflicts tool or legal research assistant. It sits above the installed estate and does the coordination work that remains when a matter is visible in the system but still cannot move.',
    cards: [
      {
        id: 'case-system-stays-authoritative',
        eyebrow: 'YOUR SYSTEMS STAY AUTHORITATIVE',
        heading: 'Your case system, DMS and docketing remain the records of truth.',
        body: 'The case system owns the matter, the DMS the documents, docketing the deadlines. Orcaworks works the case around them and writes back only the authorized change—a retained state, an assignment, a closed status.',
        visualType: 'image',
        items: ['Case management', 'DMS', 'Docketing', 'Microsoft 365', 'DocuSign, portals & phone'],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
      {
        id: 'case-around-the-matter',
        eyebrow: 'A CASE AROUND THE MATTER',
        heading: 'Every lead, records request, stale case and settlement gets its evidence in one place.',
        body: 'The provider’s reply beside the records request. The investigator’s text beside the intake record. Orcaworks retrieves only what the user is permitted to see, links facts to their source and requests what is missing.',
        visualType: 'context-converge',
        items: [
          'Matter & stage',
          'Intake record',
          'Records request',
          'Settlement & liens',
          'Calendars',
          'Documents',
          'Emails & SMS',
          'History',
        ],
      },
      {
        id: 'named-decision-owners',
        eyebrow: 'NAMED DECISION OWNERS',
        heading: 'Attorneys, partners and accounting keep the consequential calls.',
        body: 'Orcaworks compares, requests and recommends within the firm’s rules. The intake attorney accepts representation, the supervising attorney approves the next step, the responsible attorney approves closure, accounting authorizes disbursement.',
        visualType: 'workflow',
        items: ['Compare', 'Request', 'Recommend', 'Attorney approval', 'Write back'],
      },
      {
        id: 'audit-the-resolution',
        eyebrow: 'AUDIT THE RESOLUTION',
        heading: 'Every closed case keeps its evidence, decision and write-back.',
        body: 'Evidence used, request sent, rule applied, who approved, what changed in the case system—retained per matter so partners, compliance and IT can see why a status, assignment or permission moved.',
        visualType: 'image',
        items: [
          'Evidence used',
          'Request sent',
          'Rule applied',
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
    heading: 'Go deeper on litigation case operations.',
    intro:
      'A two-page brief for the managing partner or COO and a detailed guide for the intake, records, case-operations, settlement and IT leads who own the queues.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Legal — Executive Brief',
        description:
          'Why matters stall after the case system is in place; the four highest-priority workflows from intake-to-retainer to stalled-case progression; and how to baseline the first queue before setting a target.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'legal-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Legal — Use-Case Guide',
        description:
          'All eight applications in operating detail: trigger, evidence, decision owner, permitted system action, incumbent boundary and workflow metric for intake, records, assignment, stalled-case, closeout, scheduling, support-queue and legal IT cases.',
        cta: { label: 'Explore the use-case guide →', resourceId: 'legal-use-case-guide' },
      },
    ],
  },
  closingCta: {
    eyebrow: 'GET STARTED',
    headline: 'Bring us one queue. Unsigned retainers or aged records requests are the usual first.',
    body: 'Start with the qualified leads waiting on acceptance and signature, or the records requests aging past your follow-up window. We’ll baseline the queue and show you how Orcaworks turns it into a governed workflow with a clear end state.',
    primaryCta: { label: 'Book a demo', href: '/contact' },
    secondaryCta: { label: 'Explore applications →', href: `${href}#applications` },
  },
  featuredUseCases: [],
}
