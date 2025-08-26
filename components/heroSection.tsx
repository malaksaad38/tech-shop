import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";
import {Button} from "@/components/ui/button";
import Category from "@/models/Category";
import {CardContent} from "@/components/ui/card";
import {LaptopIcon, ShoppingCartIcon, SquareChevronRightIcon} from "lucide-react";
import {SparklesCore} from "@/components/ui/sparkles";


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
      <section className="relative bg-background">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10"
        />

        {/* Content */}
        <div className="relative mx-auto text-center">
          <div
            className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-2 text-white">
              Welcome to TechShop
            </h1>
            <div className="w-[40rem] h-40 relative">
              {/* Gradients */}
              <div
                className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"/>
              <div
                className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"/>
              <div
                className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"/>
              <div
                className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"/>

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div
                className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
            <CardContent className="translate-y-[-120px]">
              <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8 ">
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

          </div>

          {/*<Card className="bg-background/20 backdrop-blur-md border-0 text-foreground shadow-xl">*/}
          {/*  <CardHeader>*/}
          {/*    <CardTitle className="text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-2">*/}
          {/*      Welcome to TechShop*/}
          {/*    </CardTitle>*/}
          {/*  </CardHeader>*/}

          {/*  <CardContent>*/}
          {/*    <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-8">*/}
          {/*      Your one-stop destination for the latest gadgets, electronics, and smart tech.*/}
          {/*      Explore our exclusive deals and upgrade your lifestyle today!*/}
          {/*    </p>*/}

          {/*    /!* Buttons *!/*/}
          {/*    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">*/}
          {/*      <Button asChild variant="secondary">*/}
          {/*        <Link href="/products"><LaptopIcon/> Shop Now</Link>*/}
          {/*      </Button>*/}
          {/*      <Button asChild>*/}
          {/*        <Link href="/about"><SquareChevronRightIcon/> Learn More</Link>*/}
          {/*      </Button>*/}
          {/*    </div>*/}
          {/*  </CardContent>*/}
          {/*</Card>*/}
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
