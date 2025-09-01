"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
  ChevronsRightIcon,
  ClipboardList,
  Grid2X2PlusIcon,
  Home as HomeIcon,
  PackagePlusIcon,
  PlusIcon,
  User2Icon,
} from "lucide-react";

export default function AdminLayout({children}: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState("100vh");

  // Set dynamic height to avoid mobile browser UI resizing issues
  useEffect(() => {
    const handleResize = () => {
      // Use dvh (dynamic viewport height) where supported, fallback to vh
      const height = window.visualViewport ? `${window.visualViewport.height}px` : "100dvh";
      setViewportHeight(height);
    };

    handleResize(); // Set initial height
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize); // Mobile rotation

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Hamburger Button */}
      {!sidebarOpen && (
        <div className="md:hidden fixed inset-y-0 left-0 z-40 w-1">
          <Button
            variant="outline"
            className="h-full w-full rounded-none bg-transparent hover:bg-transparent focus-visible:bg-transparent cursor-pointer pl-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <ChevronsRightIcon/>
          </Button>

        </div>
      )}

      {/* Sidebar */}
      <aside
        style={{height: viewportHeight}}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:static
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Backdrop Overlay (on mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar Content */}
        <div className="relative z-40 flex flex-col w-full h-full">
          {/* Logo/Header */}
          <div className="px-6 py-6 text-lg font-bold flex items-center gap-2 border-b bg-background mt-[81px] md:mt-0">
            <HomeIcon className="w-5 h-5 text-primary"/> Admin Panel
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            <Link href="/admin" onClick={() => setSidebarOpen(false)}>
              <Button variant="ghost" className="justify-start w-full flex items-center gap-2">
                <HomeIcon className="w-4 h-4"/> Dashboard
              </Button>
            </Link>

            <Link href="/admin/orders" onClick={() => setSidebarOpen(false)}>
              <Button variant="ghost" className="justify-start w-full flex items-center gap-2">
                <ClipboardList className="w-4 h-4"/> Orders
              </Button>
            </Link>
            <Link href="/admin/customers" onClick={() => setSidebarOpen(false)}>
              <Button
                variant="ghost"
                className="justify-start w-full flex items-center gap-2"
                onClick={() => setSidebarOpen(false)}
              >
                <User2Icon className="w-4 h-4"/>
                Customers
              </Button>
            </Link>

            <Link href="/admin/categories/create" onClick={() => setSidebarOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-between items-center"
                onClick={() => setSidebarOpen(false)}
              >

            <span className="flex items-center gap-2">
            <Grid2X2PlusIcon className="w-4 h-4"/>
            Categories
              </span>
                <PlusIcon className="w-4 h-4"/>
              </Button>
            </Link>

            <Link href="/admin/products/create" onClick={() => setSidebarOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-between items-center"
                onClick={() => setSidebarOpen(false)}
              >
            <span className="flex items-center gap-2">
            <PackagePlusIcon className="w-4 h-4"/>
             Products
            </span>
                <PlusIcon className="w-4 h-4"/>
              </Button>
            </Link>

          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-4 md:p-6 overflow-auto transition-all duration-300"
        style={{minHeight: viewportHeight}}
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        {children}
      </main>
    </div>
  );
}