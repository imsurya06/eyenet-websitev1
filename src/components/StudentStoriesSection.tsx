import React from 'react';
import { User } from 'lucide-react';

const StudentStoriesSection = () => {
  const testimonials = [
    {
      quote: "This program transformed my creative vision into a professional career.",
      name: "Emma Rodriguez",
      role: "Fashion designer, Global Trends",
    },
    {
      quote: "The practical training prepared me for real-world design challenges.",
      name: "Michael Chen",
      role: "Graphic designer, Creative Agency",
    },
    {
      quote: "Networking events connected me with industry leaders.",
      name: "Sarah Thompson",
      role: "Interior design consultant",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[80px] bg-background text-center">
      <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
        Student stories
      </h2>
      <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
        Hear from our talented design graduates and current students.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4">
            <p className="text-text-medium font-body text-foreground mb-8 italic max-w-xs">
              "{testimonial.quote}"
            </p>
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gray-500" />
            </div>
            <p className="text-text-medium font-body font-semibold text-foreground mb-1">
              {testimonial.name}
            </p>
            <p className="text-text-small font-body text-gray-600">
              {testimonial.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentStoriesSection;