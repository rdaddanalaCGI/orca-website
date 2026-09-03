import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

/**
 * Lightweight staged-secret scanner for the pre-commit hook.
 *
 * It inspects git staged text files and fails on a small, high-confidence set
 * of secret patterns. Full secret values are never logged; only the file path,
 * line, and pattern type are reported.
 */

const SUSPICIOUS_ENV_KEYS = new Set([
  'SECRET',
  'TOKEN',
  'API_KEY',
  'ACCESS_KEY',
  'PRIVATE_KEY',
  'PASSWORD',
  'PASSWD',
  'PWD',
])

const BINARY_EXTENSIONS = new Set([
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'avif',
  'svg',
  'ico',
  'pdf',
  'zip',
  'tar',
  'gz',
  'woff',
  'woff2',
  'ttf',
  'otf',
  'eot',
  'mp4',
  'webm',
  'mp3',
  'ogg',
  'lock',
])

const PATTERNS = [
  {
    name: 'private key block',
    test: /-----BEGIN (RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/,
  },
  {
    name: 'AWS access key ID',
    test: /\bAKIA[0-9A-Z]{16}\b/,
  },
  {
    name: 'GitHub token',
    test: /\bgh[pousr]_[A-Za-z0-9_]{36}\b/,
  },
  {
    name: 'Slack token',
    test: /\bxox[baprs]-[0-9]{10,13}-[0-9]{10,13}(?:-[a-zA-Z0-9]{24})?\b/,
  },
]

function shouldSkipFile(file) {
  const lower = file.toLowerCase()
  if (lower === 'scripts/check-staged-secrets.mjs') return true
  if (lower.startsWith('tests/')) return true
  if (lower.includes('node_modules/')) return true
  if (lower.includes('.next/')) return true
  if (lower.includes('test-results/')) return true
  if (lower.includes('.local/')) return true
  if (lower.startsWith('.')) return true

  const dot = file.lastIndexOf('.')
  if (dot === -1) return false

  const ext = file.slice(dot + 1)
  return BINARY_EXTENSIONS.has(ext)
}

function looksLikeSecretValue(value) {
  if (value.length < 24) return false
  if (/\s/.test(value)) return false
  if (/^(example|your|placeholder|test|dummy|changeme|password|secret|token|key)$/i.test(value)) return false

  const hasUpper = /[A-Z]/.test(value)
  const hasLower = /[a-z]/.test(value)
  const hasDigit = /[0-9]/.test(value)
  const hasSymbol = /[^A-Za-z0-9]/.test(value)

  // Require a reasonably mixed, long value.
  return hasUpper && hasLower && hasDigit && (hasSymbol || value.length >= 32)
}

export function scanContent(content) {
  const lines = content.split('\n')
  const findings = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNumber = i + 1

    let patternMatched = false

    for (const pattern of PATTERNS) {
      if (pattern.test.test(line)) {
        findings.push({ line: lineNumber, type: pattern.name })
        patternMatched = true
      }
    }

    const envMatch = line.match(
      /(?:^|\s|['";}])([A-Z_]*(?:SECRET|TOKEN|API_KEY|ACCESS_KEY|PRIVATE_KEY|PASSWORD|PASSWD|PWD)[A-Z_]*)\s*[:=]\s*['"]?([^'"\s]{8,})['"]?/,
    )

    if (envMatch) {
      const key = envMatch[1]
      const value = envMatch[2]

      const isSuspiciousKey = [...SUSPICIOUS_ENV_KEYS].some(
        (suffix) =>
          key === suffix || key.endsWith(`_${suffix}`) || key.startsWith(`${suffix}_`) || key.includes(`_${suffix}_`),
      )

      if (!patternMatched && isSuspiciousKey) {
        if (looksLikeSecretValue(value)) {
          findings.push({ line: lineNumber, type: `high-entropy ${key}` })
        }
      }
    }
  }

  return findings
}

function getStagedFiles() {
  try {
    return execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
    })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  } catch {
    // If this is not a git repo, there is nothing to scan.
    return []
  }
}

function getStagedContent(file) {
  try {
    return execFileSync('git', ['show', `:${file}`], {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
    })
  } catch {
    return ''
  }
}

function main() {
  const staged = getStagedFiles()
  const violations = []

  for (const file of staged) {
    if (shouldSkipFile(file)) continue

    const content = getStagedContent(file)
    if (!content) continue

    const findings = scanContent(content)
    for (const finding of findings) {
      violations.push({ file, line: finding.line, type: finding.type })
    }
  }

  if (violations.length === 0) {
    process.exit(0)
  }

  console.error('Potential secrets detected in staged files:')
  for (const { file, line, type } of violations) {
    console.error(`  ${file}:${line} — ${type}`)
  }
  console.error('If this is a false positive, commit with --no-verify is not recommended;')
  console.error('instead, adjust scripts/check-staged-secrets.mjs or request an exemption.')
  process.exit(1)
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url)

if (isMain) {
  main()
}
