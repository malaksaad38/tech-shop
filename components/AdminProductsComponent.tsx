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
      const res = await fetch("/api/products")

      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
      }

      const data: ProductType[] = await res.json()
      setProducts(data)
    } catch (err) {
      console.error("Error fetching products:", err)
      setProducts([]) // fallback if error
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
    <div className="container mx-auto  px-3 md:px-0 pl-8">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-lg md:text-xl">Manage Products</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/categories/create">
              <Button size="icon">
                <Grid2X2PlusIcon/>

              </Button>
            </Link>
            <Link href="/admin/products/create">
              <Button size="icon">
                <PackagePlusIcon/>
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          {/* Search + Item count */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
            <Input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:max-w-sm"
            />
            <span className="text-sm text-muted-foreground">
              {products?.length} Items
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block rounded-md border overflow-x-auto">
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
                            <div className="flex justify-center items-center border w-10 h-10 bg-muted rounded-md">
                              <ImageIcon className="size-5"/>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>

                        <TableCell>
                          {typeof product.category === "object"
                            ? product.category.name
                            : product.category || "-"}
                        </TableCell>

                        <TableCell>${product.price}</TableCell>

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
                            <Button variant="outline" size="icon">
                              <Pencil/>
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Trash2/>
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

              {/* Mobile Card View */}
              <div className="grid gap-4 md:hidden">
                {paginatedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border rounded-lg p-4 flex flex-col gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-md"
                        />
                      ) : (
                        <div className="flex justify-center items-center border w-14 h-14 bg-muted rounded-md">
                          <ImageIcon className="size-6"/>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {typeof product.category === "object"
                            ? product.category.name
                            : product.category || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm flex flex-col gap-1">
                      <p>
                        Price:{" "}
                        <span className="font-semibold">${product.price}</span>
                      </p>
                      <p>
                        {product.special ? (
                          <Badge variant="destructive">
                            {product.percentage
                              ? `${product.percentage}% OFF`
                              : "Special"}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">No Offer</span>
                        )}
                      </p>
                      <p className="text-muted-foreground">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <Button variant="outline" size="icon">
                          <Pencil/>
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2/>
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredProducts.length === 0 && (
                  <p className="text-center text-muted-foreground">
                    No products found
                  </p>
                )}
              </div>
            </>
          )}

          {/* Pagination */}
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
