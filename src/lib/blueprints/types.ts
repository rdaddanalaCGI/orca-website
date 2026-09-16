export type BlueprintIconName =
  | 'database'
  | 'package'
  | 'map-pin'
  | 'history'
  | 'file'
  | 'shield'
  | 'search'
  | 'user'
  | 'users'
  | 'settings'
  | 'check'
  | 'monitor'
  | 'smartphone'
  | 'image'
  | 'clipboard'
  | 'warehouse'
  | 'layers'
  | 'route'
  | 'network'
  | 'headphones'
  | 'boxes'
  | 'truck'
  | 'receipt'
  | 'circle-alert'
  | 'circle-check'

export interface ApplicationBlueprint {
  label?: string
  context: BlueprintContext
  workflow: BlueprintWorkflow
  interaction: BlueprintInteraction
}

export interface BlueprintContext {
  eyebrow?: string
  title: string
  description?: string
  items: BlueprintContextItem[]
}

export interface BlueprintContextItem {
  id: string
  title: string
  description?: string
  icon?: BlueprintIconName
}

export interface BlueprintWorkflow {
  eyebrow?: string
  title: string
  description?: string
  steps: BlueprintWorkflowStep[]
}

export interface BlueprintWorkflowStep {
  id: string
  title: string
  description?: string
  icon?: BlueprintIconName
  type?: 'trigger' | 'action' | 'decision' | 'approval' | 'system' | 'completion'
}

export interface BlueprintInteraction {
  eyebrow?: string
  title: string
  description?: string
  people?: BlueprintActor[]
  systems?: BlueprintSystem[]
}

export interface BlueprintActor {
  id: string
  title: string
  description?: string
  icon?: BlueprintIconName
}

export interface BlueprintSystem {
  id: string
  title: string
  description?: string
  icon?: BlueprintIconName
}
