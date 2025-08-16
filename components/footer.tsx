import React from 'react';
import Link from 'next/link';

const IndependenceDayFooter = () => {
  return (
    <footer className="bg-green-700 text-white ">
      {/* Celebration Banner */}
      <div className="bg-green-800 py-2 text-center text-sm">
        14th August — Celebrating Pakistan's Independence Day since 1947 🎉
      </div>

      {/* Footer Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-4">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">PakShop</h3>
          <p className="text-sm text-green-100">
            Bringing you the best products with love for Pakistan. Let's celebrate
            our freedom with style and pride!
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-yellow-300 transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-yellow-300 transition">Products</Link></li>
            <li><Link href="/about" className="hover:text-yellow-300 transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="hover:text-yellow-300 transition">📘</a>
            <a href="#" className="hover:text-yellow-300 transition">🐦</a>
            <a href="#" className="hover:text-yellow-300 transition">📸</a>
            <a href="#" className="hover:text-yellow-300 transition">▶️</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-900 py-3 text-center text-sm text-green-200">
        &copy; {new Date().getFullYear()} PakShop. Made with ❤️ by dragondevs.
      </div>
    </footer>
  );
};

export default IndependenceDayFooter;
