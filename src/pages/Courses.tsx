"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import CallToActionSection from '@/components/CallToActionSection';
import { useCourses } from '@/context/CourseContext';

const Courses = () => {
  const { courses, loading } = useCourses();

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section for All Courses */}
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] text-center">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll isHero={true} delay={100}>
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground">
              Our Comprehensive Courses
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={200}>
            <p className="text-text-medium font-body text-gray-600 mb-8">
              Explore our diverse range of fashion design and computer courses, crafted to ignite your creativity and build your professional skills.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* All Courses Grid */}
      <section className="py-10 px-3 md:px-8 lg:px-[80px] bg-muted text-foreground">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll delay={100}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-10 text-center">
              Discover Your Path
            </h2>
          </AnimateOnScroll>

          {loading ? (
            <AnimateOnScroll delay={200}>
              <p className="text-text-medium font-body text-gray-600 text-center">
                Loading courses...
              </p>
            </AnimateOnScroll>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <AnimateOnScroll key={course.id} delay={200 + index * 75}>
                  <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="inline-block bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full mb-4 border border-input">
                        {course.tag} / {course.category === 'fashion' ? 'Fashion' : 'Computer'}
                      </span>
                      <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground h-[4.9rem] overflow-hidden">
                        <Link to={`/courses/${course.category === 'fashion' ? 'fashion-design' : 'computer-courses'}/${course.id}`} className="hover:underline">
                          {course.title}
                        </Link>
                      </h3>
                      <p className="text-text-regular font-body text-gray-600 mb-6 h-[6.4rem] overflow-hidden">
                        {course.description.split(' Details...')[0]}
                        <Link to={`/courses/${course.category === 'fashion' ? 'fashion-design' : 'computer-courses'}/${course.id}`} className="text-primary hover:underline ml-1">
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
          ) : (
            <AnimateOnScroll delay={200}>
              <p className="text-text-medium font-body text-gray-600 text-center">
                No courses available at the moment. Please check back later!
              </p>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      <CallToActionSection />
    </div>
  );
};

export default Courses;