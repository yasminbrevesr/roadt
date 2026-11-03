import { departures } from '@/data/departures';
import { aboutPage, termsLink, tripsPage, withBase, type TripFilter } from '@/lib/links';
import { todayISO } from '@/lib/dates';

export interface NavItem {
  label: string;
  href: string;
  /** Link para fora do site (abre em nova aba). */
  external?: boolean;
}

/** Menu principal. */
export const mainNav: NavItem[] = [
  { label: 'Viagens', href: tripsPage() },
  { label: 'Próximas saídas', href: withBase('/#proximas-saidas') },
  { label: 'Sobre nós', href: aboutPage() },
  { label: 'Dúvidas', href: withBase('/#duvidas') },
  { label: 'Contato', href: withBase('/#contato') },
];

/** Anos que têm saídas futuras publicadas (para os atalhos "Calendário 2027" etc.). */
export const departureYears: string[] = [
  ...new Set(departures.filter((d) => d.start >= todayISO()).map((d) => d.start.slice(0, 4))),
].sort();

/** Atalhos para a página de viagens já filtrada. */
export const tripShortcuts: NavItem[] = [
  { label: 'Todas as viagens', href: tripsPage() },
  { label: 'Viagens pelo Brasil', href: tripsPage('brasil') },
  { label: 'América do Sul', href: tripsPage('internacional') },
  ...departureYears.map((year) => ({
    label: `Calendário ${year}`,
    href: tripsPage(year as TripFilter, 'calendario'),
  })),
];

/** Links institucionais. Os Termos são o documento oficial hospedado na loja. */
export const legalLinks: NavItem[] = [
  { label: 'Quem somos', href: aboutPage() },
  { label: 'Termos de Uso e Política de Cancelamento', href: termsLink(), external: true },
];
