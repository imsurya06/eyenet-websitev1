"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ConfettiOverlayProps {
  show: boolean;
  duration?: number; // Duration in ms for the confetti to be visible
}

const ConfettiOverlay: React.FC<ConfettiOverlayProps> = ({ show, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!isVisible) return null;

  // Generate more confetti pieces with varied sizes and colors
  const confettiPieces = Array.from({ length: 200 }).map((_, i) => (
    <div
      key={i}
      className={cn(
        "absolute rounded-full opacity-0 animate-fall",
        i % 4 === 0 ? "bg-primary w-4 h-4" : // Larger primary color
        i % 4 === 1 ? "bg-yellow-400 w-3 h-3" : // Medium yellow
        i % 4 === 2 ? "bg-blue-400 w-5 h-5" : // Even larger blue
        "bg-green-400 w-2 h-2", // Smaller green
      )}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  ));

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {confettiPieces}
    </div>
  );
};

export default ConfettiOverlay;