import type { ImageMetadata } from 'astro';
import { SITE } from '../config';

// Alle Fotos aus src/assets/photos/. Struktur siehe README dort.
const photos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif}', { eager: true });

const PLACEHOLDER = '/src/assets/photos/cosmo_standing.jpeg';

function placeholder(): ImageMetadata {
  const image = photos[PLACEHOLDER]?.default;
  if (!image) throw new Error(`Platzhalterfoto fehlt: ${PLACEHOLDER}`);
  return image;
}

/**
 * Foto für z. B. ein Teammitglied: photoFor('team', 'raphael-zaehrer') sucht src/assets/photos/team/raphael-zaehrer.*
 * Fehlt das Foto oder ist SITE.photosPlaceholderOnly aktiv, kommt das Platzhalterfoto (Cosmo).
 */
export function photoFor(folder: string, id: string): ImageMetadata {
  if (SITE.photosPlaceholderOnly) return placeholder();
  const match = Object.entries(photos).find(([path]) => path.startsWith(`/src/assets/photos/${folder}/${id}.`));
  return match?.[1].default ?? placeholder();
}
