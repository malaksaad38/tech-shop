import products from '@/data/products.json';
import Link from 'next/link';
import ProductDetailCard from "@/components/ProductDetailCard";

const ProductItem = async ({params}: any) => {

  const {id} = await params;
  const product = products.find((product) => product.id === Number(id));


  // @ts-ignore
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 p-6 ">
      {/* Independence Day Banner */}
      <div className="bg-green-700 text-white text-center py-4 shadow-md rounded-lg mb-6">
        <h1 className="text-2xl font-extrabold flex items-center justify-center gap-2">
          🇵🇰 Happy Independence Day Pakistan! 🎉
        </h1>
        <p className="text-sm mt-1">Celebrating Freedom Since 1947</p>
      </div>

      {/* Back Button */}
      <div className="mb-4">
        <Link
          href="/products"
          className="inline-block bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="flex items-center justify-center">
        {product && (
          <ProductDetailCard product={product}/>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
