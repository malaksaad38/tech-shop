"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";
import {Lock, Mail, User} from "lucide-react";
import {useTranslations} from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("registerPage");
  const router = useRouter();
  const [form, setForm] = useState({name: "", email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/customers/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("registerFailed"));
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br">
      <motion.div
        initial={{opacity: 0, y: 40}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, ease: "easeOut"}}
        className="w-full max-w-md bg-card p-8 rounded-2xl shadow-xl"
      >
        {/* Title */}
        <motion.h1
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
          className="text-3xl font-bold mb-6 text-center text-foreground"
        >
          {t("create")}
        </motion.h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 0.2}}
            className="space-y-1"
          >
            <Label htmlFor="name">{t("name")}</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={t("namePlaceholder")}
                className="pl-9"
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 0.3}}
            className="space-y-1"
          >
            <Label htmlFor="email">{t("email")}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder={t("emailPlaceholder")}
                className="pl-9"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 0.4}}
            className="space-y-1"
          >
            <Label htmlFor="password">{t("password")}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder={t("passwordPlaceholder")}
                className="pl-9"
              />
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.5}}
          >
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("loading") : t("register")}
            </Button>
          </motion.div>
        </form>

        {/* Link */}
        <motion.p
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.6}}
          className="text-center text-sm mt-6 text-muted-foreground"
        >
          {t("haveAccount")}{" "}
          <a
            href="/auth/login"
            className="text-primary font-medium hover:underline"
          >
            {t("login")}
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
