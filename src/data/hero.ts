/**
 * Fotos do carrossel do topo da página (hero).
 *
 * PENDENTE: fotos reais da RoadTrip021 (ex.: do Instagram @roadtrip021).
 * Salve em src/assets/photos/ com os nomes abaixo (hero-1.jpg, hero-2.jpg, ...).
 *
 * Recomendações:
 * - Fotos HORIZONTAIS, de preferência o arquivo original (câmera/celular), com
 *   2000 px de largura ou mais. Fotos baixadas do Instagram têm no máximo 1080 px
 *   e podem ficar levemente desfocadas em telas grandes.
 * - `position` ajusta o enquadramento quando a foto é cortada (ex.: 'center 30%'
 *   mantém mais a parte de cima; 'left center' prioriza o lado esquerdo).
 * - `caption` é a legenda discreta no canto (ex.: 'Jalapão, Tocantins'). Use só
 *   se tiver certeza do local da foto.
 * - Para adicionar ou remover fotos, inclua ou apague linhas desta lista.
 */

export interface HeroSlide {
  photo: string;
  alt: string;
  caption?: string;
  position?: string;
}

export const heroSlides: HeroSlide[] = [
  { photo: 'hero-1', alt: 'Grupo da RoadTrip021 reunido durante uma viagem' },
  { photo: 'hero-2', alt: 'Paisagem de um destino da RoadTrip021' },
  { photo: 'hero-3', alt: 'Viajantes da RoadTrip021 em uma trilha' },
  { photo: 'hero-4', alt: 'Grupo da RoadTrip021 em um mirante' },
  { photo: 'hero-5', alt: 'Momento de confraternização em uma viagem da RoadTrip021' },
];

/** Tempo de cada foto na tela (milissegundos). */
export const HERO_INTERVAL_MS = 6000;
