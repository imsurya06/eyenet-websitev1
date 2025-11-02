"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Trash2, Star } from 'lucide-react';
import { Testimonial } from '@/context/TestimonialContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';

interface AdminTestimonialCardProps {
  testimonial: Testimonial;
  onApproveToggle: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
}

const AdminTestimonialCard: React.FC<AdminTestimonialCardProps> = ({ testimonial, onApproveToggle, onDelete }) => {
  const formattedDate = new Date(testimonial.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-text-small font-body border",
            testimonial.approved
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-yellow-100 text-yellow-700 border-yellow-300"
          )}>
            {testimonial.approved ? 'Approved' : 'Pending'}
          </span>
          <span className="text-text-small font-body text-gray-600">
            {formattedDate}
          </span>
        </div>
        <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-2 text-foreground">
          {testimonial.name}
        </h3>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                testimonial.rating > i ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
              )}
            />
          ))}
        </div>
        <p className="text-text-regular font-body text-gray-600 mb-4 flex-grow overflow-hidden">
          "{testimonial.quote}"
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant={testimonial.approved ? "secondary" : "default"}
            size="sm"
            className={cn(
              "flex-1",
              testimonial.approved
                ? "border-primary text-primary hover:bg-primary/10"
                : "bg-green-600 hover:bg-green-700 text-white"
            )}
            onClick={() => onApproveToggle(testimonial.id, testimonial.approved)}
          >
            {testimonial.approved ? <X className="h-4 w-4 mr-2" /> : <Check className="h-4 w-4 mr-2" />}
            {testimonial.approved ? 'Unapprove' : 'Approve'}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  testimonial from "{testimonial.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(testimonial.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonialCard;