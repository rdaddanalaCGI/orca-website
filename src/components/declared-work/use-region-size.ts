'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

export type RegionSize = { width: number; height: number }

/**
 * Observe a region's rendered size so normalized (0..1) blueprint coordinates
 * can be mapped to px. Returns `null` until the first client-side measurement,
 * which keeps the XYFlow canvases out of the server-rendered HTML entirely
 * (they are decorative and aria-hidden).
 */
export function useRegionSize(): [RefObject<HTMLDivElement | null>, RegionSize | null] {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<RegionSize | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) {
        setSize((current) =>
          current && current.width === width && current.height === height ? current : { width, height },
        )
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}
