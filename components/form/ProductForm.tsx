"use client"

import React, {useEffect, useMemo} from "react"
import axios from "axios"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

const ProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive("Price must be greater than 0")
  ),
  description: z
    .string()
    .max(1000, "Description is too long")
    .optional()
    .or(z.literal("")),
  image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
})

type ProductFormValues = z.infer<typeof ProductSchema>

type ProductFormProps = {
  product?: {
    _id: string
    name: string
    price: number
    description?: string
    image?: string
  }
}

const ProductForm: React.FC<ProductFormProps> = ({product}) => {
  const router = useRouter()
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: undefined as unknown as number,
      description: "",
      image: "",
    },
  })

  const imageUrl = form.watch("image")
  const hasPreview = useMemo(
    () => imageUrl && imageUrl.trim().startsWith("http"),
    [imageUrl]
  )

  // Load product data if editing
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name || "",
        price: product.price,
        description: product.description || "",
        image: product.image || "",
      })
    }
  }, [product, form])

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (product?._id) {
        await axios.put(`/api/products/${product._id}`, {
          name: values.name.trim(),
          price: Number(values.price),
          description: values.description?.trim() || undefined,
          image: values.image?.trim() || undefined,
        })
        router.push("/admin")
      } else {
        await axios.post("/api/products", {
          name: values.name.trim(),
          price: Number(values.price),
          description: values.description?.trim() || undefined,
          image: values.image?.trim() || undefined,
        })
        form.reset()
        router.push("/admin")
      }
    } catch (err: any) {
      console.error(err)
      alert(err?.response?.data?.message || "Failed to save product")
    }
  }

  return (
    <Card className="max-w-2xl mx-auto my-6">
      <CardHeader>
        <CardTitle>
          {product ? "Edit Product" : "Create Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Optional description" {...field} />
                  </FormControl>
                  <FormDescription>
                    A short description of the product (optional).
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                  {hasPreview && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-1">Preview</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded border"
                        onError={(e) => ((e.currentTarget.style.display = "none"))}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? product
                    ? "Updating..."
                    : "Saving..."
                  : product
                    ? "Update Product"
                    : "Save Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset(product || {})}
              >
                Reset
              </Button>
              {form.formState.isSubmitSuccessful && (
                <span className="text-sm text-foreground">
                  {product ? "Updated!" : "Saved!"}
                </span>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProductForm
