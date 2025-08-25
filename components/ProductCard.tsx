"use client";
import React from "react";
import Link from "next/link";
import Favorite from "@/components/favorite";
import {ImageIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {sendWhatsAppMessage} from "@/utils/whatsapp";
import {cn} from "@/lib/utils";
import {motion} from "framer-motion";

interface ProductCardProps {
  product: any;
  showFavorite?: boolean;
  showBuyNow?: boolean;
}

const formatPrice = (price: number) => price.toFixed(2);

const ProductCard: React.FC<ProductCardProps> = ({
                                                   product,
                                                   showFavorite = true,
                                                   showBuyNow = true,
                                                 }) => {
  const hasDiscount = product.special && product.percentage > 0;
  const discounted = hasDiscount
    ? product.price * (1 - product.percentage / 100)
    : product.price;

  // gradient animation variants
  const variants = {
    initial: {backgroundPosition: "0 50%"},
    animate: {backgroundPosition: ["0, 50%", "100% 50%", "0 50%"]},
  };

  return (
    <div className="relative p-[4px] group rounded-3xl">
      {/* Glowing animated border */}
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{duration: 5, repeat: Infinity, repeatType: "reverse"}}
        style={{backgroundSize: "400% 400%"}}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{duration: 5, repeat: Infinity, repeatType: "reverse"}}
        style={{backgroundSize: "400% 400%"}}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      {/* Card Content */}
      <div className="relative z-10 rounded-3xl bg-background flex flex-col h-full overflow-hidden">
        {/* Ribbon */}
        {hasDiscount && (
          <div
            className="absolute -right-12 top-5 rotate-45 text-xs font-bold px-10 py-1 shadow bg-primary text-white z-20">
            SALE {product.percentage}% OFF
          </div>
        )}

        {/* Product Image */}
        <div className="w-full h-48 overflow-hidden border-b relative z-10">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex justify-center items-center h-48 flex-col">
              <ImageIcon className="size-20"/> No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-1 relative z-10">
          <Link
            href={`/products/${product._id}`}
            className="text-lg font-bold text-foreground hover:underline hover:text-primary"
          >
            {product.name}
          </Link>

          {/* ✅ Category */}
          {product.category ? (
            <p className="text-sm text-muted-foreground mt-1">
              {typeof product.category === "object"
                ? product.category.name
                : product.category}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">Other</p>
          )}

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

          {/* Footer */}
          <div className="flex justify-between gap-3 mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
