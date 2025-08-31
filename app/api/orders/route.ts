import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newOrder = await Order.create({
      products: body.products,
      totalAmount: body.totalAmount,
      customer: body.customer || null, // relation to Customer model
      customerInfo: body.customerInfo, // snapshot of customer details
      status: "pending",
    });

    return NextResponse.json(newOrder, {status: 201});
  } catch (error: any) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

// ✅ One GET handler for both admin & customer
export async function GET(req: Request) {
  try {
    await connectDB();
    const {searchParams} = new URL(req.url);
    const customerId = searchParams.get("customer");

    const query: any = {};
    if (customerId) query.customer = customerId;

    const orders = await Order.find(query)
      .populate("customer", "name email phone address")
      .sort({createdAt: -1});

    return NextResponse.json(orders, {status: 200});
  } catch (error: any) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
