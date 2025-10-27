import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from './AnimateOnScroll';

const CallToActionSection = () => {
  return (
    <section
      className="relative py-10 bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/design-journey-cta.png)' }}
    >
      <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay */}
      <div className="relative z-10 text-center text-white px-3 md:px-8 lg:px-[80px]">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4 max-w-3xl mx-auto">
            Start your design journey
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body mb-10 max-w-2xl mx-auto">
            Take the first step towards a creative and fulfilling professional career in design.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="px-6 py-3 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/admissions">Apply now</Link>
            </Button>
            <Button asChild variant="outline" className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/contact">Request info</Link>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default CallToActionSection;