import React, { useState } from 'react';
import { Server } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  className?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackLabel,
  className = 'w-full h-full object-cover'
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-900 text-slate-300 p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Server className="w-8 h-8 text-blue-400 mb-3 opacity-80" />
        <p className="text-xs font-medium tracking-wide text-slate-200 max-w-xs">
          {fallbackLabel || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
