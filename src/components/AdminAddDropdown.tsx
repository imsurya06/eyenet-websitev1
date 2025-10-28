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
import { Plus, ListChecks, LayoutGrid, Home, Newspaper, BookOpen, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import AdminAddCourseDialog from './AdminAddCourseDialog';
import AdminAddImageDialog from './AdminAddImageDialog';
import AdminAddInfrastructureImageDialog from './AdminAddInfrastructureImageDialog';
import AdminAddNewsEventDialog from './AdminAddNewsEventDialog';
import { useCourses } from '@/context/CourseContext';
import { useGalleryImages } from '@/context/GalleryImageContext';
import { useInfrastructureImages } from '@/context/InfrastructureImageContext';
import { useNewsEvents } from '@/context/NewsEventsContext';
import { toast } from 'sonner';

const dropdownItems = [
  { name: 'Blogs', href: '/admin-dashboard/blogs', icon: BookOpen },
];

const AdminAddDropdown = () => {
  const { addCourse } = useCourses(); // Correctly call hook at top level
  const { addGalleryImage } = useGalleryImages(); // Correctly call hook at top level
  const { addInfrastructureImage } = useInfrastructureImages(); // Correctly call hook at top level
  const { addNewsEvent } = useNewsEvents(); // Correctly call hook at top level

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = React.useState(false);
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = React.useState(false);
  const [isAddInfrastructureImageDialogOpen, setIsAddInfrastructureImageDialogOpen] = React.useState(false);
  const [isAddNewsEventDialogOpen, setIsAddNewsEventDialogOpen] = React.useState(false);
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
              <Building2 className="h-4 w-4" />
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

          {dropdownItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <DropdownMenuItem asChild className="cursor-pointer">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm",
                      isActive && "text-primary"
                    )
                  }
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              </DropdownMenuItem>
              {index < dropdownItems.length - 1 && <DropdownMenuSeparator className="my-1" />}
            </React.Fragment>
          ))}
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
    </>
  );
};

export default AdminAddDropdown;