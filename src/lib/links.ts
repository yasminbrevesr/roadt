import { site, storePaths } from '@/config/site';

/**
 * Caminho interno do site respeitando o subcaminho de publicação
 * (ex.: '/#viagens' vira '/roadt/#viagens' no GitHub Pages). Use em todo link interno.
 */
export function withBase(path: string = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Monta um link absoluto para uma página da loja Nuvemshop. */
export function storeLink(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = site.storeUrl.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Busca da loja Nuvemshop (ex.: /search/?q=Jalapão). */
export function storeSearchLink(term: string): string {
  return storeLink(`${storePaths.search}?q=${encodeURIComponent(term)}`);
}

/** Link de conversa no WhatsApp oficial, com mensagem opcional pré-preenchida. */
export function whatsappLink(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
