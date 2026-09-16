'use client'

import { clsx } from 'clsx/lite'
import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import { MANIFEST_BLUR, MANIFEST_GHOST_OPACITY } from './constants'
import type { ManifestToken } from './data'
import type { TimeWindow } from './timeline'
import { useWindowProgress } from './use-declaration-timeline'

const roleClass: Record<ManifestToken['role'], string> = {
  key: 'text-olive-950/60 dark:text-white/60',
  value: 'text-olive-950/90 dark:text-white/90',
  punct: 'text-olive-950/35 dark:text-white/35',
}

function Tokens({ tokens }: { tokens: ManifestToken[] }) {
  return (
    <>
      {tokens.map((token, index) => (
        <span key={index} className={roleClass[token.role]}>
          {token.text}
        </span>
      ))}
    </>
  )
}

/**
 * A manifest line that crystallizes: a diffuse ghost layer resolves into sharp
 * text, forming from left to right. Not a typewriter, not a scramble — an
 * indistinct declaration becoming a precise specification.
 */
export function CrystallizingLine({ tokens, window }: { tokens: ManifestToken[]; window: TimeWindow }) {
  const t = useWindowProgress(window)

  const blur = useTransform(t, (v) => (1 - v) * 6)
  const filter = useMotionTemplate`blur(${blur}px)`
  const clipPath = useTransform(t, (v) => `inset(-4px ${(1 - v) * 100}% -4px 0)`)
  const opacity = useTransform(t, [0, 0.6], [0, 1])
  const letterSpacing = useTransform(t, (v) => `${(1 - v) * 0.04}em`)
  const y = useTransform(t, [0, 1], [2, 0])
  const ghostOpacity = useTransform(t, [0, 1], [MANIFEST_GHOST_OPACITY, 0])

  return (
    <div className="relative whitespace-pre-wrap">
      <motion.div
        aria-hidden="true"
        style={{ opacity: ghostOpacity, filter: `blur(${MANIFEST_BLUR}px)`, letterSpacing: '0.04em' }}
        className="absolute inset-0"
      >
        <Tokens tokens={tokens} />
      </motion.div>
      <motion.div style={{ clipPath, filter, opacity, letterSpacing, y }} className={clsx('relative')}>
        <Tokens tokens={tokens} />
      </motion.div>
    </div>
  )
}
