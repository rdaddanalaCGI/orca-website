import { expect, test } from '@playwright/test'

test.describe('Payload public API access controls', () => {
  test('GET /api/form-submissions is not readable without auth', async ({ request }) => {
    const response = await request.get('/api/form-submissions')
    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)
  })

  test('POST /api/form-submissions cannot be created without auth', async ({ request }) => {
    const response = await request.post('/api/form-submissions')
    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)
  })

  test('POST /api/media cannot be uploaded without auth', async ({ request }) => {
    const response = await request.post('/api/media')
    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)
  })
})
