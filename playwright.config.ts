import { defineConfig, devices } from '@playwright/test'

const PORT = 3006
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html'], ['github']] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm build && pnpm start',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      // E2E runs against a non-production environment, which must be noindex.
      APP_ENV: 'preview',
      NEXT_PUBLIC_SITE_URL: baseURL,
      PORT: `${PORT}`,
      DATABASE_URL: 'postgresql://orcaworks:orcaworks@localhost:5434/orcaworks',
    },
  },
})
