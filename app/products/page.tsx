"use client";

import React, {useEffect, useMemo, useState} from "react";
import ProductCard from "@/components/ProductCard";
import {motion} from "framer-motion";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Card, CardContent} from "@/components/ui/card";
import {ArrowDownAZ, ArrowUpAZ, DollarSign, Filter, Loader2, PlusCircle, RefreshCw, Search, Tag,} from "lucide-react";

// Product type from MongoDB
type ProductType = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: {
    _id: string;
    name: string;
    value: string;
  };
};

type CategoryType = {
  _id: string;
  name: string;
  value: string;
};

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visible, setVisible] = useState(8);

  // Fetch products + categories

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const fetchData = async () => {
      setLoading(true);
      try {
        // Use Promise.allSettled to avoid one failed request failing both
        const [prodRes, catRes] = await Promise.allSettled([
          fetch("/api/products").then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          }),
          fetch("/api/categories").then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          }),
        ]);

        let products: ProductType[] = [];
        let categories: CategoryType[] = [];

        // Handle products result
        if (prodRes.status === "fulfilled") {
          products = prodRes.value;
          setProducts(products);

          // Calculate price range only if products exist
          if (products.length > 0) {
            const prices = products.map((p) => p.price);
            const min = Math.floor(Math.min(...prices));
            const max = Math.ceil(Math.max(...prices));
            if (isMounted) {
              setMinPrice(min);
              setMaxPrice(max);
            }
          }
        } else {
          console.error("❌ Failed to fetch products:", prodRes.reason);
        }

        // Handle categories result
        if (catRes.status === "fulfilled") {
          categories = catRes.value;
          setCategories(categories);
        } else {
          console.error("❌ Failed to fetch categories:", catRes.reason);
        }
      } catch (err) {
        // This will catch any non-Promise errors (unlikely due to allSettled)
        console.error("🚨 Unexpected error in fetchData:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to avoid memory leaks
    return () => {
      isMounted = false;
    };
  }, []);


  // Derived filtered list
  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const inRange = p.price >= minPrice && p.price <= maxPrice;
      const matchesCategory =
        selectedCategory === "all" ||
        p.category?.value === selectedCategory ||
        p.category?._id === selectedCategory;

      return matchesQuery && inRange && matchesCategory;
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
        break;
    }
    return list;
  }, [query, minPrice, maxPrice, sortBy, selectedCategory, products]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <motion.section
        className="bg-primary text-foreground text-center py-14 shadow-sm"
        initial={{opacity: 0, y: -40}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: "easeOut"}}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Explore Our Products
        </h1>
        <p className="text-base md:text-lg mt-3 opacity-90">
          Discover the latest gadgets, accessories, and tech essentials – all in one place.
        </p>
      </motion.section>

      {/* Controls */}
      <motion.div
        className="container mx-auto px-4 pt-10"
        initial={{opacity: 0, y: 40}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.6, ease: "easeOut"}}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                  <Search className="w-4 h-4"/> Search
                </label>
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                  <Tag className="w-4 h-4"/> Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All categories"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat.value}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Min */}
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                  <DollarSign className="w-4 h-4"/> Min Price
                </label>
                <Input
                  type="number"
                  min={0}
                  max={maxPrice}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-40"
                />
              </div>

              {/* Price Max */}
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                  <DollarSign className="w-4 h-4"/> Max Price
                </label>
                <Input
                  type="number"
                  min={minPrice}
                  max={100000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-40"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                  <Filter className="w-4 h-4"/> Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select sort"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">
                      <ArrowDownAZ className="inline w-4 h-4 mr-1"/> Name: A → Z
                    </SelectItem>
                    <SelectItem value="name-desc">
                      <ArrowUpAZ className="inline w-4 h-4 mr-1"/> Name: Z → A
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results meta */}
            <div className="mt-1 text-sm flex items-center justify-between gap-2">
              <div className="mt-4 flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin"/> Loading products...
                  </>
                ) : (
                  `Showing ${shown.length} of ${filtered.length} item(s)`
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Products Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 container mx-auto mt-6">
        {shown.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{opacity: 0, y: 40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.5, delay: index * 0.05}}
          >
            <ProductCard product={product}/>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      {visible < filtered.length && (
        <motion.div
          className="flex justify-center pb-10"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{duration: 0.5}}
        >
          <Button
            size="lg"
            onClick={() => setVisible((v) => Math.min(v + 8, filtered.length))}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5"/> Load More
          </Button>
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <motion.div
          className="container mx-auto px-4 pb-16"
          initial={{opacity: 0, y: 40}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
        >
          <Card>
            <CardContent className="flex justify-center items-center flex-col text-center p-10">
              <p className="text-lg font-semibold ">
                No products match your filters.
              </p>
              <Button
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("all");
                  setSortBy("featured");
                  setVisible(8);
                }}
                className="mt-4 bg-primary hover:bg-primary flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5"/> Reset Filters
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Products;
