import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

export default defineConfig({
  plugins: [preact(), WindiCSS()],
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, 'src')
    }]
  },
  build: {
    outDir: './output',
    reportCompressedSize: false
  },
})
