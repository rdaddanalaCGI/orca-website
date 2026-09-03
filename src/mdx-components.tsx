import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs'

import { GatedDownloadButton } from '@/components/gated/gated-download-button'

const docsComponents = getMDXComponents()

export function useMDXComponents(components: Record<string, unknown> = {}) {
  return { ...docsComponents, GatedDownloadButton, ...components }
}
