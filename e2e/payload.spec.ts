import { expect, test } from '@playwright/test'

test.describe('Payload CMS routes', () => {
  test('/admin is mounted and does not return the marketing 404 or an error page', async ({ page }) => {
    const response = await page.goto('/admin')

    expect(response?.status()).toBe(200)
    await expect(page.locator('body')).not.toContainText('Application error')
    await expect(page.locator('body')).not.toContainText('Internal Server Error')
    await expect(page.locator('body')).not.toContainText('This page couldn’t load')
    await expect(page.locator('body')).not.toContainText('404')

    // The Payload admin UI rendered successfully.
    await expect(page).toHaveTitle(/Payload/)
  })

  test('/admin/unknown-route renders Payload auth behavior, not the marketing 404', async ({ page }) => {
    const response = await page.goto('/admin/unknown-route')

    expect(response?.status()).not.toBe(404)
    expect(response?.status()).toBeLessThan(500)
    await expect(page.locator('body')).not.toContainText('Application error')
    await expect(page.locator('body')).not.toContainText('Internal Server Error')
    await expect(page.locator('body')).not.toContainText('This page couldn’t load')
    await expect(page.locator('body')).not.toContainText('404')
    await expect(page).toHaveTitle(/Payload/)
  })

  test('/api is mounted and returns Payload-shaped JSON responses', async ({ request }) => {
    const response = await request.get('/api/nonexistent-collection')
    expect(response.status()).toBe(404)

    const body = await response.json()
    expect(body).toHaveProperty('message')
  })
})
