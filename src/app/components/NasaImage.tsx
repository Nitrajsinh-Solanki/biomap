// biomap\src\app\components\NasaImage.tsx


'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface NasaImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function NasaImage({ 
  src, 
  fallbackSrc = '/placeholder-image.jpg', 
  alt, 
  ...props 
}: NasaImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(
    `/api/image-proxy?url=${encodeURIComponent(src)}`
  );
  const [error, setError] = useState<boolean>(false);

  return (
    <Image
      {...props}
      src={error ? fallbackSrc : imgSrc}
      alt={alt || 'NASA image'}
      unoptimized={true}
      onError={() => {
        setError(true);
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
