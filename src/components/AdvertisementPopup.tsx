"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useAdvertisements } from '@/context/AdvertisementContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

interface AdvertisementPopupProps {
  delay?: number; // Delay in milliseconds before showing the popup
}

const AdvertisementPopup: React.FC<AdvertisementPopupProps> = ({ delay = 5000 }) => {
  const { activeAdvertisement, loading } = useAdvertisements();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false); // To ensure it only shows once per session

  useEffect(() => {
    if (!loading && activeAdvertisement && !hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true); // Mark as shown for this session
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [activeAdvertisement, loading, delay, hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!activeAdvertisement || !isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn("max-w-md p-0 overflow-hidden relative")} hideCloseButton={true}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 text-white hover:bg-white/20 hover:text-white"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close advertisement</span>
        </Button>
        <div className="relative w-full h-auto">
          <img
            src={activeAdvertisement.image_url}
            alt={activeAdvertisement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
            <div className="text-white text-left">
              <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-1">
                {activeAdvertisement.title}
              </h3>
              {activeAdvertisement.description && (
                <p className="text-text-regular font-body">
                  {activeAdvertisement.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvertisementPopup;