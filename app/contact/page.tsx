"use client"

import React, {useState} from "react"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {ArrowLeft, Mail, MessageCircle, MessageSquare, User,} from "lucide-react"
import {motion} from "framer-motion"
import {useCheckedLocale} from "@/lib/client-utils"
import Globe from "@/components/Globe";

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
                    className={"cursor-target"}
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
              <ArrowLeft/>
              {t("backHome")}
            </Link>
          </Button>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="shadow-md hover:shadow-lg transition-all text-center">
            <CardContent className="p-6 flex flex-col items-center">
              <Mail className="h-8 w-8 text-primary mb-3"/>
              <h3 className="font-semibold">{t("emailUs")}</h3>
              <p className="text-sm text-muted-foreground">{t("emailValue")}</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-all text-center">
            <CardContent className="p-6 flex flex-col items-center">
              <MessageCircle className="h-8 w-8 text-primary mb-3"/>
              <h3 className="font-semibold">{t("whatsapp")}</h3>
              <p className="text-sm text-muted-foreground">{t("whatsappValue")}</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-all text-center">
            <CardContent className="p-6 flex flex-col items-center">
              <User className="h-8 w-8 text-primary mb-3"/>
              <h3 className="font-semibold">{t("office")}</h3>
              <p className="text-sm text-muted-foreground">{t("officeValue")}</p>
            </CardContent>
          </Card>
        </motion.div>


        {/* Google Map */}
        <motion.div variants={fadeUp} className="mt-12 ">
          <h2 className="text-xl font-semibold mb-4">{t("findUs")}</h2>
          <div className="w-full h-64 rounded-xl overflow-hidden bg-black">
            {/*<iframe*/}
            {/*  src="https://www.google.com/maps/embed?pb=..."*/}
            {/*  width="100%"*/}
            {/*  height="100%"*/}
            {/*  style={{border: 0}}*/}
            {/*  allowFullScreen*/}
            {/*  loading="lazy"*/}
            {/*></iframe>*/}
            <Globe autoRotateSpeed={0.05} zoom
                   pins={[{
                     lon: 72.8,
                     lat: 34,
                     name: "Pakistan",
                     address: "KPK, Peshawar. Street 88.",
                     phone: "+92301493453"
                   }]}
            />
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={fadeUp} className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t("faqTitle")}</h2>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold">{t("faqQ1")}</h3>
              <p className="text-sm text-muted-foreground">{t("faqA1")}</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold">{t("faqQ2")}</h3>
              <p className="text-sm text-muted-foreground">{t("faqA2")}</p>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div variants={fadeUp} className="mt-16 text-center">
          <h2 className="text-2xl font-bold">{t("newsletterTitle")}</h2>
          <p className="text-sm text-muted-foreground mb-4">{t("newsletterDesc")}</p>
          <form className="flex flex-col md:flex-row gap-3 justify-center">
            <Input
              type="email"
              placeholder={t("newsletterPlaceholder")}
              className="max-w-sm"
            />
            <Button type="submit" className="shadow-md hover:shadow-lg">
              {t("subscribe")}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Contact
