"use client"

import React, {useState} from "react"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {ArrowLeft, Mail, MessageCircle, MessageSquare, User} from "lucide-react"
import {motion} from "framer-motion"
import {useCheckedLocale} from "@/lib/client-utils"

const container = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {staggerChildren: 0.2},
  },
}

const fadeUp = {
  hidden: {opacity: 0, y: 30},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.6, ease: "easeOut"},
  },
}

const Contact = () => {
  const [form, setForm] = useState({name: "", email: "", message: ""})
  const {t} = useCheckedLocale()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const phoneNumber = "923015488577"
    const text = `📩 New Contact Message\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n💬 Message: ${form.message}`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`

    window.open(url, "_blank")
    setForm({name: "", email: "", message: ""})
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Banner */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-primary text-foreground text-center py-14 shadow-sm"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {t("contactTitle")}
        </h1>
        <p className="text-base mt-2 opacity-90">{t("contactDesc")}</p>
      </motion.section>

      {/* Contact Form */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.2}}
        className="container mx-auto py-12 max-w-3xl px-4"
      >
        <motion.div variants={fadeUp}>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-primary"/>
                {t("getInTouch")}
              </CardTitle>
              <CardDescription>{t("formDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {/* Name */}
                <motion.div variants={fadeUp} className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground"/>
                    {t("yourName")}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("namePlaceholder")}
                    required
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUp} className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground"/>
                    {t("yourEmail")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("emailPlaceholder")}
                    required
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp} className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground"/>
                    {t("yourMessage")}
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("messagePlaceholder")}
                    rows={5}
                    required
                  />
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUp}>
                  <Button
                    type="submit"
                    className="w-full shadow-md hover:shadow-lg transition-all"
                    size="lg"
                  >
                    <MessageCircle className="mr-2 h-5 w-5"/>
                    {t("sendWhatsapp")}
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Home */}
        <motion.div variants={fadeUp} className="mt-6 text-center">
          <Button asChild variant="default" className="shadow-md hover:shadow-lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4"/>
              {t("backHome")}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Contact
