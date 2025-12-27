"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, GraduationCap, Award } from 'lucide-react';
import { Faculty } from '@/data/faculty';
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

interface AdminFacultyCardProps {
  faculty: Faculty;
  onDelete: (id: string) => void;
  onEdit: (faculty: Faculty) => void;
}

const AdminFacultyCard: React.FC<AdminFacultyCardProps> = ({ faculty, onDelete, onEdit }) => {
  const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000; // Two weeks in milliseconds
  const createdAtDate = new Date(faculty.created_at);
  const isNewFaculty = (new Date().getTime() - createdAtDate.getTime()) < twoWeeksInMs;

  return (
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      <div className="w-full h-48 overflow-hidden relative">
        <img
          src={faculty.image || '/public/placeholder.svg'}
          alt={faculty.name}
          className="w-full h-full object-contain"
        />
        {/* New Tag for Faculty Image - conditionally rendered */}
        {isNewFaculty && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-text-tiny font-body px-2 py-1 rounded-full">
            New Faculty
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-2 text-foreground h-[2.8rem] overflow-hidden">
          {faculty.name}
        </h3>
        <div className="flex items-center gap-1 mb-1 text-text-small font-body text-gray-600">
          <GraduationCap className="h-3 w-3" />
          <span>{faculty.qualification}</span>
        </div>
        {faculty.achievements && (
          <div className="flex items-center gap-1 mb-4 text-text-small font-body text-gray-600">
            <Award className="h-3 w-3" />
            <span>{faculty.achievements}</span>
          </div>
        )}
        <p className="text-text-regular font-body text-gray-600 mb-4 h-[4.8rem] overflow-hidden">
          {faculty.description}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
            onClick={() => onEdit(faculty)}
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
                  faculty member "{faculty.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(faculty.id)}>
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

export default AdminFacultyCard;