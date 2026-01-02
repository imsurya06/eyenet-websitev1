"use client";

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import { cn } from '@/lib/utils';

interface NCFTLogoProps {
  className?: string;
}

const NCFTLogo: React.FC<NCFTLogoProps> = ({ className }) => {
  return (
    <AnimateOnScroll delay={50} className={cn("w-full flex justify-center py-4 md:py-6 lg:py-8 bg-background", className)}>
      <img
        src="/images/NCFT-logo.png"
        alt="NCFT Logo"
        className="h-10 md:h-12 lg:h-16 w-auto object-contain" // Adjusted responsive height
      />
    </AnimateOnScroll>
  );
};

export default NCFTLogo;