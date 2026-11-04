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

/** Filtros aceitos na página /viagens/ (via ?filtro=). */
export type TripFilter = 'brasil' | 'internacional' | `${number}`;

/** Página com todas as viagens, opcionalmente já filtrada e/ou rolando até uma seção. */
export function tripsPage(filter?: TripFilter, hash?: string): string {
  const query = filter ? `?filtro=${filter}` : '';
  return withBase(`/viagens/${query}${hash ? `#${hash}` : ''}`);
}

/** Página de um destino; com `departureId`, já rola até aquela data. */
export function destinationPage(slug: string, departureId?: string): string {
  return withBase(`/viagens/${slug}/${departureId ? `#saida-${departureId}` : ''}`);
}

/** Área do viajante (login). */
export function loginPage(): string {
  return withBase('/entrar/');
}

/** Página "Quem somos". */
export function aboutPage(): string {
  return withBase('/sobre/');
}

/** Documento legal oficial (hospedado na loja). */
export function termsLink(): string {
  return storeLink(storePaths.terms);
}

/** Link de conversa no WhatsApp oficial, com mensagem opcional pré-preenchida. */
export function whatsappLink(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
