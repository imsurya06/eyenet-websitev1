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
import { ImagePlus } from 'lucide-react';
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
import { useAdvertisements } from '@/context/AdvertisementContext';
import { toast } from 'sonner';
import { Advertisement } from '@/context/AdvertisementContext';
import { supabase } from '@/lib/supabaseClient';

interface AdminAddAdvertisementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingAdvertisement: Advertisement | null;
  onSave: (ad: Advertisement) => void;
}

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().optional(),
  imageFile: z.any()
    .refine((file) => !file || (file instanceof File && file.size <= 10 * 1024 * 1024), 'Image size must be less than 10MB.')
    .optional(),
});

const AdminAddAdvertisementDialog: React.FC<AdminAddAdvertisementDialogProps> = ({ open, onOpenChange, editingAdvertisement, onSave }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      imageFile: undefined,
    },
  });

  useEffect(() => {
    if (open && editingAdvertisement) {
      form.reset({
        title: editingAdvertisement.title,
        description: editingAdvertisement.description || '',
        imageFile: undefined,
      });
      setImagePreview(editingAdvertisement.image_url || null);
    } else if (open && !editingAdvertisement) {
      form.reset({
        title: '',
        description: '',
        imageFile: undefined,
      });
      setImagePreview(null);
    }
  }, [open, editingAdvertisement, form]);

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
    let imageUrl = editingAdvertisement?.image_url || '/public/placeholder.svg';

    if (values.imageFile) {
      const file = values.imageFile;
      const filePath = `advertisements/${Date.now()}-${file.name}`;
      try {
        const { data, error } = await supabase.storage.from('images').upload(filePath, file);
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      } catch (error: any) {
        toast.error(`Failed to upload image: ${error.message}`);
        return;
      }
    }

    const adToSave: Advertisement = {
      id: editingAdvertisement?.id || `ad-${Date.now()}`,
      title: values.title,
      description: values.description || undefined,
      image_url: imageUrl,
      is_active: editingAdvertisement?.is_active || false, // Preserve active status if editing, otherwise default to false
      created_at: editingAdvertisement?.created_at || new Date().toISOString(),
    };

    onSave(adToSave);
    toast.success(`${editingAdvertisement ? 'Advertisement updated' : 'Advertisement added'} successfully!`);
    form.reset();
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
            {editingAdvertisement ? 'Edit Advertisement' : 'Add New Advertisement'}
          </DialogTitle>
          <DialogDescription className="text-text-regular font-body text-gray-600">
            {editingAdvertisement ? 'Update the details of this advertisement.' : 'Fill in the details to add a new advertisement.'}
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
                    <Input placeholder="Advertisement Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Description (Optional):</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the advertisement" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-text-regular font-body text-foreground">Image:</FormLabel>
              <FormControl>
                <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border border-input bg-muted rounded-md cursor-pointer hover:bg-accent transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Advertisement Preview" className="h-full w-full object-contain rounded-md" />
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
                {editingAdvertisement ? 'Save Changes' : 'Add Advertisement'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddAdvertisementDialog;