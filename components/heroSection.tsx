import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";
import {Button} from "@/components/ui/button";
import Category from "@/models/Category";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {LaptopIcon, ShoppingCartIcon, SquareChevronRightIcon} from "lucide-react";

export default async function TechShopHeroWithProducts() {
  // Fetch 4 featured products from DB
  await connectDB();
  await Category.find();
  const featuredProducts = await Product.find().populate("category")
    .sort({createdAt: -1, _id: -1})
    .limit(4)
    .lean();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background py-20">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10"
        />

        {/* Content */}
        <div className="relative container mx-auto px-6 text-center">
          <Card className="bg-background/20 backdrop-blur-md border-0 text-foreground shadow-xl">
            <CardHeader>
              <CardTitle className="text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-2">
                Welcome to TechShop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-8">
                Your one-stop destination for the latest gadgets, electronics, and smart tech.
                Explore our exclusive deals and upgrade your lifestyle today!
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="secondary">
                  <Link href="/products"><LaptopIcon/> Shop Now</Link>
                </Button>
                <Button asChild>
                  <Link href="/about"><SquareChevronRightIcon/> Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6">
          <ShoppingCartIcon className="inline size-6 mr-2 text-primary"/> Featured Tech
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product._id} product={JSON.parse(JSON.stringify(product))}/>
          ))}
        </div>
      </section>
    </div>
  );
}
