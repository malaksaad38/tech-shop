import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";
import {revalidatePath} from "next/cache";

type Params = { params: { id: string } };

// 🟢 GET one product
export async function GET(_req: NextRequest, {params}: Params) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({error: "Invalid ID format"}, {status: 400});
  }

  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({error: "Not found"}, {status: 404});

  return NextResponse.json(product);
}

// 🟢 UPDATE product
export async function PUT(req: NextRequest, {params}: Params) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({error: "Invalid ID format"}, {status: 400});
  }

  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, body, {new: true});

  revalidatePath('/');
  revalidatePath('/special-offers');

  if (!updated) return NextResponse.json({error: "Not found"}, {status: 404});

  return NextResponse.json(updated);
}

// 🟢 DELETE product
export async function DELETE(_req: NextRequest, {params}: Params) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({error: "Invalid ID format"}, {status: 400});
  }

  await Product.findByIdAndDelete(params.id);

  revalidatePath('/');
  revalidatePath('/special-offers');
  
  return NextResponse.json({message: "Deleted"});
}
