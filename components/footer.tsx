"use client";
import React from "react";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FacebookIcon, GithubIcon, HeartIcon, InstagramIcon, TwitterIcon} from "lucide-react";

const IndependenceDayFooter = () => {
  return (
    <footer className="bg-foreground text-white">
      {/* Celebration Banner */}
      <div className="bg-primary py-2 text-center text-sm font-medium">
        14th August — Celebrating Pakistan&apos;s Independence Day since 1947 🎉
      </div>

      <Separator className="bg-green-600"/>

      {/* Footer Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-4">
        {/* About Section */}
        <Card className="bg-transparent border-0 shadow-none text-white">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-bold">PakShop</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm text-green-100">
              Bringing you the best products with love for Pakistan. Let&apos;s
              celebrate our freedom with style and pride!
            </p>
          </CardContent>
        </Card>

        {/* Links */}
        <Card className="bg-transparent border-0 shadow-none text-white">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-bold">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col space-y-1">
            <Button asChild variant="link" className="p-0 h-auto text-white hover:text-primary justify-start">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-white hover:text-primary justify-start">
              <Link href="/products">Products</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-white hover:text-primary justify-start">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-white hover:text-primary justify-start">
              <Link href="/contact">Contact</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Social */}
        <Card className="bg-transparent border-0 shadow-none text-white">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-bold">Follow Us</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex gap-3 text-xl">
              <a href="#" className="hover:text-primary transition"><InstagramIcon/></a>
              <a href="#" className="hover:text-primary transition"><TwitterIcon/></a>
              <a href="#" className="hover:text-primary transition"><FacebookIcon/></a>
              <a href="#" className="hover:text-primary transition"><GithubIcon/></a>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-ring"/>

      {/* Bottom Bar */}
      <div className="bg-foreground py-3 text-center text-sm ">
        &copy; {new Date().getFullYear()} PakShop. Made with <HeartIcon className={"inline text-primary"}/> by
        dragondevs.
      </div>
    </footer>
  );
};

export default IndependenceDayFooter;
