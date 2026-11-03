/**
 * Destinos apresentados na seção "Descubra nossas viagens".
 *
 * Fonte: páginas de produto públicas da loja Nuvemshop (levantamento de 03/11/2026).
 * `durationDays` vem das datas de uma saída real publicada para o destino
 * (ex.: Jalapão 02/04 → 07/04 = 6 dias). Quando não há duração confirmada, o campo fica vazio.
 *
 * Foto: coloque o arquivo em src/assets/photos/<slug>.jpg (ou .png/.webp).
 * Sem foto, o card mostra um espaço reservado identificado.
 */

export type Scope = 'brasil' | 'internacional';

export interface Destination {
  slug: string;
  /** Sigla decorativa no estilo "código de aeroporto" usada nos cartões de embarque. */
  code: string;
  name: string;
  subtitle?: string;
  location: string;
  scope: Scope;
  durationDays?: number;
  /** Termo usado na busca da loja para listar as saídas disponíveis do destino. */
  searchTerm: string;
  /** Card em destaque (ocupa duas colunas no desktop). */
  featured?: boolean;
  /** Texto alternativo da foto (acessibilidade). Ao incluir a foto real, descreva a cena. */
  imageAlt: string;
}

export const destinations: Destination[] = [
  {
    slug: 'bahia',
    code: 'BAH',
    name: 'Expedição Bahia',
    subtitle: "Caraíva, Arraial d'Ajuda e Trancoso",
    location: 'Bahia',
    scope: 'brasil',
    durationDays: 6,
    searchTerm: 'Bahia',
    featured: true,
    imageAlt: 'Viagem da RoadTrip021 — Expedição Bahia',
  },
  {
    slug: 'uyuni-atacama',
    code: 'UYU',
    name: 'Salar de Uyuni + Atacama',
    location: 'Bolívia + Chile',
    scope: 'internacional',
    durationDays: 8,
    searchTerm: 'Uyuni',
    featured: true,
    imageAlt: 'Viagem da RoadTrip021 — Salar de Uyuni',
  },
  {
    slug: 'jalapao',
    code: 'JAL',
    name: 'Expedição Jalapão',
    location: 'Tocantins',
    scope: 'brasil',
    durationDays: 6,
    searchTerm: 'Jalapão',
    imageAlt: 'Viagem da RoadTrip021 — Jalapão',
  },
  {
    slug: 'atacama',
    code: 'ATA',
    name: 'Deserto do Atacama',
    location: 'Chile',
    scope: 'internacional',
    durationDays: 6,
    searchTerm: 'Atacama',
    imageAlt: 'Viagem da RoadTrip021 — Deserto do Atacama',
  },
  {
    slug: 'lencois-maranhenses',
    code: 'LMA',
    name: 'Lençóis Maranhenses',
    location: 'Maranhão',
    scope: 'brasil',
    durationDays: 7,
    searchTerm: 'Lençóis Maranhenses',
    imageAlt: 'Viagem da RoadTrip021 — Lençóis Maranhenses',
  },
  {
    slug: 'machu-picchu',
    code: 'MPI',
    name: 'Machu Picchu',
    location: 'Peru',
    scope: 'internacional',
    searchTerm: 'Machu Picchu',
    imageAlt: 'Viagem da RoadTrip021 — Machu Picchu',
  },
  {
    slug: 'amazonia',
    code: 'AMZ',
    name: 'Amazônia',
    location: 'Brasil',
    scope: 'brasil',
    durationDays: 6,
    searchTerm: 'Amazônia',
    imageAlt: 'Viagem da RoadTrip021 — Amazônia',
  },
  {
    slug: 'chapada-diamantina',
    code: 'CHD',
    name: 'Chapada Diamantina',
    location: 'Bahia',
    scope: 'brasil',
    searchTerm: 'Chapada Diamantina',
    imageAlt: 'Viagem da RoadTrip021 — Chapada Diamantina',
  },
  {
    slug: 'sao-thome-das-letras',
    code: 'STL',
    name: 'São Thomé das Letras',
    location: 'Minas Gerais',
    scope: 'brasil',
    durationDays: 4,
    searchTerm: 'São Thomé',
    imageAlt: 'Viagem da RoadTrip021 — São Thomé das Letras',
  },
  {
    slug: 'ibitipoca',
    code: 'IBI',
    name: 'Ibitipoca',
    location: 'Minas Gerais',
    scope: 'brasil',
    durationDays: 3,
    searchTerm: 'Ibitipoca',
    imageAlt: 'Viagem da RoadTrip021 — Ibitipoca',
  },
];

export const scopeLabels: Record<Scope, string> = {
  brasil: 'Brasil',
  internacional: 'América do Sul',
};

export function findDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
