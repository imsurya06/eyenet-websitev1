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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UploadCloud, ImagePlus } from 'lucide-react';
import { useForm } => 'react-hook-form';
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
import { Course } from '@/data/courses';
import { supabase } from '@/lib/supabaseClient';

interface AdminAddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCourse: Course | null;
  onSave: (course: Course) => void;
}

// Zod schema for form validation
const formSchema = z.object({
  courseName: z.string().min(2, { message: 'Course Name must be at least 2 characters.' }),
  courseDescription: z.string().min(10, { message: 'Course Description must be at least 10 characters.' }),
  type: z.enum(['Course', 'Others'], { message: 'Please select a valid type.' }).default('Course'),
  courseMode: z.enum(['Offline', 'Online'], { message: 'Please select a course mode.' }).default('Offline'),
  courseGenre: z.enum(['computer', 'fashion', 'other'], { message: 'Please select a course genre.' }), // Updated to include 'other'
  brochureFile: z.any()
    .refine((file) => !file || (file instanceof File && file.size <= 10 * 1024 * 1024), 'Brochure file size must be less than 10MB.')
    .optional(),
  courseImage: z.any()
    .refine((file) => !file || (file instanceof File && file.size <= 10 * 1024 * 1024), 'Image size must be less than 10MB.')
    .optional(),
  duration: z.string().min(1, { message: 'Duration is required.' }),
  eligibility: z.string().min(1, { message: 'Eligibility is required.' }),
  learningOutcomesText: z.string().optional(),
  careerProspectsText: z.string().optional(),
  moduleTitlesText: z.string().optional(),
  moduleDescriptionsText: z.string().optional(), // New field for module descriptions
});

const AdminAddCourseDialog: React.FC<AdminAddCourseDialogProps> = ({ open, onOpenChange, editingCourse, onSave }) => {
  const [brochureFileName, setBrochureFileName] = useState<string | null>(null);
  const [courseImagePreview, setCourseImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
      courseDescription: '',
      type: 'Course',
      courseMode: 'Offline',
      courseGenre: undefined, // Keep as undefined to force selection for new courses
      brochureFile: undefined,
      courseImage: undefined,
      duration: '',
      eligibility: '',
      learningOutcomesText: '',
      careerProspectsText: '',
      moduleTitlesText: '',
      moduleDescriptionsText: '', // Default value for new field
    },
  });

  useEffect(() => {
    if (open && editingCourse) {
      try {
        form.reset({
          courseName: editingCourse.title,
          courseDescription: editingCourse.description.replace(' Details...', ''),
          type: editingCourse.tag as 'Course' | 'Others',
          courseMode: editingCourse.enrollLink.includes('online') ? 'Online' : 'Offline',
          courseGenre: editingCourse.category || 'fashion', // Provide a default if null/undefined
          brochureFile: undefined,
          courseImage: undefined,
          duration: editingCourse.duration,
          eligibility: editingCourse.eligibility,
          learningOutcomesText: (editingCourse.learningOutcomes || []).join('\n'), // Fallback to empty array
          careerProspectsText: (editingCourse.careerProspects || []).join('\n'), // Fallback to empty array
          moduleTitlesText: (editingCourse.modules || []).map(m => m.title).join('\n'), // Fallback to empty array
          moduleDescriptionsText: (editingCourse.modules || []).map(m => m.description).join('\n'), // Pre-fill module descriptions
        });
        setBrochureFileName(editingCourse.brochureLink !== '#' ? editingCourse.brochureLink.split('/').pop() || null : null);
        setCourseImagePreview(editingCourse.image !== '/public/placeholder.svg' ? editingCourse.image : null);
      } catch (e) {
        console.error("Error resetting form for editing course:", e);
        toast.error("Failed to load course for editing. Please check console for details.");
        onOpenChange(false); // Close dialog to prevent being stuck
      }
    } else if (open && !editingCourse) {
      // Reset to default values for adding a new course
      form.reset();
      setBrochureFileName(null);
      setCourseImagePreview(null);
    }
  }, [open, editingCourse, form, onOpenChange]);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let brochureLink = editingCourse?.brochureLink || '#';
    let imageUrl = editingCourse?.image || '/placeholder.svg';

    // Upload brochure file if a new one is selected
    if (values.brochureFile) {
      const file = values.brochureFile;
      const filePath = `brochures/${Date.now()}-${file.name}`;
      try {
        const { data, error } = await supabase.storage.from('brochures').upload(filePath, file);
        if (error) {
          console.error("Supabase brochure upload error:", error);
          throw error;
        }
        const { data: publicUrlData } = supabase.storage.from('brochures').getPublicUrl(filePath);
        brochureLink = publicUrlData.publicUrl;
      } catch (error: any) {
        toast.error(`Failed to upload brochure: ${error.message}`);
        return;
      }
    }

    // Upload course image if a new one is selected
    if (values.courseImage) {
      const file = values.courseImage;
      const filePath = `images/${Date.now()}-${file.name}`;
      try {
        const { data, error } = await supabase.storage.from('images').upload(filePath, file);
        if (error) {
          console.error("Supabase image upload error:", error);
          throw error;
        }
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      } catch (error: any) {
        toast.error(`Failed to upload course image: ${error.message}`);
        return;
      }
    }

    const learningOutcomes = values.learningOutcomesText ? values.learningOutcomesText.split('\n').map(s => s.trim()).filter(s => s.length > 0) : [];
    const careerProspects = values.careerProspectsText ? values.careerProspectsText.split('\n').map(s => s.trim()).filter(s => s.length > 0) : [];
    
    const moduleTitles = values.moduleTitlesText ? values.moduleTitlesText.split('\n').map(s => s.trim()).filter(s => s.length > 0) : [];
    const moduleDescriptions = values.moduleDescriptionsText ? values.moduleDescriptionsText.split('\n').map(s => s.trim()).filter(s => s.length > 0) : [];

    const modules = moduleTitles.map((title, index) => ({
      title,
      description: moduleDescriptions[index] || `Detailed content for ${title}.`, // Fallback if description is missing
    }));

    const courseToSave: Course = {
      id: editingCourse?.id || `new-course-${Date.now()}`,
      image: imageUrl,
      tag: values.type,
      title: values.courseName,
      description: values.courseDescription + ' Details...',
      brochureLink: brochureLink,
      enrollLink: '/admissions',
      category: values.courseGenre,
      icon: values.courseGenre === 'fashion' ? ImagePlus : UploadCloud,
      duration: values.duration,
      eligibility: values.eligibility,
      learningOutcomes,
      careerProspects,
      modules,
    };

    onSave(courseToSave);
    toast.success(`${editingCourse ? 'Course updated' : 'Course added'} successfully!`);
    form.reset();
    setBrochureFileName(null);
    setCourseImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
            {editingCourse ? 'Edit Course' : 'Upload Course'}
          </DialogTitle>
          <DialogDescription className="text-text-regular font-body text-gray-600">
            {editingCourse ? 'Update the details of this course.' : 'Fill in the details to add a new course.'}
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
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Other Courses
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Duration:</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 6 Months" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eligibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Eligibility:</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10th Pass or Equivalent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="learningOutcomesText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Learning Outcomes (each outcome on a new line):</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Outcome 1\nOutcome 2\nOutcome 3" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="careerProspectsText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Career Prospects (each prospect on a new line):</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Prospect 1\nProspect 2\nProspect 3" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="moduleTitlesText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Module Titles (each title on a new line):</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Module 1 Title\nModule 2 Title\nModule 3 Title" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="moduleDescriptionsText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Module Descriptions (each description on a new line, corresponding to titles):</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description for Module 1\nDescription for Module 2\nDescription for Module 3" rows={5} {...field} />
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
                    <img src={courseImagePreview} alt="Course Preview" className="h-full w-full object-contain rounded-md" />
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
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 !text-white text-text-regular">
                {editingCourse ? 'Save Changes' : 'Add Course'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddCourseDialog;