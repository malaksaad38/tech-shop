import React from 'react';
import Product from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import Category from "@/models/Category";
import {ShoppingCartIcon} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {getCheckedLocale} from "@/lib/server-utils";

const HeroPageProducts = async () => {
  // Fetch 4 featured products from DB
  const {t} = await getCheckedLocale()
  await connectDB();
  await Category.find();
  const featuredProducts = await Product.find().populate("category")
    .sort({createdAt: -1, _id: -1})
    .limit(4)
    .lean();
  return (
    <div>
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6">
          <ShoppingCartIcon className="inline size-6 mr-2 text-primary"/>{t('featured')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product._id} product={JSON.parse(JSON.stringify(product))}/>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HeroPageProducts;
