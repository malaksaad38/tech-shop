// app/api/customers/[id]/orders/route.ts
import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Order from "@/models/Order";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, {params}: Params) {
  try {
    await connectDB();
    const {id} = params;

    const orders = await Order.find({customer: id})
      .populate("products.product")
      .sort({createdAt: -1}); // latest orders first

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("❌ Error fetching customer orders:", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
