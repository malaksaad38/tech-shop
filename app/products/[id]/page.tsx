'use client'

import React, {use, useEffect, useState} from 'react'
import Link from 'next/link'
import ProductDetailCard from '@/components/ProductDetailCard'
import axios from 'axios'

const DISCOUNT_RATE = 0.2

const isIndependenceDayPK = () => {
  const nowPk = new Date(
    new Date().toLocaleString('en-US', {timeZone: 'Asia/Karachi'})
  )
  return nowPk.getMonth() === 7 && nowPk.getDate() === 14
}

export default function ProductItem({params}: { params: Promise<{ id: string }> }) {
  const {id} = use(params) // ✅ unwrap Promise params

  const independenceDay = isIndependenceDayPK()
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 p-6">
      {independenceDay && (
        <div className="bg-green-700 text-white text-center py-4 shadow-md rounded-lg mb-6">
          <h1 className="text-2xl font-extrabold flex items-center justify-center gap-2">
            Happy Independence Day Pakistan! 🎉
          </h1>
          <p className="text-sm mt-1">
            Celebrating Freedom Since 1947 – Enjoy {DISCOUNT_RATE * 100}% OFF!
          </p>
        </div>
      )}

      <div className="mb-4">
        <Link
          href="/products"
          className="inline-block bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="flex items-center justify-center">
        {loading ? (
          <p className="text-green-700">Loading product...</p>
        ) : product ? (
          <ProductDetailCard product={product}/>
        ) : (
          <p className="text-red-600">Product not found.</p>
        )}
      </div>
    </div>
  )
}
