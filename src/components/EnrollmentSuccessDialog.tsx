"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import ConfettiOverlay from './ConfettiOverlay'; // Import ConfettiOverlay

interface EnrollmentSuccessDialogProps {
  show: boolean;
  courseName: string;
  userName: string;
  onClose: () => void;
}

const EnrollmentSuccessDialog: React.FC<EnrollmentSuccessDialogProps> = ({ show, courseName, userName, onClose }) => {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className={cn("max-w-md p-8 md:p-10 text-center flex flex-col items-center space-y-6 relative overflow-hidden")} hideCloseButton={true}> {/* Added relative and overflow-hidden */}
        {show && <ConfettiOverlay show={show} />} {/* Render ConfettiOverlay here */}
        <DialogHeader className="flex flex-col items-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <DialogTitle className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
            Congratulations!
          </DialogTitle>
          <DialogDescription className="text-text-medium font-body text-gray-700 text-center">
            Welcome <span className="font-semibold">{userName}</span>! You have enrolled for <span className="font-semibold">{courseName}</span>. Let's start your career with us.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90 !text-white px-6 py-3 text-text-regular">
            Awesome!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentSuccessDialog;