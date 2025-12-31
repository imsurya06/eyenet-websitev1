"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Youtube, MessageSquareText } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialAndContactIcons = [
  { icon: Mail, href: 'mailto:eyenetfashion@gmail.com', name: 'Email' },
  { icon: Facebook, href: 'https://www.facebook.com/kubendrarajan1402/', name: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/eye_net_fashion/', name: 'Instagram' },
  { icon: MessageSquareText, href: 'https://wa.me/919842173725', name: 'WhatsApp' },
  { icon: Youtube, href: 'https://www.youtube.com/@EyenetEducationalAcademy', name: 'YouTube' },
];

const SecondaryNavbar = () => {
  return (
    <div className="bg-background text-foreground py-2 px-3 md:px-8 lg:px-[80px] flex items-center justify-end text-text-small font-body border-b border-border">
      {/* Grouped Contact Info and Social Icons on the right */}
      <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end"> {/* flex-wrap for mobile, justify-end for desktop */}
        <a href="tel:+919842173725" className="flex items-center gap-1 hover:underline">
          <Phone className="h-5 w-5" />
          <span>+91 9842173725</span>
        </a>
        {socialAndContactIcons.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="hover:text-primary transition-colors"
          >
            <item.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavbar;