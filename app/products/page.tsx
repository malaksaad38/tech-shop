"use client";

import React, {useEffect, useMemo, useState} from "react";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Card, CardContent} from "@/components/ui/card";

// Discount constants
const DISCOUNT_RATE = 0.2;

const isIndependenceDayPK = () => {
  const nowPk = new Date(
    new Date().toLocaleString("en-US", {timeZone: "Asia/Karachi"})
  );
  return nowPk.getMonth() === 7 && nowPk.getDate() === 14; // August = 7
};

// Product type from MongoDB
type ProductType = {
  _id: string;
  name: string;
  price: number;
  description?: string;
};

const Products = () => {
  const independenceDay = isIndependenceDayPK();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get<ProductType[]>("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle case where no products are loaded yet
  const prices = products.length > 0 ? products.map((p) => p.price) : [0];
  const absoluteMin = Math.floor(Math.min(...prices));
  const absoluteMax = Math.ceil(Math.max(...prices));

  // UI state
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(absoluteMin);
  const [maxPrice, setMaxPrice] = useState(absoluteMax);
  const [sortBy, setSortBy] = useState("featured");
  const [visible, setVisible] = useState(8);

  // Derived filtered list
  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const inRange =
        p.price >= (Number(minPrice) || absoluteMin) &&
        p.price <= (Number(maxPrice) || absoluteMax);
      return matchesQuery && inRange;
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break; // featured = original order
    }
    return list;
  }, [query, minPrice, maxPrice, sortBy, products, absoluteMin, absoluteMax]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="min-h-screen bg-background ">
      {/* Independence Day Banner */}
      {independenceDay && (
        <div className=" text-white text-center p-4 shadow-md">
          <h1 className="text-2xl font-extrabold flex items-center justify-center gap-2">
            Happy Independence Day Pakistan! 🎉
          </h1>
          <p className="text-sm mt-1">
            Celebrating Freedom Since 1947 – Enjoy {DISCOUNT_RATE * 100}% OFF!
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="container mx-auto px-4 pt-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-semibold tebg-primary mb-1">
                  Search
                </label>
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="border-primary focus-visible:text-primary"
                />
              </div>

              {/* Price Min */}
              <div>
                <label className="block text-sm font-semibold tebg-primary mb-1">
                  Min Price
                </label>
                <Input
                  type="number"
                  min={absoluteMin}
                  max={maxPrice}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-40 border-primary focus-visible:text-primary"
                />
              </div>

              {/* Price Max */}
              <div>
                <label className="block text-sm font-semibold tebg-primary mb-1">
                  Max Price
                </label>
                <Input
                  type="number"
                  min={minPrice}
                  max={absoluteMax}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-40 border-primary focus-visible:text-primary"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold tebg-primary mb-1">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-primary focus:text-primary">
                    <SelectValue placeholder="Select sort"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A → Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z → A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results meta */}
            <div className="mt-3 text-sm tebg-primary">
              {loading
                ? "Loading products..."
                : `Showing ${shown.length} of ${filtered.length} item(s)`}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 container mx-auto mt-6">
        {shown.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>

      {/* Load More */}
      {visible < filtered.length && (
        <div className="flex justify-center pb-10">
          <Button
            onClick={() => setVisible((v) => Math.min(v + 8, filtered.length))}
            className="bg-primary hover:bg-primary "
          >
            Load More
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="container mx-auto px-4 pb-16">
          <Card>
            <CardContent className="text-center p-10">
              <p className="text-lg tebg-primary font-semibold">
                No products match your filters.
              </p>
              <Button
                onClick={() => {
                  setQuery("");
                  setMinPrice(absoluteMin);
                  setMaxPrice(absoluteMax);
                  setSortBy("featured");
                  setVisible(8);
                }}
                className="mt-4 bg-primary hover:bg-primary "
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Products;
