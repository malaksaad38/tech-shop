"use client";
import {CardContent} from "@/components/ui/card";
import {LaptopIcon, SquareChevronRightIcon} from "lucide-react";
import {SparklesCore} from "@/components/ui/sparkles";
import {motion} from "motion/react";
import {useCheckedLocale} from "@/lib/client-utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import ClickSpark from "@/components/ClickSpark";

export default function TechShopHeroPage() {
  const {t} = useCheckedLocale();
  return (
    <div className="bg-background">
      {/* Hero Section */}

      <section className="relative bg-background">
        <div className="relative mx-auto text-center">
          <ClickSpark
            sparkColor='cyan'
            sparkSize={10}
            sparkRadius={25}
            sparkCount={20}
            duration={500}
          >
            <div className="h-[88vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden">

              {/* Animated Heading */}
              <motion.h1
                initial={{opacity: 0, y: -60}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, ease: "easeOut"}}
                className="px-4 text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-2 text-white"
              >
                {t("title")}
              </motion.h1>

              {/* Sparkles */}
              <div className="md:w-[60rem] w-[40rem] h-40 relative">

                <div
                  className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"/>
                <div
                  className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] md:w-1/2 blur-sm w-1/3"/>
                <div
                  className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"/>
                <div
                  className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px md:w-1/2 w-1/3"/>

                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={1200}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />

                <div
                  className="absolute inset-0 w-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"/>
              </div>

              {/* Paragraph + Buttons */}
              <motion.div
                initial={{opacity: 0, y: -40}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6, duration: 0.8, ease: "easeOut"}}
                className="h-2"
              >
                <CardContent className="translate-y-[-120px]">
                  <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8">
                    {t("desc")}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:w-full items-center justify-center gap-4">
                    <Button asChild variant="secondary">
                      <Link href="/products">
                        <LaptopIcon/> {t("shopNow")}
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/about">
                        <SquareChevronRightIcon/> {t("learnMore")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </motion.div>

            </div>
          </ClickSpark>
        </div>
      </section>
    </div>
  );
}
