import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: { alias: { 'server-only': path.resolve(process.cwd(), 'tests/helpers/server-only.ts') } },
  test: { environment: 'node', include: ['tests/int/**/*.int.spec.ts'], setupFiles: ['./vitest.setup.ts'], sequence: { concurrent: false } },
})
