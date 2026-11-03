import React from 'react';
import type { GalleryImage, PhotoSize } from '../gallery';

export const PHOTO_SIZES: Array<{ value: PhotoSize; label: string; cols: number; rows: number }> = [
  { value: 'small', label: 'Klein', cols: 1, rows: 1 },
  { value: 'wide', label: 'Breed', cols: 2, rows: 1 },
  { value: 'tall', label: 'Hoog', cols: 1, rows: 2 },
  { value: 'large', label: 'Groot', cols: 2, rows: 2 },
];

const SIZE_CLASSES: Record<PhotoSize, string> = {
  small: '',
  wide: 'col-span-2',
  tall: 'row-span-2',
  large: 'col-span-2 row-span-2',
};

type PhotoCollageProps = {
  images: GalleryImage[];
  renderOverlay?: (image: GalleryImage, index: number) => React.ReactNode;
};

/** Dezelfde collage wordt op de homepage en in het admin-voorbeeld gebruikt. */
const PhotoCollage: React.FC<PhotoCollageProps> = ({ images, renderOverlay }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense auto-rows-[9rem] sm:auto-rows-[11rem] md:auto-rows-[13rem] gap-3 md:gap-4">
    {images.map((image, index) => (
      <div
        key={image.id}
        className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-[0_16px_36px_rgba(0,0,0,0.18)] fade-in-up ${SIZE_CLASSES[image.size ?? 'small']}`}
        style={{ animationDelay: `${Math.min(index, 12) * 0.05}s` }}
      >
        <img
          src={image.src}
          alt={image.alt || `Foto ${index + 1} van 't bonenbakkie`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {renderOverlay?.(image, index)}
      </div>
    ))}
  </div>
);

export default PhotoCollage;
