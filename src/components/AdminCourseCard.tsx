"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Course } from '@/data/courses'; // Import the Course interface

interface AdminCourseCardProps {
  course: Course;
}

const AdminCourseCard: React.FC<AdminCourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="inline-block bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full mb-4 border border-input">
          {course.tag} / {course.category === 'fashion' ? 'Fashion' : 'Computer'}
        </span>
        <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground h-[4.9rem] overflow-hidden">
          {course.title}
        </h3>
        <p className="text-text-regular font-body text-gray-600 mb-6 h-[6.4rem] overflow-hidden">
          {course.description.split('Details...')[0]}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <Button variant="outline" size="sm" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" size="sm" className="flex-1">
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseCard;