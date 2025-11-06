"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in ms before animation starts
  isHero?: boolean; // If true, animates on mount, otherwise on scroll
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  delay = 0,
  isHero = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isHero) {
      // For hero sections, animate immediately after a small delay
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setIsVisible(true), delay);
          return () => clearTimeout(timer);
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, isHero]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-300 ease-out", // Changed from duration-500 to duration-300
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;