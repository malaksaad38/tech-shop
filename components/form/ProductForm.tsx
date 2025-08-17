'use client'
import React, {useEffect, useMemo} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from "next/navigation";

const ProductSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().positive('Price must be greater than 0')
  ),
  description: z.string().max(1000, 'Description is too long').optional().or(z.literal('')),
  image: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
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
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting, isSubmitSuccessful},
    reset,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      price: undefined as unknown as number,
      description: '',
      image: '',
    },
  })

  // If editing, load product values
  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        price: product.price,
        description: product.description || '',
        image: product.image || '',
      })
    }
  }, [product, reset])

  const imageUrl = watch('image')
  const hasPreview = useMemo(() => imageUrl && imageUrl.trim().startsWith('http'), [imageUrl])

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (product?._id) {
        // Update existing product
        await axios.put(`/api/products/${product._id}`, {
          name: values.name.trim(),
          price: Number(values.price),
          description: values.description?.trim() || undefined,
          image: values.image?.trim() || undefined,
        })
        alert('Product updated successfully')
        router.push("/admin")
      } else {
        // Create new product
        await axios.post('/api/products', {
          name: values.name.trim(),
          price: Number(values.price),
          description: values.description?.trim() || undefined,
          image: values.image?.trim() || undefined,
        })
        reset()
        alert('Product created successfully')
        router.push("/admin")

      }
    } catch (err: any) {
      console.error(err)
      alert(err?.response?.data?.message || 'Failed to save product')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {product ? 'Edit Product' : 'Create Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Product name"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name')}
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            className="w-full border rounded px-3 py-2 outline-none appearance-none focus:ring-2 focus:ring-blue-500"
            {...register('price')}
          />
          {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            placeholder="Optional description"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            {...register('description')}
          />
          {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg (optional)"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            {...register('image')}
          />
          {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>}
          {hasPreview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Preview</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Preview"
                className="h-32 w-32 object-cover rounded border"
                onError={(e) => ((e.currentTarget.style.display = 'none'))}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded"
          >
            {isSubmitting
              ? product
                ? 'Updating...'
                : 'Saving...'
              : product
                ? 'Update Product'
                : 'Save Product'}
          </button>
          <button
            type="button"
            onClick={() => reset(product || {})}
            className="border px-4 py-2 rounded"
          >
            Reset
          </button>
          {isSubmitSuccessful && (
            <span className="text-sm text-green-600">
              {product ? 'Updated!' : 'Saved!'}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProductForm
