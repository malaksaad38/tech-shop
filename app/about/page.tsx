"use client"

import React from "react"
import Link from "next/link"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {BookOpen, Cpu, Target} from "lucide-react"

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-primary text-foreground text-center py-14 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          About TechShop
        </h1>
        <p className="text-base md:text-lg mt-3 opacity-90">
          Innovating Technology, Empowering Your Future
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
              TechShop was founded with a vision to bring the latest technology
              products to customers at affordable prices. From computer hardware
              and accessories to the latest gadgets, we aim to deliver quality,
              reliability, and innovation all in one place.
            </p>
          </CardContent>
        </Card>

        {/* What We Do */}
        <Card>
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Cpu className="h-6 w-6 text-primary"/>
              <h2 className="text-2xl font-bold text-primary">What We Do</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              At TechShop, we provide a wide range of tech products including
              laptops, PCs, mobile accessories, gaming gear, and more. Our goal
              is to make technology accessible for everyone – whether you’re a
              student, professional, gamer, or entrepreneur.
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
              Our mission is to empower individuals and businesses by providing
              cutting-edge technology, excellent customer service, and inspiring
              innovation in everyday life. We are committed to making TechShop
              your trusted partner in technology.
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
