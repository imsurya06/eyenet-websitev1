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
import { cn } from '@/lib/utils'; // Import cn for conditional class names

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
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-row h-60"> {/* Fixed height for the card */}
      {/* Image/Color Block - now 1/3 width */}
      <div className={cn(
        "w-1/3 h-full flex-shrink-0 overflow-hidden",
        !newsEvent.image && "bg-primary" // Fallback background color if no image
      )}>
        {newsEvent.image && (
          <img
            src={newsEvent.image}
            alt={newsEvent.title}
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>
      {/* Content - now 2/3 width */}
      <div className="p-4 flex flex-col flex-grow w-2/3 justify-between overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
            <CategoryIcon className="h-3 w-3 mr-1" />
            {newsEvent.category.charAt(0).toUpperCase() + newsEvent.category.slice(1)}
          </span>
          <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
            <CalendarDays className="h-3 w-3 mr-1" />
            {formattedDate}
          </span>
        </div>
        <h3 className="text-h4-mobile md:text-h4-desktop font-heading mb-2 text-foreground line-clamp-1"> {/* Larger title, single line */}
          {newsEvent.title}
        </h3>
        <p className="text-text-regular font-body text-gray-600 mb-4 flex-grow overflow-hidden line-clamp-2"> {/* Two lines for description */}
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