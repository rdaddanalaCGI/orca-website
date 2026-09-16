import { WINDOWS } from '@/components/declared-work/constants'
import { cycleState, PHASE_SPANS, phaseAt, segment, stagger } from '@/components/declared-work/timeline'
import { describe, expect, it } from 'vitest'

describe('segment', () => {
  it('clamps progress outside the window', () => {
    expect(segment(0, [0.2, 0.4])).toBe(0)
    expect(segment(0.5, [0.2, 0.4])).toBe(1)
  })

  it('remaps progress linearly inside the window', () => {
    expect(segment(0.3, [0.2, 0.4])).toBeCloseTo(0.5)
    expect(segment(0.2, [0.2, 0.4])).toBe(0)
    expect(segment(0.4, [0.2, 0.4])).toBe(1)
  })

  it('treats a zero-length window as a step', () => {
    expect(segment(0.1, [0.2, 0.2])).toBe(0)
    expect(segment(0.2, [0.2, 0.2])).toBe(1)
  })
})

describe('stagger', () => {
  it('returns the full window for a single item', () => {
    expect(stagger([0.1, 0.5], 0, 1)).toEqual([0.1, 0.5])
  })

  it('keeps every slot inside the parent window', () => {
    const window = [0.04, 0.26] as const
    const count = 5
    for (let index = 0; index < count; index++) {
      const [start, end] = stagger(window, index, count)
      expect(start).toBeGreaterThanOrEqual(window[0] - 1e-9)
      expect(end).toBeLessThanOrEqual(window[1] + 1e-9)
      expect(end).toBeGreaterThan(start)
    }
  })

  it('orders slots sequentially', () => {
    const first = stagger([0, 1], 0, 4)
    const second = stagger([0, 1], 1, 4)
    expect(second[0]).toBeGreaterThan(first[0])
    expect(second[1]).toBeGreaterThan(first[1])
  })

  it('ends the final slot exactly at the window end', () => {
    const [, end] = stagger([0.3, 0.7], 3, 4)
    expect(end).toBeCloseTo(0.7)
  })
})

describe('phaseAt', () => {
  it('maps progress to the declaration phases', () => {
    expect(phaseAt(0)).toBe('idle')
    expect(phaseAt(0.1)).toBe('context')
    expect(phaseAt(0.34)).toBe('workflow')
    expect(phaseAt(0.64)).toBe('interaction')
    expect(phaseAt(0.87)).toBe('complete')
    expect(phaseAt(1)).toBe('complete')
  })
})

describe('PHASE_SPANS', () => {
  it('covers the pillars contiguously from the cycle start', () => {
    expect(PHASE_SPANS.context[0]).toBe(0)
    expect(PHASE_SPANS.context[1]).toBe(PHASE_SPANS.workflow[0])
    expect(PHASE_SPANS.workflow[1]).toBe(PHASE_SPANS.interaction[0])
    expect(PHASE_SPANS.interaction[1]).toBeLessThanOrEqual(1)
  })

  it('agrees with phaseAt at each span midpoint', () => {
    for (const [phase, [start, end]] of Object.entries(PHASE_SPANS)) {
      expect(phaseAt((start + end) / 2)).toBe(phase)
    }
  })
})

describe('cycleState', () => {
  const options = { cycleDuration: 10000, hold: 2000, loopCount: 3, crossfade: 1000 }

  it('plays a cycle from 0 to 1 with no dim', () => {
    expect(cycleState(0, options)).toEqual({ progress: 0, cycle: 0, settled: false, dim: 0 })
    expect(cycleState(5000, options)).toEqual({ progress: 0.5, cycle: 0, settled: false, dim: 0 })
    expect(cycleState(10000, options)).toEqual({ progress: 1, cycle: 0, settled: false, dim: 0 })
  })

  it('holds the declared frame before the crossfade begins', () => {
    expect(cycleState(10500, options)).toEqual({ progress: 1, cycle: 0, settled: false, dim: 0 })
    expect(cycleState(12000, options)).toEqual({ progress: 1, cycle: 0, settled: false, dim: 0 })
  })

  it('dims out holding the declared frame, then dims in from the reset state', () => {
    const fadeOut = cycleState(12250, options)
    expect(fadeOut.progress).toBe(1)
    expect(fadeOut.dim).toBeCloseTo(0.5)

    const fadeIn = cycleState(12750, options)
    expect(fadeIn.progress).toBe(0)
    expect(fadeIn.dim).toBeCloseTo(0.5)
  })

  it('advances cycles across the hold and crossfade period', () => {
    expect(cycleState(13000, options).cycle).toBe(1)
    expect(cycleState(18000, options)).toEqual({ progress: 0.5, cycle: 1, settled: false, dim: 0 })
  })

  it('settles at the end of the final cycle without a crossfade', () => {
    const settleTime = 2 * 13000 + 10000
    expect(cycleState(settleTime - 1, options).settled).toBe(false)
    expect(cycleState(settleTime, options)).toEqual({ progress: 1, cycle: 2, settled: true, dim: 0 })
    expect(cycleState(settleTime + 60000, options).settled).toBe(true)
  })
})

describe('master windows', () => {
  it('covers the cycle in order: context → workflow → interaction → complete', () => {
    expect(WINDOWS.contextGuides[0]).toBe(0)
    expect(WINDOWS.contextNodes[0]).toBeLessThan(WINDOWS.workflowNodes[0])
    expect(WINDOWS.workflowNodes[0]).toBeLessThan(WINDOWS.spine[0])
    expect(WINDOWS.spine[0]).toBeLessThan(WINDOWS.complete[0])
    expect(WINDOWS.complete[1]).toBe(1)
  })

  it('keeps every window inside the normalized cycle', () => {
    for (const [start, end] of Object.values(WINDOWS)) {
      expect(start).toBeGreaterThanOrEqual(0)
      expect(end).toBeLessThanOrEqual(1)
      expect(end).toBeGreaterThan(start)
    }
  })
})
