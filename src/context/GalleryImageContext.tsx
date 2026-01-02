"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { initialGalleryImages, GalleryImage } from '@/data/galleryImages';

interface GalleryImageContextType {
  galleryImages: GalleryImage[];
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  updateGalleryImage: (updatedImage: GalleryImage) => void;
  loading: boolean; // Added loading state
}

const GalleryImageContext = createContext<GalleryImageContextType | undefined>(undefined);

export const GalleryImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Simulate fetching images. In a real app, this would be an async call to a DB.
    // For now, we'll just set a timeout to simulate loading.
    const timer = setTimeout(() => {
      setGalleryImages(initialGalleryImages); // Use initial data
      setLoading(false);
    }, 500); // Simulate 500ms loading time

    return () => clearTimeout(timer);
  }, []);

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
    <GalleryImageContext.Provider value={{ galleryImages, addGalleryImage, deleteGalleryImage, updateGalleryImage, loading }}>
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