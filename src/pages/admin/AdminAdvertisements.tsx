"use client";
import React, { useState } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AdminHeader from '@/components/AdminHeader';
import AdminAdvertisementCard from '@/components/AdminAdvertisementCard';
import AdminAddAdvertisementDialog from '@/components/AdminAddAdvertisementDialog';
import { useAdvertisements } from '@/context/AdvertisementContext';
import { Advertisement } from '@/context/AdvertisementContext';
import { toast } from 'sonner';

const AdminAdvertisements = () => {
  const { advertisements, addAdvertisement, updateAdvertisement, deleteAdvertisement, loading } = useAdvertisements();
  const [isAddAdvertisementDialogOpen, setIsAddAdvertisementDialogOpen] = useState(false);
  const [editingAdvertisement, setEditingAdvertisement] = useState<Advertisement | null>(null);

  const handleAddAdvertisementClick = () => {
    setEditingAdvertisement(null);
    setIsAddAdvertisementDialogOpen(true);
  };

  const handleEditAdvertisement = (ad: Advertisement) => {
    setEditingAdvertisement(ad);
    setIsAddAdvertisementDialogOpen(true);
  };

  const handleSaveAdvertisement = (ad: Advertisement) => {
    if (editingAdvertisement) {
      updateAdvertisement(ad);
    } else {
      addAdvertisement(ad);
    }
    setIsAddAdvertisementDialogOpen(false);
    setEditingAdvertisement(null);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const adToUpdate = advertisements.find(ad => ad.id === id);
    if (adToUpdate) {
      // If activating this ad, deactivate all other active ads first
      if (!currentStatus) {
        const currentlyActiveAd = advertisements.find(ad => ad.is_active && ad.id !== id);
        if (currentlyActiveAd) {
          await updateAdvertisement({ ...currentlyActiveAd, is_active: false });
          toast.info(`Deactivated previous active ad: "${currentlyActiveAd.title}"`);
        }
      }
      await updateAdvertisement({ ...adToUpdate, is_active: !currentStatus });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader pageTitle="Advertisements" />
      <div className="flex-1 p-6 md:p-8 lg:p-10 bg-gray-50">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 text-foreground text-center">
            Manage Advertisements
          </h2>
        </AnimateOnScroll>
        
        {loading ? (
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              Loading advertisements...
            </p>
          </AnimateOnScroll>
        ) : advertisements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advertisements.map((ad, index) => (
              <AnimateOnScroll key={ad.id} delay={200 + index * 50}>
                <AdminAdvertisementCard
                  advertisement={ad}
                  onDelete={deleteAdvertisement}
                  onEdit={handleEditAdvertisement}
                  onToggleActive={handleToggleActive}
                />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              No advertisements found. Click 'Add' to create one.
            </p>
          </AnimateOnScroll>
        )}
      </div>

      <AdminAddAdvertisementDialog
        open={isAddAdvertisementDialogOpen}
        onOpenChange={setIsAddAdvertisementDialogOpen}
        editingAdvertisement={editingAdvertisement}
        onSave={handleSaveAdvertisement}
      />
    </div>
  );
};
export default AdminAdvertisements;