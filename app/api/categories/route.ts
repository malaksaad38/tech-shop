import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Category from "@/models/Category";
import {revalidatePath} from "next/cache";

// Getting all item from the target schema
export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({
    createdAt: -1,  // newest first
    _id: -1         // fallback for docs without createdAt
  });
  return NextResponse.json(categories);
}


// Creating new item
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const newCategory = await Category.create(body);
  revalidatePath('/');
  revalidatePath('/special-offers');
  return NextResponse.json(newCategory, {status: 201});
}
