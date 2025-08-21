import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Category from "@/models/Category";
import mongoose from "mongoose";
import {revalidatePath} from "next/cache";

type Params = { params: { id: string } };

// 🟢 GET one category
export async function GET(_req: NextRequest, {params}: Params) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({error: "Invalid ID format"}, {status: 400});
  }

  const category = await Category.findById(params.id);
  if (!category) return NextResponse.json({error: "Not found"}, {status: 404});

  return NextResponse.json(category);
}

// 🟢 UPDATE category
export async function PUT(req: NextRequest, {params}: Params) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({error: "Invalid ID format"}, {status: 400});
  }

  const body = await req.json();
  const updated = await Category.findByIdAndUpdate(params.id, body, {new: true});

  revalidatePath('/');
  revalidatePath('/special-offers');

  if (!updated) return NextResponse.json({error: "Not found"}, {status: 404});

  return NextResponse.json(updated);
}

// 🟢 DELETE category
export async function DELETE(_req: NextRequest, {params}: Params) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({error: "Invalid ID format"}, {status: 400});
  }

  await Category.findByIdAndDelete(params.id);

  revalidatePath('/');
  revalidatePath('/special-offers');

  return NextResponse.json({message: "Deleted"});
}
