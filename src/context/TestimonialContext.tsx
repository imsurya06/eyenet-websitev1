"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  quote: string;
  approved: boolean; // Added approved status
  created_at: string;
}

interface TestimonialContextType {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'approved'>) => Promise<void>;
  updateTestimonial: (updatedTestimonial: Testimonial) => Promise<void>; // Added update function
  deleteTestimonial: (id: string) => Promise<void>; // Added delete function
  loading: boolean;
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

export const TestimonialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        toast.error('Failed to load testimonials.');
      } else {
        setTestimonials(data as Testimonial[]);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  const addTestimonial = async (newTestimonial: Omit<Testimonial, 'id' | 'created_at' | 'approved'>) => {
    const testimonialToInsert = { ...newTestimonial, approved: false }; // Default to not approved
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonialToInsert])
      .select();

    if (error) {
      console.error('Error adding testimonial:', error);
      toast.error(`Failed to submit testimonial: ${error.message}`);
    } else if (data && data.length > 0) {
      setTestimonials(prev => [data[0], ...prev]);
      toast.success('Testimonial submitted successfully!');
    }
  };

  const updateTestimonial = async (updatedTestimonial: Testimonial) => {
    const { data, error } = await supabase
      .from('testimonials')
      .update(updatedTestimonial)
      .eq('id', updatedTestimonial.id)
      .select();

    if (error) {
      console.error('Error updating testimonial:', error);
      toast.error(`Failed to update testimonial: ${error.message}`);
    } else if (data && data.length > 0) {
      setTestimonials(prev =>
        prev.map(t => (t.id === updatedTestimonial.id ? data[0] : t))
      );
      toast.success('Testimonial updated successfully!');
    }
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      toast.error(`Failed to delete testimonial: ${error.message}`);
    } else {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      toast.success('Testimonial deleted successfully!');
    }
  };

  return (
    <TestimonialContext.Provider value={{ testimonials, addTestimonial, updateTestimonial, deleteTestimonial, loading }}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonials = () => {
  const context = useContext(TestimonialContext);
  if (context === undefined) {
    throw new Error('useTestimonials must be used within a TestimonialProvider');
  }
  return context;
};