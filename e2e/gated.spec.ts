import { expect, test } from '@playwright/test'

const gatedBuildRoute = '/ai-agent-handbook/build/anatomy'

test.describe('gated content', () => {
  test('gated build page exposes full content and CreativeWork JSON-LD', async ({ page }) => {
    const response = await page.goto(gatedBuildRoute)
    expect(response?.status()).toBe(200)

    const jsonBlocks = await page.locator('script[type="application/ld+json"]').allTextContents()
    const creativeWorks = jsonBlocks
      .map((text) => {
        try {
          return JSON.parse(text)
        } catch {
          return null
        }
      })
      .filter((json) => json?.['@type'] === 'CreativeWork')

    expect(creativeWorks.length).toBeGreaterThan(0)
    const first = creativeWorks[0]
    expect(first.isAccessibleForFree).toBe(false)
    expect(first.hasPart?.isAccessibleForFree).toBe(false)
    expect(first.hasPart?.cssSelector).toBe('.gated-content')

    const html = await page.content()
    expect(html).toContain('gated-content')
    expect(html).toContain('id="lead-gate"')

    await expect(page.getByRole('button', { name: /unlock the guide/i })).toBeVisible()
  })

  test('download route redirects without an unlock cookie', async ({ request }) => {
    const response = await request.get('/api/downloads/ai-agent-handbook', { maxRedirects: 0 })
    expect(response.status()).toBe(302)
    expect(response.headers()['location']).toContain('/ai-agent-handbook')
  })

  test('download route returns 404 for an unknown resource', async ({ request }) => {
    const response = await request.get('/api/downloads/unknown', { maxRedirects: 0 })
    expect(response.status()).toBe(404)
  })

  test('submitting the gate form reveals content and the PDF download CTA', async ({ page }) => {
    const email = `e2e-gated-${Date.now()}@example.com`

    await page.goto(gatedBuildRoute)

    await page.getByLabel('First name').fill('E2E')
    await page.getByLabel('Work email').fill(email)
    await page.getByLabel('Company').fill('TestCo')
    await page.getByRole('button', { name: /unlock the guide/i }).click()

    await expect(page.getByText("You're in.")).toBeVisible({ timeout: 20_000 })

    const content = page.locator('.gated-content')
    await expect(content).toHaveAttribute('data-unlocked', 'true')

    await expect(page.getByRole('link', { name: /download complete pdf/i })).toBeVisible()
  })
})
