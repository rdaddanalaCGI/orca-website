'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronIcon } from '@/components/icons/chevron-icon'
import { clsx } from 'clsx/lite'

import { Details } from './details'

const links = [
  { href: '/ai-agent-handbook', label: 'AI Handbook' },
  { href: '/enterprise-ai-safety-handbook', label: 'Enterprise AI Safety Handbook' },
  { href: '/blog', label: 'Insights' },
  { href: '/faq', label: 'FAQ' },
]

export function ResourcesMenu() {
  const pathname = usePathname()
  const hasActive = links.some((link) => pathname.startsWith(link.href))

  return (
    <Details className="relative">
      <summary
        className={clsx(
          'flex cursor-pointer list-none items-center gap-2 rounded-full px-3 py-1 text-3xl/10 font-medium transition-colors hover:bg-olive-950/10 lg:text-sm/7 dark:hover:bg-white/10',
          hasActive ? 'text-orca-orange' : 'text-olive-950 dark:text-white',
          'group-open:text-orca-orange hover:text-orca-orange',
        )}
      >
        Resources
        <ChevronIcon className="h-2 w-1.5 rotate-90" />
      </summary>
      <div className="max-lg:mt-2 lg:absolute lg:top-full lg:left-1/2 lg:z-20 lg:mt-2 lg:w-56 lg:-translate-x-1/2 lg:rounded-xl lg:bg-olive-100 lg:p-4 lg:shadow-lg lg:ring-1 lg:ring-olive-950/10 dark:lg:bg-olive-950 dark:lg:ring-white/10">
        <ul className="flex flex-col gap-2 text-sm/7" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                className={clsx(
                  'block transition-colors',
                  pathname.startsWith(link.href) ? 'text-orca-orange' : 'text-olive-950 dark:text-white',
                  'hover:text-orca-orange',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Details>
  )
}
