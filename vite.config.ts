import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Soundstage - Conexão Musical',
        short_name: 'Soundstage',
        description: 'Plataforma definitiva para conectar artistas e bares.',
        theme_color: '#8B5CF6',
        icons: [
          {
            src: 'country-bg.png', // Usando temporariamente enquanto não temos ícone oficial
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'country-bg.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 2222,
    host: true,
  }
})
