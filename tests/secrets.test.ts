import { describe, expect, it } from 'vitest'

import { scanContent } from '../scripts/check-staged-secrets.mjs'

describe('check-staged-secrets scanner', () => {
  it('detects private key blocks', () => {
    const content = `const key = \`-----BEGIN OPENSSH PRIVATE KEY-----
hello
-----END OPENSSH PRIVATE KEY-----\``

    expect(scanContent(content)).toHaveLength(1)
  })

  it('detects AWS access key IDs', () => {
    const content = 'AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE'

    expect(scanContent(content)).toHaveLength(1)
  })

  it('detects GitHub tokens', () => {
    const content = 'GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

    expect(scanContent(content)).toHaveLength(1)
  })

  it('detects Slack tokens', () => {
    // Built via concatenation so this fixture is not a literal secret-shaped
    // string in source (avoids tripping GitHub push protection scanning).
    const fakeToken = ['xoxb', '123456789012', '123456789012', 'AbCdEfGhIjKlMnOpQrStUvWx'].join('-')
    const content = `SLACK_TOKEN=${fakeToken}`

    expect(scanContent(content)).toHaveLength(1)
  })

  it('detects high-entropy generic secrets', () => {
    const content = 'API_KEY=AbCdEfGh1234567890IjKlMnOpQrStUvWxYz1234567890'

    expect(scanContent(content)).toHaveLength(1)
  })

  it('ignores short or placeholder values', () => {
    const content = ['SECRET=example', 'API_KEY=your_api_key', 'TOKEN=test', 'PASSWORD=placeholder'].join('\n')

    expect(scanContent(content)).toHaveLength(0)
  })

  it('reports line numbers', () => {
    const content = 'AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE'

    const findings = scanContent(content)
    expect(findings[0].line).toBe(1)
    expect(findings[0].type).toBe('AWS access key ID')
  })

  it('does not log or return the secret value', () => {
    const content = 'API_KEY=AbCdEfGh1234567890IjKlMnOpQrStUvWxYz1234567890'

    const findings = scanContent(content)
    expect(JSON.stringify(findings)).not.toContain('AbCdEfGh')
  })
})
