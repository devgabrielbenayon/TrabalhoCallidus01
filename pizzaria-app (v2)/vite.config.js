// vite.config.js (Versão Mínima)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Esta configuração ativa APENAS o plugin do React
export default defineConfig({
  plugins: [react()],
})