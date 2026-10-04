import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { GalleryItem } from '../types';
import { SafeImage } from './SafeImage';
import { PUBLIC_IMAGE_FALLBACKS } from '../assets/images';

interface ImageLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 md:p-8 backdrop-blur-xs select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Top Header controls */}
      <div className="w-full max-w-6xl flex items-center justify-between text-white z-10">
        <div className="text-sm font-medium text-slate-300">
          <span>{currentItem.title}</span>
          <span className="mx-2 text-slate-500">·</span>
          <span className="text-xs text-sky-400 font-semibold">{currentItem.category}</span>
          <span className="mx-2 text-slate-500">·</span>
          <span className="text-xs text-slate-400">{currentIndex + 1} of {items.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title={isZoomed ? "Zoom out" : "Zoom in"}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Close viewer"
            aria-label="Close viewer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation arrows */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
          className="absolute left-2 md:left-4 z-10 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-xs"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className={`relative transition-transform duration-300 max-h-[75vh] flex items-center justify-center ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`}
             onClick={() => setIsZoomed(!isZoomed)}>
          <SafeImage
            src={currentItem.imageUrl}
            fallbackSrc={PUBLIC_IMAGE_FALLBACKS.heroOperatory}
            alt={currentItem.title}
            className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        <button
          onClick={() => onNavigate((currentIndex + 1) % items.length)}
          className="absolute right-2 md:right-4 z-10 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-xs"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption footer */}
      <div className="w-full max-w-2xl text-center text-slate-300 text-sm py-2">
        <p className="line-clamp-2">{currentItem.caption}</p>
      </div>
    </div>
  );
};
