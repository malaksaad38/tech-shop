'use client'
import React, {useMemo, useState} from 'react';
import products from '@/data/products.json';
import ProductCard from "@/components/ProductCard";

const DISCOUNT_RATE = 0.20;

const isIndependenceDayPK = () => {
  // Check date in Pakistan timezone
  const nowPk = new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Karachi'}));
  return nowPk.getMonth() === 7 && nowPk.getDate() === 14; // August = 7
};

const formatPrice = (n: any) =>
  n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

const Products = () => {
  const independenceDay = isIndependenceDayPK();

  // Derive min/max from data
  const prices = products.map(p => p.price);
  const absoluteMin = Math.floor(Math.min(...prices));
  const absoluteMax = Math.ceil(Math.max(...prices));

  // UI state
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(absoluteMin);
  const [maxPrice, setMaxPrice] = useState(absoluteMax);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const inRange = p.price >= (Number(minPrice) || absoluteMin) && p.price <= (Number(maxPrice) || absoluteMax);
      return matchesQuery && inRange;
    });

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' – keep original order
        break;
    }
    return list;
  }, [query, minPrice, maxPrice, sortBy, absoluteMin, absoluteMax]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50">

      {/* Independence Day Banner */}
      <div className="bg-green-700 text-white text-center p-4 shadow-md">
        <h1 className="text-2xl font-extrabold flex items-center justify-center gap-2">
          Happy Independence Day Pakistan! 🎉
        </h1>
        <p className="text-sm mt-1">Celebrating Freedom Since 1947</p>
        <div className="mt-2">

        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white/70 backdrop-blur rounded-2xl border border-green-200 p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-green-800 mb-1">Search</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg text-black border border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Price Min */}
            <div>
              <label className="block text-sm font-semibold text-green-800 mb-1">Min Price</label>
              <input
                type="number"
                min={absoluteMin}
                max={maxPrice}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-40 rounded-lg text-black border border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Price Max */}
            <div>
              <label className="block text-sm font-semibold text-green-800 mb-1">Max Price</label>
              <input
                type="number"
                min={minPrice}
                max={absoluteMax}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-40 rounded-lg text-black border border-green-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-green-800 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-48 rounded-lg text-black border border-green-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
            </div>
          </div>

          {/* Results meta */}
          <div className="mt-3 text-sm text-green-800">
            Showing <span className="font-semibold">{shown.length}</span> of{' '}
            <span className="font-semibold">{filtered.length}</span> item(s)
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 container mx-auto mt-6">
        {shown.map((product) =>
          <ProductCard product={product}/>
        )}
      </div>

      {/* Load More */}
      {visible < filtered.length && (
        <div className="flex justify-center pb-10">
          <button
            onClick={() => setVisible(v => Math.min(v + 8, filtered.length))}
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="container mx-auto px-4 pb-16">
          <div className="text-center bg-white border border-green-200 rounded-2xl p-10 shadow-sm">
            <p className="text-lg text-green-800 font-semibold">No products match your filters.</p>
            <button
              onClick={() => {
                setQuery('');
                setMinPrice(absoluteMin);
                setMaxPrice(absoluteMax);
                setSortBy('featured');
                setVisible(8);
              }}
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
