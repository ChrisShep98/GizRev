import { connectMongoDB } from "@/server/lib/mongodb";
import User from "@/server/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    // TODO: Check if username exists in DB

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    await User.create({ username, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering" },
      { status: 500 }
    );
  }
}
