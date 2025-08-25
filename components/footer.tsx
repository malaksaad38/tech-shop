"use client";
import React from "react";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FacebookIcon, GithubIcon, HeartIcon, InstagramIcon, LinkedinIcon, TwitterIcon} from "lucide-react";

const TechShopFooter = () => {
  return (
    <footer className="bg-background text-foreground">
      {/* Professional Banner */}
      <div className="bg-primary py-2 text-center text-sm font-medium">
        TechShop — Powering Innovation, Technology, and Growth
      </div>

      {/* Footer Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 py-6 px-4 text-center md:text-left">
        {/* About Section */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold">TechShop</CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-sm leading-snug">
            Your one-stop destination for the latest gadgets, electronics, and accessories.
            At TechShop, we bring technology closer to you — with pride and innovation!
          </CardContent>
        </Card>

        {/* Links */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center md:items-start space-y-1">
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/products">Products</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/contact">Contact</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Social */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold">Follow Us</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex justify-center md:justify-start gap-3 text-lg">
            <a href="#" className="hover:text-primary transition"><InstagramIcon/></a>
            <a href="#" className="hover:text-primary transition"><TwitterIcon/></a>
            <a href="#" className="hover:text-primary transition"><FacebookIcon/></a>
            <a href="#" className="hover:text-primary transition"><LinkedinIcon/></a>
            <a href="#" className="hover:text-primary transition"><GithubIcon/></a>
          </CardContent>
        </Card>
      </div>

      <Separator/>

      {/* Bottom Bar */}
      <div className="bg-card py-3 text-center text-sm">
        &copy; {new Date().getFullYear()} TechShop. Made with{" "}
        <HeartIcon className="inline text-primary size-4 mx-1"/> by dragondevs.
      </div>
    </footer>
  );
};

export default TechShopFooter;
