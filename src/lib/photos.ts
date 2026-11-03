/**
 * Fotos disponíveis em src/assets/photos (carregadas no build).
 * Permite saber se uma foto já foi incluída antes de usá-la.
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const file = path.split('/').pop() ?? '';
  byName.set(file.replace(/\.[^.]+$/, ''), mod.default);
}

/** Foto pelo nome do arquivo (sem extensão), ou undefined se ainda não existir. */
export function findPhoto(name: string): ImageMetadata | undefined {
  return byName.get(name);
}

export function hasPhoto(name: string): boolean {
  return byName.has(name);
}
