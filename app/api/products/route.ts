// app/api/products/route.ts
import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";

// Getting all item from the target schema
export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

// Creating new item
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const newProduct = await Product.create(body);
  return NextResponse.json(newProduct, {status: 201});
}
