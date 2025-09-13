"use client";
import React from "react";
import Link from "next/link";
import {HandCoinsIcon, Home, Info, LockIcon, LogInIcon, Menu, Package, Phone, UserIcon,} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {Sheet, SheetClose, SheetContent, SheetTrigger,} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {ModeToggle} from "@/components/ModeToggle";
import {motion} from "framer-motion";
import FavoritesPopover from "@/components/FavoritesPopover";
import CartsPopover from "@/components/CartsPopover";
import {useAuth} from "@/hooks/useAuth";
import ProfilePopover from "@/components/ProfilePopover";
import {LocaleSwitcherToggle} from "@/components/LanguageSwitcher";
import {useCheckedLocale} from "@/lib/client-utils";
import GradientButton from "@/components/GradientButton";
import ClickSpark from "@/components/ClickSpark"; // ✅ custom auth hook


const Header = () => {
  const {t, isRTL, dir} = useCheckedLocale();
  const pathname = usePathname();
  const router = useRouter();
  const {customer, logout} = useAuth(); // ✅ get both customer + logout


  const navLinks = [
    {href: "/", label: `${t('home')}`, icon: Home},
    {href: "/products", label: `${t('products')}`, icon: Package},
    {href: "/about", label: `${t('about')}`, icon: Info},
    {href: "/contact", label: `${t('contact')}`, icon: Phone},
  ];

  const navVariants = {
    hidden: {opacity: 0, y: -20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.5, staggerChildren: 0.1},
    },
  };

  const itemVariants = {
    hidden: {opacity: 0, y: -10},
    visible: {opacity: 1, y: 0},
  };

  const handleLogout = () => {
    logout(); // clear customer from context + localStorage
    router.push("/auth/login");
  };


  return (

    <motion.header
      variants={navVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.2}}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b shadow-sm"
    >
      <ClickSpark
        sparkColor="lime"
        sparkSize={10}
        sparkRadius={25}
        sparkCount={20}
        duration={500}
      >
        {/* Top banner */}
        <motion.div
          variants={itemVariants}
          className="bg-primary/90 text-center py-1 text-xs sm:text-sm"
        >
          {t("tagline")}
        </motion.div>

        <div className="container mx-auto flex items-center justify-between py-2 px-3">
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="flex items-center gap-1 font-extrabold text-lg sm:text-xl"
            >
              <span className="text-primary cursor-target">{t('logo')}</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2 font-medium" dir={dir}>
              <motion.div

                variants={navVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.2}}
                className="flex gap-2"
              >
                {navLinks.map(({href, label, icon: Icon}) => (
                  <motion.div key={href} variants={itemVariants}>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          href={href}
                          className={cn(
                            "transition hover:text-primary hover:underline hover:underline-offset-2 cursor-target",
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
                  </motion.div>
                ))}
              </motion.div>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex gap-2 items-center"
          >
            <CartsPopover/>
            <FavoritesPopover/>
            <ModeToggle/>
            <LocaleSwitcherToggle/>

            <GradientButton className={"bg-rose-700"} link={"/admin"} icon={<LockIcon/>} label={t('admin')}/>
            <GradientButton link={"/special-offers"} label={t('offers')} icon={<HandCoinsIcon/>}/>

            {/* 🔥 Auth Buttons */}
            {customer ? (
              <ProfilePopover/>
            ) : (
              <GradientButton link={"/auth/login"} label={t("login")} icon={<UserIcon/>}/>
            )}
          </motion.div>

          {/* Mobile Menu */}
          <Sheet>
            <div className="space-x-1 md:hidden flex items-center">
              <LocaleSwitcherToggle/>
              <ModeToggle/>
              <CartsPopover/>
              <FavoritesPopover/>
              {customer ? (
                <ProfilePopover/>
              ) : (
                <Button variant={"ghost"} size={"icon"}><Link href={"/auth/login"}> <LogInIcon/></Link></Button>
              )}


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

            <SheetContent side={isRTL ? "right" : "left"} className="p-4 backdrop-blur-md">
              <ClickSpark
                sparkColor="lime"
                sparkSize={10}
                sparkRadius={25}
                sparkCount={20}
                duration={500}
              >
                <motion.nav
                  variants={navVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once: true, amount: 0.3}}
                  className="flex flex-col gap-3 mt-8"
                >
                  {navLinks.map(({href, label, icon: Icon}) => (
                    <motion.div key={href} variants={itemVariants}>
                      <SheetClose asChild>
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
                    </motion.div>
                  ))}

                  {/* 🔥 Mobile Auth Toggle */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-2 mt-4"
                  >
                    <GradientButton className={"bg-rose-700 text-center"} link={"/admin"} icon={<LockIcon/>}
                                    label={t('admin')}/>
                    <GradientButton link={"/special-offers"} label={t('offers')} icon={<HandCoinsIcon/>}/>

                  </motion.div>
                </motion.nav>
              </ClickSpark>

            </SheetContent>
          </Sheet>
        </div>
      </ClickSpark>

    </motion.header>
  );
};

export default Header;
