import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const WhyChooseUsSection = () => {
  const features = [
    {
      image: '/images/faculty.png',
      title: 'Experienced faculty',
      description: 'Industry veterans with real-world design expertise guide our students.',
    },
    {
      image: '/images/facilities.png',
      title: 'State-of-the-art facilities',
      description: 'Modern studios and advanced technology support innovative learning.',
    },
    {
      image: '/images/partnerships.png',
      title: 'Industry partnerships',
      description: 'Direct connections with leading design firms create unique opportunities.',
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-[80px] bg-background text-center">
      <p className="text-text-regular font-body text-gray-600 mb-4">Why choose us</p>
      <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 max-w-3xl mx-auto">
        Exceptional design education for creative professionals
      </h2>
      <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
        We provide a transformative learning experience that prepares students for dynamic creative careers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg mb-6">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2">
              {feature.title}
            </h3>
            <p className="text-text-regular font-body text-gray-600 max-w-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Link to="/about">Learn more</Link>
        </Button>
        <Button asChild className="px-6 py-3 text-text-regular">
          <Link to="/contact">
            Contact us <ArrowRight className="ml-2 h-4 w-4 inline-block" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;