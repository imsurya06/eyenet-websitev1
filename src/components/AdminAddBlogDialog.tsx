"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Blog } from '@/data/blogs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client

interface AdminAddBlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingBlog: Blog | null;
  onSave: (blog: Blog) => void;
}

// Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  author: z.string().min(2, { message: 'Author name must be at least 2 characters.' }),
  date: z.date({ required_error: 'A date is required.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
  imageFile: z.any().optional(), // File object is optional for editing
});

const AdminAddBlogDialog: React.FC<AdminAddBlogDialogProps> = ({ open, onOpenChange, editingBlog, onSave }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      date: undefined,
      content: '',
      imageFile: undefined,
    },
  });

  useEffect(() => {
    if (open && editingBlog) {
      form.reset({
        title: editingBlog.title,
        author: editingBlog.author,
        date: new Date(editingBlog.date),
        content: editingBlog.content,
        imageFile: undefined,
      });
      setImagePreview(editingBlog.image || null);
    } else if (open && !editingBlog) {
      form.reset({
        title: '',
        author: '',
        date: undefined,
        content: '',
        imageFile: undefined,
      });
      setImagePreview(null);
    }
  }, [open, editingBlog, form]);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let imageUrl = editingBlog?.image || undefined;

    // Upload image file if a new one is selected
    if (values.imageFile) {
      const file = values.imageFile;
      const filePath = `images/${Date.now()}-${file.name}`;
      try {
        const { data, error } = await supabase.storage.from('images').upload(filePath, file);
        if (error) {
          console.error("Supabase upload error:", error); // Log the full error object
          throw error;
        }
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      } catch (error: any) {
        console.error("Caught upload error in AdminAddBlogDialog:", error); // Log the full caught error
        toast.error(`Failed to upload image: ${error.message || 'Unknown error'}`);
        return;
      }
    }

    const blogToSave: Blog = {
      id: editingBlog?.id || `blog-${Date.now()}`,
      title: values.title,
      author: values.author,
      date: format(values.date, 'yyyy-MM-dd'),
      content: values.content,
      image: imageUrl,
    };

    onSave(blogToSave);
    toast.success(`${editingBlog ? 'Blog updated' : 'Blog added'} successfully!`);
    form.reset();
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
            {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
          </DialogTitle>
          <DialogDescription className="text-text-regular font-body text-gray-600">
            {editingBlog ? 'Update the details of this blog post.' : 'Fill in the details to add a new blog post.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Title:</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog Post Title" {...field} />
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
                  <FormLabel className="text-text-regular font-body text-foreground">Author:</FormLabel>
                  <FormControl>
                    <Input placeholder="Author Name" {...field} />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Content:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Blog post content" rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-text-regular font-body text-foreground">Image (Optional):</FormLabel>
              <FormControl>
                <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border border-input bg-muted rounded-md cursor-pointer hover:bg-accent transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Blog Post Preview" className="h-full w-full object-cover object-top rounded-md" />
                  ) : (
                    <>
                      <ImagePlus className="h-8 w-8 mb-2 text-gray-500" />
                      <span className="text-text-regular font-body text-gray-600">Upload image</span>
                    </>
                  )}
                  <Input
                    id="image-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Label>
              </FormControl>
              {form.formState.errors.imageFile && <FormMessage>{form.formState.errors.imageFile.message?.toString()}</FormMessage>}
            </FormItem>

            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 !text-white text-text-regular">
                {editingBlog ? 'Save Changes' : 'Add Blog Post'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddBlogDialog;