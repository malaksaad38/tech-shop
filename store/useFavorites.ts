"use client"
import {create} from "zustand"
import {persist} from "zustand/middleware"

interface FavoriteItem {
  _id: string
  name: string
  price: number
  image?: string
}

interface FavoritesState {
  favorites: FavoriteItem[]
  toggleFavorite: (item: FavoriteItem) => void
  isFavorite: (id: string) => boolean
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (item) => {
        const {favorites} = get()
        const exists = favorites.some((f) => f._id === item._id)

        if (exists) {
          set({favorites: favorites.filter((f) => f._id !== item._id)})
        } else {
          set({favorites: [...favorites, item]})
        }
      },
      isFavorite: (id) => get().favorites.some((f) => f._id === id),
    }),
    {
      name: "favorites-storage", // 🔒 key in localStorage
    }
  )
)
