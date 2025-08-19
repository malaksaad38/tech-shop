"use client"

import React from "react"
import {sendWhatsAppMessage} from "../utils/whatsapp"
import Favorite from "@/components/favorite"

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"

type Product = {
  _id: string | number
  name: string
  price: number
  image: string
  description?: string
}

interface ProductDetailsCardProps {
  product: Product
  discount?: boolean
  discountTitle?: string
  discountRate?: number
}

const formatPrice = (price: number) => price.toFixed(2)

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
                                                                 product,
                                                                 discount = false,
                                                                 discountTitle = "Special Offer",
                                                                 discountRate = 0.14,
                                                               }) => {
  const discounted = discount ? product.price * (1 - discountRate) : product.price

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="relative">
          {discount && (
            <Badge className="absolute top-4 left-4  shadow">
              {discountTitle}
            </Badge>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image || "/imageIcon.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <CardContent className="flex flex-col justify-between p-6">
          <div>
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-3xl font-bold ">
                {product.name}
              </CardTitle>
              {product.description && (
                <CardDescription className="text-base leading-relaxed ">
                  {product.description}
                </CardDescription>
              )}
            </CardHeader>

            {/* Price */}
            <div className="mb-4">
              <span className="text-3xl font-bold t">
                ${formatPrice(discounted)}
              </span>
              {discount && (
                <span className="ml-3 line-through ">
                  ${formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
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
        </CardContent>
      </div>
    </Card>
  )
}

export default ProductDetailsCard
