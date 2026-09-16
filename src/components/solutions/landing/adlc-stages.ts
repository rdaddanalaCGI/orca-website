export type AdlcStageVisualType = 'define' | 'declare' | 'build' | 'validate' | 'deploy' | 'improve'

export type AdlcStage = {
  id: string
  number: string
  label: string
  headline: string
  description: string
  /** The artifact the stage produces, shown as a caption under the canvas. */
  artifact: string
  visual: AdlcStageVisualType
}

export const adlcStages: AdlcStage[] = [
  {
    id: 'define',
    number: '01',
    label: 'DEFINE',
    headline: 'Understand the work before automating it.',
    description: 'Capture the process, users, systems, inputs, exceptions, decisions and desired outcome.',
    artifact: 'Business understanding',
    visual: 'define',
  },
  {
    id: 'declare',
    number: '02',
    label: 'DECLARE',
    headline: 'Turn operational knowledge into an explicit definition.',
    description:
      'Define the context, workflows, actions, controls and human decision points the application will operate against.',
    artifact: 'Operating Blueprint',
    visual: 'declare',
  },
  {
    id: 'build',
    number: '03',
    label: 'BUILD',
    headline: 'Build from the declared operating model.',
    description:
      'Turn the declared operating model into a working application — context, workflows, actions and the workspace people use.',
    artifact: 'Working application',
    visual: 'build',
  },
  {
    id: 'validate',
    number: '04',
    label: 'VALIDATE',
    headline: 'Exercise the application before production systems depend on it.',
    description:
      'Validate behaviour with representative data, test workflows end to end and put human review at the points where judgment matters.',
    artifact: 'Validated behaviour',
    visual: 'validate',
  },
  {
    id: 'deploy',
    number: '05',
    label: 'DEPLOY',
    headline: 'Connect the enterprise and move into controlled execution.',
    description:
      'Connect the systems that own the data and actions, preserve controls and permissions, and move the validated application into production.',
    artifact: 'Production application',
    visual: 'deploy',
  },
  {
    id: 'improve',
    number: '06',
    label: 'IMPROVE',
    headline: 'Improve from evidence, not guesswork.',
    description:
      'Observe execution, outcomes, human interventions, cost and workflow performance. Change the application deliberately, validate the new definition and release the next version.',
    artifact: 'Production evidence',
    visual: 'improve',
  },
]
