"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { initialGalleryImages, GalleryImage } from '@/data/galleryImages';

interface GalleryImageContextType {
  galleryImages: GalleryImage[];
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
}

const GalleryImageContext = createContext<GalleryImageContextType | undefined>(undefined);

export const GalleryImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);

  const addGalleryImage = (image: GalleryImage) => {
    setGalleryImages(prevImages => [...prevImages, image]);
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages(prevImages => prevImages.filter(image => image.id !== id));
  };

  return (
    <GalleryImageContext.Provider value={{ galleryImages, addGalleryImage, deleteGalleryImage }}>
      {children}
    </GalleryImageContext.Provider>
  );
};

export const useGalleryImages = () => {
  const context = useContext(GalleryImageContext);
  if (context === undefined) {
    throw new Error('useGalleryImages must be used within a GalleryImageProvider');
  }
  return context;
};