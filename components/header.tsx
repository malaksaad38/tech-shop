'use client'
import React, {useState} from "react";
import Link from "next/link";
import {Menu, X} from "lucide-react"; // icons for hamburger

const IndependenceDayHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-700 text-white shadow-lg">
      {/* Top Banner */}
      <div className="bg-green-800 text-center py-1 text-sm tracking-wide">
        🎉 14th August — Celebrating Pakistan's Independence Day! 🇵🇰
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-2xl"
        >
          <span className="text-white">🇵🇰 PakShop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-white font-medium">
          <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link href="/products" className="hover:text-yellow-300 transition">Products</Link>
          <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
          <Link href="/contact" className="hover:text-yellow-300 transition">Contact</Link>
        </nav>

        {/* Action Button (Desktop) */}
        <div className="hidden md:block">
          <Link
            href="/special-offers"
            className="bg-yellow-400 text-green-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            Special Offers 🎁
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-green-800 text-white flex flex-col gap-4 px-6 py-4 absolute z-20 w-full">
          <Link href="/" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" className="hover:text-yellow-300 transition"
                onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/about" className="hover:text-yellow-300 transition"
                onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="hover:text-yellow-300 transition"
                onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link
            href="/special-offers"
            className="bg-yellow-400 text-green-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition text-center"
            onClick={() => setMenuOpen(false)}
          >
            Special Offers 🎁
          </Link>
        </div>
      )}
    </header>
  );
};

export default IndependenceDayHeader;
