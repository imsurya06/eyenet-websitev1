"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, CalendarDays, Newspaper } from 'lucide-react';
import { NewsEvent } from '@/data/newsEvents';
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

interface AdminNewsEventCardProps {
  newsEvent: NewsEvent;
  onDelete: (id: string) => void;
  onEdit: (newsEvent: NewsEvent) => void;
}

const AdminNewsEventCard: React.FC<AdminNewsEventCardProps> = ({ newsEvent, onDelete, onEdit }) => {
  const formattedDate = new Date(newsEvent.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const CategoryIcon = newsEvent.category === 'news' ? Newspaper : CalendarDays;

  return (
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-row h-60">
      {/* Left Section: Fixed "Phone" Design (simulated with green background) */}
      <div className="w-[120px] h-full flex-shrink-0 bg-green-600 relative flex items-center justify-center">
        {/* This section is designed to mimic the phone image from your screenshot.
            If you have a specific image asset for this phone, it would be placed here.
            For now, it's a solid green background to match the general color scheme. */}
      </div>

      {/* Right Section: Content */}
      <div className="p-4 flex flex-col flex-grow justify-between overflow-hidden">
        <div className="flex items-center justify-end gap-2 mb-2"> {/* Pushed to the right */}
          <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
            <CategoryIcon className="h-3 w-3 mr-1" />
            {newsEvent.category.charAt(0).toUpperCase() + newsEvent.category.slice(1)}
          </span>
          <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
            <CalendarDays className="h-3 w-3 mr-1" />
            {formattedDate}
          </span>
        </div>
        <h3 className="text-h3-mobile md:text-h3-desktop font-heading mb-2 text-foreground line-clamp-1">
          {newsEvent.title}
        </h3>
        <p className="text-text-regular font-body text-gray-600 mb-4 flex-grow overflow-hidden line-clamp-2">
          {newsEvent.description}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => onEdit(newsEvent)}
          >
            <Pencil className="h-4 w-4 mr-2" /> Edit
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
                  "{newsEvent.title}" {newsEvent.category} item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(newsEvent.id)}>
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

export default AdminNewsEventCard;