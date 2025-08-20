"use client";
import React from "react";
import Link from "next/link";
import {sendWhatsAppMessage} from "../utils/whatsapp";
import Favorite from "@/components/favorite";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {ImageIcon} from "lucide-react";

interface ProductCardProps {
  product: any;
  showFavorite?: boolean; // show/hide Favorite button
  showBuyNow?: boolean; // show/hide Buy Now
}

const formatPrice = (price: number) => price.toFixed(2);

const ProductCard: React.FC<ProductCardProps> = ({
                                                   product,
                                                   showFavorite = true,
                                                   showBuyNow = true,
                                                 }) => {
  // check if product has special discount
  const hasDiscount = product.special && product.percentage > 0;
  const discounted = hasDiscount
    ? product.price * (1 - product.percentage / 100)
    : product.price;

  return (
    <Card
      key={product._id}
      className="relative overflow-hidden md:pb-6 pb-6 px-0 pt-0 transition hover:border hover:border-primary"
    >
      {/* Ribbon */}
      {hasDiscount && (
        <div
          className="absolute -right-12 top-5 rotate-45 text-xs font-bold px-10 py-1 shadow bg-primary text-white">
          SALE {product.percentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden border-b">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex justify-center items-center h-48 flex-col">
            <ImageIcon className="size-20"/> No Image
          </div>
        )}
      </div>

      <CardContent>
        <Link
          href={`/products/${product._id}`}
          className="text-lg font-bold text-foreground hover:underline hover:text-primary"
        >
          {product.name}
        </Link>
        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-2xl font-extrabold text-primary/80">
            ${formatPrice(discounted)}
          </span>
          {hasDiscount && (
            <span className="text-sm font-bold line-through text-muted-foreground">
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
