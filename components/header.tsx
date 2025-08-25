"use client";
import React from "react";
import Link from "next/link";
import {HandCoinsIcon, Home, Info, Menu, Package, Phone} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {ModeToggle} from "@/components/ModeToggle";
import EncryptButton from "@/components/EncryptButton";

const navLinks = [
  {href: "/", label: "Home", icon: Home},
  {href: "/products", label: "Products", icon: Package},
  {href: "/about", label: "About", icon: Info},
  {href: "/contact", label: "Contact", icon: Phone},
];

const TechShopHeader = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b shadow-sm">
      {/* 🔹 Professional Banner */}
      <div className="bg-primary/90 backdrop-blur text-center py-1 text-xs sm:text-sm">
        TechShop — Your Trusted Partner in Technology & Innovation
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex items-center justify-between py-2 px-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 font-extrabold text-lg sm:text-xl"
        >
          <span className="text-primary">TechShop</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2 font-medium">
            {navLinks.map(({href, label, icon: Icon}) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className={cn(
                      "transition hover:text-primary hover:underline hover:underline-offset-2",
                      pathname === href
                        ? "text-primary underline underline-offset-2"
                        : "text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <Icon size={16}/> {label}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex gap-0">
          <ModeToggle/>
          <EncryptButton link={"/admin"}/>
          <Button asChild>
            <Link href="/special-offers">
              <HandCoinsIcon className="h-4 w-4"/> Special Offers
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <div className="space-x-1 block md:hidden">
            <ModeToggle/>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
              >
                <Menu size={22}/>
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent side="right" className="p-4 backdrop-blur-md">
            <nav className="flex flex-col gap-3 mt-2">
              {navLinks.map(({href, label, icon: Icon}) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-2 text-base transition-colors",
                      pathname === href
                        ? "text-primary underline"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    <Icon size={16}/> {label}
                  </Link>
                </SheetClose>
              ))}

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <EncryptButton link={"/admin"}/>
                <Button asChild>
                  <Link href="/special-offers">
                    <HandCoinsIcon className="h-4 w-4"/> Special Offers
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default TechShopHeader;
