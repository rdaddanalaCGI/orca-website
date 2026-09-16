import { clsx } from 'clsx/lite'

/** Tiny blueprint registration cross. */
export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={clsx('h-2 w-2', className)} aria-hidden="true">
      <path d="M4 0v8M0 4h8" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}
