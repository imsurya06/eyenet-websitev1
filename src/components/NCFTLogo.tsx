"use client";

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import { cn } from '@/lib/utils';

interface NCFTLogoProps {
  className?: string;
}

const NCFTLogo: React.FC<NCFTLogoProps> = ({ className }) => {
  return (
    <AnimateOnScroll delay={50} className={cn("w-full flex justify-center py-6 md:py-8 lg:py-10 bg-background", className)}>
      <img
        src="/images/NCFT-logo.png"
        alt="NCFT Logo"
        className="h-20 md:h-24 lg:h-28 w-auto object-contain" // Responsive height
      />
    </AnimateOnScroll>
  );
};

export default NCFTLogo;