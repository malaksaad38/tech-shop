"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CardContent} from "@/components/ui/card";
import {LaptopIcon, SquareChevronRightIcon} from "lucide-react";
import {SparklesCore} from "@/components/ui/sparkles";
import {motion} from "motion/react";

export default function TechShopHeroPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10"
        />

        {/* Content */}
        <div className="relative mx-auto text-center">
          <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Animated Heading */}
            <motion.h1
              initial={{opacity: 0, y: -60}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, ease: "easeOut"}}
              className="text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-2 text-white"
            >
              Welcome to TechShop
            </motion.h1>

            {/* Sparkles */}
            <div
              
              className="w-[60rem] h-40 relative"
            >
              {/* Gradients */}
              <div
                className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"/>
              <div
                className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 blur-sm"/>
              <div
                className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"/>
              <div
                className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/2"/>

              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              <div
                className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>

            {/* Paragraph + Buttons */}
            <motion.div
              initial={{opacity: 0, y: -40}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.6, duration: 0.8, ease: "easeOut"}}
            >
              <CardContent className="translate-y-[-120px]">
                <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8">
                  Your one-stop destination for the latest gadgets, electronics, and smart tech.
                  Explore our exclusive deals and upgrade your lifestyle today!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild variant="secondary">
                    <Link href="/products"><LaptopIcon/> Shop Now</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/about"><SquareChevronRightIcon/> Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
