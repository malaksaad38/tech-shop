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
import {Switch} from "@/components/ui/switch"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/components/ui/command"
import {Check, ChevronsUpDown} from "lucide-react"
import {cn} from "@/lib/utils"

const ProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive("Price must be greater than 0")
  ),
  description: z.string().max(1000, "Description is too long").optional().or(z.literal("")),
  image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  special: z.boolean().optional().default(false),
  percentage: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number().min(1).max(100).default(0)
  ),
  category: z.string().min(1, "Please select a category"), // ✅ new
})

type ProductFormValues = z.infer<typeof ProductSchema>

type ProductFormProps = {
  product?: {
    _id: string
    name: string
    price: number
    description?: string
    image?: string
    special?: boolean
    percentage?: number
    category?: string
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
      special: false,
      percentage: 1,
      category: "",
    },
  })

  const [categories, setCategories] = React.useState<{ _id: string; name: string }[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories")
        setCategories(res.data)
      } catch (err) {
        console.error("Failed to load categories", err)
      }
    }
    fetchCategories()
  }, [])

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
        special: product.special || false,
        percentage: product.percentage || 0,
        category: product.category || "",
      })
    }
  }, [product, form])

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const payload = {
        name: values.name.trim(),
        price: Number(values.price),
        description: values.description?.trim() || undefined,
        image: values.image?.trim() || undefined,
        special: values.special || false,
        percentage: values.percentage || 0,
        category: values.category,
      }

      if (product?._id) {
        await axios.put(`/api/products/${product._id}`, payload)
        router.push("/admin")
      } else {
        await axios.post("/api/products", payload)
        form.reset()
        router.push("/admin")
      }
      router.refresh()
    } catch (err: any) {
      console.error(err)
      alert(err?.response?.data?.message || "Failed to save product")
    }
  }

  return (
    <Card className="max-w-2xl mx-auto my-6">
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "Create Product"}</CardTitle>
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

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find((cat) => cat._id === field.value)?.name
                            : "Select a category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50"/>
                        </button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search category..."/>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((cat) => (
                            <CommandItem
                              key={cat._id}
                              value={cat._id}
                              onSelect={() => field.onChange(cat._id)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === cat._id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {cat.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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

            {/* Special Offer */}
            <FormField
              control={form.control}
              name="special"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div>
                    <FormLabel>Special Offer</FormLabel>
                    <FormDescription>
                      Enable if this product has a discount.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Percentage */}
            {form.watch("special") && (
              <FormField
                control={form.control}
                name="percentage"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Discount Percentage (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        placeholder="e.g. 20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter discount percentage (0–100).
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            )}

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
