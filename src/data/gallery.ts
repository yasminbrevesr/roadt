/**
 * Galeria da seção Instagram (imagens estáticas — não há integração com a API do Instagram).
 *
 * PENDENTE: exportar 6 fotos reais publicadas no @roadtrip021 e salvar em
 * src/assets/photos/ com os nomes abaixo (ex.: instagram-1.jpg).
 * Atualize também o texto alternativo de cada foto descrevendo a cena.
 */

export interface GalleryItem {
  photo: string;
  alt: string;
}

export const instagramGallery: GalleryItem[] = [
  { photo: 'instagram-1', alt: 'Foto de viagem publicada no Instagram da RoadTrip021' },
  { photo: 'instagram-2', alt: 'Foto de viagem publicada no Instagram da RoadTrip021' },
  { photo: 'instagram-3', alt: 'Foto de viagem publicada no Instagram da RoadTrip021' },
  { photo: 'instagram-4', alt: 'Foto de viagem publicada no Instagram da RoadTrip021' },
  { photo: 'instagram-5', alt: 'Foto de viagem publicada no Instagram da RoadTrip021' },
  { photo: 'instagram-6', alt: 'Foto de viagem publicada no Instagram da RoadTrip021' },
];
