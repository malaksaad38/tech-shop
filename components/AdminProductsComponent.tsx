'use client'
import React, {useEffect, useMemo, useState} from 'react'
import axios from "axios"
import Link from "next/link"

type ProductType = {
  _id: string
  name: string
  price: number
  image?: string
  description?: string
  createdAt: string
}

const AdminProductsComponent = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get<ProductType[]>("/api/products")
      setProducts(response.data)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      await axios.delete(`/api/products/${id}`)
      setProducts(products.filter(p => p._id !== id)) // remove from state
    } catch (err) {
      console.error("Error deleting product:", err)
    }
  }

  // Filtered products by search
  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          className="border border-gray-300 rounded px-3 py-2 w-full"
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={"w-32 text-center"}>{products && products.length} Items</div>
        <Link href="/admin/products/create">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded  sm:w-32">
            <span className={"hidden sm:inline "}>Create</span> New
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-200">
            <thead>
            <tr className="bg-gray-900 text-left">
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
            </thead>
            <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-800">
                <td className="py-2 px-4 border-b">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded"/>
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">${product.price}</td>
                <td className="py-2 px-4 border-b">{new Date(product.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <Link href={`/admin/products/edit/${product._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminProductsComponent
