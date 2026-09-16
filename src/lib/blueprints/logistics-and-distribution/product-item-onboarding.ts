import type { ApplicationBlueprint } from '../types'

export const productItemOnboardingBlueprint: ApplicationBlueprint = {
  label: 'Product & Item Onboarding Blueprint',

  context: {
    eyebrow: 'Context',
    title: 'Map supplier sources to your item schema',
    description:
      'Spec sheets, spreadsheets, websites and images on one side; required fields, taxonomy and the import spec on the other.',
    items: [
      {
        id: 'supplier-sources',
        title: 'Supplier PDF / XLS / web / images',
        description: 'Where the product facts live today',
        icon: 'file',
      },
      {
        id: 'item-schema',
        title: 'Item schema & required fields',
        description: 'What ERP, WMS and commerce need',
        icon: 'layers',
      },
      {
        id: 'taxonomy',
        title: 'Taxonomy & category rules',
        description: 'Where the item belongs',
        icon: 'network',
      },
      {
        id: 'existing-record',
        title: 'Existing ERP / PIM / commerce record',
        description: 'Is this new or a change?',
        icon: 'database',
      },
      {
        id: 'attributes',
        title: 'IDs, UOM, dimensions & weights',
        description: 'Values warehouse and freight depend on',
        icon: 'package',
      },
      {
        id: 'provenance',
        title: 'Source per extracted value',
        description: 'Which document said what',
        icon: 'search',
      },
      {
        id: 'import-spec-log',
        title: 'Import spec & import log',
        description: 'Flat-file format and rejections',
        icon: 'clipboard',
      },
      {
        id: 'publish-policy',
        title: 'Publication / approval policy',
        description: 'Who signs off before publish',
        icon: 'shield',
      },
    ],
  },

  workflow: {
    eyebrow: 'Workflow',
    title: 'From supplier package to accepted item record',
    description:
      'Data stewards decide ambiguous product facts, taxonomy and publication; the existing ERP/PIM import mechanism stays in place.',
    steps: [
      { id: 'trigger', title: 'Supplier package or new-item request', icon: 'circle-alert', type: 'trigger' },
      { id: 'gather', title: 'Gather sources & existing item', icon: 'layers', type: 'action' },
      { id: 'extract', title: 'Extract attributes with provenance', icon: 'search', type: 'action' },
      { id: 'normalize', title: 'Normalize IDs, UOM & taxonomy', icon: 'package', type: 'action' },
      { id: 'validate', title: 'Validate required fields & conflicts', icon: 'clipboard', type: 'decision' },
      { id: 'approve', title: 'Data steward resolves ambiguities', icon: 'user', type: 'approval' },
      { id: 'package', title: 'Generate import-ready package', icon: 'file', type: 'action' },
      { id: 'import', title: 'Import via existing ERP / PIM flow', icon: 'settings', type: 'system' },
      { id: 'remediate', title: 'Read log, fix rejections & resubmit', icon: 'history', type: 'action' },
      { id: 'close', title: 'Record accepted state & sources', icon: 'circle-check', type: 'completion' },
    ],
  },

  interaction: {
    eyebrow: 'Interaction',
    title: 'Source-to-target, side by side',
    description:
      'Item-data specialists see each field, its source, confidence and import status instead of a generic extraction screen.',
    people: [
      {
        id: 'item-data-specialist',
        title: 'Item-Data Specialist',
        description: 'Reviews extracted values',
        icon: 'user',
      },
      {
        id: 'data-steward',
        title: 'Product-Data Steward',
        description: 'Decides ambiguous facts and taxonomy',
        icon: 'shield',
      },
      {
        id: 'merchandiser',
        title: 'Merchandiser / E-commerce Manager',
        description: 'Approves publication',
        icon: 'users',
      },
    ],
    systems: [
      { id: 'erp-pim', title: 'ERP / PIM', description: 'Item master of record', icon: 'database' },
      { id: 'commerce', title: 'E-commerce catalog', description: 'Published product content', icon: 'monitor' },
      {
        id: 'supplier-files',
        title: 'Supplier files & websites',
        description: 'Spec sheets, spreadsheets, images',
        icon: 'file',
      },
      {
        id: 'import',
        title: 'Flat-file / API import',
        description: 'Existing load mechanism and log',
        icon: 'network',
      },
    ],
  },
}
