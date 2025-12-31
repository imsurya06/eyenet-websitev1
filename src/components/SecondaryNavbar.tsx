"use client";

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
  const secondaryNavLinks = [
    { name: 'Faculty', to: '/faculty' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'FAQ', to: '/about#faq-section' },
    { name: '360° View', to: '/360-view' },
  ];

  return (
    <div className="bg-background text-foreground py-3 px-3 md:px-8 lg:px-[80px] flex flex-col sm:flex-row items-center justify-between gap-4 text-text-small font-body border-b border-border"> {/* Changed gap-2 to gap-4 */}
      {/* Left Section: Navigation Links */}
      <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
        {secondaryNavLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "hover:text-primary transition-colors",
                isActive && "text-primary font-semibold"
              )
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Right Section: Contact Info and Social Icons */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-y-4 sm:gap-y-0 sm:gap-x-8 flex-wrap justify-center sm:justify-end mt-2 sm:mt-0"> {/* Changed gap-y-2 to gap-y-4 */}
        {/* Phone Number */}
        <a href="tel:+919842173725" className="flex items-center gap-1 hover:underline">
          <Phone className="h-6 w-6" />
          <span>+91 9842173725</span>
        </a>
        {/* Social Icons Wrapper - ensures icons stay in a row with their own spacing */}
        <div className="flex items-center gap-x-4">
          {socialAndContactIcons.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="hover:text-primary transition-colors"
            >
              <item.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryNavbar;