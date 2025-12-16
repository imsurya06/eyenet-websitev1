"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export interface Advertisement {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

interface AdvertisementContextType {
  advertisements: Advertisement[];
  activeAdvertisement: Advertisement | null;
  addAdvertisement: (ad: Omit<Advertisement, 'id' | 'created_at' | 'is_active'>) => Promise<void>;
  updateAdvertisement: (updatedAd: Advertisement) => Promise<void>;
  deleteAdvertisement: (id: string) => Promise<void>;
  loading: boolean;
}

const AdvertisementContext = createContext<AdvertisementContextType | undefined>(undefined);

export const AdvertisementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [activeAdvertisement, setActiveAdvertisement] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching advertisements:', error);
        toast.error('Failed to load advertisements.');
      } else {
        setAdvertisements(data as Advertisement[]);
        const activeAd = data.find(ad => ad.is_active);
        setActiveAdvertisement(activeAd || null);
      }
      setLoading(false);
    };

    fetchAdvertisements();
  }, []);

  const addAdvertisement = async (newAd: Omit<Advertisement, 'id' | 'created_at' | 'is_active'>) => {
    const adToInsert = { ...newAd, is_active: false }; // New ads are inactive by default
    const { data, error } = await supabase
      .from('advertisements')
      .insert([adToInsert])
      .select();

    if (error) {
      console.error('Error adding advertisement:', error);
      toast.error(`Failed to add advertisement: ${error.message}`);
    } else if (data && data.length > 0) {
      setAdvertisements(prev => [data[0], ...prev]);
      toast.success('Advertisement added successfully!');
    }
  };

  const updateAdvertisement = async (updatedAd: Advertisement) => {
    const { data, error } = await supabase
      .from('advertisements')
      .update(updatedAd)
      .eq('id', updatedAd.id)
      .select();

    if (error) {
      console.error('Error updating advertisement:', error);
      toast.error(`Failed to update advertisement: ${error.message}`);
    } else if (data && data.length > 0) {
      setAdvertisements(prev =>
        prev.map(ad => (ad.id === updatedAd.id ? data[0] : ad))
      );
      if (data[0].is_active) {
        setActiveAdvertisement(data[0]);
      } else if (activeAdvertisement?.id === data[0].id) {
        setActiveAdvertisement(null);
      }
      toast.success('Advertisement updated successfully!');
    }
  };

  const deleteAdvertisement = async (id: string) => {
    const { error } = await supabase
      .from('advertisements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting advertisement:', error);
      toast.error(`Failed to delete advertisement: ${error.message}`);
    } else {
      setAdvertisements(prev => prev.filter(ad => ad.id !== id));
      if (activeAdvertisement?.id === id) {
        setActiveAdvertisement(null);
      }
      toast.success('Advertisement deleted successfully!');
    }
  };

  return (
    <AdvertisementContext.Provider value={{ advertisements, activeAdvertisement, addAdvertisement, updateAdvertisement, deleteAdvertisement, loading }}>
      {children}
    </AdvertisementContext.Provider>
  );
};

export const useAdvertisements = () => {
  const context = useContext(AdvertisementContext);
  if (context === undefined) {
    throw new Error('useAdvertisements must be used within an AdvertisementProvider');
  }
  return context;
};