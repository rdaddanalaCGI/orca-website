import { GRID_SIZE } from './constants'

/**
 * The restrained blueprint surface behind one declaration canvas: a faint grid
 * and a tiny section identifier.
 */
export function BlueprintBackground({ ident }: { ident: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 text-olive-950/4.5 dark:text-white/5"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      />
      <span className="absolute top-3 left-3.5 font-mono text-[10px] tracking-[0.2em] text-olive-950/30 dark:text-white/30">
        {ident}
      </span>
    </div>
  )
}
