#!/usr/bin/env node
/**
 * Provisions placeholder PDFs for gated download resources in environments
 * (like CI) where the real gated assets are not available.
 *
 * Real PDFs live in `private/pdfs/` and are intentionally gitignored — they are
 * provided per environment. This script reads the configured filenames from
 * `src/lib/gated-resources.ts` and writes a minimal valid PDF for any that are
 * missing, so unit and e2e tests can exercise the download path.
 *
 * Existing files are never overwritten.
 *
 * Run via `node scripts/prepare-test-pdfs.mjs`.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(new URL('..', import.meta.url).pathname)
const registryPath = path.join(root, 'src', 'lib', 'gated-resources.ts')
const pdfDir = path.join(root, 'private', 'pdfs')

const source = readFileSync(registryPath, 'utf-8')
const filenames = [...new Set([...source.matchAll(/filename:\s*'([^']+\.pdf)'/g)].map((m) => m[1]))]

if (filenames.length === 0) {
  console.log('No PDF filenames configured in gated-resources registry; nothing to do.')
  process.exit(0)
}

const PLACEHOLDER_PDF = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>
endobj
4 0 obj
<< /Length 76 >>
stream
BT /F1 18 Tf 72 720 Td (Placeholder gated PDF for test environments) Tj ET
endstream
endobj
trailer
<< /Root 1 0 R >>
%%EOF
`

mkdirSync(pdfDir, { recursive: true })

for (const filename of filenames) {
  const filePath = path.join(pdfDir, filename)
  if (existsSync(filePath)) {
    console.log(`exists  private/pdfs/${filename}`)
  } else {
    writeFileSync(filePath, PLACEHOLDER_PDF)
    console.log(`created private/pdfs/${filename} (placeholder)`)
  }
}
