import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  target: 'es2024',
  format: ['cjs', 'esm'], 
  dts: true,
  sourcemap: true,
  clean: true,
  tsconfig: './tsconfig.json',
})
