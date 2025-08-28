// app/api/orders/route.ts
import {NextResponse} from "next/server";
import Order from "@/models/Order";
import {connectDB} from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const order = await Order.create(body);

    return NextResponse.json(order, {status: 201});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Failed to create order"}, {status: 500});
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().populate("products.product");
    return NextResponse.json(orders, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Failed to fetch orders"}, {status: 500});
  }
}
