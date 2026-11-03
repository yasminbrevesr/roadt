/**
 * Próximas saídas.
 *
 * Fonte: títulos e URLs públicos das páginas de produto da loja Nuvemshop
 * (levantamento de 03/11/2026). Cada título segue o padrão "DESTINO - DD/MM/AAAA -> DD/MM/AAAA".
 *
 * Preço e disponibilidade (vagas / esgotado) NÃO foram incluídos porque mudam com
 * frequência e apareceram divergentes entre páginas. O valor real fica na página de
 * compra. Se quiser exibir o preço aqui, preencha `price` com o valor confirmado.
 *
 * Saídas com data de início já passada são ocultadas automaticamente
 * (no build e também no navegador).
 */

export interface Departure {
  /** Identificador único (sem espaços). */
  id: string;
  /** Liga a saída a um destino de `destinations.ts` (usa a mesma foto). */
  destination: string;
  title: string;
  subtitle?: string;
  location: string;
  /** Datas no formato AAAA-MM-DD. */
  start: string;
  end: string;
  /** Caminho da página de produto na loja (checkout continua na Nuvemshop). */
  url: string;
  /** Opcional — somente valores confirmados. */
  price?: number;
  /** Observação curta, ex.: "Feriado de Corpus Christi". */
  note?: string;
}

export const departures: Departure[] = [
  {
    id: 'uyuni-atacama-2026-11-11',
    destination: 'uyuni-atacama',
    title: 'Salar de Uyuni + Deserto do Atacama',
    location: 'Bolívia + Chile',
    start: '2026-11-11',
    end: '2026-11-18',
    url: '/produtos/salar-de-uyuni-deserto-do-atacama-bolivia-chile-11-11-2026-18-11-2026-1kmgg/',
  },
  {
    id: 'amazonia-2026-11-19',
    destination: 'amazonia',
    title: 'Amazônia',
    location: 'Brasil',
    start: '2026-11-19',
    end: '2026-11-24',
    url: '/produtos/amazonia-19-11-2026-24-11-2026-wbiyw/',
  },
  {
    id: 'bahia-2026-12-02',
    destination: 'bahia',
    title: 'Expedição Bahia',
    subtitle: "Caraíva, Arraial d'Ajuda e Trancoso",
    location: 'Bahia · Brasil',
    start: '2026-12-02',
    end: '2026-12-07',
    url: '/produtos/expedicao-bahia-caraiva-arraial-dajuda-e-trancoso-02-12-2026-07-12-2026-r99uu/',
  },
  {
    id: 'bahia-2026-12-09',
    destination: 'bahia',
    title: 'Expedição Bahia',
    subtitle: "Caraíva, Arraial d'Ajuda e Trancoso",
    location: 'Bahia · Brasil',
    start: '2026-12-09',
    end: '2026-12-14',
    url: '/produtos/expedicao-bahia-caraiva-arraial-dajuda-e-trancoso-09-12-2026-14-12-2026/',
  },
  {
    id: 'uyuni-atacama-2027-02-07',
    destination: 'uyuni-atacama',
    title: 'Salar de Uyuni + Deserto do Atacama',
    location: 'Bolívia + Chile',
    start: '2027-02-07',
    end: '2027-02-14',
    url: '/produtos/bolivia-salar-de-uyuni-07-02-2027-12-02-2027-7jv6p/',
  },
  {
    id: 'stl-festival-2027-05-27',
    destination: 'sao-thome-das-letras',
    title: 'STL Festival',
    subtitle: 'São Thomé das Letras',
    location: 'Minas Gerais · Brasil',
    start: '2027-05-27',
    end: '2027-05-30',
    note: 'Feriado de Corpus Christi',
    url: '/produtos/stl-festival-sao-thome-das-letras-27-06-2027-30-06-2027-feriado-de-corpus-christi-6810l',
  },
  {
    id: 'uyuni-atacama-2027-11-02',
    destination: 'uyuni-atacama',
    title: 'Salar de Uyuni + Deserto do Atacama',
    location: 'Bolívia + Chile',
    start: '2027-11-02',
    end: '2027-11-09',
    url: '/produtos/salar-de-uyuni-deserto-do-atacama-bolivia-chile-02-11-2027-09-11-2027-owpvv',
  },
  {
    id: 'uyuni-atacama-2027-11-12',
    destination: 'uyuni-atacama',
    title: 'Salar de Uyuni + Deserto do Atacama',
    location: 'Bolívia + Chile',
    start: '2027-11-12',
    end: '2027-11-19',
    note: 'Feriado',
    url: '/produtos/salar-de-uyuni-deserto-do-atacama-bolivia-chile-12-11-2027-19-11-2027-feriado-19qaa/',
  },
];

/** Saídas a partir de `fromISO` (padrão: hoje), em ordem cronológica. */
export function upcomingDepartures(fromISO: string): Departure[] {
  return departures
    .filter((d) => d.start >= fromISO)
    .sort((a, b) => a.start.localeCompare(b.start));
}
