"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { initialInfrastructureImages, InfrastructureImage } from '@/data/infrastructureImages';

interface InfrastructureImageContextType {
  infrastructureImages: InfrastructureImage[];
  addInfrastructureImage: (image: InfrastructureImage) => void;
  deleteInfrastructureImage: (id: string) => void;
  updateInfrastructureImage: (updatedImage: InfrastructureImage) => void; // Added updateInfrastructureImage function
}

const InfrastructureImageContext = createContext<InfrastructureImageContextType | undefined>(undefined);

export const InfrastructureImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [infrastructureImages, setInfrastructureImages] = useState<InfrastructureImage[]>(initialInfrastructureImages);

  const addInfrastructureImage = (image: InfrastructureImage) => {
    setInfrastructureImages(prevImages => [...prevImages, image]);
  };

  const deleteInfrastructureImage = (id: string) => {
    setInfrastructureImages(prevImages => prevImages.filter(image => image.id !== id));
  };

  const updateInfrastructureImage = (updatedImage: InfrastructureImage) => {
    setInfrastructureImages(prevImages =>
      prevImages.map(image => (image.id === updatedImage.id ? updatedImage : image))
    );
  };

  return (
    <InfrastructureImageContext.Provider value={{ infrastructureImages, addInfrastructureImage, deleteInfrastructureImage, updateInfrastructureImage }}>
      {children}
    </InfrastructureImageContext.Provider>
  );
};

export const useInfrastructureImages = () => {
  const context = useContext(InfrastructureImageContext);
  if (context === undefined) {
    throw new Error('useInfrastructureImages must be used within an InfrastructureImageProvider');
  }
  return context;
};