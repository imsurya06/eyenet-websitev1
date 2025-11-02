"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, User, Mail, MessageSquareText, CalendarDays } from 'lucide-react';
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

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface AdminMessageCardProps {
  message: ContactMessage;
  onDelete: (id: string) => void;
}

const AdminMessageCard: React.FC<AdminMessageCardProps> = ({ message, onDelete }) => {
  const formattedDate = new Date(message.created_at).toLocaleDateString('en-US', {
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
          Message from {message.name}
        </CardTitle>
        <div className="flex items-center text-text-small font-body text-gray-600 mt-1">
          <CalendarDays className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          <p className="flex items-center text-text-regular font-body text-gray-700">
            <Mail className="h-4 w-4 mr-2 text-primary" /> {message.email}
          </p>
          <p className="text-text-regular font-body text-gray-700 line-clamp-3">
            <MessageSquareText className="h-4 w-4 mr-2 text-primary inline-block align-text-bottom" /> {message.message}
          </p>
        </div>
        <div className="mt-auto">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Message
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  message from "{message.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(message.id)}>
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

export default AdminMessageCard;