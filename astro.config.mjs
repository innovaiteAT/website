// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://innovaite.at',
  trailingSlash: 'never',
  adapter: cloudflare(),
  // Keine Sessions nötig (spart das KV-Binding)
  session: false,
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
