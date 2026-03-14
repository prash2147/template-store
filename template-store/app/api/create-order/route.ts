import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(req: Request) {

  const body = await req.json();

  const options = {
    amount: body.amount * 100,
    currency: "INR",
    receipt: "template_order"
  };

  const order = await razorpay.orders.create(options);

  return NextResponse.json(order);
}

// import { NextResponse } from "next/server";

// export async function POST() {

//   return NextResponse.json({
//     id: "order_test_123",
//     amount: 9900
//   });

// }

