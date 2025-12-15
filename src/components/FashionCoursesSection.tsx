"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';
import { useCourses } from '@/context/CourseContext';

const FashionCoursesSection = () => {
  const { courses } = useCourses();

  // Filter to display all fashion courses
  const fashionCourses = courses.filter(course => course.category === 'fashion');

  return (
    <section className="py-10 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll isHero={true} delay={100}> {/* Reduced delay */}
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground">
            Courses
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll isHero={true} delay={200}> {/* Reduced delay */}
          <p className="text-h4-mobile md:text-h4-desktop font-heading text-primary mb-8">
            Fashion Designing
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fashionCourses.map((course, index) => (
            <AnimateOnScroll key={course.id} delay={300 + index * 75}> {/* Reduced delay increment */}
              <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full mb-4 border border-input">
                    {course.tag} / Offline
                  </span>
                  <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground h-[4.9rem] overflow-hidden">
                    <Link to={`/courses/fashion-design/${course.id}`} className="hover:underline">
                      {course.title}
                    </Link>
                  </h3>
                  <p className="text-text-regular font-body text-gray-600 mb-6 h-[6.4rem] overflow-hidden">
                    {course.description.split('Details...')[0]}
                    <Link to={`/courses/fashion-design/${course.id}`} className="text-primary hover:underline ml-1">
                      Details...
                    </Link>
                  </p>
                  <div className="flex flex-col items-center gap-2 mt-auto md:flex-row md:justify-between">
                    <a href={course.brochureLink} download className="text-text-small font-body text-primary hover:underline whitespace-nowrap w-full text-center md:w-auto md:text-left">
                      Download Brochure
                    </a>
                    <Button asChild className="bg-primary hover:bg-primary/90 px-4 py-2 text-text-small flex-shrink-0 w-full md:w-auto transition-all duration-300 ease-in-out hover:scale-[1.02]">
                      <Link to={course.enrollLink} className="text-white">
                        Enroll <ArrowRight className="ml-1 h-3 w-3 inline-block" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FashionCoursesSection;