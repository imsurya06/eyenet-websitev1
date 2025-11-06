"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string; // Optional placeholder image
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholderSrc = '/public/placeholder.svg', // Default placeholder
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (imgRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !imageLoaded) {
            setImageSrc(src); // Start loading the actual image
            observer.unobserve(entry.target); // Stop observing once loaded
          }
        },
        {
          rootMargin: '100px', // Load image when it's 100px from the viewport
          threshold: 0.01, // Trigger when even a tiny part is visible
        }
      );

      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={cn(
        "transition-opacity duration-500",
        imageLoaded ? "opacity-100" : "opacity-0", // Fade in effect
        className
      )}
      onLoad={handleImageLoad}
      loading="lazy" // Native lazy loading as a fallback/enhancement
      {...props}
    />
  );
};

export default LazyImage;