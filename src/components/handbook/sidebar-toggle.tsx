'use client'

import { setMenu, useMenu } from 'nextra-theme-docs'

/**
 * The handbook replaces Nextra's own navbar (which contains its mobile sidebar
 * hamburger) with the site navbar. This slim bar restores access to the chapter
 * navigation on small screens.
 */
export function HandbookSidebarToggle() {
  const hasMenu = useMenu()

  return (
    <div className="handbook-sidebar-toggle md:hidden">
      <button
        type="button"
        aria-expanded={hasMenu}
        onClick={() => setMenu((open) => !open)}
        className="flex w-full items-center gap-2 px-6 py-2.5 text-sm font-medium text-olive-700 dark:text-olive-300"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        Handbook contents
      </button>
    </div>
  )
}
