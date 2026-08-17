'use client';

import React, { useState, useCallback, memo } from 'react';
import Image, { type ImageProps } from 'next/image';

type AppImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

const AppImage = memo(function AppImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  sizes,
  onClick,
  fallbackSrc = '/assets/images/1.webp',
  loading = 'lazy',
  unoptimized = false,
  style,
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isExternalUrl = imageSrc.startsWith('http');
  const resolvedUnoptimized = unoptimized || isExternalUrl;

  const handleError = useCallback(() => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  }, [hasError, imageSrc, fallbackSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const imageClassName = [
    className,
    isLoading ? 'bg-gray-200' : '',
    onClick ? 'cursor-pointer hover:opacity-90 transition-opacity duration-200' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    src: imageSrc,
    alt,
    className: imageClassName,
    quality,
    placeholder,
    unoptimized: resolvedUnoptimized,
    onError: handleError,
    onLoad: handleLoad,
    onClick,
    style,
    ...(priority ? { priority: true as const } : { loading }),
    ...(blurDataURL && placeholder === 'blur' ? { blurDataURL } : {}),
  };

  if (fill) {
    return (
      <div className="relative" style={{ width: '100%', height: '100%' }}>
        <Image
          {...sharedProps}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          style={{ objectFit: 'cover', ...style }}
        />
      </div>
    );
  }

  return (
    <Image
      {...sharedProps}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
    />
  );
});

AppImage.displayName = 'AppImage';

export default AppImage;
