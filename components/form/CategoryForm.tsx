"use client"

import React, {useEffect} from "react"
import axios from "axios"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

const CategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
})

type CategoryFormValues = z.infer<typeof CategorySchema>

type CategoryFormProps = {
  category?: {
    _id: string
    name: string

  }
}

const CategoryForm: React.FC<CategoryFormProps> = ({category}) => {
  const router = useRouter()
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",

    },
  })


  // Load category data if editing
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
      })
    }
  }, [category, form])

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const payload = {
        name: values.name.trim(),
      }

      if (category?._id) {
        await axios.put(`/api/categories/${category._id}`, payload)
        router.push("/admin")
      } else {
        await axios.post("/api/categories", payload)
        form.reset()
        router.push("/admin")
      }
      router.refresh();

    } catch (err: any) {
      console.error(err)
      alert(err?.response?.data?.message || "Failed to save category")
    }
  }

  return (
    <Card className="max-w-2xl mx-auto my-6">
      <CardHeader>
        <CardTitle>
          {category ? "Edit Category" : "Create Category"}
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? category
                    ? "Updating..."
                    : "Saving..."
                  : category
                    ? "Update Category"
                    : "Save Category"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset(category || {})}
              >
                Reset
              </Button>
              {form.formState.isSubmitSuccessful && (
                <span className="text-sm text-foreground">
                  {category ? "Updated!" : "Saved!"}
                </span>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CategoryForm
