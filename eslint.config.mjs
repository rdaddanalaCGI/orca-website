import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Local reference material is gitignored and not part of the build.
    '.local/**',
  ]),
  // Oatmeal loads its webfonts via <link> tags in the root layout, per the
  // template's documented installation steps.
  { rules: { '@next/next/no-page-custom-font': 'off' } },

  // Rules that apply to all code we author.
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // Server-only modules must never be imported into client components. Guard the
  // most damaging case: leaking the CMS/database client into the browser bundle.
  {
    files: ['src/components/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/lib/payload',
              message: 'Payload is server-only. Fetch data in a Server Component and pass it down as props.',
            },
            {
              name: '@/payload.config',
              message: 'payload.config is server-only and must not reach the client bundle.',
            },
          ],
        },
      ],
    },
  },

  // Vendored Tailwind Plus Oatmeal template code. We keep it byte-compatible with
  // upstream so it can be re-synced, so its style nits are not our errors.
  // Do NOT add new paths here.
  {
    files: ['src/components/elements/**', 'src/components/sections/**', 'src/components/icons/**'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Oatmeal demo page content retains the template's original copy.
  {
    files: ['src/app/**/page.tsx'],
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },

  // CLI scripts report their results to stdout.
  {
    files: ['scripts/**/*.mjs'],
    rules: {
      'no-console': 'off',
    },
  },
])

export default eslintConfig
