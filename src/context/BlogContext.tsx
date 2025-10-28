"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { initialBlogs, Blog } from '@/data/blogs';

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Blog) => void;
  deleteBlog: (id: string) => void;
  updateBlog: (updatedBlog: Blog) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const addBlog = (blog: Blog) => {
    setBlogs(prevBlogs => [...prevBlogs, blog]);
  };

  const deleteBlog = (id: string) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
  };

  const updateBlog = (updatedBlog: Blog) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, updateBlog }}>
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