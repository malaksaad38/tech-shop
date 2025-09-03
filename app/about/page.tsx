"use client"

import React from "react"
import Link from "next/link"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {BookOpen, Cpu, Target} from "lucide-react"
import {motion} from "framer-motion"
import {useCheckedLocale} from "@/lib/client-utils";

// Parent container for staggered children
const container = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {staggerChildren: 0.2},
  },
}

// Reusable fade-up variant
const fadeUp = {
  hidden: {opacity: 0, y: 40},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.7, ease: "easeOut"},
  },
}

const About = () => {
  const {t} = useCheckedLocale()

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-primary text-foreground text-center py-14 shadow-sm"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {t("aboutTitle")}
        </h1>
        <p className="text-base md:text-lg mt-3 px-2 opacity-90">
          {t("missionLine")}
        </p>
      </motion.section>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.2}}
        className="container mx-auto py-16 max-w-4xl space-y-10 px-4"
      >
        {/* Our Story */}
        <motion.div variants={fadeUp}>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary"/>
                <h2 className="text-2xl font-bold text-primary">{t("story")}</h2>
              </div>
              <p className="text-muted-foreground">{t("storyDesc")}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* What We Do */}
        <motion.div variants={fadeUp}>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Cpu className="h-6 w-6 text-primary"/>
                <h2 className="text-2xl font-bold text-primary">{t("whatWeDo")}</h2>
              </div>
              <p className="text-muted-foreground">{t("whatWeDoDesc")}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Our Mission */}
        <motion.div variants={fadeUp}>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary"/>
                <h2 className="text-2xl font-bold text-primary">{t("mission")}</h2>
              </div>
              <p className="text-muted-foreground">{t("missionDesc")}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Home */}
        <motion.div variants={fadeUp} className="flex justify-center pt-6">
          <Button asChild size="lg" className="shadow-md hover:shadow-lg">
            <Link href="/">{t("backHome")}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default About
