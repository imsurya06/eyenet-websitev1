"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Course } from '@/data/courses';
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

interface AdminCourseCardProps {
  course: Course;
  onDelete: (id: string) => void;
  onEdit: (course: Course) => void;
}

const AdminCourseCard: React.FC<AdminCourseCardProps> = ({ course, onDelete, onEdit }) => {
  const courseDetailPath = `/courses/${course.category === 'fashion' ? 'fashion-design' : 'computer-courses'}/${course.id}`;
  const truncatedDescription = course.description.split(' Details...')[0];
  const isDescriptionTruncated = truncatedDescription.length < course.description.length;

  return (
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      <Link to={courseDetailPath} className="block group"> {/* Make the entire image area clickable */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <span className="inline-block bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full mb-4 border border-input">
          {course.tag} / {course.category === 'fashion' ? 'Fashion' : 'Computer'}
        </span>
        <Link to={courseDetailPath} className="block group"> {/* Make title clickable */}
          <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground h-[7rem] line-clamp-3 overflow-hidden group-hover:text-primary transition-colors"> {/* Increased height to h-[7rem] */}
            {course.title}
          </h3>
        </Link>
        <p className="text-text-regular font-body text-gray-600 mb-6 h-[6.4rem] line-clamp-3 overflow-hidden">
          {truncatedDescription}
          {isDescriptionTruncated && (
            <Link to={courseDetailPath} className="text-primary hover:underline ml-1">
              more...
            </Link>
          )}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
            onClick={() => onEdit(course)}
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
                  "{course.title}" course from all pages.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(course.id)}>
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

export default AdminCourseCard;