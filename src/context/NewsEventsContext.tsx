"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { initialNewsEvents, NewsEvent } from '@/data/newsEvents';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client
import { toast } from 'sonner'; // Import toast for notifications

interface NewsEventsContextType {
  newsEvents: NewsEvent[];
  addNewsEvent: (newsEvent: NewsEvent) => Promise<void>;
  deleteNewsEvent: (id: string) => Promise<void>;
  updateNewsEvent: (updatedNewsEvent: NewsEvent) => Promise<void>;
  loading: boolean; // Add loading state
}

const NewsEventsContext = createContext<NewsEventsContextType | undefined>(undefined);

export const NewsEventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch news events from Supabase on initial load
  useEffect(() => {
    const fetchNewsEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_events') // Changed table name to 'news_events'
        .select('*')
        .order('date', { ascending: false }); // Order by date, newest first

      if (error) {
        console.error('Error fetching news events:', error);
        toast.error('Failed to load news and events.');
        setNewsEvents(initialNewsEvents); // Fallback to initial data if Supabase fails
      } else {
        setNewsEvents(data as NewsEvent[]);
      }
      setLoading(false);
    };

    fetchNewsEvents();
  }, []);

  const addNewsEvent = async (newsEvent: NewsEvent) => {
    // Ensure the ID is unique for Supabase
    const newsEventToInsert = { ...newsEvent, id: newsEvent.id || `news-event-${Date.now()}` };
    const { data, error } = await supabase
      .from('news_events') // Changed table name to 'news_events'
      .insert([newsEventToInsert])
      .select(); // Select the inserted data to get any default values/timestamps

    if (error) {
      console.error('Error adding news event:', error);
      toast.error('Failed to add news or event.');
    } else if (data && data.length > 0) {
      setNewsEvents(prevNewsEvents => [...prevNewsEvents, data[0]]);
      toast.success('News/Event added successfully!');
    }
  };

  const deleteNewsEvent = async (id: string) => {
    const { error } = await supabase
      .from('news_events') // Changed table name to 'news_events'
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting news event:', error);
      toast.error('Failed to delete news or event.');
    } else {
      setNewsEvents(prevNewsEvents => prevNewsEvents.filter(newsEvent => newsEvent.id !== id));
      toast.success('News/Event deleted successfully!');
    }
  };

  const updateNewsEvent = async (updatedNewsEvent: NewsEvent) => {
    const { data, error } = await supabase
      .from('news_events') // Changed table name to 'news_events'
      .update(updatedNewsEvent)
      .eq('id', updatedNewsEvent.id)
      .select(); // Select the updated data

    if (error) {
      console.error('Error updating news event:', error);
      toast.error('Failed to update news or event.');
    } else if (data && data.length > 0) {
      setNewsEvents(prevNewsEvents =>
        prevNewsEvents.map(newsEvent => (newsEvent.id === updatedNewsEvent.id ? data[0] : newsEvent))
      );
      toast.success('News/Event updated successfully!');
    }
  };

  return (
    <NewsEventsContext.Provider value={{ newsEvents, addNewsEvent, deleteNewsEvent, updateNewsEvent, loading }}>
      {children}
    </NewsEventsContext.Provider>
  );
};

export const useNewsEvents = () => {
  const context = useContext(NewsEventsContext);
  if (context === undefined) {
    throw new Error('useNewsEvents must be used within a NewsEventsProvider');
  }
  return context;
};