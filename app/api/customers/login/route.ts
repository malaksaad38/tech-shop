import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Customer from "@/models/Customer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {email, password} = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {error: "Email and password are required"},
        {status: 400}
      );
    }

    // Find user and include password field
    const customer = await Customer.findOne({email}).select("+password");
    if (!customer || !customer.password) {
      return NextResponse.json(
        {error: "Invalid email or password"},
        {status: 401}
      );
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, customer.password);
    if (!validPassword) {
      return NextResponse.json(
        {error: "Invalid email or password"},
        {status: 401}
      );
    }

    // Generate JWT
    const token = jwt.sign(
      {id: customer._id, email: customer.email},
      process.env.JWT_SECRET as string,
      {expiresIn: "7d"}
    );

    // Exclude password from response
    const {password: _, ...customerData} = customer.toObject();

    return NextResponse.json(
      {token, customer: customerData},
      {status: 200}
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {error: "Internal Server Error"},
      {status: 500}
    );
  }
}
