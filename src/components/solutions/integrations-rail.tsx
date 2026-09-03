import Image from 'next/image'

import { Marquee } from '@/components/marquee'

import type { SolutionIntegrations } from '@/lib/solutions'

function LogoMarquee() {
  return (
    <Marquee className="mt-8">
      <Image
        unoptimized
        priority
        src="/img/logos/9-color-black-height-32.svg"
        className="h-8 w-auto dark:hidden"
        alt=""
        width={51}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/9-color-white-height-32.svg"
        className="hidden h-8 w-auto dark:block"
        alt=""
        width={51}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/10-color-black-height-32.svg"
        className="h-8 w-auto dark:hidden"
        alt=""
        width={70}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/10-color-white-height-32.svg"
        className="hidden h-8 w-auto dark:block"
        alt=""
        width={70}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/11-color-black-height-32.svg"
        className="h-8 w-auto dark:hidden"
        alt=""
        width={100}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/11-color-white-height-32.svg"
        className="hidden h-8 w-auto dark:block"
        alt=""
        width={100}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/12-color-black-height-32.svg"
        className="h-8 w-auto dark:hidden"
        alt=""
        width={85}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/12-color-white-height-32.svg"
        className="hidden h-8 w-auto dark:block"
        alt=""
        width={85}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/13-color-black-height-32.svg"
        className="h-8 w-auto dark:hidden"
        alt=""
        width={75}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/13-color-white-height-32.svg"
        className="hidden h-8 w-auto dark:block"
        alt=""
        width={75}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/8-color-black-height-32.svg"
        className="h-8 w-auto dark:hidden"
        alt=""
        width={85}
        height={32}
      />
      <Image
        unoptimized
        priority
        src="/img/logos/8-color-white-height-32.svg"
        className="hidden h-8 w-auto dark:block"
        alt=""
        width={85}
        height={32}
      />
    </Marquee>
  )
}

export function SolutionIntegrationsRail({ integrations }: { integrations: SolutionIntegrations }) {
  return (
    <div className="border-t border-olive-950/10 pt-16 dark:border-white/10">
      <div className="flex flex-col gap-6">
        <div className="flex max-w-3xl flex-col gap-3">
          <h3 className="font-display text-2xl text-olive-950 dark:text-white">{integrations.heading}</h3>
          <p className="text-base/7 text-olive-700 dark:text-olive-300">{integrations.intro}</p>
        </div>
        <LogoMarquee />
      </div>
    </div>
  )
}
