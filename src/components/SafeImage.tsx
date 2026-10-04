import React, { useState, useEffect } from 'react';
import { resolveClinicImage, PUBLIC_IMAGE_FALLBACKS } from '../assets/images';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  ...props
}) => {
  const resolved = resolveClinicImage(src);
  const [currentSrc, setCurrentSrc] = useState<string>(resolved.primary);
  const [retryStage, setRetryStage] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const res = resolveClinicImage(src);
    setCurrentSrc(res.primary);
    setRetryStage(0);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (retryStage === 0) {
      // Stage 1: Try specific fallbackSrc or resolved public fallback
      const candidate = fallbackSrc || resolved.fallback || PUBLIC_IMAGE_FALLBACKS.heroOperatory;
      if (candidate && candidate !== currentSrc) {
        setRetryStage(1);
        setCurrentSrc(candidate);
        return;
      }
    }

    if (retryStage === 1) {
      // Stage 2: Try root static fallback
      const rootFallback = '/hero-dental.jpg';
      if (currentSrc !== rootFallback) {
        setRetryStage(2);
        setCurrentSrc(rootFallback);
        return;
      }
    }

    // If all fail, display accessible fallback card instead of broken image
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`bg-slate-100 flex flex-col items-center justify-center p-4 text-slate-500 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs font-medium text-slate-600 line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

