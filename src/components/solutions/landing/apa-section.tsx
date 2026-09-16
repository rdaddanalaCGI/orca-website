import { Section } from '@/components/elements/section'

import { ApaRibbon } from './apa-ribbon'

export function ApaSection() {
  return (
    <Section
      id="agentic-process-automation"
      className="scroll-mt-24"
      eyebrow="AGENTIC PROCESS AUTOMATION"
      eyebrowVariant="brand"
      headline="Automate the process, not just the task."
      subheadline="Traditional automation handles predictable steps. Generative AI can assist with individual tasks. Agentic Process Automation coordinates the complete process — bringing together context, decisions, system actions and human judgment to move work to a defined outcome."
    >
      <ApaRibbon />
    </Section>
  )
}
