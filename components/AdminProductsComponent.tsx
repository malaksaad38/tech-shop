"use client"

import React, {useEffect, useMemo, useState} from "react"
import axios from "axios"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {Grid2X2PlusIcon, ImageIcon, Loader2, PackagePlusIcon, Pencil, Trash2,} from "lucide-react"
import {Badge} from "@/components/ui/badge"

type ProductType = {
  _id: string
  name: string
  price: number
  image?: string
  description?: string
  createdAt: string
  special?: boolean
  percentage?: number
  category?: { _id: string; name: string; value: string } | string
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
      console.error("Error fetching products:", err)
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
      setProducts(products.filter((p) => p._id !== id))
    } catch (err) {
      console.error("Error deleting product:", err)
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Products</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <Input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <div className="text-sm text-muted-foreground flex justify-center items-center gap-6">
              <span>{products?.length} Items</span>
              <div className="flex justify-center items-center gap-2">
                <Link href="/admin/categories/create">
                  <Button size="icon" title="Create Category">
                    <Grid2X2PlusIcon/>
                  </Button>
                </Link>
                <Link href="/admin/products/create">
                  <Button size="icon" title="Create Product">
                    <PackagePlusIcon/>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Special Offer</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                        ) : (
                          <div
                            className="flex justify-center items-center border w-10 h-10 object-cover bg-muted rounded-md">
                            <ImageIcon className="size-5"/>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>

                      {/* ✅ Category */}
                      <TableCell>
                        {typeof product.category === "object"
                          ? product.category.name
                          : product.category || "-"}
                      </TableCell>

                      <TableCell>${product.price}</TableCell>

                      {/* ✅ Special Offer */}
                      <TableCell>
                        {product.special ? (
                          <Badge variant="destructive">
                            {product.percentage
                              ? `${product.percentage}% OFF`
                              : "Special"}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>

                      <TableCell>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-right space-x-2">
                        <Link href={`/admin/products/edit/${product._id}`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-1"/> Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1"/> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminProductsComponent
