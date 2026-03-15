import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Template from "@/models/Template";

export async function GET(req: Request) {

  await connectDB();

  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");

  let templates;

  if (category) {
    templates = await Template.find({ category });
  } else {
    templates = await Template.find();
  }

  return NextResponse.json(templates);
}

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const template = await Template.create(body);

  return NextResponse.json(template);

}
