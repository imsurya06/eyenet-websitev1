"use client";

import React from 'react';
import { useBlogs } from '@/context/BlogContext';
import AnimateOnScroll from './AnimateOnScroll';
import { BookOpen, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogsDisplaySection = () => {
  const { blogs } = useBlogs();

  // Sort blogs by date, newest first
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4 text-foreground text-center lg:text-left">
            Our Latest Blogs
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-16 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            Dive into our articles on design trends, student life, and industry insights.
          </p>
        </AnimateOnScroll>

        {sortedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBlogs.map((blog, index) => {
              const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <AnimateOnScroll key={blog.id} delay={300 + index * 100}>
                  <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    {blog.image && (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full border border-input">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Blog Post
                        </span>
                        <span className="text-text-small font-body text-gray-600">
                          {formattedDate}
                        </span>
                      </div>
                      <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground h-[4.9rem] overflow-hidden">
                        {blog.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-4 text-text-regular font-body text-gray-600">
                        <User2 className="h-4 w-4" />
                        <span>{blog.author}</span>
                      </div>
                      <p className="text-text-regular font-body text-gray-600 mb-6 flex-grow overflow-hidden">
                        {blog.content}
                      </p>
                      {/* Optional: Add a "Read More" link if you have individual blog pages */}
                      {/* <Link to={`/blogs/${blog.id}`} className="text-primary hover:underline text-text-regular font-body mt-auto">
                        Read More <ArrowRight className="ml-1 h-3 w-3 inline-block" />
                      </Link> */}
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        ) : (
          <AnimateOnScroll delay={300}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              No blog posts to display at the moment.
            </p>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
};

export default BlogsDisplaySection;