import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Customer from "@/models/Customer";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const {name, email, password, phone, address} = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {error: "Name, email and password are required"},
        {status: 400}
      );
    }

    const existing = await Customer.findOne({email});
    if (existing) {
      return NextResponse.json(
        {error: "Email already registered"},
        {status: 400}
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // strip password from response
    const {password: _, ...customerData} = customer.toObject();

    return NextResponse.json(customerData, {status: 201});
  } catch (error) {
    console.error("Error registering customer:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
