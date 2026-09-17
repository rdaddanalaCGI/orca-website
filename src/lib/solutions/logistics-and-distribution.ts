import {
  customerOrderExceptionResolutionBlueprint,
  freightAuditDisputeResolutionBlueprint,
  inventoryStateReconciliationBlueprint,
  planVsActualRecoveryBlueprint,
  productItemOnboardingBlueprint,
  shipmentExceptionResolutionBlueprint,
  supplierPromiseResolutionBlueprint,
  threePlBillingAssuranceBlueprint,
} from '@/lib/blueprints/logistics-and-distribution'
import type { ApplicationBlueprint } from '@/lib/blueprints/types'

import type { SolutionApplication, SolutionApplicationCta, SolutionVertical } from './types'

const href = '/solutions/logistics-and-distribution'

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

export const logisticsAndDistribution: SolutionVertical = {
  id: 'logistics-and-distribution',
  name: 'Logistics & Distribution',
  shortName: 'Logistics',
  slug: 'logistics-and-distribution',
  href,
  image: '/img/verticals/logistics.avif',
  solutionsPage: {
    positioning:
      'Resolve shipment exceptions, changed supplier promises, mismatched inventory records and held freight invoices across the ERP, WMS and TMS a distributor already runs.',
  },
  hero: {
    eyebrow: 'LOGISTICS & DISTRIBUTION',
    headline: 'AI orchestration for complex distribution and logistics operations',
    shortHeadline: 'Distribution and logistics operations',
    subheadline:
      'Resolve shipment exceptions, changed supplier promises, order and inventory mismatches and held freight invoices across your ERP, WMS and TMS—with the evidence, approvals and controlled updates each case requires.',
    primaryCta: { label: 'Explore applications', href: '#applications' },
    secondaryCta: { label: 'Get the 2-page brief', href: '#executive-brief' },
  },
  problems: {
    heading: 'The systems record the operation. The work starts when they stop agreeing.',
    intro:
      'Orders sit in ERP, warehouse activity in WMS, loads in TMS, supplier replies in email and portals. The expensive work begins when a supplier date, an inventory balance, a carrier update or a freight invoice no longer matches the record—and someone has to prove what happened before anything can be changed.',
    cards: [
      {
        eyebrow: 'TRANSPORTATION',
        heading: 'The load is late, the carrier says one thing and the TMS says another.',
        body: `A pickup is missed, the ETA slips or a customer asks where the load is. The TMS shows one milestone, the visibility feed another, the carrier answers by email and the WMS knows whether the freight was even ready. Before anyone can expedite, reschedule, hold or change the customer promise, a coordinator has to reconstruct the chronology by hand.

Check calls and POD chasing consume the team, while the exception ages and the customer commitment stays unresolved.`,
        terms: ['check calls', 'track and trace', 'missing milestone', 'ETA', 'appointment', 'POD', 'service failure'],
      },
      {
        eyebrow: 'SUPPLIER PROMISES & CUSTOMER ORDERS',
        heading: 'The PO looks clean in ERP. The real promise date is in a supplier email.',
        body: `Suppliers acknowledge late, partially or not at all, and changed dates arrive by portal, spreadsheet or partial EDI. Buyers chase, interpret and repair stale promise dates so planners and customer service are not working from false assumptions.

On the other side, customer orders arrive by email, PDF and spreadsheet with conflicting SKUs, units of measure, prices or dates. A CSR has to resolve every ambiguity before a clean order can exist.`,
        terms: ['open PO', 'PO acknowledgement', 'stale promise date', 'ASN', 'order cut-off', 'SKU alias', 'UOM'],
      },
      {
        eyebrow: 'INVENTORY RECORDS',
        heading: 'A receipt posted in the WMS but never reached ERP.',
        body: `A shipment confirmation fails. A 3PL report disagrees with the internal balance. A hold or adjustment posted on one side but not the other. The result is false available-to-promise, blocked picks, wrong financial inventory and hours of research through transactions and message queues.

The count may already be right. What is missing is the digital investigation and an authorized correction.`,
        terms: ['inventory mismatch', 'failed message', 'adjustment', 'reversal', 'reprocess', 'ATP', 'hold'],
      },
      {
        eyebrow: 'FREIGHT & 3PL BILLING',
        heading: 'The invoice is in AP. The proof for the accessorial is in three other places.',
        body: `A carrier invoice fails match because a detention or lumper charge does not line up with the rate confirmation, the BOL/POD or the approval history. The rating engine has done the arithmetic; the analyst still has to explain why the charge exists and decide whether to pay, hold or dispute it.

For 3PLs the mirror image applies: special handling and project work happen, but the evidence sits in tickets and emails outside the billing engine, so revenue leaks or the invoice cannot be defended.`,
        terms: ['accessorial', 'detention', 'lumper', 'rate con', 'BOL', 'POD', 'rate card', 'billable event'],
      },
    ],
  },
  applications: {
    eyebrow: 'APPLICATIONS',
    heading: 'Eight distribution workflows where records, messages and reality diverge.',
    intro:
      'Each application turns one recurring cross-system case into a governed workflow: evidence assembled, the missing piece requested, the decision routed to the accountable role, and the approved outcome written back.',
    defaultId: 'shipment-exception-resolution',
    applications: [
      application(
        {
          id: 'shipment-exception-resolution',
          title: 'Shipment Exception Resolution',
          shortLabel: 'Shipment Exceptions',
          category: 'TRANSPORTATION',
          headline: 'Turn a missing milestone into an owned recovery, not another check call.',
          menuDescription:
            'Rebuild the load chronology from TMS, carrier and WMS, then route expedite, hold or reschedule to the planner.',
          description: `A load misses a pickup, the ETA changes, a damage or temperature signal appears, or the customer asks for status. The TMS, the visibility feed, the carrier's email and the WMS each hold part of the story, and the customer promise sits somewhere else again.

Orcaworks assembles the shipment chronology, flags what is missing or contradictory, requests the carrier or internal proof and compares the result against the appointment and customer commitment. The transportation planner or logistics manager approves expedite, reschedule, hold, claim or a changed promise. Once approved, Orcaworks updates the authorized TMS or CRM record, sends the governed communication and keeps the evidence and decision history.

The resolved state is not "shipment tracked." It is the exception understood, the recovery owned, the record updated and the customer informed.`,
        },
        shipmentExceptionResolutionBlueprint,
      ),
      application(
        {
          id: 'supplier-promise-resolution',
          title: 'Supplier Promise & PO Change Resolution',
          shortLabel: 'Supplier Promises',
          category: 'SUPPLY & ORDERS',
          headline: 'Get the supplier’s real commitment into the PO before planners act on the old one.',
          menuDescription:
            'Match supplier emails and portal updates to the PO line and get the real promise date into ERP.',
          description: `Open purchase orders look clean in ERP while the actual supplier commitment is buried in an email, portal update, spreadsheet or partial EDI acknowledgement. Buyers chase suppliers, interpret changed quantities and dates, and repair stale promise dates by hand.

Orcaworks watches the open-PO queue, matches each supplier reply to the correct PO and line, extracts date, quantity and price changes, and compares them with current demand, inventory and customer requirements. It requests missing confirmations and prepares the ERP update. Changes inside policy update automatically; material date, quantity, price or alternate-supply decisions go to the buyer.

The resolved state is a PO whose supplier commitment is reflected in the system of record, with every material change explicitly accepted, escalated or routed to an alternate-supply decision.`,
        },
        supplierPromiseResolutionBlueprint,
      ),
      application(
        {
          id: 'customer-order-exception-resolution',
          title: 'Customer Order Intake & Exception Resolution',
          shortLabel: 'Customer Order Exceptions',
          category: 'SUPPLY & ORDERS',
          headline: 'Turn the emailed PDF and the half-complete EDI into a clean, accepted order.',
          menuDescription:
            'Turn emailed PDFs and incomplete EDI into clean ERP orders, leaving only ambiguous lines for the CSR.',
          description: `Not every order arrives as clean EDI. Orders come by email, PDF and spreadsheet, or arrive electronically with missing or conflicting details. A CSR has to identify the customer and ship-to, map the SKU or alias, reconcile UOM, quantity, price and requested date, check availability and ask for what is missing before a clean order can be entered.

Orcaworks extracts the request, resolves known aliases, validates lines against customer master, contract pricing and product data, checks fulfilment constraints and separates clean lines from ambiguous ones. The CSR or order manager keeps decisions involving nonstandard pricing, substitutions or service commitments. Approved orders are created or updated in ERP/OMS with the source attached to the decision trail.

The CSR sees the original request beside the proposed clean order, with only the unresolved lines demanding attention.`,
        },
        customerOrderExceptionResolutionBlueprint,
      ),
      application(
        {
          id: 'inventory-state-reconciliation',
          title: 'ERP–WMS–3PL Inventory & Transaction Reconciliation',
          shortLabel: 'Inventory Reconciliation',
          category: 'INVENTORY',
          headline: 'Find the failed posting and prepare the authorized correction—without guessing at stock.',
          menuDescription:
            'Find where ERP, WMS and 3PL balances diverged and prepare the authorized reprocess or adjustment.',
          description: `A receipt exists in WMS but not ERP. A shipment confirmation failed. A 3PL report disagrees with the internal balance. A hold, recall or adjustment posted on one side only. Each one produces false available-to-promise, blocked picks or wrong financial inventory, and hours of research through transactions and message queues.

Orcaworks assembles the transaction chronology across ERP, WMS, 3PL feeds and integration logs, normalizes identifiers and units, and locates where state diverged. It distinguishes a missing or failed digital posting from a case that still needs a physical count, and prepares the reprocess, reversal or adjustment for the inventory-control analyst or applications owner. No correction is executed without the configured authority and evidence.

The resolved state is a reconciled digital record—or a clearly isolated physical-verification case—with the correction and its cause preserved.`,
        },
        inventoryStateReconciliationBlueprint,
      ),
      application(
        {
          id: 'freight-audit-dispute-resolution',
          title: 'Freight Audit & Dispute Resolution',
          shortLabel: 'Freight Audit & Disputes',
          category: 'FREIGHT & 3PL FINANCE',
          headline:
            'Explain the failed match and hand the analyst a pay, hold or dispute decision with the proof attached.',
          menuDescription:
            'Assemble rate con, BOL and POD evidence behind a failed invoice match and prepare the pay, hold or dispute call.',
          description: `A carrier invoice fails audit because the amount, an accessorial or the supporting evidence does not line up with the rate confirmation, contract, tariff, BOL, POD, mileage, fuel rule or approval history. The hard part is rarely the arithmetic; it is reconstructing why the charge exists and whether the evidence supports it.

Orcaworks assembles the invoice and shipment evidence, consumes the specialist rating result rather than recomputing it, identifies the unresolved discrepancy or missing proof, requests it from the carrier or internal owner and prepares the pay, hold, dispute or recovery recommendation with reason and amount. Freight-audit or AP authority approves any material financial disposition, and the packet is retained.

Orcaworks is not the rating engine or the payment rail. It closes the evidence and dispute loop those systems leave open.`,
        },
        freightAuditDisputeResolutionBlueprint,
      ),
      application(
        {
          id: '3pl-billing-assurance',
          title: '3PL Billing Assurance',
          shortLabel: '3PL Billing Assurance',
          category: 'FREIGHT & 3PL FINANCE',
          headline: 'Bill the special handling and project work that never made it into the billing engine.',
          menuDescription:
            'Capture special handling and project work recorded outside the WMS billing engine and check it against the rate card.',
          description: `A 3PL can capture standard warehouse events and still miss revenue when special handling, project work, storage conditions or customer-specific services are recorded outside the normal billing path. Billing teams reconcile WMS activity, rate cards, account notes and spreadsheets before they can defend the invoice.

Orcaworks gathers the billable events and the out-of-system evidence, checks them against the customer rate card and SLA/SOP, identifies missing, unsupported or ambiguous charges and prepares the billing exception. Standard configured charges keep flowing through the existing WMS billing engine. The billing analyst, account coordinator and site GM keep authority over nonstandard charges, credits and disputed interpretations.

This application is built for multi-client contract logistics operators, not every distributor.`,
        },
        threePlBillingAssuranceBlueprint,
      ),
      application(
        {
          id: 'product-item-onboarding',
          title: 'Product & Item Onboarding',
          shortLabel: 'Product & Item Onboarding',
          category: 'PRODUCT DATA',
          headline: 'Turn supplier spec sheets and spreadsheets into an import-ready item your ERP will accept.',
          menuDescription:
            'Map supplier spec sheets and spreadsheets to your item schema and package an import ERP or PIM will accept.',
          description: `A supplier launches or updates products through spreadsheets, spec sheets, websites and image libraries. The distributor has to identify the correct items, normalize units and attributes, fill required fields, write descriptions, attach images, validate the record and package it for the existing ERP, PIM or commerce import. Rejected imports then create a second manual remediation queue.

Orcaworks maps supplier sources to the distributor's target schema, extracts and normalizes supported fields with provenance for every value, flags conflicts and missing required attributes and prepares the import-ready package. The product-data steward decides ambiguous product facts, taxonomy and publication. After import, Orcaworks reads the log, isolates rejected records and prepares the correction loop.

This is mixed-source-to-existing-estate execution—not a replacement for a mature PIM or MDM.`,
        },
        productItemOnboardingBlueprint,
      ),
      application(
        {
          id: 'plan-vs-actual-recovery',
          title: 'Plan-vs-Actual Transportation Recovery',
          shortLabel: 'Route Recovery',
          category: 'TRANSPORTATION',
          headline:
            'When the 6 a.m. route plan breaks by 10 a.m., give the dispatcher a decision instead of a scramble.',
          menuDescription:
            'When the optimized route plan breaks mid-morning, give the dispatcher feasible alternatives and the trade-off to approve.',
          description: `The optimizer produced a valid plan this morning. Then a driver called in absent, a customer appointment moved, a high-priority order came off the dock late or a vehicle broke down. The dispatcher has to combine route state, driver and vehicle availability, warehouse readiness and customer commitments to decide what can move, what must be deferred and which service trade-off is acceptable.

Orcaworks consumes the existing plan and the actual execution signals, identifies the violated constraint and the affected stops and orders, asks the optimizer for feasible alternatives where available, and adds the warehouse, customer and workforce context the optimizer does not own. The dispatcher or transportation manager approves the service, spend and workforce trade-off. Approved changes are written back through TMS or dispatch where supported.

Orcaworks does not optimize routes. It governs the recovery loop after the optimized plan becomes infeasible.`,
        },
        planVsActualRecoveryBlueprint,
      ),
    ],
  },
  integrations: {
    heading: 'Built around the ERP, WMS and TMS estate you already run.',
    intro:
      'Orcaworks treats your distribution ERP or OMS, WMS, TMS and visibility feeds, PIM or commerce catalog, EDI, supplier and carrier portals and shared inboxes as the authoritative sources—and writes back only through permitted, configured interfaces. Read and write access is confirmed per system during discovery, not assumed.',
    items: [
      { name: 'Distribution ERP / OMS', category: 'logistics' },
      { name: 'Warehouse management (WMS)', category: 'logistics' },
      { name: 'Transportation management (TMS)', category: 'logistics' },
      { name: 'Visibility & telematics feeds', category: 'logistics' },
      { name: 'Route optimization', category: 'logistics' },
      { name: 'Freight rating & payment', category: 'logistics' },
      { name: 'PIM / MDM & e-commerce catalog', category: 'logistics' },
      { name: '3PL WMS billing engines', category: 'logistics' },
      { name: 'EDI (850/855/856/210/214)', category: 'logistics' },
      { name: 'Supplier & carrier portals', category: 'logistics' },
      { name: 'Flat-file / SFTP imports', category: 'enterprise' },
      { name: 'Email & shared inboxes', category: 'enterprise' },
      { name: 'Microsoft Teams', category: 'enterprise' },
      { name: 'CRM', category: 'enterprise' },
      { name: 'Document repositories', category: 'enterprise' },
    ],
  },
  howOrcaworksFits: {
    eyebrow: 'HOW ORCAWORKS FITS',
    heading: 'Close the cross-system loop the ERP, WMS and TMS leave open.',
    intro:
      'Orcaworks is not another WMS, TMS, route optimizer, visibility network, PIM or freight-rating engine. It sits above the installed estate and does the case work that remains when their records, external messages and actual execution no longer agree.',
    cards: [
      {
        id: 'systems-stay-authoritative',
        eyebrow: 'YOUR SYSTEMS STAY AUTHORITATIVE',
        heading: 'ERP, WMS and TMS remain the records of truth.',
        body: 'The TMS owns the load, the WMS the inventory, the ERP the order. Orcaworks works the case around them and writes back only the authorized change—a corrected promise or approved adjustment.',
        visualType: 'image',
        items: ['ERP / OMS', 'WMS', 'TMS & visibility', 'PIM / commerce', 'EDI, portals & email'],
        image: 'https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png',
        darkImage: 'https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png',
      },
      {
        id: 'case-around-the-object',
        eyebrow: 'A CASE AROUND THE OPERATIONAL OBJECT',
        heading: 'Every PO, order, load, invoice and SKU gets its evidence in one place.',
        body: 'The supplier’s email beside the PO line. The carrier message beside the TMS milestone. Orcaworks builds the chronology, flags what is missing and requests it through permitted channels.',
        visualType: 'context-converge',
        items: ['PO line', 'Order', 'Load & stop', 'Invoice', 'SKU / location', 'Documents', 'Messages', 'History'],
      },
      {
        id: 'named-decision-owners',
        eyebrow: 'NAMED DECISION OWNERS',
        heading: 'Buyers, planners, inventory owners and analysts keep the consequential calls.',
        body: 'Orcaworks compares, requests and recommends within policy. The buyer accepts the PO change, the planner the expedite, the inventory owner the adjustment, freight audit the dispute.',
        visualType: 'workflow',
        items: ['Compare', 'Request', 'Recommend', 'Named approval', 'Write back'],
      },
      {
        id: 'audit-the-resolution',
        eyebrow: 'AUDIT THE RESOLUTION',
        heading: 'Every closed case keeps its evidence, decision and write-back.',
        body: 'Evidence used, proof requested, policy applied, who decided, what changed—retained per case so finance and audit see why a payment or balance moved.',
        visualType: 'image',
        items: [
          'Evidence used',
          'Proof requested',
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
    heading: 'Go deeper on distribution and logistics operations.',
    intro:
      'A two-page brief for the executive sponsor and a detailed guide for the operations, procurement, inventory and finance leads who own the queues.',
    items: [
      {
        id: 'executive-brief',
        eyebrow: '2-PAGE VERTICAL BRIEF',
        title: 'Logistics & Distribution — Executive Brief',
        description:
          'Why cross-system exceptions persist after the ERP, WMS and TMS are in place; the eight ranked workflows from shipment exceptions to route recovery; and how to baseline the first one before setting a target.',
        cta: { label: 'Get the 2-page brief →', resourceId: 'logistics-executive-brief' },
      },
      {
        id: 'use-case-guide',
        eyebrow: 'USE-CASE GUIDE',
        title: 'Logistics & Distribution — Use-Case Guide',
        description:
          'The same eight applications in operating detail: trigger, evidence, decision owner, permitted system action, incumbent boundary and workflow metric for shipment, supplier, order, inventory, freight-audit, 3PL billing, item-onboarding and route-recovery cases.',
        cta: { label: 'Explore the use-case guide →', resourceId: 'logistics-use-case-guide' },
      },
    ],
  },
  closingCta: {
    eyebrow: 'GET STARTED',
    headline: 'Bring us one queue. Shipment exceptions are the usual first.',
    body: 'Start with a shipment exception queue, a stale supplier promise or a freight invoice held for missing proof. We’ll baseline the queue and show you how Orcaworks turns it into a governed workflow with a clear end state.',
    primaryCta: { label: 'Book a demo', href: '/contact' },
    secondaryCta: { label: 'Explore applications →', href: `${href}#applications` },
  },
  featuredUseCases: [],
}
