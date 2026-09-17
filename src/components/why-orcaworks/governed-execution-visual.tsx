/**
 * A governed execution handoff: the single moment where an agent stops at a
 * policy boundary and an explicit human decision gates what happens next.
 */
export function GovernedExecutionVisual() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-64 rounded-md border border-orca-orange/30 bg-orca-orange/5 px-3 py-2.5 shadow-sm dark:border-orca-orange/40 dark:bg-orca-orange/10">
        <div className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-orca-orange" />
          <span className="font-mono text-[8px] tracking-[0.16em] text-orca-link uppercase dark:text-orca-orange">
            human decision
          </span>
          <span className="ml-auto font-mono text-[8.5px] text-olive-400 dark:text-white/35">09:42:21</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="text-[11px]/4 font-medium text-olive-900 dark:text-white">Expedite shipment?</span>
          <div className="flex shrink-0 gap-1">
            <span className="rounded border border-orca-orange/40 px-1.5 py-0.5 font-mono text-[8px]/3 text-orca-link dark:border-orca-orange/50 dark:text-orca-orange">
              Approve
            </span>
            <span className="rounded border border-olive-950/15 px-1.5 py-0.5 font-mono text-[8px]/3 text-olive-600 dark:border-white/20 dark:text-orca-frost">
              Hold
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
