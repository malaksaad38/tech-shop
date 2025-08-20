"use client";
import React from "react";
import Link from "next/link";
import {HandCoinsIcon, Home, Info, Menu, Package, Phone, Shield} from "lucide-react";
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

const navLinks = [
  {href: "/", label: "Home", icon: Home},
  {href: "/products", label: "Products", icon: Package},
  {href: "/about", label: "About", icon: Info},
  {href: "/contact", label: "Contact", icon: Phone},
];

const IndependenceDayHeader = () => {
  const pathname = usePathname();

  return (
    <header className="bg-card text-foreground border-b shadow-md">
      {/* 🎉 Top Banner */}
      <div className="bg-primary text-center py-1 text-xs sm:text-sm px-2">
        14th August — Celebrating Pakistan&apos;s Independence Day!
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl"
        >
          <span className="text-primary">PakShop</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-6 font-medium">
            {navLinks.map(({href, label, icon: Icon}) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className={cn(
                      "transition hover:text-primary hover:underline hover:underline-offset-4",
                      pathname === href ? "text-primary underline underline-offset-4" : "text-foreground"
                    )}
                  >
                    <div className="flex justify-center items-center gap-2"><Icon size={18}/> {label}</div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex gap-2">
          <ModeToggle/>
          <Button asChild variant="destructive">
            <Link href="/admin">
              <Shield className="h-4 w-4"/> Admin
            </Link>

          </Button>

          <Button asChild>
            <Link href="/special-offers">
              <HandCoinsIcon className="h-4 w-4"/> Special Offers
            </Link>
          </Button>
        </div>


        {/* Mobile Menu */}
        <Sheet>
          <div className={"space-x-2 block md:hidden"}>
            <ModeToggle/>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                <Menu size={26}/>
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent side="right" className="p-6">
            <nav className="flex flex-col gap-5 mt-4">

              {navLinks.map(({href, label, icon: Icon}) => (
                <SheetClose asChild key={href}>

                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-2 text-lg transition-colors",
                      pathname === href ? "text-primary underline" : "text-foreground hover:text-primary"
                    )}
                  >
                    <Icon size={18}/> {label}
                  </Link>
                </SheetClose>
              ))}

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-3 mt-6">
                <Button asChild variant="destructive" className="w-full">
                  <Link href="/admin">
                    <Shield className="h-4 w-4"/> Admin
                  </Link>
                </Button>
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

export default IndependenceDayHeader;
