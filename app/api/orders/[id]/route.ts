import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Order from "@/models/Order";
import Customer from "@/models/Customer";

export async function GET(
  req: Request,
  {params}: { params: { id: string } }
) {
  try {
    await connectDB();
    await Customer.find();
    const order = await Order.findById(params.id).populate("customer");

    if (!order) {
      return NextResponse.json({error: "Order not found"}, {status: 404});
    }

    return NextResponse.json(order || []);
  } catch (error: any) {
    console.error("❌ Error fetching order orders:", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
