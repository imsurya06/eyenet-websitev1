"use client";

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Admissions", href: "/admissions" },
    {
      name: "Courses",
      href: "/courses",
      dropdown: [
        { name: "Fashion Designing", href: "/courses/fashion" },
        { name: "Interior Designing", href: "/courses/interior" },
      ],
    },
    {
      name: "Explore",
      href: "/explore",
      dropdown: [
        { name: "Gallery", href: "/explore/gallery" },
        { name: "Events", href: "/explore/events" },
      ],
    },
  ];

  const renderNavLinks = (isMobileView: boolean) => (
    <ul className={isMobileView ? "flex flex-col space-y-4" : "flex items-center space-x-8"}>
      {navLinks.map((link) =>
        link.dropdown ? (
          <li key={link.name}>
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 ${link.name === "Courses" ? "text-eyenet-red-dark" : "text-gray-800 hover:text-eyenet-red-dark"} text-lg font-medium`}>
                {link.name} <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {link.dropdown.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ) : (
          <li key={link.name}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive ? "text-eyenet-red-dark" : "text-gray-800 hover:text-eyenet-red-dark"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ),
      )}
    </ul>
  );

  const renderActionButtons = (isMobileView: boolean) => (
    <div className={isMobileView ? "flex flex-col space-y-4 mt-6" : "flex items-center space-x-4"}>
      <Button variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-100">
        Contact
      </Button>
      <Button className="bg-eyenet-red-light text-white hover:bg-eyenet-red-dark">
        Apply
      </Button>
    </div>
  );

  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 md:px-12 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <img src="/design-system/eyenet-logo.png" alt="Eyenet Logo" className="h-12 md:h-16" />
      </Link>

      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] flex flex-col items-start p-6">
            <Link to="/" className="mb-8">
              <img src="/design-system/eyenet-logo.png" alt="Eyenet Logo" className="h-12" />
            </Link>
            {renderNavLinks(true)}
            {renderActionButtons(true)}
          </SheetContent>
        </Sheet>
      ) : (
        <nav className="flex items-center space-x-10">
          {renderNavLinks(false)}
          {renderActionButtons(false)}
        </nav>
      )}
    </header>
  );
};

export default Navbar;