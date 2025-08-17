"use client";
import React from "react";
import {sendWhatsAppMessage} from "../utils/whatsapp";
import Favorite from "@/components/favorite";

type Product = {
  _id: string | number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

interface ProductDetailsCardProps {
  product: Product;
  discount?: boolean;
  discountTitle?: string;
  discountRate?: number;
}

const formatPrice = (price: number) => price.toFixed(2);

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
                                                                 product,
                                                                 discount = false,
                                                                 discountTitle = "Special Offer",
                                                                 discountRate = 0.14,
                                                               }) => {
  const discounted = discount
    ? product.price * (1 - discountRate)
    : product.price;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-green-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="relative">
          {discount && (
            <span className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-4 py-1 rounded shadow">
              {discountTitle}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-3">
              {product.name}
            </h1>
            {product.description && (
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {product.description}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-4xl font-extrabold text-green-700">
              ${formatPrice(discounted)}
            </span>
            {discount && (
              <span className="ml-3 text-lg line-through text-green-600/70">
                ${formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() =>
                sendWhatsAppMessage({...product, price: discounted})
              }
              className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-800 transition"
            >
              Buy Now
            </button>
            <Favorite/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
