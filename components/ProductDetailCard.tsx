"use client"

import React from "react"
import FavoriteButton from "@/components/FavoriteButton"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ImageIcon, ShoppingCart} from "lucide-react"
import {motion} from "motion/react"
import {useCart} from "@/store/useCart";
import {useRouter} from "next/navigation";

type Product = {
  _id: string | number
  name: string
  price: number
  image: string
  description?: string
  special?: boolean
  percentage?: number
  category?: { _id: string; name: string; value: string } | string
}

interface ProductDetailsCardProps {
  product: Product
}

const formatPrice = (price: number) => price.toFixed(2)

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({product}) => {
  const addToCart = useCart((state) => state.addToCart) // ✅ Zustand hook

  const router = useRouter()

  // Check for discount
  const hasDiscount = product.special && product.percentage && product.percentage > 0
  const discounted = hasDiscount
    ? product.price * (1 - product.percentage! / 100)
    : product.price

  return (
    <Card className="max-w-4xl w-full h-full min-h-[60vh] mx-auto overflow-hidden py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Image */}
        <div className="relative">
          {hasDiscount && (
            <Badge className="absolute top-4 left-4 shadow text-white">
              SALE {product.percentage}% OFF
            </Badge>
          )}
          <div className="w-full md:min-h-[60vh] overflow-hidden border">
            {product.image ? (
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full md:min-h-[60vh] object-cover"
                loading="lazy"
                initial={{scale: 1.05}}
                animate={{scale: 1}}
                transition={{duration: 0.8, ease: "easeOut"}}
              />
            ) : (
              <div className="flex justify-center items-center h-48 md:h-[60vh] flex-col">
                <ImageIcon className="size-20"/> No Image
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, ease: "easeOut"}}
        >
          <CardContent className="flex flex-col justify-between h-full p-6">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-3xl font-bold">
                {product.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Category:{" "}
                {typeof product.category === "object"
                  ? product.category.name
                  : product.category || "Other"}
              </p>

              <CardDescription className="text-base leading-relaxed">
                {product.description || "No Description..."}
              </CardDescription>
            </CardHeader>

            <div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary/80">
                  ${formatPrice(discounted)}
                </span>
                {hasDiscount && (
                  <span className="ml-3 line-through text-muted-foreground">
                    ${formatPrice(product.price)}
                  </span>
                )}
              </div>
              <div className="flex gap-2 justify-center items-center">
                <Button
                  className="flex-1"
                  onClick={() => {
                    addToCart({...product, price: discounted})
                    router.push("/checkout")
                  }
                  }
                >
                  Buy Now
                </Button>

                {/* ✅ Add to Cart button */}
                <Button
                  variant="secondary"
                  className="flex-1 flex items-center gap-2"
                  onClick={() =>
                    addToCart({...product, price: discounted})
                  }
                >
                  <ShoppingCart className="w-4 h-4"/> Add to Cart
                </Button>

                <FavoriteButton
                  product={{
                    _id: product._id,
                    name: product.name,
                    price: discounted,
                    image: product.image,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </motion.div>
      </div>
    </Card>
  )
}

export default ProductDetailsCard
