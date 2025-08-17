import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function SpecialOffer() {
  // Connect to DB & fetch top 4 products
  await connectDB();
  const offerProducts = await Product.find().sort({createdAt: -1, _id: -1}).limit(4).lean();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 p-6">
      {/* Independence Day Offer Banner */}
      <div className="bg-green-700 text-white text-center py-6 shadow-md rounded-lg mb-8">
        <h1 className="text-3xl font-extrabold">🎉 Independence Day Special Offer</h1>
        <p className="mt-2 text-lg">Get 20% OFF on all products — Today Only!</p>
        <div className="mt-4 bg-white text-green-700 px-6 py-2 rounded-lg inline-block font-bold text-xl">
          Use Code: <span className="text-green-800">PAK20</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 container mx-auto">
        {offerProducts.map((product: any) => (
          <ProductCard key={product._id.toString()} product={JSON.parse(JSON.stringify(product))}/>
        ))}
      </div>

      {/* Back to Home */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
