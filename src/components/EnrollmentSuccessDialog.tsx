"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

interface EnrollmentSuccessDialogProps {
  show: boolean;
  courseName: string;
  onClose: () => void;
}

const EnrollmentSuccessDialog: React.FC<EnrollmentSuccessDialogProps> = ({ show, courseName, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Dialog Content */}
      <AnimateOnScroll delay={100} className="relative bg-white p-8 md:p-10 rounded-lg shadow-2xl max-w-md w-full text-center transform scale-95 opacity-0 animate-in fade-in zoom-in-95 duration-300">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-h4-mobile md:text-h4-desktop font-heading mb-4 text-foreground">
          Congratulations!
        </h3>
        <p className="text-text-medium font-body text-gray-700 mb-8">
          You have enrolled for <span className="font-semibold text-primary">{courseName}</span>. Let's start your career with us.
        </p>
        <Button onClick={onClose} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-text-regular">
          Awesome!
        </Button>
      </AnimateOnScroll>
    </div>
  );
};

export default EnrollmentSuccessDialog;