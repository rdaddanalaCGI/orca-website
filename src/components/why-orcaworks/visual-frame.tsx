import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

const GRID_SIZE = 24

/**
 * Shared canvas chrome for the Understand Orcaworks card visuals: a faint
 * blueprint grid and an optional drawing ident, matching the declared-work
 * canvases used elsewhere on the homepage.
 */
export function VisualFrame({
  ident,
  className,
  children,
}: {
  ident?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={clsx('relative h-full w-full', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 text-olive-950/5 dark:text-white/6"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          }}
        />
        {ident && (
          <span className="absolute top-2.5 left-3 font-mono text-[9px] tracking-[0.2em] text-olive-950/30 uppercase dark:text-white/30">
            {ident}
          </span>
        )}
      </div>
      <div className="relative h-full w-full">{children}</div>
    </div>
  )
}

/** Small uppercase metadata label used across the card visuals. */
export function MetaLabel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={clsx(
        'font-mono text-[9px] tracking-[0.18em] text-olive-500 uppercase dark:text-orca-frost/70',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Compact object chip used for small derived or connected objects. */
export function ObjectChip({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded border border-olive-950/10 bg-white/80 px-1.5 py-0.5 font-mono text-[9px]/3 text-olive-800 dark:border-white/15 dark:bg-white/10 dark:text-orca-frost',
        className,
      )}
    >
      {children}
    </span>
  )
}
