import { expect, test } from '@playwright/test'

const publicRoutes = ['/', '/about', '/pricing', '/blog', '/press', '/contact', '/privacy-policy']

test.describe('page delivery', () => {
  for (const route of publicRoutes) {
    test(`${route} returns HTML with a title and canonical`, async ({ page }) => {
      const response = await page.goto(route)

      expect(response?.status()).toBe(200)
      await expect(page).toHaveTitle(/.+/)

      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveCount(1)
      expect(await canonical.getAttribute('href')).toContain(route === '/' ? '/' : route)

      const description = page.locator('meta[name="description"]')
      await expect(description).toHaveCount(1)
      expect((await description.getAttribute('content'))?.length ?? 0).toBeGreaterThan(20)
    })
  }

  test('each page has exactly one h1', async ({ page }) => {
    for (const route of publicRoutes) {
      await page.goto(route)
      await expect(page.locator('h1'), `${route} should have one h1`).toHaveCount(1)
    }
  })

  test('core content is present without client-side JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto('/')

    await expect(page.locator('h1')).toBeVisible()
    await context.close()
  })
})

test.describe('SEO infrastructure', () => {
  test('sitemap.xml lists the public routes', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)

    const body = await response.text()
    for (const route of publicRoutes) {
      expect(body).toContain(route === '/' ? '<loc>' : route)
    }
  })

  test('robots.txt disallows crawling in non-production environments', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)
    expect(await response.text()).toContain('Disallow: /')
  })

  test('non-production pages are noindex', async ({ page }) => {
    await page.goto('/')
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveCount(1)
    expect(await robots.getAttribute('content')).toContain('noindex')
  })

  test('organization structured data is valid JSON', async ({ page }) => {
    await page.goto('/')
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()

    expect(blocks.length).toBeGreaterThan(0)
    const types = blocks.flatMap((block) => {
      const parsed = JSON.parse(block)
      return (Array.isArray(parsed) ? parsed : [parsed]).map((entry) => entry['@type'])
    })

    expect(types).toContain('Organization')
    expect(types).toContain('WebSite')
  })

  test('unknown URLs return a branded 404', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByText('404')).toBeVisible()
  })

  test('configured redirects resolve to an existing page', async ({ page }) => {
    const response = await page.goto('/old-insurance-page')
    expect(response?.status()).toBe(200)
    expect(new URL(page.url()).pathname).toBe('/about')
  })
})

test.describe('security headers', () => {
  test('production CSP contains required directives and omits unsafe-eval', async ({ request }) => {
    const response = await request.get('/')
    const csp = response.headers()['content-security-policy']

    expect(csp).toBeTruthy()
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("base-uri 'self'")
    expect(csp).toContain("form-action 'self'")
    expect(csp).toContain('upgrade-insecure-requests')
    expect(csp).not.toContain("'unsafe-eval'")
  })

  test('HSTS is present and server identifier is hidden', async ({ request }) => {
    const response = await request.get('/')
    const headers = response.headers()

    expect(headers['strict-transport-security']).toBeTruthy()
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['x-powered-by']).toBeUndefined()
  })

  test('Payload admin still works under the production CSP', async ({ request }) => {
    const response = await request.get('/admin')

    expect(response.status(), 'admin should not be a 404 under CSP').not.toBe(404)
    expect(response.headers()['content-security-policy']).toBeTruthy()
  })
})

test.describe('navigation and forms', () => {
  test('primary navigation works', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Orca Agent Platform' }).first().click()
    await expect(page).toHaveURL(/\/agentic-automation-platform$/)
  })

  test('contact form reports validation errors instead of silently failing', async ({ page }) => {
    await page.goto('/contact')

    const form = page.getByTestId('contact-form')
    await form.getByLabel('Name').fill('Test User')
    await form.getByLabel('Email').fill('not-an-email')
    await form.getByLabel('Message').fill('Hello from the E2E suite.')
    await form.getByRole('button', { name: /send message/i }).click()

    // Without a database the action fails; either outcome must surface a message
    // to the user rather than hanging or exposing internals.
    await expect(form.locator('[role="alert"], [id$="-error"]').first()).toBeVisible({ timeout: 15_000 })
  })
})
