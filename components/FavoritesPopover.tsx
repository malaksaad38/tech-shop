"use client";

import * as React from "react";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"; // ✅ your popover component
import {useFavorites} from "@/store/useFavorites";
import {Heart, X} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const FavoritesPopover = () => {
  const {favorites, toggleFavorite} = useFavorites();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"}
                variant={"outline"}
                className={"relative"}
        >
          <Heart className="w-6 h-6 text-muted-foreground"/>
          {favorites.length > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 p-3 flex flex-col gap-3"
      >
        <h3 className="font-bold text-lg mb-2">Favorites</h3>

        {favorites.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No favorites yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
            {favorites.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 border rounded-lg p-2 relative"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted flex items-center justify-center rounded">
                    <Heart className="w-5 h-5 text-muted-foreground"/>
                  </div>
                )}

                <div className="flex-1">
                  <Link
                    href={`/products/${item._id}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted"
                >
                  <X className="w-4 h-4 text-muted-foreground"/>
                </button>
              </div>
            ))}
          </div>
        )}
        

      </PopoverContent>
    </Popover>
  );
};

export default FavoritesPopover;
