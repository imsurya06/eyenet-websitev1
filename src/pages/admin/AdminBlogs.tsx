"use client";
import React, { useState } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AdminHeader from '@/components/AdminHeader';
import AdminBlogCard from '@/components/AdminBlogCard';
import AdminAddBlogDialog from '@/components/AdminAddBlogDialog';
import { useBlogs } from '@/context/BlogContext';
import { Blog } from '@/data/blogs';

const AdminBlogs = () => {
  const { blogs, addBlog, deleteBlog, updateBlog } = useBlogs();
  const [isAddBlogDialogOpen, setIsAddBlogDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const handleAddBlogClick = () => {
    setEditingBlog(null); // Ensure we're in "add" mode
    setIsAddBlogDialogOpen(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog); // Set the blog to be edited
    setIsAddBlogDialogOpen(true);
  };

  const handleSaveBlog = (blog: Blog) => {
    if (editingBlog) {
      updateBlog(blog); // Update existing blog
    } else {
      addBlog(blog); // Add new blog
    }
    setIsAddBlogDialogOpen(false); // Close dialog after saving
    setEditingBlog(null); // Reset editing state
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader pageTitle="Blogs" />
      <div className="flex-1 p-6 md:p-8 lg:p-10 bg-gray-50">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 text-foreground text-center">
            Manage Blog Posts
          </h2>
        </AnimateOnScroll>
        
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogs.map((blog, index) => (
              <AnimateOnScroll key={blog.id} delay={200 + index * 50}>
                <AdminBlogCard blog={blog} onDelete={deleteBlog} onEdit={handleEditBlog} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              No blog posts found.
            </p>
          </AnimateOnScroll>
        )}
      </div>

      <AdminAddBlogDialog
        open={isAddBlogDialogOpen}
        onOpenChange={setIsAddBlogDialogOpen}
        editingBlog={editingBlog}
        onSave={handleSaveBlog}
      />
    </div>
  );
};
export default AdminBlogs;