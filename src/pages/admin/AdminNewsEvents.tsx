"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AdminHeader from '@/components/AdminHeader';
import AdminNewsEventCard from '@/components/AdminNewsEventCard';
import AdminAddNewsEventDialog from '@/components/AdminAddNewsEventDialog';
import { useNewsEvents } from '@/context/NewsEventsContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Filter, Newspaper, CalendarDays, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NewsEvent } from '@/data/newsEvents';
import LazyImage from '@/components/LazyImage'; // Import LazyImage

const filterItems = [
  { name: 'All Items', category: null, icon: LayoutGrid },
  { name: 'News', category: 'news', icon: Newspaper },
  { name: 'Events', category: 'event', icon: CalendarDays },
];

const AdminNewsEvents = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const { newsEvents, deleteNewsEvent, addNewsEvent, updateNewsEvent } = useNewsEvents();
  const [isAddNewsEventDialogOpen, setIsAddNewsEventDialogOpen] = useState(false);
  const [editingNewsEvent, setEditingNewsEvent] = useState<NewsEvent | null>(null);

  const filteredNewsEvents = React.useMemo(() => {
    if (!categoryFilter) {
      return newsEvents;
    }
    return newsEvents.filter(item => item.category === categoryFilter);
  }, [categoryFilter, newsEvents]);

  const handleAddNewsEventClick = () => {
    setEditingNewsEvent(null); // Ensure we're in "add" mode
    setIsAddNewsEventDialogOpen(true);
  };

  const handleEditNewsEvent = (newsEvent: NewsEvent) => {
    setEditingNewsEvent(newsEvent); // Set the item to be edited
    setIsAddNewsEventDialogOpen(true);
  };

  const handleSaveNewsEvent = (newsEvent: NewsEvent) => {
    if (editingNewsEvent) {
      updateNewsEvent(newsEvent); // Update existing item
    } else {
      addNewsEvent(newsEvent); // Add new item
    }
    setIsAddNewsEventDialogOpen(false); // Close dialog after saving
    setEditingNewsEvent(null); // Reset editing state
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
      <AdminHeader pageTitle="News & Events" />
      
      <div className="bg-background border-b border-border p-6 md:p-8 lg:p-10 flex items-center justify-between">
        <h3 className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
          News & Events
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
                        window.location.href = `/admin-dashboard/news-events?category=${item.category}`;
                      } else {
                        window.location.href = `/admin-dashboard/news-events`;
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
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}` : 'All'} Items
          </h2>
        </AnimateOnScroll>
        
        {filteredNewsEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredNewsEvents.map((item, index) => (
              <AnimateOnScroll key={item.id} delay={200 + index * 50}>
                <AdminNewsEventCard newsEvent={item} onDelete={deleteNewsEvent} onEdit={handleEditNewsEvent} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              No news or events found for this category.
            </p>
          </AnimateOnScroll>
        )}
      </div>

      <AdminAddNewsEventDialog
        open={isAddNewsEventDialogOpen}
        onOpenChange={setIsAddNewsEventDialogOpen}
        editingNewsEvent={editingNewsEvent}
        onSave={handleSaveNewsEvent}
      />
    </div>
  );
};
export default AdminNewsEvents;