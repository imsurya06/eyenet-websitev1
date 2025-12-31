"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Youtube, MessageSquareText } from 'lucide-react'; // Replaced Whatsapp with MessageSquareText
import { cn } from '@/lib/utils';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/kubendrarajan1402/', name: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/eye_net_fashion/', name: 'Instagram' },
  { icon: MessageSquareText, href: 'https://wa.me/919842173725', name: 'WhatsApp' }, // Updated icon
  { icon: Youtube, href: 'https://www.youtube.com/@EyenetEducationalAcademy', name: 'YouTube' },
];

const SecondaryNavbar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-3 md:px-8 lg:px-[80px] flex flex-col sm:flex-row items-center justify-between gap-2 text-text-small font-body">
      {/* Contact Info */}
      <div className="flex items-center gap-4">
        <a href="tel:+919842173725" className="flex items-center gap-1 hover:underline">
          <Phone className="h-4 w-4" />
          <span>+91 9842173725</span>
        </a>
        <a href="mailto:eyenetfashion@gmail.com" className="flex items-center gap-1 hover:underline">
          <Mail className="h-4 w-4" />
          <span>eyenetfashion@gmail.com</span>
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
            className="hover:text-accent-foreground transition-colors"
          >
            <social.icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavbar;