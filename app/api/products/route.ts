// app/api/products/route.ts
import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";
import {revalidatePath} from "next/cache";
import Category from "@/models/Category";

// Getting all item from the target schema
export async function GET() {
  try {
    await connectDB();
    await Category.find();
    const products = await Product.find()
      .populate("category")
      .sort({_id: -1});
    return NextResponse.json(products);
  } catch (err: any) {
    console.error("❌ Error fetching products:", err);
    return NextResponse.json({error: "Failed to fetch products"}, {status: 500});
  }
}


// Creating new item
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  console.log(body);
  const newProduct = await Product.create(body);
  revalidatePath('/');
  revalidatePath('/special-offers');
  return NextResponse.json(newProduct, {status: 201});
}
