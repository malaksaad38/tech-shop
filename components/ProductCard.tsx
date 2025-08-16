"use client";
import React from "react";
import Link from "next/link";
import {sendWhatsAppMessage} from "../utils/whatsapp";
import Favorite from "@/components/favorite";

type Product = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

interface ProductCardProps {
  product: Product;
  discount?: boolean; // 🎉 show sale ribbon + discount
  discountTitle?: string; // 🎉 show sale ribbon + discount
  discountRate?: number; // e.g. 0.14 = 14% off
  showFavorite?: boolean; // show/hide Favorite button
  showBuyNow?: boolean; // show/hide Buy Now
}

const formatPrice = (price: number) => price.toFixed(2);

const ProductCard: React.FC<ProductCardProps> = ({
                                                   product,
                                                   discount = false,
                                                   discountTitle = "Friday SALE",
                                                   discountRate = 0.14, // default 14% off
                                                   showFavorite = true,
                                                   showBuyNow = true,
                                                 }) => {
  const discounted = discount
    ? product.price * (1 - discountRate)
    : product.price;

  return (
    <div
      key={product.id}
      className="relative w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-green-400 transition duration-300 border border-green-200 hover:-translate-y-1">
      {/* Ribbon for 14 Aug */}
      {discount && (
        <div className="absolute -right-10 top-4 rotate-45 bg-green-700 text-white text-xs font-bold px-10 py-1 shadow">
          {discountTitle}
        </div>
      )}

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover border-b border-green-200"
        loading="lazy"
      />

      <div className="p-6">
        <Link
          href={`/products/${product.id}`}
          className="text-xl font-bold text-green-700 mb-2 block hover:underline hover:text-blue-600"
        >
          {product.name}
        </Link>
        

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-green-800">
              ${formatPrice(discounted)}
            </span>
            {discount && (
              <span className="text-sm line-through text-green-600/70">
                ${formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          {showBuyNow && (
            <button
              onClick={() => sendWhatsAppMessage({...product, price: discounted})}
              aria-label={`Buy ${product.name} now`}
              className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Buy Now
            </button>
          )}
          {showFavorite && <Favorite/>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
