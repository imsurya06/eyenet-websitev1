"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CookieSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CookieSettingsDialog: React.FC<CookieSettingsDialogProps> = ({ open, onOpenChange }) => {
  const [essentialChecked, setEssentialChecked] = React.useState(true); // Essential cookies are always checked
  const [analyticsChecked, setAnalyticsChecked] = React.useState(false);
  const [marketingChecked, setMarketingChecked] = React.useState(false);

  const handleSaveSettings = () => {
    // In a real application, you would save these preferences (e.g., to local storage or a backend)
    console.log("Cookie Settings Saved:", {
      essential: essentialChecked,
      analytics: analyticsChecked,
      marketing: marketingChecked,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 md:p-8 max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
            Cookie Settings
          </DialogTitle>
          <DialogDescription className="text-text-regular font-body text-gray-600">
            Manage your cookie preferences for our website.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4">
          <div className="text-text-regular font-body text-gray-700 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="essential-cookies"
                  checked={essentialChecked}
                  onCheckedChange={(checked) => setEssentialChecked(!!checked)} // Fixed: Cast to boolean
                  disabled // Essential cookies cannot be unchecked
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="essential-cookies" className="text-text-regular font-body text-foreground">
                  Essential Cookies <span className="text-text-small text-gray-500">(Always Active)</span>
                </Label>
              </div>
              <p className="text-text-small text-gray-600 ml-6">
                These cookies are necessary for the website to function and cannot be switched off in our systems.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="analytics-cookies"
                  checked={analyticsChecked}
                  onCheckedChange={(checked) => setAnalyticsChecked(!!checked)} // Fixed: Cast to boolean
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="analytics-cookies" className="text-text-regular font-body text-foreground">
                  Analytics Cookies
                </Label>
              </div>
              <p className="text-text-small text-gray-600 ml-6">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing-cookies"
                  checked={marketingChecked}
                  onCheckedChange={(checked) => setMarketingChecked(!!checked)} // Fixed: Cast to boolean
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="marketing-cookies" className="text-text-regular font-body text-foreground">
                  Marketing Cookies
                </Label>
              </div>
              <p className="text-text-small text-gray-600 ml-6">
                These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests.
              </p>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90 !text-white px-6 py-3 text-text-regular">
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettingsDialog;