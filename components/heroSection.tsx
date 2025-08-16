'use client';
import React from 'react';
import Link from 'next/link';
import products from '@/data/products.json';
import ProductCard from "@/components/ProductCard";

const IndependenceDayHeroWithProducts = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-700 to-green-900 text-white py-20">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/2560px-Flag_of_Pakistan.svg.png')] bg-cover bg-center opacity-10"></div>

        {/* Content */}
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 flex items-center justify-center gap-2">
            Happy Independence Day Pakistan!
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-8">
            Celebrating freedom, unity, and pride since 14th August 1947.
            Shop our exclusive Independence Day deals and spread the green love!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-green-100 transition"
            >
              🛍️ Shop Now
            </Link>
            <Link
              href="/about"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition"
            >
              📜 Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Featured Products 🎁
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard product={product}/>
          ))}

        </div>
      </section>
    </div>
  );
};

export default IndependenceDayHeroWithProducts;
