'use client'

import React, {useEffect, useMemo, useState} from 'react'
import ProductCard from '@/components/ProductCard'
import axios from 'axios'

// Discount constants
const DISCOUNT_RATE = 0.20

const isIndependenceDayPK = () => {
  const nowPk = new Date(
    new Date().toLocaleString('en-US', {timeZone: 'Asia/Karachi'})
  )
  return nowPk.getMonth() === 7 && nowPk.getDate() === 14 // August = 7
}

const formatPrice = (n: number) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

// Product type from MongoDB
type ProductType = {
  _id: string
  name: string
  price: number
  description?: string
}

const Products = () => {
  const independenceDay = isIndependenceDayPK()
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await axios.get<ProductType[]>('/api/products')
        setProducts(res.data)
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Handle case where no products are loaded yet
  const prices = products.length > 0 ? products.map((p) => p.price) : [0]
  const absoluteMin = Math.floor(Math.min(...prices))
  const absoluteMax = Math.ceil(Math.max(...prices))

  // UI state
  const [query, setQuery] = useState('')
  const [minPrice, setMinPrice] = useState(absoluteMin)
  const [maxPrice, setMaxPrice] = useState(absoluteMax)
  const [sortBy, setSortBy] = useState('featured')
  const [visible, setVisible] = useState(8)

  // Derived filtered list
  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      const inRange =
        p.price >= (Number(minPrice) || absoluteMin) &&
        p.price <= (Number(maxPrice) || absoluteMax)
      return matchesQuery && inRange
    })

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        list = [...list].sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break // featured = original order
    }
    return list
  }, [query, minPrice, maxPrice, sortBy, products, absoluteMin, absoluteMax])

  const shown = filtered.slice(0, visible)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50">
      {/* Independence Day Banner */}
      {independenceDay && (
        <div className="bg-green-700 text-white text-center p-4 shadow-md">
          <h1 className="text-2xl font-extrabold flex items-center justify-center gap-2">
            Happy Independence Day Pakistan! 🎉
          </h1>
          <p className="text-sm mt-1">
            Celebrating Freedom Since 1947 – Enjoy {DISCOUNT_RATE * 100}% OFF!
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="container mx-auto px-4 pt-8">
        <div className="bg-white/70 backdrop-blur rounded-2xl border border-green-200 p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-green-800 mb-1">
                Search
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg text-black border border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Price Min */}
            <div>
              <label className="block text-sm font-semibold text-green-800 mb-1">
                Min Price
              </label>
              <input
                type="number"
                min={absoluteMin}
                max={maxPrice}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-40 rounded-lg text-black border border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Price Max */}
            <div>
              <label className="block text-sm font-semibold text-green-800 mb-1">
                Max Price
              </label>
              <input
                type="number"
                min={minPrice}
                max={absoluteMax}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-40 rounded-lg text-black border border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-green-800 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-48 rounded-lg text-black border border-green-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
            </div>
          </div>

          {/* Results meta */}
          <div className="mt-3 text-sm text-green-800">
            {loading
              ? 'Loading products...'
              : `Showing ${shown.length} of ${filtered.length} item(s)`}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 container mx-auto mt-6">
        {shown.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>

      {/* Load More */}
      {visible < filtered.length && (
        <div className="flex justify-center pb-10">
          <button
            onClick={() => setVisible((v) => Math.min(v + 8, filtered.length))}
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="container mx-auto px-4 pb-16">
          <div className="text-center bg-white border border-green-200 rounded-2xl p-10 shadow-sm">
            <p className="text-lg text-green-800 font-semibold">
              No products match your filters.
            </p>
            <button
              onClick={() => {
                setQuery('')
                setMinPrice(absoluteMin)
                setMaxPrice(absoluteMax)
                setSortBy('featured')
                setVisible(8)
              }}
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
