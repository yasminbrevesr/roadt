import { storePaths } from '@/config/site';
import { storeLink, withBase } from '@/lib/links';

export interface NavItem {
  label: string;
  href: string;
}

/** Menu principal (âncoras da homepage). */
export const mainNav: NavItem[] = [
  { label: 'Viagens', href: withBase('/#viagens') },
  { label: 'Próximas saídas', href: withBase('/#proximas-saidas') },
  { label: 'Sobre nós', href: withBase('/#sobre') },
  { label: 'Dúvidas', href: withBase('/#duvidas') },
  { label: 'Contato', href: withBase('/#contato') },
];

/** Atalhos para as categorias reais da loja. */
export const storeShortcuts: NavItem[] = [
  { label: 'Todas as viagens', href: storeLink(storePaths.allTrips) },
  { label: 'Saídas do Rio de Janeiro', href: storeLink(storePaths.departuresRio) },
  { label: 'Saídas de São Paulo', href: storeLink(storePaths.departuresSaoPaulo) },
  { label: 'Internacionais aéreas', href: storeLink(storePaths.internationalFlights) },
  { label: 'Calendário 2026', href: storeLink(storePaths.year2026) },
  { label: 'Calendário 2027', href: storeLink(storePaths.year2027) },
];

/** Links institucionais / legais existentes na loja. */
export const legalLinks: NavItem[] = [
  { label: 'Quem somos', href: storeLink(storePaths.about) },
  { label: 'Termos de Uso e Política de Cancelamento', href: storeLink(storePaths.terms) },
];
