'use client'
import React, {useEffect, useState} from 'react'
import {useParams} from 'next/navigation'
import axios from 'axios'
import ProductForm from '@/components/form/ProductForm'
import AdminControl from "@/components/AdminControl";

type Product = {
  _id: string
  name: string
  price: number
  description?: string
  image?: string
}

const Edit = () => {
  const {id} = useParams() // grabs [id] from the URL
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        console.error('Failed to load product:', err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  if (loading) {
    return <p className="p-6">Loading...</p>
  }

  if (!product) {
    return <p className="p-6 text-red-500">Product not found</p>
  }

  return (
    <AdminControl>
      <div className="p-6">
        <ProductForm product={product}/>
      </div>
    </AdminControl>
  )
}

export default Edit
