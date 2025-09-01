import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Customer from "@/models/Customer";

// GET all customers
export async function GET() {
  try {
    await connectDB();
    const customers = await Customer.find().sort({createdAt: -1});
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({error: "Failed to fetch customers"}, {status: 500});
  }
}
