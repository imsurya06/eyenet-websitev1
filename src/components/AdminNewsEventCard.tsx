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
import { Link } from 'react-router-dom'; // Import Link
import { truncateText } from '@/lib/utils'; // Import truncateText

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
  const truncatedDescription = truncateText(newsEvent.description, 150);
  const isDescriptionTruncated = newsEvent.description.length > 150;

  return (
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      {newsEvent.image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={newsEvent.image}
            alt={newsEvent.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
            <CategoryIcon className="h-3 w-3 mr-1" />
            {newsEvent.category.charAt(0).toUpperCase() + newsEvent.category.slice(1)}
          </span>
          <span className="text-text-small font-body text-gray-600">
            {formattedDate}
          </span>
        </div>
        <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-2 text-foreground h-[2.8rem] overflow-hidden">
          {newsEvent.title}
        </h3>
        <p className="text-text-regular font-body text-gray-600 mb-4 h-[4.8rem] overflow-hidden">
          {truncatedDescription}
          {isDescriptionTruncated && (
            <Link to="/explore/news-events" className="text-primary hover:underline ml-1">
              Read More
            </Link>
          )}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
            onClick={() => onEdit(newsEvent)}
          >
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90 !text-white"
              >
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