// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://singingriverai.com',
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml'
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => {
        const today = new Date().toISOString().split('T')[0];

        // Homepage - highest priority, changes frequently
        if (item.url === 'https://singingriverai.com/') {
          return {
            ...item,
            priority: 1.0,
            changefreq: 'weekly',
            lastmod: today
          };
        }
        // Service pages - high priority for local business
        if (item.url.includes('/services/')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'monthly',
            lastmod: today
          };
        }
        // Location pages - high priority for local SEO dominance
        if (item.url.includes('huntsville') || item.url.includes('shoals') || item.url.includes('decatur') || item.url.includes('madison') || item.url.includes('athens')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'monthly',
            lastmod: today
          };
        }
        // Industry pages - high priority for targeting
        if (item.url.includes('/industries/')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'monthly',
            lastmod: today
          };
        }
        // Solution pages - high priority for conversion
        if (item.url.includes('/solutions/') || item.url.includes('/ai-for-small-business')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'monthly',
            lastmod: today
          };
        }
        // Default for other pages
        return {
          ...item,
          priority: 0.7,
          changefreq: 'monthly',
          lastmod: today
        };
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});