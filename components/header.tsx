"use client";
import React from "react";
import Link from "next/link";
import {HandCoinsIcon, Home, Info, Menu, Package, Phone, ShoppingCart,} from "lucide-react";
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
import {motion} from "framer-motion";

import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useCart} from "@/store/useCart";

const navLinks = [
  {href: "/", label: "Home", icon: Home},
  {href: "/products", label: "Products", icon: Package},
  {href: "/about", label: "About", icon: Info},
  {href: "/contact", label: "Contact", icon: Phone},
];

const CartButton = () => {
  const {cart, removeFromCart, updateQuantity, clearCart} = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* Trigger must be a Button (no Link) to prevent navigation */}
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5"/>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-4 z-[60]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <PopoverClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close cart">
              ✕
            </Button>
          </PopoverClose>
        </div>

        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty 🛒</p>
        ) : (
          <>
            <div className="space-y-3 max-h-56 overflow-y-auto pb-2">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded"/>
                  ) : (
                    <div className="w-12 h-12 bg-muted/40 rounded flex items-center justify-center">N/A</div>
                  )}

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item._1d ?? item._id, item.quantity + 1)}
                      >
                        +
                      </Button>

                      <Button variant="ghost" size="sm" onClick={() => removeFromCart(item._id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <div className="flex justify-between font-bold mb-2">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => clearCart()}>
                  Clear
                </Button>

                {/* If you still want full-page cart, keep the Link here; it won't trigger on clicking the trigger */}
                <Link href="/cart" className="w-full">
                  <Button className="w-full">Go to Cart</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

const TechShopHeader = () => {
  const pathname = usePathname();

  // Variants for staggered animations
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

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.2}}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b shadow-sm"
    >
      <motion.div variants={itemVariants} className="bg-primary/90 text-center py-1 text-xs sm:text-sm">
        TechShop — Your Trusted Partner in Technology & Innovation
      </motion.div>

      <div className="container mx-auto flex items-center justify-between py-2 px-3">
        <motion.div variants={itemVariants}>
          <Link href="/" className="flex items-center gap-1 font-extrabold text-lg sm:text-xl">
            <span className="text-primary">TechShop</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2 font-medium">
            <motion.div variants={navVariants} initial="hidden" whileInView="visible"
                        viewport={{once: true, amount: 0.2}} className="flex gap-2">
              {navLinks.map(({href, label, icon: Icon}) => (
                <motion.div key={href} variants={itemVariants}>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={cn(
                          "transition hover:text-primary hover:underline hover:underline-offset-2",
                          pathname === href ? "text-primary underline underline-offset-2" : "text-foreground"
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
        <motion.div variants={itemVariants} className="hidden md:flex gap-2 items-center">
          <ModeToggle/>
          <CartButton/>
          <EncryptButton link={"/admin"}/>
          <Button asChild>
            <Link href="/special-offers">
              <HandCoinsIcon className="h-4 w-4"/> Special Offers
            </Link>
          </Button>
        </motion.div>

        {/* Mobile Menu */}
        <Sheet>
          <div className="space-x-1 block md:hidden flex items-center">
            <ModeToggle/>
            <CartButton/>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                <Menu size={22}/>
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent side="right" className="p-4 backdrop-blur-md">
            <motion.nav variants={navVariants} initial="hidden" whileInView="visible"
                        viewport={{once: true, amount: 0.3}} className="flex flex-col gap-3 mt-2">
              {navLinks.map(({href, label, icon: Icon}) => (
                <motion.div key={href} variants={itemVariants}>
                  <SheetClose asChild>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2 text-base transition-colors",
                        pathname === href ? "text-primary underline" : "text-foreground hover:text-primary"
                      )}
                    >
                      <Icon size={16}/> {label}
                    </Link>
                  </SheetClose>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="flex flex-col gap-2 mt-4">
                <EncryptButton link={"/admin"}/>
                <Button asChild>
                  <Link href="/special-offers">
                    <HandCoinsIcon className="h-4 w-4"/> Special Offers
                  </Link>
                </Button>
              </motion.div>
            </motion.nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
};

export default TechShopHeader;
