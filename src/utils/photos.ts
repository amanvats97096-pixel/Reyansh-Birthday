import manifest from '../data/mediaManifest.json';

export interface PhotoItem {
  id: string;
  rawPath: string;
  src: string;
  alt: string;
  caption: string;
  objectPosition: string;
  isPlaceholder: boolean;
  width: number;
  height: number;
}

export const photos: PhotoItem[] = manifest.photos as PhotoItem[];
export const realPhotosCount = manifest.realPhotosCount;
export const unsupportedFiles = manifest.unsupportedFiles;

/**
 * Safely get a photo by index (wraps around if fewer photos than index requested)
 */
export function getPhoto(index: number): PhotoItem {
  if (!photos || photos.length === 0) {
    return {
      id: 'photo-default',
      rawPath: 'placeholders/placeholder-1.svg',
      src: '/placeholders/placeholder-1.svg',
      alt: 'Reyansh Sharma',
      caption: 'Happy 2nd Birthday Reyansh!',
      objectPosition: 'center center',
      isPlaceholder: true,
      width: 800,
      height: 1000
    };
  }
  return photos[Math.abs(index) % photos.length];
}

/**
 * Get a slice or range of photos
 */
export function getPhotoRange(startIndex: number, count: number): PhotoItem[] {
  const result: PhotoItem[] = [];
  for (let i = 0; i < count; i++) {
    result.push(getPhoto(startIndex + i));
  }
  return result;
}
