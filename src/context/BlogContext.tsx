"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { initialBlogs, Blog } from '@/data/blogs';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client
import { toast } from 'sonner'; // Import toast for notifications

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Blog) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  updateBlog: (updatedBlog: Blog) => Promise<void>;
  loading: boolean; // Add loading state
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from Supabase on initial load
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('date', { ascending: false }); // Order by date, newest first

      if (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs.');
        setBlogs(initialBlogs); // Fallback to initial data if Supabase fails
      } else {
        setBlogs(data as Blog[]);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const addBlog = async (blog: Blog) => {
    // Ensure the ID is unique for Supabase
    const blogToInsert = { ...blog, id: blog.id || `blog-${Date.now()}` };
    const { data, error } = await supabase
      .from('blogs')
      .insert([blogToInsert])
      .select(); // Select the inserted data to get any default values/timestamps

    if (error) {
      console.error('Error adding blog:', error);
      toast.error('Failed to add blog.');
    } else if (data && data.length > 0) {
      setBlogs(prevBlogs => [...prevBlogs, data[0]]);
      toast.success('Blog added successfully!');
    }
  };

  const deleteBlog = async (id: string) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog.');
    } else {
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
      toast.success('Blog deleted successfully!');
    }
  };

  const updateBlog = async (updatedBlog: Blog) => {
    const { data, error } = await supabase
      .from('blogs')
      .update(updatedBlog)
      .eq('id', updatedBlog.id)
      .select(); // Select the updated data

    if (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog.');
    } else if (data && data.length > 0) {
      setBlogs(prevBlogs =>
        prevBlogs.map(blog => (blog.id === updatedBlog.id ? data[0] : blog))
      );
      toast.success('Blog updated successfully!');
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, updateBlog, loading }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogs must be used within a BlogProvider');
  }
  return context;
};