import React from 'react';
import InfrastructureHeroSection from '@/components/InfrastructureHeroSection';
import InfrastructureGridSection from '@/components/InfrastructureGridSection';
import InfrastructureImageGridSection from '@/components/InfrastructureImageGridSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll
import LazyImage from '@/components/LazyImage'; // Import LazyImage

const Infrastructure = () => {
  return (
    <>
      <InfrastructureHeroSection />
      <InfrastructureGridSection />
      <InfrastructureImageGridSection />
    </>
  );
};

export default Infrastructure;