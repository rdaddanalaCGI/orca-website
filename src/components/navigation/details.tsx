'use client'

import { clsx } from 'clsx/lite'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useEffect, useRef } from 'react'

export function Details({ className, children, ...props }: ComponentProps<'details'>) {
  const ref = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== previousPathname.current && ref.current) {
      ref.current.open = false
    }
    previousPathname.current = pathname
  }, [pathname])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        ref.current.open = false
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <details ref={ref} className={clsx('group', className)} {...props}>
      {children}
    </details>
  )
}
