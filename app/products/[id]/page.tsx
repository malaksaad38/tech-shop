"use client"

import React, {use, useEffect, useState} from "react"
import axios from "axios"
import ProductDetailCard from "@/components/ProductDetailCard"

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Skeleton} from "@/components/ui/skeleton"
import {ArrowLeft, Flag} from "lucide-react"
import {useRouter} from "next/navigation";

const DISCOUNT_RATE = 0.2

const isIndependenceDayPK = () => {
  const nowPk = new Date(
    new Date().toLocaleString("en-US", {timeZone: "Asia/Karachi"})
  )
  return nowPk.getMonth() === 7 && nowPk.getDate() === 14
}

export default function ProductItem({
                                      params,
                                    }: {
  params: Promise<{ id: string }>
}) {
  const {id} = use(params) // ✅ unwrap Promise params

  const independenceDay = isIndependenceDayPK()
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  return (
    <div className="min-h-screen bg-background p-6">
      {/* 🎉 Independence Day Banner */}
      {independenceDay && (
        <Alert className="mb-6 ">
          <Flag className="h-5 w-5"/>
          <AlertTitle className="font-extrabold">
            Happy Independence Day Pakistan!
          </AlertTitle>
          <AlertDescription>
            Celebrating Freedom Since 1947 – Enjoy {DISCOUNT_RATE * 100}% OFF!
          </AlertDescription>
        </Alert>
      )}

      {/* Back Button */}
      <div className="mb-4">
        <Button variant="default" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4"/>
          Back

        </Button>
      </div>

      {/* Product Section */}
      <div className="flex items-center justify-center">
        {loading ? (
          <Card className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Skeleton */}
              <div className="p-6 flex items-center justify-center">
                <Skeleton className="h-64 w-64 rounded-lg"/>
              </div>

              {/* Details Skeleton */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <Skeleton className="h-8 w-2/3 mb-4"/> {/* Title */}
                  <Skeleton className="h-4 w-full mb-2"/> {/* Line 1 */}
                  <Skeleton className="h-4 w-5/6 mb-2"/> {/* Line 2 */}
                  <Skeleton className="h-4 w-2/3 mb-4"/> {/* Line 3 */}
                </div>

                <div>
                  <Skeleton className="h-8 w-32 mb-4"/> {/* Price */}
                  <div className="flex gap-4">
                    <Skeleton className="h-12 w-40 rounded-lg"/> {/* Buy button */}
                    <Skeleton className="h-12 w-12 rounded-full"/> {/* FavoriteButton */}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : product ? (
          <ProductDetailCard product={product}/>
        ) : (
          <Alert variant="destructive" className="max-w-md">
            <AlertTitle>Product not found</AlertTitle>
            <AlertDescription>
              The product you are looking for does not exist.
            </AlertDescription>
          </Alert>
        )}

      </div>
    </div>
  )
}
