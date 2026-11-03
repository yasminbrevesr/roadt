// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

/**
 * URL pública do site (usada em canonical e Open Graph).
 * Defina PUBLIC_SITE_URL no ambiente de deploy quando o domínio final estiver definido.
 */
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const siteUrl = PUBLIC_SITE_URL || 'https://www.roadtrip021.com.br';

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'ignore',
  build: {
    // CSS pequeno vai inline no HTML: menos requisições no primeiro carregamento.
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
});
