import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {ShoppingCartIcon, SquareChevronRightIcon, StoreIcon} from "lucide-react";

export default async function IndependenceDayHeroWithProducts() {
  // Fetch 4 featured products from DB
  await connectDB();
  const featuredProducts = await Product.find()
    .sort({createdAt: -1, _id: -1})
    .limit(4)
    .lean();

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-foreground from-green-700 to-green-900 text-white py-20">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/2560px-Flag_of_Pakistan.svg.png')] bg-cover bg-center opacity-10"
        />

        {/* Content */}
        <div className="relative container mx-auto px-6 text-center">
          <Card className="bg-white/10 backdrop-blur-md border-0 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-2">
                Happy Independence Day Pakistan!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-8">
                Celebrating freedom, unity, and pride since 14th August 1947.
                Shop our exclusive Independence Day deals and spread the green love!
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  variant="secondary"

                >
                  <Link href="/products"><StoreIcon/> Shop Now</Link>
                </Button>
                <Button
                  asChild
                >
                  <Link href="/about"><SquareChevronRightIcon/> Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Featured Products <ShoppingCartIcon className={"inline text-primary"}/>
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
