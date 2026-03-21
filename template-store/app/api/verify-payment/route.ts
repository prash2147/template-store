import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {

  const body = await req.json();

  const { order_id, payment_id, signature } = body;

  const secret = process.env.RAZORPAY_KEY_SECRET!;

  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(order_id + "|" + payment_id)
    .digest("hex");

  if (generated_signature === signature) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}