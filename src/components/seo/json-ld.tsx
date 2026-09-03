/**
 * Renders JSON-LD structured data into the document.
 *
 * Only pass server-generated objects from `@/lib/seo`. Never pass unsanitised
 * user or CMS input directly, since the payload is serialised into a script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped to prevent breaking out of the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
