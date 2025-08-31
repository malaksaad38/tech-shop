"use client";

import React, {createContext, useCallback, useContext, useEffect, useState,} from "react";
import {useRouter} from "next/navigation";

type Customer = {
  _id?: string;
  name?: string;
  email?: string;
  [k: string]: any;
};

type AuthContextType = {
  customer: Customer | null;
  loading: boolean;
  login: (customer: Customer, token: string) => void;
  logout: () => void;
  refresh: () => void; // verifies token+customer from localStorage and updates state
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    try {
      const token = localStorage.getItem("token");
      const stored = localStorage.getItem("customer");
      if (!token || !stored) {
        setCustomer(null);
        return;
      }
      const parsed = JSON.parse(stored);
      setCustomer(parsed);
    } catch {
      setCustomer(null);
    }
  }, []);

  const login = useCallback((customerData: Customer, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("customer", JSON.stringify(customerData));
    setCustomer(customerData); // instantly updates all consumers
    refresh(); // optional: sync with localStorage source of truth
  }, [refresh]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    setCustomer(null);
    router.push("/auth/login");
  }, [router]);

  useEffect(() => {
    // initialize from localStorage on first mount
    refresh();
    setLoading(false);
  }, [refresh]);

  const value: AuthContextType = {customer, loading, login, logout, refresh};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(requireAuth = false) {
  const ctx = useContext(AuthContext);
  const router = useRouter();
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");

  useEffect(() => {
    if (!requireAuth) return;
    if (!ctx.loading && !ctx.customer) router.push("/auth/login");
  }, [requireAuth, ctx.loading, ctx.customer, router]);

  return ctx;
}
