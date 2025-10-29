"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useBlogs } from '@/context/BlogContext';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Blog } from '@/data/blogs'; // Import Blog interface
import AnimateOnScroll from './AnimateOnScroll'; // Added missing import

// Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  author: z.string().min(2, { message: 'Your name must be at least 2 characters.' }),
  date: z.date({ required_error: 'A date is required.' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters.' }),
  imageFile: z.any().optional(), // File object is optional
});

const StudentWriteBlogSection = () => {
  const { addBlog } = useBlogs();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      date: new Date(), // Default to today's date
      content: '',
      imageFile: undefined,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('imageFile', file);
      form.clearErrors('imageFile');
    } else {
      setImagePreview(null);
      form.setValue('imageFile', undefined);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Client-side validation passed:", values);
    toast.success("Blog post submitted for review!");
    form.reset();
    setImagePreview(null);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-muted text-foreground">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4 text-center">
            Write Your Blog
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-10 text-center">
            Share your thoughts, experiences, and creative insights with the Eyenet community!
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-md border border-gray-200">
            <Form {...form}> {/* Form context provider */}
              <form onSubmit={form.handleSubmit(onSubmit)} action="https://formspree.io/f/myzbeqer" method="POST" className="grid gap-6"> {/* Actual HTML form */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-regular font-body text-foreground">Blog Title:</FormLabel>
                      <FormControl>
                        <Input placeholder="Your amazing blog title" {...field} name="title" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-regular font-body text-foreground">Your Name:</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} name="author" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-text-regular font-body text-foreground">Date:</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {field.value && (
                        <input type="hidden" name="date" value={format(field.value, 'yyyy-MM-dd')} />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-regular font-body text-foreground">Blog Content:</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write your blog post here..." rows={10} {...field} name="content" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Image (Optional):</FormLabel>
                  <FormControl>
                    <Label htmlFor="blog-image-upload" className="flex flex-col items-center justify-center w-full h-48 border border-input bg-muted rounded-md cursor-pointer hover:bg-accent transition-colors">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Blog Post Preview" className="h-full w-full object-cover rounded-md" />
                      ) : (
                        <>
                          <ImagePlus className="h-8 w-8 mb-2 text-gray-500" />
                          <span className="text-text-regular font-body text-gray-600">Upload an image for your blog</span>
                        </>
                      )}
                      <Input
                        id="blog-image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                        name="imageFile"
                      />
                    </Label>
                  </FormControl>
                  {form.formState.errors.imageFile && <FormMessage>{form.formState.errors.imageFile.message?.toString()}</FormMessage>}
                  <p className="text-text-small text-red-500 mt-2">
                    <strong>Important:</strong> For the image to appear after adding, you must manually copy the selected image file (e.g., "{form.getValues('imageFile')?.name || 'your-image.png'}") into the `public/images` directory of your project.
                  </p>
                </FormItem>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 !text-white text-text-regular mt-4">
                  Submit Blog Post
                </Button>
              </form>
            </Form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default StudentWriteBlogSection;