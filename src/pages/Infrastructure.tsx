import React from 'react';
import InfrastructureHeroSection from '@/components/InfrastructureHeroSection';
import InfrastructureGridSection from '@/components/InfrastructureGridSection';
import InfrastructureImageGridSection from '@/components/InfrastructureImageGridSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const Infrastructure = () => {
  return (
    <>
      <AnimateOnScroll isHero={true} delay={500}>
        <InfrastructureHeroSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <InfrastructureGridSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <InfrastructureImageGridSection />
      </AnimateOnScroll>
    </>
  );
};

export default Infrastructure;