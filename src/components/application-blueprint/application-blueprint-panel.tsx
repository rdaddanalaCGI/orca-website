'use client'

import { ArrowDown } from 'lucide-react'
import { type ReactNode } from 'react'

import { blueprintIcons } from '@/lib/blueprints/icon-resolver'
import type {
  ApplicationBlueprint,
  BlueprintActor,
  BlueprintContext,
  BlueprintContextItem,
  BlueprintIconName,
  BlueprintInteraction,
  BlueprintSystem,
  BlueprintWorkflow,
} from '@/lib/blueprints/types'

import { WorkflowStepper } from './workflow-stepper'

function BlueprintIcon({
  name,
  className = 'size-4',
  strokeWidth = 1.5,
}: {
  name: BlueprintIconName
  className?: string
  strokeWidth?: number
}) {
  const Icon = blueprintIcons[name]
  if (!Icon) return null
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}

function BlueprintRow({
  number,
  eyebrow,
  icon,
  title,
  description,
  children,
}: {
  number: string
  eyebrow: string
  icon: BlueprintIconName
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8 lg:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-sm/5 font-semibold text-orca-orange tabular-nums">{number}</span>
          <span className="text-[10px] font-semibold tracking-widest text-olive-400 uppercase">{eyebrow}</span>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-orca-orange/10 bg-orca-orange/[0.07] text-orca-orange">
            <BlueprintIcon name={icon} className="size-6" />
          </div>
          <div className="flex flex-col gap-1 pt-0.5">
            <h3 className="font-display text-lg text-olive-950 dark:text-white">{title}</h3>
            {description && <p className="text-sm/5 text-olive-600 dark:text-orca-frost">{description}</p>}
          </div>
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function ContextCard({ item }: { item: BlueprintContextItem }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-olive-950/10 bg-white p-3.5 dark:border-white/10 dark:bg-olive-950">
      {item.icon && <BlueprintIcon name={item.icon} className="size-4 shrink-0 text-olive-600 dark:text-orca-frost" />}
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="min-w-0 text-sm/5 font-medium wrap-break-word text-olive-950 dark:text-white">
          {item.title}
        </span>
        {item.description && (
          <span className="min-w-0 text-xs/4 text-olive-600 dark:text-orca-frost">{item.description}</span>
        )}
      </div>
    </div>
  )
}

function ContextPillar({ context }: { context: BlueprintContext }) {
  return (
    <BlueprintRow
      number="01"
      eyebrow={context.eyebrow ?? 'Context'}
      icon="database"
      title={context.title}
      description={context.description}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {context.items.map((item) => (
          <ContextCard key={item.id} item={item} />
        ))}
      </div>
    </BlueprintRow>
  )
}

function WorkflowPillar({ workflow }: { workflow: BlueprintWorkflow }) {
  return (
    <BlueprintRow
      number="02"
      eyebrow={workflow.eyebrow ?? 'Workflow'}
      icon="route"
      title={workflow.title}
      description={workflow.description}
    >
      <WorkflowStepper workflow={workflow} />
    </BlueprintRow>
  )
}

function ActorCard({ actor }: { actor: BlueprintActor }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 rounded-lg border border-olive-950/10 bg-white px-3 py-4 text-center dark:border-white/10 dark:bg-olive-950">
      {actor.icon && (
        <BlueprintIcon name={actor.icon} className="size-5 shrink-0 text-olive-600 dark:text-orca-frost" />
      )}
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="min-w-0 text-sm/5 font-medium wrap-break-word text-olive-950 dark:text-white">
          {actor.title}
        </span>
        {actor.description && (
          <span className="min-w-0 text-xs/4 text-olive-600 dark:text-orca-frost">{actor.description}</span>
        )}
      </div>
    </div>
  )
}

function SystemCard({ system }: { system: BlueprintSystem }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-olive-950/10 bg-white p-3.5 dark:border-white/10 dark:bg-olive-950">
      {system.icon && (
        <BlueprintIcon name={system.icon} className="size-4 shrink-0 text-olive-600 dark:text-orca-frost" />
      )}
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="min-w-0 text-sm/5 font-medium wrap-break-word text-olive-950 dark:text-white">
          {system.title}
        </span>
        {system.description && (
          <span className="min-w-0 text-xs/4 text-olive-600 dark:text-orca-frost">{system.description}</span>
        )}
      </div>
    </div>
  )
}

function InteractionConnector() {
  return (
    <div className="my-4 flex flex-col items-center gap-2">
      <div className="flex w-full items-center gap-3">
        <div className="h-px flex-1 bg-olive-950/10 dark:bg-white/10" />
        <span className="text-[10px] font-semibold tracking-widest text-olive-500 uppercase">Collaborates through</span>
        <div className="h-px flex-1 bg-olive-950/10 dark:bg-white/10" />
      </div>
      <ArrowDown className="size-3 text-orca-orange" strokeWidth={1.5} aria-hidden="true" />
    </div>
  )
}

function InteractionPillar({ interaction }: { interaction: BlueprintInteraction }) {
  const hasPeople = interaction.people && interaction.people.length > 0
  const hasSystems = interaction.systems && interaction.systems.length > 0

  return (
    <BlueprintRow
      number="03"
      eyebrow={interaction.eyebrow ?? 'Interaction'}
      icon="users"
      title={interaction.title}
      description={interaction.description}
    >
      {hasPeople && (
        <div>
          <span className="mb-3 block text-[10px] font-semibold tracking-widest text-olive-500 uppercase">People</span>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {interaction.people!.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        </div>
      )}

      {hasPeople && hasSystems && <InteractionConnector />}

      {hasSystems && (
        <div>
          <span className="mb-3 block text-[10px] font-semibold tracking-widest text-olive-500 uppercase">
            Systems & Surfaces
          </span>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {interaction.systems!.map((system) => (
              <SystemCard key={system.id} system={system} />
            ))}
          </div>
        </div>
      )}
    </BlueprintRow>
  )
}

function BlueprintRowConnector() {
  return (
    <div aria-hidden="true" className="relative h-px bg-olive-950/10 dark:bg-white/10">
      <span className="absolute top-0 left-6 flex size-6 -translate-y-1/2 items-center justify-center rounded-full border border-olive-950/15 bg-orca-page sm:left-8 dark:border-white/15 dark:bg-olive-950">
        <ArrowDown className="size-3 text-orca-orange" strokeWidth={1.5} />
      </span>
    </div>
  )
}

export function ApplicationBlueprintPanel({ blueprint }: { blueprint: ApplicationBlueprint }) {
  return (
    <div className="relative w-full max-w-none overflow-hidden rounded-2xl border border-olive-950/10 bg-orca-page dark:border-white/10 dark:bg-olive-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:hidden"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-[0.03] dark:block"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {blueprint.label && (
        <div className="relative z-10 flex items-center justify-end gap-3 px-6 pt-5 sm:px-8 sm:pt-6">
          <div className="h-px w-4 bg-orca-orange" aria-hidden="true" />
          <span className="text-[10px] font-semibold tracking-widest text-olive-500 uppercase">{blueprint.label}</span>
        </div>
      )}

      <div className="relative z-10">
        <ContextPillar context={blueprint.context} />
        <BlueprintRowConnector />
        <WorkflowPillar workflow={blueprint.workflow} />
        <BlueprintRowConnector />
        <InteractionPillar interaction={blueprint.interaction} />
      </div>
    </div>
  )
}
