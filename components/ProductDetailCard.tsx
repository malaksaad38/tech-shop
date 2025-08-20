"use client"

import React from "react"
import {sendWhatsAppMessage} from "../utils/whatsapp"
import Favorite from "@/components/favorite"

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ImageIcon} from "lucide-react"

type Product = {
  _id: string | number
  name: string
  price: number
  image: string
  description?: string
  special?: boolean
  percentage?: number
}

interface ProductDetailsCardProps {
  product: Product
}

const formatPrice = (price: number) => price.toFixed(2)

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({product}) => {
  // check for discount from product model
  const hasDiscount = product.special && product.percentage && product.percentage > 0
  const discounted = hasDiscount
    ? product.price * (1 - product.percentage! / 100)
    : product.price

  return (
    <Card className="max-w-4xl w-full h-full min-h-[60vh] mx-auto overflow-hidden py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Product Image */}
        <div className="relative">
          {hasDiscount && (
            <Badge className="absolute top-4 left-4 shadow">
              SALE {product.percentage}% OFF
            </Badge>
          )}
          <div className="w-full md:min-h-[60vh] overflow-hidden border">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full md:min-h-[60vh] object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex justify-center items-center h-48 md:h-[60vh] flex-col">
                <ImageIcon className="size-20"/> No Image
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="flex flex-col justify-between h-full p-6">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-3xl font-bold ">
              {product.name}
            </CardTitle>
            {product.description ? (
              <CardDescription className="text-base leading-relaxed ">
                {product.description}
              </CardDescription>
            ) : (
              <CardDescription className="text-base italic leading-relaxed ">
                No Description...
              </CardDescription>
            )}
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
                onClick={() =>
                  sendWhatsAppMessage({...product, price: discounted})
                }
              >
                Buy Now
              </Button>
              <Favorite/>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default ProductDetailsCard
