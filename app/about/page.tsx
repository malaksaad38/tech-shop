"use client"

import React from "react"
import Link from "next/link"
import {CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {BookOpen, Cpu, Target} from "lucide-react"
import {useCheckedLocale} from "@/lib/client-utils";
import ElectricBorder from "@/components/ElectricBorder";


const About = () => {
  const {t} = useCheckedLocale()

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section
        className="bg-primary text-foreground text-center py-14 shadow-sm"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {t("aboutTitle")}
        </h1>
        <p className="text-base md:text-lg mt-3 px-2 opacity-90">
          {t("missionLine")}
        </p>
      </section>

      {/* Content */}
      <div

        className="container mx-auto py-16 max-w-4xl space-y-10 px-4"
      >
        {/* Our Story */}
        <ElectricBorder
          color="blue"
          speed={0.5}
          chaos={0.3}
          thickness={2}
          style={{borderRadius: 16}}
          className={"py-4"}
        >
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary"/>
              <h2 className="text-2xl font-bold text-primary">{t("story")}</h2>
            </div>
            <p className="text-muted-foreground">{t("storyDesc")}</p>
          </CardContent>
        </ElectricBorder>


        {/* What We Do */}

        <ElectricBorder
          color="blue"
          speed={0.5}
          chaos={0.3}
          thickness={2}
          style={{borderRadius: 16}}
          className={"py-4"}
        >
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Cpu className="h-6 w-6 text-primary"/>
              <h2 className="text-2xl font-bold text-primary">{t("whatWeDo")}</h2>
            </div>
            <p className="text-muted-foreground">{t("whatWeDoDesc")}</p>
          </CardContent>
        </ElectricBorder>

        {/* Our Mission */}

        <ElectricBorder
          color="blue"
          speed={0.5}
          chaos={0.3}
          thickness={2}
          style={{borderRadius: 16}}
          className={"py-4"}
        >
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary"/>
              <h2 className="text-2xl font-bold text-primary">{t("mission")}</h2>
            </div>
            <p className="text-muted-foreground">{t("missionDesc")}</p>
          </CardContent>
        </ElectricBorder>


        {/* Back to Home */}

        <Button asChild size="lg" className="shadow-md hover:shadow-lg">
          <Link href="/">{t("backHome")}</Link>
        </Button>
      </div>
    </div>
  )
}

export default About
