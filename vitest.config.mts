import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    // Playwright owns `e2e/`; DB-backed integration specs have their own Vitest config.
    include: ['tests/**/*.test.ts'],
    exclude: ['e2e/**', 'tests/integration/**', 'node_modules/**', '.next/**'],
  },
})
