"use client";
import {Heart} from "lucide-react";
import {motion} from "framer-motion";
import {useFavorites} from "@/store/useFavorites";
import {useEffect, useState} from "react";

interface FavoriteProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
}

const Favorite: React.FC<FavoriteProps> = ({product}) => {
  const {toggleFavorite, isFavorite} = useFavorites();
  const [hydrated, setHydrated] = useState(false);

  // ✅ wait until Zustand rehydrates from localStorage
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // ⏳ avoid mismatch on SSR

  const active = isFavorite(product._id);

  return (
    <motion.button
      whileTap={{scale: 0.8}}
      onClick={() => toggleFavorite(product)}
      className="p-2 rounded-full border flex items-center justify-center hover:bg-muted"
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          active ? "fill-red-500 text-red-500" : "text-muted-foreground"
        }`}
      />
    </motion.button>
  );
};

export default Favorite;
