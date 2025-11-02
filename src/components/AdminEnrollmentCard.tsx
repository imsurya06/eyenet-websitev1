"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, User, Mail, Phone, BookOpen, CalendarDays } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Admission {
  id: string;
  name: string;
  email: string;
  mobile: string;
  program: string;
  terms: boolean;
  created_at: string;
}

interface AdminEnrollmentCardProps {
  enrollment: Admission;
  onDelete: (id: string) => void;
}

const AdminEnrollmentCard: React.FC<AdminEnrollmentCardProps> = ({ enrollment, onDelete }) => {
  const formattedDate = new Date(enrollment.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="bg-white shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-h6-mobile md:text-h6-desktop font-heading text-foreground">
          {enrollment.name}
        </CardTitle>
        <div className="flex items-center text-text-small font-body text-gray-600 mt-1">
          <CalendarDays className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          <p className="flex items-center text-text-regular font-body text-gray-700">
            <Mail className="h-4 w-4 mr-2 text-primary" /> {enrollment.email}
          </p>
          <p className="flex items-center text-text-regular font-body text-gray-700">
            <Phone className="h-4 w-4 mr-2 text-primary" /> {enrollment.mobile}
          </p>
          <p className="flex items-center text-text-regular font-body text-gray-700">
            <BookOpen className="h-4 w-4 mr-2 text-primary" /> {enrollment.program}
          </p>
          <p className="text-text-small font-body text-gray-600">
            Terms Accepted: {enrollment.terms ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="mt-auto">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Enrollment
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  enrollment for "{enrollment.name}" in "{enrollment.program}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(enrollment.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminEnrollmentCard;