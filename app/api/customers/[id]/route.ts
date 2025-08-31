import {NextResponse} from "next/server";
import Customer from "@/models/Customer";
import {connectDB} from "@/lib/mongodb";

// ✅ Get single customer
// ✅ Get single customer WITH full order details
export async function GET(
  req: Request,
  {params}: { params: { id: string } }
) {
  try {
    await connectDB();

    const customer = await Customer.findById(params.id)
      .populate("orders") // 👈 populate full orders, not just IDs
      .exec();

    if (!customer) {
      return NextResponse.json({error: "Customer not found"}, {status: 404});
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json({error: "Server error"}, {status: 500});
  }
}

// ✅ Update customer
export async function PUT(
  req: Request,
  {params}: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await req.json();

    const updated = await Customer.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({error: "Customer not found"}, {status: 404});
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json({error: "Failed to update"}, {status: 500});
  }
}

// ✅ Delete customer
export async function DELETE(
  req: Request,
  {params}: { params: { id: string } }
) {
  try {
    await connectDB();
    const deleted = await Customer.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({error: "Customer not found"}, {status: 404});
    }

    return NextResponse.json({message: "Customer deleted successfully"});
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json({error: "Failed to delete"}, {status: 500});
  }
}
