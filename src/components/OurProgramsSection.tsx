import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

const OurProgramsSection = () => {
  const programs = [
    {
      image: '/images/fashion-design.png',
      title: 'Fashion design',
      description: 'Learn essential computer programs from basics to advanced.',
      href: '/courses/fashion-design',
    },
    {
      image: '/images/computer-courses.png',
      title: 'Computer Courses',
      description: 'Create innovative spatial designs with advanced techniques.',
      href: '/courses/computer-courses',
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-[#fdfaf6] text-center">
      <AnimateOnScroll delay={100}>
        <p className="text-text-regular font-body text-gray-600 mb-4">Our programs</p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 max-w-3xl mx-auto">
          Comprehensive design courses for aspiring creatives
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
        <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
          Discover our range of specialized design programs tailored to modern industry demands.
        </p>
      </AnimateOnScroll>

      <div className="flex flex-wrap justify-center gap-8 mb-16"> {/* Changed to flexbox for centering */}
        {programs.map((program, index) => (
          <AnimateOnScroll key={index} delay={200 + index * 75}> {/* Reduced delay increment */}
            <div className="flex flex-col items-center max-w-sm"> {/* Added max-w-sm for consistent card width */}
              <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg mb-6">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2">
                {program.title}
              </h3>
              <p className="text-text-regular font-body text-gray-600 max-w-xs">
                {program.description}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateOnScroll delay={100}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/courses">View Courses</Link>
          </Button>
          <Button asChild variant="ghost" className="px-6 py-3 text-text-regular text-primary hover:bg-transparent hover:text-primary/80">
            <Link to="/contact">
              Request details <ArrowRight className="ml-2 h-4 w-4 inline-block" />
            </Link>
          </Button>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default OurProgramsSection;