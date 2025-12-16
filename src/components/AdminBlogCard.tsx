"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, BookOpen, User2 } from 'lucide-react';
import { Blog } from '@/data/blogs';
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

interface AdminBlogCardProps {
  blog: Blog;
  onDelete: (id: string) => void;
  onEdit: (blog: Blog) => void;
}

const AdminBlogCard: React.FC<AdminBlogCardProps> = ({ blog, onDelete, onEdit }) => {
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const truncatedContent = truncateText(blog.content, 150);
  const isContentTruncated = blog.content.length > 150;

  return (
    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      {blog.image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
            <BookOpen className="h-3 w-3 mr-1" />
            Blog Post
          </span>
          <span className="text-text-small font-body text-gray-600">
            {formattedDate}
          </span>
        </div>
        <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-2 text-foreground h-[2.8rem] overflow-hidden">
          {blog.title}
        </h3>
        <div className="flex items-center gap-1 mb-4 text-text-small font-body text-gray-600">
          <User2 className="h-3 w-3" />
          <span>{blog.author}</span>
        </div>
        <p className="text-text-regular font-body text-gray-600 mb-4 h-[4.8rem] overflow-hidden">
          {truncatedContent}
          {isContentTruncated && (
            <Link to="/blogs" className="text-primary hover:underline ml-1">
              Read More
            </Link>
          )}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
            onClick={() => onEdit(blog)}
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
                  "{blog.title}" blog post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(blog.id)}>
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

export default AdminBlogCard;