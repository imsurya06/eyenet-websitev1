"use client";

import React, { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UploadCloud, ImagePlus } from 'lucide-react';
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
import { useCourses } from '@/context/CourseContext';
import { toast } from 'sonner';
import { Course } from '@/data/courses'; // Import Course interface

interface AdminAddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Zod schema for form validation
const formSchema = z.object({
  courseName: z.string().min(2, { message: 'Course Name must be at least 2 characters.' }),
  courseDescription: z.string().min(10, { message: 'Course Description must be at least 10 characters.' }),
  type: z.enum(['Course', 'Others'], { message: 'Please select a valid type.' }).default('Course'),
  courseMode: z.enum(['Offline', 'Online'], { message: 'Please select a course mode.' }).default('Offline'),
  courseGenre: z.enum(['computer', 'fashion'], { message: 'Please select a course genre.' }),
  brochureFile: z.any().optional(), // File object
  courseImage: z.any().optional(), // File object
});

const AdminAddCourseDialog: React.FC<AdminAddCourseDialogProps> = ({ open, onOpenChange }) => {
  const { addCourse } = useCourses();
  const [brochureFileName, setBrochureFileName] = useState<string | null>(null);
  const [courseImagePreview, setCourseImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
      courseDescription: '',
      type: 'Course',
      courseMode: 'Offline',
      courseGenre: undefined, // Must be explicitly set by user
      brochureFile: undefined,
      courseImage: undefined,
    },
  });

  const handleBrochureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBrochureFileName(file.name);
      form.setValue('brochureFile', file);
    } else {
      setBrochureFileName(null);
      form.setValue('brochureFile', undefined);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('courseImage', file);
    } else {
      setCourseImagePreview(null);
      form.setValue('courseImage', undefined);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simulate file upload and get URLs
    const brochureLink = values.brochureFile ? `/brochures/${values.brochureFile.name}` : '#';
    const imageUrl = values.courseImage ? `/images/${values.courseImage.name}` : '/public/placeholder.svg'; // Use a placeholder if no image

    const newCourse: Course = {
      id: `new-course-${Date.now()}`, // Unique ID
      image: imageUrl,
      tag: values.type,
      title: values.courseName,
      description: values.courseDescription + ' Details...', // Add 'Details...' for consistency
      brochureLink: brochureLink,
      enrollLink: '/admissions', // Default enroll link
      category: values.courseGenre,
      icon: values.courseGenre === 'fashion' ? ImagePlus : UploadCloud, // Assign a relevant icon
    };

    addCourse(newCourse);
    toast.success(`Course "${newCourse.title}" added successfully!`);
    form.reset();
    setBrochureFileName(null);
    setCourseImagePreview(null);
    onOpenChange(false); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
            Upload Course
          </DialogTitle>
          <DialogDescription className="text-text-regular font-body text-gray-600">
            Fill in the details to add a new course.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Course Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Course Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Course Description:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Course Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-text-regular font-body text-foreground">Type:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Course" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Course
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Others" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Others
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseMode"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-text-regular font-body text-foreground">Course mode:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Offline" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Offline
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Online" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Online
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseGenre"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-text-regular font-body text-foreground">Course Genre:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="computer" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Computer Course
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="fashion" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Fashion designing course
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-text-regular font-body text-foreground">Course Brochure:</FormLabel>
              <FormControl>
                <Label htmlFor="brochure-upload" className="flex items-center justify-center w-full h-12 px-4 py-2 text-text-regular border border-input bg-muted rounded-md cursor-pointer hover:bg-accent transition-colors">
                  <UploadCloud className="h-5 w-5 mr-2" />
                  {brochureFileName || 'Upload file'}
                  <Input
                    id="brochure-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleBrochureChange}
                  />
                </Label>
              </FormControl>
              {form.formState.errors.brochureFile && <FormMessage>{form.formState.errors.brochureFile.message?.toString()}</FormMessage>}
            </FormItem>

            <FormItem>
              <FormLabel className="text-text-regular font-body text-foreground">Course Image:</FormLabel>
              <FormControl>
                <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border border-input bg-muted rounded-md cursor-pointer hover:bg-accent transition-colors">
                  {courseImagePreview ? (
                    <img src={courseImagePreview} alt="Course Preview" className="h-full w-full object-cover rounded-md" />
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
              {form.formState.errors.courseImage && <FormMessage>{form.formState.errors.courseImage.message?.toString()}</FormMessage>}
            </FormItem>

            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-text-regular">
                Add Course
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddCourseDialog;