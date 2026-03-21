"use client";

import { useEffect, useState, use } from "react";

export default function TemplatePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params);

  const [template, setTemplate] = useState<any>(null);
  const [paid, setPaid] = useState(false);

  // load template
  useEffect(() => {
    fetch("/api/templates")
      .then(res => res.json())
      .then(data => {
        const found = data.find((t: any) => t._id === id);
        setTemplate(found);
      });
  }, [id]);

  if (!template) {
    return <div className="p-10">Loading...</div>;
  }

  //  BUY FUNCTION
  const buyTemplate = async () => {

    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: template.price
      })
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "VN Templates",
      description: template.title,
      order_id: order.id,

      handler: async function (response: any) {

        //  VERIFY PAYMENT
        const verify = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature
          })
        });

        const result = await verify.json();

        if (result.success) {

          setPaid(true);

          // SAVE ORDER
          await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              templateId: template._id,
              amount: template.price,
              paymentId: response.razorpay_payment_id
            })
          });

          alert("Payment Verified ✅");

        } else {
          alert("Payment verification failed ❌");
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <main className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        {template.title}
      </h1>

      {/* VIDEO */}
      {template.video ? (
        <video 
          controls
          controlsList="nodownload"
          disablePictureInPicture
         className="w-full rounded-lg mb-6"
         >
          <source src={template.video} type="video/mp4" />
        </video>
      ) : (
        <div className="p-10 bg-gray-800 text-white text-center rounded-lg">
          No video preview available
        </div>
      )}

      {/* DESCRIPTION */}
      <p className="text-lg mb-4">
        {template.description}
      </p>

      {/* PRICE */}
      <p className="text-2xl font-bold text-green-600 mb-6">
        ₹{template.price}
      </p>

      {/* BUTTON */}
      {paid ? (
        <a
          href={template.downloadLink}
          target="_blank"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Download Template
        </a>
      ) : (
        <button
          onClick={buyTemplate}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Buy Template
        </button>
      )}

    </main>
  );
}