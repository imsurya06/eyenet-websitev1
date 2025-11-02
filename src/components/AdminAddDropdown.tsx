"use client";

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Plus, ListChecks, LayoutGrid, Home, Newspaper, BookOpen, MessageSquareText } from 'lucide-react'; // Import MessageSquareText
import { cn } from '@/lib/utils';
import AdminAddCourseDialog from './AdminAddCourseDialog';
import AdminAddImageDialog from './AdminAddImageDialog';
import AdminAddInfrastructureImageDialog from './AdminAddInfrastructureImageDialog';
import AdminAddNewsEventDialog from './AdminAddNewsEventDialog';
import AdminAddBlogDialog from './AdminAddBlogDialog';
import AdminAddTestimonialDialog from './AdminAddTestimonialDialog'; // Import the new dialog component
import { useCourses } from '@/context/CourseContext';
import { useGalleryImages } from '@/context/GalleryImageContext';
import { useInfrastructureImages } from '@/context/InfrastructureImageContext';
import { useNewsEvents } from '@/context/NewsEventsContext';
import { useBlogs } from '@/context/BlogContext';
import { useTestimonials } from '@/context/TestimonialContext'; // Import TestimonialContext
import { toast } from 'sonner';

const AdminAddDropdown = () => {
  const { addCourse } = useCourses();
  const { addGalleryImage } = useGalleryImages();
  const { addInfrastructureImage } = useInfrastructureImages();
  const { addNewsEvent } = useNewsEvents();
  const { addBlog } = useBlogs();
  const { addTestimonial } = useTestimonials(); // Use the addTestimonial function from context

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = React.useState(false);
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = React.useState(false);
  const [isAddInfrastructureImageDialogOpen, setIsAddInfrastructureImageDialogOpen] = React.useState(false);
  const [isAddNewsEventDialogOpen, setIsAddNewsEventDialogOpen] = React.useState(false);
  const [isAddBlogDialogOpen, setIsAddBlogDialogOpen] = React.useState(false);
  const [isAddTestimonialDialogOpen, setIsAddTestimonialDialogOpen] = React.useState(false); // New state for testimonial dialog
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const handleAddCourseClick = () => {
    setIsAddCourseDialogOpen(true);
    setIsDropdownOpen(false);
  };

  const handleAddImageClick = () => {
    setIsAddImageDialogOpen(true);
    setIsDropdownOpen(false);
  };

  const handleAddInfrastructureImageClick = () => {
    setIsAddInfrastructureImageDialogOpen(true);
    setIsDropdownOpen(false);
  };

  const handleAddNewsEventClick = () => {
    setIsAddNewsEventDialogOpen(true);
    setIsDropdownOpen(false);
  };

  const handleAddBlogClick = () => {
    setIsAddBlogDialogOpen(true);
    setIsDropdownOpen(false);
  };

  const handleAddTestimonialClick = () => { // New handler for testimonial dialog
    setIsAddTestimonialDialogOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-primary hover:bg-primary/90 px-6 py-3 text-text-regular rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] !text-white"
            onMouseEnter={handleOpenDropdown}
            onMouseLeave={handleCloseDropdown}
          >
            Add <Plus className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 p-1 bg-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-300"
          align="end"
          sideOffset={10}
          alignOffset={-5}
          onMouseEnter={handleOpenDropdown}
          onMouseLeave={handleCloseDropdown}
        >
          <DropdownMenuItem asChild className="cursor-pointer">
            <div
              className="flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm"
              onClick={handleAddCourseClick}
            >
              <ListChecks className="h-4 w-4" />
              <span>Courses</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem asChild className="cursor-pointer">
            <div
              className="flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm"
              onClick={handleAddImageClick}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Gallery</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem asChild className="cursor-pointer">
            <div
              className="flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm"
              onClick={handleAddInfrastructureImageClick}
            >
              <Home className="h-4 w-4" />
              <span>Infrastructure</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem asChild className="cursor-pointer">
            <div
              className="flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm"
              onClick={handleAddNewsEventClick}
            >
              <Newspaper className="h-4 w-4" />
              <span>News & Events</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem asChild className="cursor-pointer">
            <div
              className="flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm"
              onClick={handleAddBlogClick}
            >
              <BookOpen className="h-4 w-4" />
              <span>Blogs</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />

          {/* New "Testimonials" item to open the dialog */}
          <DropdownMenuItem asChild className="cursor-pointer">
            <div
              className="flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm"
              onClick={handleAddTestimonialClick}
            >
              <MessageSquareText className="h-4 w-4" />
              <span>Testimonials</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminAddCourseDialog
        open={isAddCourseDialogOpen}
        onOpenChange={setIsAddCourseDialogOpen}
        editingCourse={null}
        onSave={(course) => {
          addCourse(course);
          toast.success(`Course "${course.title}" added successfully!`);
        }}
      />
      <AdminAddImageDialog
        open={isAddImageDialogOpen}
        onOpenChange={setIsAddImageDialogOpen}
        editingImage={null}
        onSave={(image) => {
          addGalleryImage(image);
          toast.success(`Image "${image.alt}" added to gallery!`);
        }}
      />
      <AdminAddInfrastructureImageDialog
        open={isAddInfrastructureImageDialogOpen}
        onOpenChange={setIsAddInfrastructureImageDialogOpen}
        editingImage={null}
        onSave={(image) => {
          addInfrastructureImage(image);
          toast.success(`Infrastructure image "${image.alt}" added!`);
        }}
      />
      <AdminAddNewsEventDialog
        open={isAddNewsEventDialogOpen}
        onOpenChange={setIsAddNewsEventDialogOpen}
        editingNewsEvent={null}
        onSave={(newsEvent) => {
          addNewsEvent(newsEvent);
          toast.success(`News/Event "${newsEvent.title}" added successfully!`);
        }}
      />
      <AdminAddBlogDialog
        open={isAddBlogDialogOpen}
        onOpenChange={setIsAddBlogDialogOpen}
        editingBlog={null}
        onSave={(blog) => {
          addBlog(blog);
          toast.success(`Blog "${blog.title}" added successfully!`);
        }}
      />
      <AdminAddTestimonialDialog
        open={isAddTestimonialDialogOpen}
        onOpenChange={setIsAddTestimonialDialogOpen}
        editingTestimonial={null} // Always null when opened from "Add" dropdown
        onSave={(testimonial) => {
          addTestimonial(testimonial);
          toast.success(`Testimonial from "${testimonial.name}" added successfully!`);
        }}
      />
    </>
  );
};

export default AdminAddDropdown;