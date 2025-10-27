import React from 'react';
import InfrastructureHeroSection from '@/components/InfrastructureHeroSection';
import InfrastructureGridSection from '@/components/InfrastructureGridSection';
import InfrastructureImageGridSection from '@/components/InfrastructureImageGridSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const Infrastructure = () => {
  return (
    <>
      <AnimateOnScroll isHero={true} delay={200}>
        <InfrastructureHeroSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <InfrastructureGridSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <InfrastructureImageGridSection />
      </AnimateOnScroll>
    </>
  );
};

export default Infrastructure;