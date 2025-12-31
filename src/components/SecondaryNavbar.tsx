"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Youtube, MessageSquareText } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/kubendrarajan1402/', name: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/eye_net_fashion/', name: 'Instagram' },
  { icon: MessageSquareText, href: 'https://wa.me/919842173725', name: 'WhatsApp' },
  { icon: Youtube, href: 'https://www.youtube.com/@EyenetEducationalAcademy', name: 'YouTube' },
];

const SecondaryNavbar = () => {
  return (
    <div className="bg-background text-foreground py-2 px-3 md:px-8 lg:px-[80px] flex flex-col sm:flex-row items-center justify-between gap-2 text-text-small font-body border-b border-border"> {/* Changed background and text color, added bottom border */}
      {/* Contact Info */}
      <div className="flex items-center gap-4">
        <a href="tel:+919842173725" className="flex items-center gap-1 hover:underline">
          <Phone className="h-5 w-5" /> {/* Increased icon size */}
          <span>+91 9842173725</span>
        </a>
        <a href="mailto:eyenetfashion@gmail.com" className="flex items-center gap-1 hover:underline">
          <Mail className="h-5 w-5" /> {/* Increased icon size, removed text */}
        </a>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="hover:text-primary transition-colors" // Changed hover color to primary
          >
            <social.icon className="h-5 w-5" /> {/* Increased icon size */}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavbar;