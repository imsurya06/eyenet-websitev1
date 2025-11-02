"use client";

import React from 'react';
import { useNewsEvents } from '@/context/NewsEventsContext';
import AnimateOnScroll from './AnimateOnScroll';
import { CalendarDays, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming we might want to link to individual news/event pages later
import { cn } from '@/lib/utils'; // Import cn for conditional class names

const NewsEventsDisplaySection = () => {
  const { newsEvents } = useNewsEvents();

  // Sort news events by date, newest first
  const sortedNewsEvents = [...newsEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll delay={100}>
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground text-center lg:text-left">
            News & Events
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-16 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            Stay updated with the latest happenings, achievements, and upcoming events at Eyenet.
          </p>
        </AnimateOnScroll>

        {sortedNewsEvents.length > 0 ? (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {sortedNewsEvents.map((item, index) => {
              const CategoryIcon = item.category === 'news' ? Newspaper : CalendarDays;
              const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <AnimateOnScroll key={item.id} delay={300 + index * 100}>
                  <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col md:flex-row h-auto md:h-60"> {/* Fixed height for desktop, auto for mobile */}
                    {/* Image/Color Block */}
                    <div className={cn(
                      "w-full h-48 flex-shrink-0 overflow-hidden", // Mobile: full width, fixed height
                      "md:w-2/5 md:h-full" // Desktop: 2/5 width, full height of card
                    )}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow justify-between md:w-3/5 overflow-hidden"> {/* Content takes 3/5 width on desktop, flex-grow */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                        <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {formattedDate}
                        </span>
                      </div>
                      <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-text-regular font-body text-gray-600 flex-grow overflow-hidden line-clamp-3">
                        {item.description}
                      </p>
                      {/* Optional: Add a "Read More" link if you have individual news/event pages */}
                      {/* <Link to={`/news-events/${item.id}`} className="text-primary hover:underline text-text-regular font-body mt-auto">
                        Read More <ArrowRight className="ml-1 h-3 w-3 inline-block" />
                      </Link> */}
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        ) : (
          <AnimateOnScroll delay={300}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              No news or events to display at the moment.
            </p>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
};

export default NewsEventsDisplaySection;