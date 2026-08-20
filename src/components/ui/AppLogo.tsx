'use client';

import React, { memo } from 'react';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({
  src = '/assets/images/app_logo.webp',
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const containerClassName = [
    'flex items-center',
    onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName} onClick={onClick}>
      <AppImage
        src={src}
        alt="Elegant Nails Αγρίνιο"
        width={size}
        height={size}
        className="flex-shrink-0"
        priority={false}
        unoptimized={src.endsWith('.svg')}
      />
    </div>
  );
});

export default AppLogo;
