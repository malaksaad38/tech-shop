'use client'
import React, {useEffect, useState} from 'react'
import {useParams} from 'next/navigation'
import axios from 'axios'
import CategoryForm from '@/components/form/CategoryForm'
import AdminControl from "@/components/AdminControl";

type Category = {
  _id: string
  name: string
  value: string
}

const Edit = () => {
  const {id} = useParams() // grabs [id] from the URL
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`/api/categories/${id}`)
        setCategory(res.data)
      } catch (err) {
        console.error('Failed to load category:', err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchCategory()
  }, [id])

  if (loading) {
    return <p className="p-6">Loading...</p>
  }

  if (!category) {
    return <p className="p-6 text-red-500">Category not found</p>
  }

  return (
    <AdminControl>
      <div className="p-6">
        <CategoryForm category={category}/>
      </div>
    </AdminControl>
  )
}

export default Edit
