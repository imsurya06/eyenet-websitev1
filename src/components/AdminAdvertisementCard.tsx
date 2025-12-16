"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Advertisement } from '@/context/AdvertisementContext';
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
import { cn, truncateText } from '@/lib/utils';

interface AdminAdvertisementCardProps {
  advertisement: Advertisement;
  onDelete: (id: string) => void;
  onEdit: (ad: Advertisement) => void;
  onToggleActive: (id: string, currentStatus: boolean) => void;
}

const AdminAdvertisementCard: React.FC<AdminAdvertisementCardProps> = ({ advertisement, onDelete, onEdit, onToggleActive }) => {
  const truncatedDescription = truncateText(advertisement.description || '', 100);
  const isDescriptionTruncated = (advertisement.description?.length || 0) > 100;

  return (
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      <div className="w-full h-48 overflow-hidden relative">
        <img
          src={advertisement.image_url || '/public/placeholder.svg'}
          alt={advertisement.title}
          className="w-full h-full object-cover object-top"
        />
        <span className={cn(
          "absolute top-2 left-2 px-3 py-1 rounded-full text-text-tiny font-body border",
          advertisement.is_active
            ? "bg-green-100 text-green-700 border-green-300"
            : "bg-yellow-100 text-yellow-700 border-yellow-300"
        )}>
          {advertisement.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-2 text-foreground h-[2.8rem] overflow-hidden">
          {advertisement.title}
        </h3>
        <p className="text-text-regular font-body text-gray-600 mb-4 h-[4.8rem] overflow-hidden">
          {truncatedDescription}
          {isDescriptionTruncated && (
            <span className="text-primary ml-1">...</span>
          )}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant={advertisement.is_active ? "secondary" : "default"}
            size="sm"
            className={cn(
              "flex-1",
              advertisement.is_active
                ? "border-primary text-primary hover:bg-primary/10"
                : "bg-green-600 hover:bg-green-700 text-white"
            )}
            onClick={() => onToggleActive(advertisement.id, advertisement.is_active)}
          >
            {advertisement.is_active ? <X className="h-4 w-4 mr-2" /> : <Check className="h-4 w-4 mr-2" />}
            {advertisement.is_active ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
            onClick={() => onEdit(advertisement)}
          >
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  advertisement "{advertisement.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(advertisement.id)}>
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

export default AdminAdvertisementCard;