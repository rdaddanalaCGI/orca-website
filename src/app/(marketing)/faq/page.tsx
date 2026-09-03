import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Faq } from '@/components/sections/faqs-accordion'
import { JsonLd } from '@/components/seo/json-ld'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Orcaworks FAQ',
  description:
    "Answers on Orcaworks' agentic AI automation platform — governance, security, compliance, integrations, pilot process, and ROI for enterprise teams.",
  path: '/faq',
})

const faqs = [
  {
    q: 'What is Agentic Process Automation (APA)?',
    a: 'Agentic Process Automation is an approach to automating entire business processes rather than individual tasks. APA combines structured workflows, AI agents, policy enforcement, and human oversight to ensure work executes end to end with consistency, traceability, and control.',
  },
  {
    q: 'Is Agentic Process Automation the same as Intelligent Process Automation or hyperautomation?',
    a: 'No. Intelligent Process Automation combines RPA with AI to automate more complex tasks. APA goes further by coordinating multiple agents to execute complete workflows under strict governance. Unlike hyperautomation, which often connects multiple tools, APA provides a unified and policy-driven framework for end-to-end process execution.',
  },
  {
    q: 'How is Agentic Process Automation different from traditional RPA?',
    a: 'Traditional RPA automates individual tasks or user interface interactions. Bots follow predefined scripts and can break when processes change. APA executes entire workflows by coordinating systems, decisions, approvals, documents, and exceptions under declared business rules. Execution remains auditable, governed, and resilient to change.',
  },
  {
    q: 'How is APA different from IPA and traditional RPA?',
    a: 'RPA automates tasks. IPA adds AI to improve task automation. APA executes complete workflows under policy control. APA ensures deterministic escalation paths, full process visibility, structured exception handling, and end-to-end traceability across systems.',
  },
  {
    q: 'What is the Orcaworks Agentic Automation Platform?',
    a: 'Orcaworks is a modular agentic automation platform that enables enterprises to deploy intelligent agents capable of reasoning, acting, and collaborating across systems. It includes orchestration, memory management, observability, governance controls, and secure integration layers.',
  },
  {
    q: 'How is Orcaworks different from AI copilots or chat-based automation?',
    a: 'Copilots assist individuals. Orcaworks executes shared, repeatable enterprise processes. Decisions follow defined business rules rather than improvisation, ensuring predictable and auditable outcomes.',
  },
  {
    q: 'How is Orca different from other AI agents in the market?',
    a: 'Orca is built for enterprise production use. It operates using manifest-defined logic, governed execution, and full observability. Every action is logged, auditable, and policy-aligned, making it suitable for compliance-sensitive environments.',
  },
  {
    q: 'What makes Orca Agents enterprise-grade?',
    a: 'Orca Agents are custom-built for specific workflows. They support multi-agent collaboration, structured orchestration, human-in-the-loop checkpoints, and complete audit trails. This ensures governance, scalability, and operational trust.',
  },
  {
    q: 'Does Orcaworks replace human workers?',
    a: 'No. Orcaworks functions as a digital co-worker. Human judgment, approvals, and overrides are embedded into workflows. The objective is to remove manual coordination and repetitive work while preserving accountability.',
  },
  {
    q: 'What kind of tasks can Orca Agents automate?',
    a: 'Orca Agents automate report generation, data entry and retrieval, scheduling, document and email summarization, approvals, reconciliations, and multi-step cross-department workflows.',
  },
  {
    q: 'What systems does Orcaworks integrate with?',
    a: 'Orcaworks integrates with enterprise systems such as CRM, ERP, HRIS, ITSM platforms, document repositories, and communication tools. Teams continue working within existing systems while Orca coordinates execution across them.',
  },
  {
    q: 'Can Orca Agents integrate with our existing enterprise systems?',
    a: 'Yes. Orca integrates using APIs, secure connectors, and RPA where required. It is designed to operate within your existing technology stack without requiring system replacement.',
  },
  {
    q: 'We already use RPA or BPM tools. How does Orcaworks fit in?',
    a: 'Orcaworks complements existing automation investments. It can orchestrate RPA bots, coordinate BPM workflows, and provide governance and visibility across the full process lifecycle. It ensures that entire workflows operate under policy with human oversight.',
  },
  {
    q: 'How does Orcaworks handle exceptions and edge cases?',
    a: 'Exceptions are defined deterministically. Escalation rules, fallback logic, and approval paths are configured in advance, preventing unpredictable behavior when inputs or conditions change.',
  },
  {
    q: 'Does Orcaworks APA require coding or AI expertise?',
    a: 'No. Orcaworks includes a visual low-code Process Studio that allows business users and subject matter experts to design and refine workflows. IT teams remain involved for governance and integration, but day-to-day adjustments can be handled operationally.',
  },
  {
    q: 'How does Orcaworks APA handle change over time?',
    a: 'Workflows are version-controlled and easily updated. Changes to business rules, decision logic, or escalation paths are intentional and auditable. Orca does not make uncontrolled changes independently.',
  },
  {
    q: 'How does Orcaworks ensure governance and control?',
    a: 'Orcaworks uses a dedicated execution control layer to coordinate multiple AI agents within approved workflows. Business rules are versioned and enforced. Human approvals can be embedded at defined checkpoints. All actions are logged for traceability.',
  },
  {
    q: 'What governance features does Orcaworks provide?',
    a: 'Orcaworks provides real-time observability, detailed audit trails, policy-based controls, human-in-the-loop checkpoints, and enforcement rules for escalation and override scenarios.',
  },
  {
    q: 'How is human oversight maintained?',
    a: 'Orcaworks operates under a shared-control model. Humans can review, approve, intervene, or override agent decisions at defined stages to ensure alignment with business objectives.',
  },
  {
    q: 'How does Orcaworks handle security?',
    a: 'Orcaworks includes enterprise-grade security such as role-based access control, encryption in transit and at rest, secure API integrations, and comprehensive activity logging with full traceability.',
  },
  {
    q: 'Is Orcaworks secure and enterprise-ready?',
    a: 'Yes. Orcaworks is designed for production deployment with governed execution, access control, secure integrations, and audit-ready logging suitable for enterprise environments.',
  },
  {
    q: 'Is Orcaworks compliant with industry standards?',
    a: 'Orcaworks supports compliance with standards such as GDPR, SOC 2, HIPAA where applicable, and ISO 27001. Flexible deployment models support regulatory and data residency requirements.',
  },
  {
    q: 'Is Orcaworks suitable for regulated industries?',
    a: 'Yes. Orcaworks is designed for compliance-sensitive industries where decisions must be explainable and auditable. Every action and data input is logged by default.',
  },
  {
    q: 'How is data handled and secured during execution?',
    a: 'Orcaworks operates within your infrastructure with governed system access, encrypted data handling, and full observability. Data remains under your control throughout execution.',
  },
  {
    q: 'What deployment options are available?',
    a: 'Orcaworks supports fully managed cloud SaaS deployment, on-premises deployment for strict data requirements, and hybrid models that combine cloud flexibility with on-prem control.',
  },
  {
    q: 'How do organizations typically get started with Orcaworks?',
    a: 'Orcaworks follows a structured path from discovery to production. Teams identify a high-value workflow where governance and visibility matter most. Business rules, approvals, and exception paths are encoded into a controlled workflow. After validation in a safe environment, the workflow moves into production with safeguards and full traceability.',
  },
  {
    q: 'How long does it take to see value?',
    a: 'Organizations typically see measurable value after the first high-friction workflow goes live. Improvements are commonly seen in cycle time, error reduction, and audit readiness once execution paths are defined and enforced.',
  },
  {
    q: 'How long does a pilot take?',
    a: 'Most pilots run between 6 and 10 weeks depending on scope. The process moves from discovery and workflow design to live production execution within that timeframe.',
  },
  {
    q: 'How many workflows are included in a pilot?',
    a: 'Typically one or two high-value workflows are included. These are selected during discovery to demonstrate measurable business impact.',
  },
  {
    q: 'What level of effort is required from our team during the pilot?',
    a: 'Most pilots require approximately four hours per week from a small cross-functional team. Orcaworks Flow Architects and Context Engineers manage workflow design and execution.',
  },
  {
    q: 'What happens after the pilot?',
    a: 'After the pilot, organizations can extend the initial workflow, scale to additional processes, or pause. Results are reviewed collaboratively, and next steps are aligned based on performance and ROI.',
  },
  {
    q: 'Who is the Orcaworks pilot best suited for?',
    a: 'Pilots are best suited for teams with a clearly defined, repeatable, and high-value process. Engagement from business stakeholders and subject matter experts improves speed and results.',
  },
  {
    q: 'How much change management is required?',
    a: 'Minimal change management is required because Orca works within existing enterprise systems. Employees continue using familiar tools while coordination and execution are automated behind the scenes.',
  },
  {
    q: 'How do you measure success?',
    a: 'Success metrics are defined at the outset. Common measurements include time savings, error reduction, improved compliance, reduced cycle time, and clear return on investment.',
  },
  {
    q: 'Who typically uses Orcaworks?',
    a: 'Orcaworks supports multiple stakeholders including business leaders, IT and automation teams, compliance and risk teams, and process owners. Each group benefits from improved visibility, governance, and execution control.',
  },
  {
    q: 'How does Orcaworks support cross-functional teams?',
    a: 'Orcaworks enables departments to execute governed workflows while staying aligned with enterprise policies. It reduces manual handoffs, improves coordination across systems, and provides shared visibility into execution status.',
  },
  {
    q: 'How does Orcaworks support Operations and Shared Services?',
    a: 'Operations teams can execute multi-system workflows with consistency and traceability. Manual coordination is reduced, and every step follows predefined operating procedures.',
  },
  {
    q: 'How does Orcaworks support Finance and Accounting?',
    a: 'Finance teams can automate invoice processing, reconciliations, approvals, and reporting workflows. Deterministic exception handling and full audit logs support internal and external compliance requirements.',
  },
  {
    q: 'How does Orcaworks support Legal and Compliance teams?',
    a: 'Legal and compliance teams can coordinate contract reviews, regulatory checks, and policy validations with full traceability. Every decision and document interaction is logged and auditable.',
  },
  {
    q: 'How does Orcaworks support Revenue Operations and Sales Support?',
    a: 'Revenue teams can structure bid responses, approval workflows, and compliance checks. This accelerates revenue-critical processes while maintaining governance and risk control.',
  },
  {
    q: 'How does Orcaworks support Marketing Operations?',
    a: 'Marketing teams can streamline campaign approvals, content reviews, and cross-team coordination. Work progresses efficiently while maintaining brand and compliance standards.',
  },
  {
    q: 'How does Orcaworks support IT and Automation teams?',
    a: 'IT teams can deploy agentic automation with role-based access, structured governance, and observability. They maintain control over integrations, security, and execution policies.',
  },
  {
    q: 'How does Orcaworks support Risk and Audit teams?',
    a: 'Risk and audit teams gain searchable, exportable execution records that detail every decision and system action. This simplifies audits and strengthens oversight.',
  },
  {
    q: 'What does a Flow Architect do?',
    a: 'A Flow Architect designs structured workflows that coordinate agents, enterprise systems, approvals, and human checkpoints. They ensure automation is observable, governable, and aligned with business policy.',
  },
  {
    q: 'What does a Context Engineer do?',
    a: 'A Context Engineer ensures agents operate with accurate and relevant information. They manage memory systems, retrieval logic, and context configuration to improve reasoning quality and consistency.',
  },
  {
    q: 'How does Orcaworks ensure controlled multi-agent orchestration?',
    a: 'Multiple specialized agents operate within defined roles inside approved workflows. Orchestration ensures coordination between agents while maintaining policy enforcement, structured escalation, and version-controlled logic.',
  },
  {
    q: 'How is process visibility maintained during execution?',
    a: 'Orcaworks provides real-time monitoring of workflow status, decision paths, system updates, and approvals. Observability tools allow teams to track execution across the full lifecycle of a process.',
  },
  {
    q: 'Can workflows be modified after deployment?',
    a: 'Yes. Workflows are version-controlled and can be updated intentionally through the Process Studio. Changes are reviewed, documented, and auditable before moving into production.',
  },
  {
    q: 'How does Orcaworks maintain traceability at scale?',
    a: 'Every action, input, decision, and system update is automatically logged. Audit trails remain searchable and exportable, ensuring compliance and operational transparency even at high volume.',
  },
  {
    q: 'What is the long-term value of adopting Orcaworks?',
    a: 'Over time, organizations build a governed execution layer across critical workflows. This improves operational consistency, reduces risk exposure, strengthens compliance posture, and enables scalable automation without sacrificing control.',
  },
] as const

const mid = Math.ceil(faqs.length / 2)
const left = faqs.slice(0, mid)
const right = faqs.slice(mid)

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }}
      />
      <section className="py-16" id="faq">
        <Container className="flex flex-col gap-12">
          <Heading className="text-center">Orcaworks FAQ</Heading>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-2">
            <div className="divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
              {left.map((item, i) => (
                <Faq key={i} question={item.q} answer={<p>{item.a}</p>} />
              ))}
            </div>
            <div className="divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
              {right.map((item, i) => (
                <Faq key={i} question={item.q} answer={<p>{item.a}</p>} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
