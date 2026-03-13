import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {

  const body = await req.json();
  const { video } = body;

  const upload = await cloudinary.uploader.upload(video, {
    resource_type: "video"
  });

  return NextResponse.json({
    url: upload.secure_url
  });
}