"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AdminHeader from '@/components/AdminHeader';
import AdminGalleryImageCard from '@/components/AdminGalleryImageCard';
import AdminAddImageDialog from '@/components/AdminAddImageDialog'; // Import the modified dialog
import { useGalleryImages } from '@/context/GalleryImageContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Filter, Image, LayoutGrid, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GalleryImage } from '@/data/galleryImages'; // Import GalleryImage interface

const filterItems = [
  { name: 'All Images', category: null, icon: LayoutGrid },
  { name: 'Fashion', category: 'fashion', icon: Image },
  { name: 'Events', category: 'event', icon: CalendarDays },
  { name: 'General', category: 'general', icon: LayoutGrid },
];

const AdminGallery = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const { galleryImages, deleteGalleryImage, addGalleryImage, updateGalleryImage } = useGalleryImages();
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null); // State to hold the image being edited

  const filteredImages = React.useMemo(() => {
    if (!categoryFilter) {
      return galleryImages;
    }
    return galleryImages.filter(image => image.category === categoryFilter);
  }, [categoryFilter, galleryImages]);

  const handleAddImageClick = () => {
    setEditingImage(null); // Ensure we're in "add" mode
    setIsAddImageDialogOpen(true);
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image); // Set the image to be edited
    setIsAddImageDialogOpen(true);
  };

  const handleSaveImage = (image: GalleryImage) => {
    if (editingImage) {
      updateGalleryImage(image); // Update existing image
    } else {
      addGalleryImage(image); // Add new image
    }
    setIsAddImageDialogOpen(false); // Close dialog after saving
    setEditingImage(null); // Reset editing state
  };

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = React.useState(false);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenFilterDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsFilterDropdownOpen(true);
  };

  const handleCloseFilterDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsFilterDropdownOpen(false);
    }, 150);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader pageTitle="Image Gallery" />
      
      <div className="bg-background border-b border-border p-6 md:p-8 lg:p-10 flex items-center justify-between">
        <h3 className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
          Our Gallery
        </h3>
        <DropdownMenu open={isFilterDropdownOpen} onOpenChange={setIsFilterDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="px-4 py-2 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onMouseEnter={handleOpenFilterDropdown}
              onMouseLeave={handleCloseFilterDropdown}
            >
              Filter <Filter className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 p-1 bg-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-300"
            align="end"
            sideOffset={10}
            alignOffset={-5}
            onMouseEnter={handleOpenFilterDropdown}
            onMouseLeave={handleCloseFilterDropdown}
          >
            {filterItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm w-full justify-start",
                      categoryFilter === item.category ? "text-primary" : "text-foreground"
                    )}
                    onClick={() => {
                      if (item.category) {
                        window.location.href = `/admin-dashboard/gallery?category=${item.category}`;
                      } else {
                        window.location.href = `/admin-dashboard/gallery`;
                      }
                      setIsFilterDropdownOpen(false);
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Button>
                </DropdownMenuItem>
                {index < filterItems.length - 1 && <DropdownMenuSeparator className="my-1" />}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 p-6 md:p-8 lg:p-10 bg-gray-50">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 text-foreground text-center">
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Images` : 'All Gallery Images'}
          </h2>
        </AnimateOnScroll>
        
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredImages.map((image, index) => (
              <AnimateOnScroll key={image.id} delay={200 + index * 50}>
                <AdminGalleryImageCard image={image} onDelete={deleteGalleryImage} onEdit={handleEditImage} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              No images found for this category.
            </p>
          </AnimateOnScroll>
        )}
      </div>

      <AdminAddImageDialog
        open={isAddImageDialogOpen}
        onOpenChange={setIsAddImageDialogOpen}
        editingImage={editingImage}
        onSave={handleSaveImage}
      />
    </div>
  );
};
export default AdminGallery;