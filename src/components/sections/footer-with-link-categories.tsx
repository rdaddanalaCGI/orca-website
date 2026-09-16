import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'

export function FooterCategory({ title, children, ...props }: { title: ReactNode } & ComponentProps<'div'>) {
  return (
    <div {...props}>
      <h3>{title}</h3>
      <ul role="list" className="mt-2 flex flex-col gap-2">
        {children}
      </ul>
    </div>
  )
}

export function FooterLink({ href, className, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <li className={clsx('text-white/80 transition-colors hover:text-orca-orange dark:text-orca-frost', className)}>
      <Link href={href} {...props} />
    </li>
  )
}

export function FooterWithLinkCategories({
  links,
  fineprint,
  className,
  ...props
}: {
  links: ReactNode
  fineprint: ReactNode
} & ComponentProps<'footer'>) {
  return (
    <footer className={clsx('pt-10', className)} {...props}>
      <div className="bg-orca-teal-dark pt-10 pb-12 text-white dark:bg-orca-footer-dark">
        <Container className="flex flex-col gap-10">
          <nav className="grid grid-cols-2 gap-6 text-sm/7 sm:has-[>:last-child:nth-child(3)]:grid-cols-3 sm:has-[>:nth-child(5)]:grid-cols-3 md:has-[>:last-child:nth-child(4)]:grid-cols-4 lg:has-[>:nth-child(5)]:grid-cols-5">
            {links}
          </nav>
          <div className="text-sm/7 text-white/70 dark:text-orca-frost/80">{fineprint}</div>
        </Container>
      </div>
    </footer>
  )
}
