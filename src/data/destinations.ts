/**
 * Destinos: seção "Descubra nossas viagens" e páginas /viagens/<slug>/.
 *
 * Fontes:
 * - Nome, local e duração: páginas de produto públicas da loja Nuvemshop (03/11/2026).
 *   `durationDays` vem das datas de uma saída real publicada para o destino.
 * - Descrição e itens incluídos: legendas de posts do Instagram @roadtrip021
 *   (texto da própria marca, sem emojis e sem chamadas promocionais).
 * Destinos sem texto verificado ficam sem descrição (a página mostra só os fatos).
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
  /** Parágrafos de apresentação (somente texto verificado). */
  description?: string[];
  /** Itens incluídos divulgados pela marca para o roteiro. */
  includes?: string[];
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
    featured: true,
    description: ["Expedição pelo litoral sul da Bahia, passando por Caraíva, Arraial d'Ajuda e Trancoso."],
    imageAlt: 'Viagem da RoadTrip021 — Expedição Bahia',
  },
  {
    slug: 'uyuni-atacama',
    code: 'UYU',
    name: 'Salar de Uyuni + Atacama',
    location: 'Bolívia + Chile',
    scope: 'internacional',
    durationDays: 8,
    featured: true,
    description: [
      'Dois países na mesma viagem: vulcões, gêiseres, lagunas coloridas, céu estrelado e o maior salar do planeta.',
      'Um roteiro de 8 dias para explorar o melhor do Deserto do Atacama e do Salar de Uyuni sem se preocupar com nada.',
    ],
    includes: [
      'Passagens aéreas (com saída do Rio de Janeiro e de São Paulo)',
      'Hospedagem com café da manhã',
      'Expedição em veículo 4x4 pelo Salar de Uyuni',
      'Transfer entre aeroportos, hotéis e travessia de fronteira',
      'Guiamento especializado durante toda a viagem',
      'Transfer durante os passeios',
    ],
    imageAlt: 'Viagem da RoadTrip021 — Salar de Uyuni',
  },
  {
    slug: 'jalapao',
    code: 'JAL',
    name: 'Expedição Jalapão',
    location: 'Tocantins',
    scope: 'brasil',
    durationDays: 6,
    imageAlt: 'Viagem da RoadTrip021 — Jalapão',
  },
  {
    slug: 'atacama',
    code: 'ATA',
    name: 'Deserto do Atacama',
    location: 'Chile',
    scope: 'internacional',
    durationDays: 6,
    description: ['Roteiro pelo Deserto do Atacama, no norte do Chile.'],
    imageAlt: 'Viagem da RoadTrip021 — Deserto do Atacama',
  },
  {
    slug: 'lencois-maranhenses',
    code: 'LMA',
    name: 'Lençóis Maranhenses',
    location: 'Maranhão',
    scope: 'brasil',
    durationDays: 7,
    description: [
      'Dunas infinitas, banhos de lagoa, pôr do sol inesquecível e cenários surreais.',
      'Uma expedição para explorar o melhor dos Lençóis Maranhenses sem se preocupar com nada.',
    ],
    includes: [
      'Passagens aéreas (com saída do Rio de Janeiro e de São Paulo)',
      'Hospedagem com café da manhã',
      'Passeios pelas dunas e lagoas',
      'Transfer de ida e volta entre aeroporto e hotel',
      'Guiamento especializado durante toda a expedição (guia local e acompanhamento RoadTrip021)',
      'Transfer completo durante todos os passeios',
    ],
    imageAlt: 'Viagem da RoadTrip021 — Lençóis Maranhenses',
  },
  {
    slug: 'machu-picchu',
    code: 'MPI',
    name: 'Machu Picchu',
    location: 'Peru',
    scope: 'internacional',
    description: ['Conheça Machu Picchu, uma das Sete Maravilhas do Mundo Moderno.'],
    imageAlt: 'Viagem da RoadTrip021 — Machu Picchu',
  },
  {
    slug: 'amazonia',
    code: 'AMZ',
    name: 'Amazônia',
    location: 'Brasil',
    scope: 'brasil',
    durationDays: 6,
    description: [
      'Uma aventura no coração da Amazônia: navegar pelos rios, nadar com os botos, conhecer cachoeiras incríveis e dormir em meio à floresta.',
      'Tudo isso ao lado de pessoas que podem se tornar amigos para a vida inteira.',
    ],
    imageAlt: 'Viagem da RoadTrip021 — Amazônia',
  },
  {
    slug: 'chapada-diamantina',
    code: 'CHD',
    name: 'Chapada Diamantina',
    location: 'Bahia',
    scope: 'brasil',
    imageAlt: 'Viagem da RoadTrip021 — Chapada Diamantina',
  },
  {
    slug: 'sao-thome-das-letras',
    code: 'STL',
    name: 'São Thomé das Letras',
    location: 'Minas Gerais',
    scope: 'brasil',
    durationDays: 4,
    description: [
      'São Thomé das Letras é conhecida como a cidade mais mística do Brasil.',
      'Um roteiro completo para viver experiências incríveis em um fim de semana, conhecer lugares surpreendentes e fazer novas amizades.',
    ],
    imageAlt: 'Viagem da RoadTrip021 — São Thomé das Letras',
  },
  {
    slug: 'ibitipoca',
    code: 'IBI',
    name: 'Ibitipoca',
    location: 'Minas Gerais',
    scope: 'brasil',
    durationDays: 3,
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
