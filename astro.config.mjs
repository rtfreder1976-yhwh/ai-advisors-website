// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://singingriverai.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => {
        // Homepage - highest priority, changes frequently
        if (item.url === 'https://singingriverai.com/') {
          return {
            ...item,
            priority: 1.0,
            changefreq: 'weekly',
            lastmod: new Date().toISOString().split('T')[0]
          };
        }
        // Service pages - high priority for local business
        if (item.url.includes('/services/')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'monthly',
            lastmod: new Date().toISOString().split('T')[0]
          };
        }
        // Default for other pages
        return {
          ...item,
          priority: 0.7,
          changefreq: 'monthly'
        };
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});