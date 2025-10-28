"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { initialGalleryImages, GalleryImage } from '@/data/galleryImages';

interface GalleryImageContextType {
  galleryImages: GalleryImage[];
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  updateGalleryImage: (updatedImage: GalleryImage) => void; // Added updateGalleryImage function
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

  const updateGalleryImage = (updatedImage: GalleryImage) => {
    setGalleryImages(prevImages =>
      prevImages.map(image => (image.id === updatedImage.id ? updatedImage : image))
    );
  };

  return (
    <GalleryImageContext.Provider value={{ galleryImages, addGalleryImage, deleteGalleryImage, updateGalleryImage }}>
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