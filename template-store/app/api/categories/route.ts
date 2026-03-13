import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();

  const categories = await Category.find();

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const category = await Category.create(body);

  return NextResponse.json(category);
}