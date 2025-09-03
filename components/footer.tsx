"use client";
import React from "react";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FacebookIcon, GithubIcon, HeartIcon, InstagramIcon, LinkedinIcon, TwitterIcon} from "lucide-react";
import {useCheckedLocale} from "@/lib/client-utils";

const Footer = () => {
  const {t, isRTL, dir} = useCheckedLocale()
  return (
    <footer className="bg-background text-foreground">
      {/* Professional Banner */}
      <div className="bg-primary py-2 text-center text-sm font-medium">
        {t("TechShop — Powering Innovation, Technology, and Growth")}
      </div>

      {/* Footer Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 py-6 px-4 text-center md:text-left">
        {/* About Section */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold text-start">
              {t('logo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-sm leading-snug text-start">
            {t('Your one-stop destination for the latest gadgets, electronics, and accessories At TechShop, we bring technology closer to you — with pride and innovation!')}
          </CardContent>
        </Card>

        {/* Links */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold text-start">{t('Quick Links')}</CardTitle>
          </CardHeader>
          <CardContent
            className={`p-0 flex flex-col space-y-1 items-start`}
          >
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/">{t('home')}</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/products">{t('products')}</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/about">{t('about')}</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/contact">{t('contact')}</Link>
            </Button>
          </CardContent>
        </Card>


        {/* Social */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold text-start">{t('Follow Us')}</CardTitle>
          </CardHeader>
          <CardContent
            className={`p-0 flex gap-3 text-lg  items-start `}
          >
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
        &copy; {new Date().getFullYear()} {t("TechShop Made with")}{" "}
        <HeartIcon className="inline text-primary size-4 mx-1"/> {t("by Dragondevs")}
      </div>
    </footer>
  );
};

export default Footer;
