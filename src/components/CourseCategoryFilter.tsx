"use client";

import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const filterItems = [
  { name: 'All Courses', category: null },
  { name: 'Fashion Design', category: 'fashion' },
  { name: 'Computer Courses', category: 'computer' },
  { name: 'Multimedia Training', category: 'multimedia' },
  { name: 'Photography', category: 'photography' },
  { name: 'Beautician Course', category: 'beautician' },
  { name: 'Spoken English', category: 'spoken-english' },
];

const CourseCategoryFilter = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-3 md:px-8 lg:px-[80px] py-8 bg-background border-b border-border">
      {filterItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.category ? `/courses?category=${item.category}` : '/courses'}
          className={({ isActive }) =>
            cn(
              "px-4 py-2 rounded-full text-text-small font-body transition-colors duration-200",
              (isActive || (!currentCategory && !item.category))
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-gray-700 hover:bg-accent hover:text-foreground"
            )
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default CourseCategoryFilter;