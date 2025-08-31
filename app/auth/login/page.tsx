"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {refresh} = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/customers/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save token + customer in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("customer", JSON.stringify(data.customer));

      refresh()
      router.push("/auth/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="w-full max-w-md bg-card p-6 rounded-xl shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-center text-sm mt-4 text-muted-foreground">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
