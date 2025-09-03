"use client";

import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Loader2, LogOut, Mail, MapPin, Phone, Save, ShoppingBag, User} from "lucide-react";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";

export default function ProfilePage() {
  const {customer, login, logout, loading} = useAuth(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const t = useTranslations("profilePage");

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
      });
    }
  }, [customer]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSave = async () => {
    if (!customer?._id) {
      alert(t("noId"));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/customers/${customer._id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(t("updateFailed"));

      const updated = await res.json();
      login(updated, localStorage.getItem("token") || "");
      alert(t("updateSuccess"));
    } catch (error) {
      console.error(error);
      alert(t("saveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-10 px-4">
      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.3, ease: "easeOut"}}
        className="bg-card shadow-md rounded-2xl p-6 border"
      >
        <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
            <Input
              name="name"
              placeholder={t("name")}
              value={form.name}
              onChange={handleChange}
              className="pl-9"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
            <Input
              name="email"
              placeholder={t("email")}
              value={form.email}
              onChange={handleChange}
              disabled
              className="pl-9"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
            <Input
              name="phone"
              placeholder={t("phone")}
              value={form.phone}
              onChange={handleChange}
              className="pl-9"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
            <Input
              name="address"
              placeholder={t("address")}
              value={form.address}
              onChange={handleChange}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <Button onClick={handleSave} disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2"/>
            {t("save")}
            {isSubmitting && <Loader2 className="animate-spin h-4 w-4 ml-2"/>}
          </Button>

          <Button
            variant="secondary"
            onClick={() => router.push(`/auth/orders`)}
            className="flex items-center"
          >
            <ShoppingBag className="h-4 w-4 mr-2"/>
            {t("orders")}
          </Button>

          <Button variant="outline" onClick={logout} className="flex items-center">
            <LogOut className="h-4 w-4 mr-2"/>
            {t("logout")}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
