"use client";
import React from "react";
import Link from "next/link";
import {ImageIcon, ShoppingCart} from "lucide-react";
import {motion} from "framer-motion";
import {useCart} from "@/store/useCart";
import FavoriteButton from "@/components/FavoriteButton";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

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
  const t = useTranslations("ProductCard");
  const hasDiscount = product.special && product.percentage > 0;
  const discounted = hasDiscount
    ? product.price * (1 - product.percentage / 100)
    : product.price;

  const cardVariants = {
    hidden: {opacity: 0, y: 40, scale: 0.95},
    visible: {opacity: 1, y: 0, scale: 1},
  };
  const {addToCart} = useCart();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.4, ease: "easeOut"}}
      whileHover={{
        scale: 1.03,
        y: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
      className="relative rounded-3xl cursor-pointer bg-background shadow-sm border flex flex-col h-full overflow-hidden hover:border hover:border-primary"
    >
      {/* SALE Ribbon */}
      {hasDiscount && (
        <motion.div
          initial={{opacity: 0, y: -10}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0.2, duration: 0.4}}
          viewport={{once: true}}
          className="absolute -right-12 top-5 rotate-45 text-xs font-bold px-10 py-1 shadow bg-primary text-foreground z-20"
        >
          {t("sale")} {product.percentage}% {t("off")}
        </motion.div>
      )}

      {/* Product Image */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{delay: 0.3, duration: 0.5}}
        viewport={{once: true}}
        className="w-full h-48 overflow-hidden border-b relative"
      >
        {product.image ? (
          <motion.img
            whileHover={{scale: 1.05}}
            transition={{duration: 0.4}}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex justify-center items-center h-48 flex-col">
            <ImageIcon className="size-20"/> {t("noImage")}
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{delay: 0.4, duration: 0.5}}
        viewport={{once: true}}
        className="flex flex-col flex-1 p-4 gap-1"
      >
        <Link
          href={`/products/${product._id}`}
          className="text-lg font-bold text-foreground hover:underline hover:text-primary"
        >
          {product.name}
        </Link>

        {/* Category */}
        {product.category ? (
          <p className="text-sm text-muted-foreground mt-1">
            {typeof product.category === "object"
              ? product.category.name
              : product.category}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground mt-1">{t("other")}</p>
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
        <motion.div className="flex justify-between gap-3 mt-4">
          <Button
            className="flex-1"
            onClick={() =>
              addToCart({
                _id: product._id,
                name: product.name,
                price: discounted,
                image: product.image,
              })
            }
          >
            <ShoppingCart className="w-4 h-4"/>
            {t("addToCart")}
          </Button>

          {showFavorite && (
            <FavoriteButton
              product={{
                _id: product._id,
                name: product.name,
                price: discounted,
                image: product.image,
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
