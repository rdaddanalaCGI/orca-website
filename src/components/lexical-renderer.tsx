import type { ReactNode } from 'react'

import NextLink from 'next/link'

type LexicalNode = {
  type: string
  version?: number
  format?: number
  text?: string
  tag?: string
  url?: string
  newWindow?: boolean
  src?: string
  alt?: string
  children?: LexicalNode[]
  fields?: { url?: string; newWindow?: boolean }
  direction?: 'ltr' | 'rtl' | null
} & Record<string, unknown>

type LexicalValue = {
  root?: {
    children?: LexicalNode[]
  }
}

function applyFormat(text: string, format = 0): ReactNode {
  let el: ReactNode = text
  if (format & 1) el = <strong>{el}</strong>
  if (format & 2) el = <em>{el}</em>
  if (format & 4) el = <u>{el}</u>
  if (format & 8) el = <s>{el}</s>
  if (format & 32) el = <sub>{el}</sub>
  if (format & 64) el = <sup>{el}</sup>
  return el
}

function isNode(value: unknown): value is LexicalNode {
  return typeof value === 'object' && value !== null && 'type' in value
}

function renderText(node: LexicalNode, index: number): ReactNode {
  const text = node.text ?? ''
  if (node.url && node.url !== '#') {
    return (
      <NextLink key={index} href={node.url} className="text-orca-orange hover:underline">
        {applyFormat(text, node.format)}
      </NextLink>
    )
  }
  return <span key={index}>{applyFormat(text, node.format)}</span>
}

function renderInline(node: LexicalNode, index: number): ReactNode {
  if (!isNode(node)) return null

  switch (node.type) {
    case 'text':
      return renderText(node, index)
    case 'linebreak':
      return <br key={index} />
    case 'link':
    case 'autolink': {
      const rawUrl = node.url ?? node.fields?.url
      const target = (node.newWindow ?? node.fields?.newWindow) ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      const children = node.children?.map((child, i) => renderInline(child, i))
      if (!rawUrl || rawUrl === '#') {
        return <span key={index}>{children}</span>
      }
      return (
        <NextLink key={index} href={rawUrl} target={target} rel={rel} className="text-orca-orange hover:underline">
          {children}
        </NextLink>
      )
    }
    default:
      return null
  }
}

function renderBlock(node: LexicalNode, index: number): ReactNode {
  if (!isNode(node)) return null

  const children = node.children?.map((child, i) =>
    child.type === 'text' || child.type === 'linebreak' || child.type === 'link' || child.type === 'autolink'
      ? renderInline(child, i)
      : renderBlock(child, i),
  )

  switch (node.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-base/7 text-olive-700 dark:text-olive-400">
          {children}
        </p>
      )
    case 'heading': {
      const Tag = (node.tag ?? 'h2') as 'h2' | 'h3' | 'h4'
      const styles = {
        h2: 'font-display text-3xl/9 text-olive-950 dark:text-white',
        h3: 'font-display text-2xl/8 text-olive-950 dark:text-white',
        h4: 'font-sans text-xl/8 font-semibold text-olive-950 dark:text-white',
      }
      return (
        <Tag key={index} className={styles[Tag]}>
          {children}
        </Tag>
      )
    }
    case 'list': {
      const ListTag = node.tag === 'ol' ? 'ol' : 'ul'
      const listStyle = node.tag === 'ol' ? 'list-decimal' : 'list-disc'
      return (
        <ListTag key={index} className={`flex flex-col gap-2 pl-5 ${listStyle} text-olive-700 dark:text-olive-400`}>
          {node.children?.map((child, i) => renderBlock(child, i))}
        </ListTag>
      )
    }
    case 'listitem':
      return <li key={index}>{children}</li>
    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-olive-300 pl-4 text-lg/8 text-olive-700 italic dark:border-olive-700 dark:text-olive-400"
        >
          {children}
        </blockquote>
      )
    case 'image':
      return node.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={index} src={node.src} alt={node.alt ?? ''} className="w-full rounded-lg" />
      ) : null
    case 'table':
      return (
        <table key={index} className="w-full border-collapse text-sm">
          {node.children?.map((child, i) => renderBlock(child, i))}
        </table>
      )
    case 'tablerow':
      return <tr key={index}>{node.children?.map((child, i) => renderBlock(child, i))}</tr>
    case 'tablecell':
      return (
        <td
          key={index}
          className="border border-olive-300 p-2 text-olive-700 dark:border-olive-700 dark:text-olive-400"
        >
          {children}
        </td>
      )
    default:
      return null
  }
}

export function LexicalRenderer({ body }: { body: unknown }) {
  if (!body || typeof body !== 'object') return null
  const value = body as LexicalValue
  if (!value.root?.children) return null

  return <div className="flex flex-col gap-6">{value.root.children.map((node, i) => renderBlock(node, i))}</div>
}
