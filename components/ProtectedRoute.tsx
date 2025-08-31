"use client";

import {ReactNode} from "react";
import {useAuth} from "@/hooks/useAuth";

export default function ProtectedRoute({children}: { children: ReactNode }) {
  const {customer, loading} = useAuth(true);

  if (loading) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  if (!customer) {
    return null; // Redirect handled in hook
  }

  return <>{children}</>;
}
