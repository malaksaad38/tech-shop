"use client"

import React, {useState} from "react"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {ArrowLeft, Mail, MessageCircle, MessageSquare, User} from "lucide-react"

const Contact = () => {
  const [form, setForm] = useState({name: "", email: "", message: ""})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const phoneNumber = "923015488577" // 👈 your WhatsApp number
    const text = `📩 New Contact Message\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n💬 Message: ${form.message}`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`

    window.open(url, "_blank")
    setForm({name: "", email: "", message: ""})
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Banner */}
      <section className="bg-primary text-primary-foreground text-center py-12 shadow-sm">
        <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="text-base mt-2 opacity-90">
          We’d love to hear from you on WhatsApp!
        </p>
      </section>

      {/* Contact Form */}
      <div className="container mx-auto py-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary"/>
              Get in Touch
            </CardTitle>
            <CardDescription>
              Fill out the form below and we’ll connect with you on WhatsApp.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground"/>
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground"/>
                  Your Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground"/>
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={5}
                  required
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg" variant="default">
                <MessageCircle className="mr-2 h-5 w-5"/>
                Send via WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Button asChild variant={"default"}>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4"/>
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Contact
