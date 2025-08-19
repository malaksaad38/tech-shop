"use client";
import React from "react";
import Link from "next/link";
import {sendWhatsAppMessage} from "../utils/whatsapp";
import Favorite from "@/components/favorite";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";

interface ProductCardProps {
  product: any;
  discount?: boolean; // 🎉 show sale ribbon + discount
  discountTitle?: string; // 🎉 show sale ribbon + discount
  discountRate?: number; // e.g. 0.14 = 14% off
  showFavorite?: boolean; // show/hide Favorite button
  showBuyNow?: boolean; // show/hide Buy Now
}

const formatPrice = (price: number) => price.toFixed(2);

const ProductCard: React.FC<ProductCardProps> = ({
                                                   product,
                                                   discount = true,
                                                   discountTitle = "14% SALE",
                                                   discountRate = 0.14, // default 14% off
                                                   showFavorite = true,
                                                   showBuyNow = true,
                                                 }) => {
  const discounted = discount
    ? product.price * (1 - discountRate)
    : product.price;

  return (
    <Card key={product._id}
          className="relative overflow-hidden md:pb-6 p-0 transition hover:border hover:border-primary">
      {/* Ribbon */}
      {discount && (
        <div className="absolute -right-10 top-4 rotate-45 text-xs font-bold px-10 py-1 shadow bg-primary">
          {discountTitle}
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden border-b ">
        <img
          src={product.image || "/imageIcon.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <CardHeader>
        <CardTitle>
          <Link
            href={`/products/${product._id}`}
            className="text-lg font-bold text-foreground hover:underline hover:text-primary"
          >
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold">
            ${formatPrice(discounted)}
          </span>
          {discount && (
            <span className="text-sm line-through text-primary">
              ${formatPrice(product.price)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-3">
        {showBuyNow && (
          <Button
            className="flex-1"
            onClick={() =>
              sendWhatsAppMessage({...product, price: discounted})
            }
            aria-label={`Buy ${product.name} now`}
          >
            Buy Now
          </Button>
        )}
        {showFavorite && <Favorite/>}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
