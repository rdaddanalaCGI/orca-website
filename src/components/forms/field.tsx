import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const controlClasses =
  'block w-full rounded-lg border border-olive-300 bg-white px-4 py-2 text-sm/6 text-olive-950 placeholder:text-olive-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-600 dark:border-olive-700 dark:bg-olive-950 dark:text-white'

function Label({ htmlFor, children, required }: { htmlFor: string; children: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-sm/6 font-medium text-olive-950 dark:text-white">
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-olive-600 dark:text-olive-300">
          *
        </span>
      )}
    </label>
  )
}

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="text-sm/6 text-red-700 dark:text-red-400">
      {children}
    </p>
  )
}

export function TextField({
  name,
  label,
  error,
  required,
  className,
  ...props
}: {
  name: string
  label: string
  error?: string
  required?: boolean
} & Omit<ComponentProps<'input'>, 'name' | 'id'>) {
  const errorId = `${name}-error`

  return (
    <div className="grid gap-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={clsx(controlClasses, error && 'border-red-600 dark:border-red-500', className)}
        {...props}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  )
}

export function TextAreaField({
  name,
  label,
  error,
  required,
  className,
  ...props
}: {
  name: string
  label: string
  error?: string
  required?: boolean
} & Omit<ComponentProps<'textarea'>, 'name' | 'id'>) {
  const errorId = `${name}-error`

  return (
    <div className="grid gap-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <textarea
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={clsx(controlClasses, error && 'border-red-600 dark:border-red-500', className)}
        {...props}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  )
}

/**
 * Hidden honeypot input. Bots that auto-fill every field will populate it and be
 * silently rejected server-side. Kept out of the tab order and hidden from
 * assistive technology so it never affects real users.
 */
export function HoneypotField() {
  return (
    <div hidden aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
