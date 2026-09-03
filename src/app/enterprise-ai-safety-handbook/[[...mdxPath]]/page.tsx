import { GatedContent } from '@/components/gated/gated-content'
import { findGatedResourceByPath } from '@/lib/gated-resources'
import { createMetadata } from '@/lib/seo'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

const HANDBOOK_BASE = 'enterprise-ai-safety-handbook'
const CANONICAL_PATH = '/enterprise-ai-safety-handbook'

type PageProps = {
  params: Promise<{
    mdxPath?: string[]
  }>
}

export async function generateStaticParams() {
  const all = (await generateStaticParamsFor('mdxPath')()) as { mdxPath: string[] }[]

  return all.filter(({ mdxPath }) => mdxPath[0] === HANDBOOK_BASE).map(({ mdxPath }) => ({ mdxPath: mdxPath.slice(1) }))
}

export async function generateMetadata({ params }: PageProps) {
  const { mdxPath } = await params
  const segments = [HANDBOOK_BASE, ...(mdxPath ?? [])]
  const { metadata } = await importPage(segments)
  const path = mdxPath?.length ? `${CANONICAL_PATH}/${mdxPath.join('/')}` : CANONICAL_PATH

  return createMetadata({
    title: typeof metadata?.title === 'string' ? metadata.title : 'Enterprise AI Safety Handbook',
    path,
  })
}

const Wrapper = getMDXComponents().wrapper

export default async function EnterpriseHandbookPage({ params }: PageProps) {
  const { mdxPath } = await params
  const segments = [HANDBOOK_BASE, ...(mdxPath ?? [])]
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(segments)
  const path = mdxPath?.length ? `${CANONICAL_PATH}/${mdxPath.join('/')}` : CANONICAL_PATH
  const match = findGatedResourceByPath(path)

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {match?.isGatedPath ? (
        <GatedContent resource={match.resource} sourcePath={path}>
          <MDXContent />
        </GatedContent>
      ) : (
        <MDXContent />
      )}
    </Wrapper>
  )
}
