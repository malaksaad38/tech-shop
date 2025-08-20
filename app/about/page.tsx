"use client"

import React from "react"
import Link from "next/link"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {BookOpen, Flag, Target} from "lucide-react"

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-primary text-foreground text-center py-14 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          About Pakistan Independence Day
        </h1>
        <p className="text-base md:text-lg mt-3 opacity-90">
          Celebrating Freedom Since 14th August 1947
        </p>
      </section>

      {/* Content */}
      <div className="container mx-auto py-16 max-w-4xl space-y-10 px-4">
        {/* Our Story */}
        <Card>
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary"/>
              <h2 className="text-2xl font-bold text-primary">Our Story</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              On 14th August 1947, Pakistan emerged as an independent nation,
              marking the end of British colonial rule and the creation of a
              homeland for Muslims of the Indian subcontinent. This day
              symbolizes freedom, unity, and the vision of our founding fathers.
              Every year, Pakistanis across the globe celebrate this day with
              pride and honor.
            </p>
          </CardContent>
        </Card>

        {/* Why We Celebrate */}
        <Card>
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Flag className="h-6 w-6 text-primary"/>
              <h2 className="text-2xl font-bold text-primary">Why We Celebrate</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Independence Day is a reminder of the sacrifices made by countless
              individuals for the sake of our freedom. It’s a time to reflect on
              our achievements, cherish our culture, and strengthen our
              commitment to making Pakistan a prosperous nation.
            </p>
          </CardContent>
        </Card>

        {/* Our Mission */}
        <Card>
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary"/>
              <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Our mission is to promote patriotism, celebrate Pakistan’s rich
              heritage, and inspire future generations to contribute positively
              to our beloved country.
            </p>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="flex justify-center pt-6">
          <Button asChild size="lg">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default About
