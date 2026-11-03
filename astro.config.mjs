// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

/**
 * Endereço do site, definido pelo ambiente de publicação:
 * - PUBLIC_SITE_URL: origem pública (ex.: https://yasminbrevesr.github.io ou https://www.roadtrip021.com.br)
 * - PUBLIC_BASE_PATH: subcaminho, quando houver (ex.: /roadt no GitHub Pages sem domínio próprio)
 * No GitHub Pages os dois valores são preenchidos automaticamente pelo workflow
 * (.github/workflows/deploy.yml). Localmente o site roda na raiz (/).
 */
const { PUBLIC_SITE_URL, PUBLIC_BASE_PATH } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const siteUrl = PUBLIC_SITE_URL || 'https://www.roadtrip021.com.br';
const basePath = PUBLIC_BASE_PATH ? `/${PUBLIC_BASE_PATH.replace(/^\/+|\/+$/g, '')}` : '/';

export default defineConfig({
  site: siteUrl,
  base: basePath,
  trailingSlash: 'ignore',
  build: {
    // CSS pequeno vai inline no HTML: menos requisições no primeiro carregamento.
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
});
