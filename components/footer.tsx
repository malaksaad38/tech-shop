"use client";
import React from "react";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FacebookIcon, GithubIcon, HeartIcon, InstagramIcon, LinkedinIcon, TwitterIcon} from "lucide-react";
import {useCheckedLocale} from "@/lib/client-utils";

const Footer = () => {
  const {t} = useCheckedLocale();

  return (
    <footer className="bg-background text-foreground">
      {/* Professional Banner */}
      <div className="bg-primary py-2 text-center text-sm font-medium">
        {t("tagline")}
      </div>

      {/* Footer Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 py-6 px-4 text-center md:text-left">
        {/* About Section */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold text-start">
              {t("logo")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-sm leading-snug text-start">
            <p>{t("subTagline")}</p>
          </CardContent>
        </Card>

        {/* Links */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold text-start">
              {t("quickLinks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col space-y-1 items-start">
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/">{t("home")}</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/products">{t("products")}</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/about">{t("about")}</Link>
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
              <Link href="/contact">{t("contact")}</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Social */}
        <Card className="bg-transparent border-0 shadow-none text-foreground">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold text-start">
              {t("followUs")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex gap-3 text-lg items-start">
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
        &copy; {new Date().getFullYear()} {t("madeWith")}{" "}
        <HeartIcon className="inline text-primary size-4 mx-1"/> {t("by")}
      </div>
    </footer>
  );
};

export default Footer;
