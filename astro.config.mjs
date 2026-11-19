import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://4ledmt.dev',
  adapter: vercel(),
  compressHTML: true,
  vite: {
    // Los módulos se sirven desde el sitio y solo los scripts inline explícitos requieren hashes.
    build: { assetsInlineLimit: (file) => file.endsWith('.js') ? false : undefined },
  },
  integrations: [react(), sitemap()],
});
