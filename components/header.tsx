"use client";
import React from "react";
import Link from "next/link";
import {HandCoinsIcon, Menu} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {Sheet, SheetClose, SheetContent, SheetTrigger,} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";

const IndependenceDayHeader = () => {
  return (
    <header className="bg-foreground text-white shadow-lg">
      {/* 🎉 Top Banner */}
      <div className="bg-primary text-center py-1 text-sm tracking-wide px-2">
        🎉 14th August — Celebrating Pakistan&apos;s Independence Day! 14% discount till the end of August
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl">
          <span className="text-primary">PakShop</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-6 text-white font-medium">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/products">
                  Products
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about">
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact">
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex gap-2">
          <Button asChild variant="destructive">
            <Link href="/admin">Admin</Link>
          </Button>
          <Button asChild>
            <Link href="/special-offers">Special Offers <HandCoinsIcon/></Link>
          </Button>
        </div>

        {/* Mobile Menu (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu size={28}/>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-green-800 text-white">
            <nav className="flex flex-col gap-4 mt-6">
              <SheetClose asChild>
                <Link href="/" className="hover:text-yellow-300 transition">
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/products" className="hover:text-yellow-300 transition">
                  Products
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about" className="hover:text-yellow-300 transition">
                  About
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/contact" className="hover:text-yellow-300 transition">
                  Contact
                </Link>
              </SheetClose>

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <Button asChild variant="secondary" className="bg-black/70 text-red-500 hover:bg-black">
                  <Link href="/admin">Admin</Link>
                </Button>
                <Button asChild className="bg-yellow-400 text-green-900 hover:bg-yellow-500">
                  <Link href="/special-offers">Special Offers 🎁</Link>
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
