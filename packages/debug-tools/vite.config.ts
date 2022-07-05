import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import transformerDirective from '@unocss/transformer-directives'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  plugins: [
    Unocss({
      presets: [
        presetUno({}),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
            // ...
          },
        }),
      ],
      transformers: [transformerDirective()],
    }),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    outDir: './output',
    reportCompressedSize: false,
  },
})
