import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/img/logos/orcaworks-dark.png"
      alt="Orcaworks"
      width={180}
      height={45}
      priority
      style={{ height: 'auto', width: '180px' }}
    />
  )
}
