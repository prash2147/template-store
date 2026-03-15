"use client";

import { useEffect, useState, use } from "react";

export default function TemplatePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params);

  const [template, setTemplate] = useState<any>(null);
  const [paid, setPaid] = useState(false);

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

        await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            templateId: template._id,
            paymentId: response.razorpay_payment_id
          })
        });

        setPaid(true);

      alert("Payment Successful!");
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

      <video controls className="w-full rounded-lg mb-6">
        <source src={template.video} type="video/mp4" />
      </video>

      <p className="text-lg mb-4">
        {template.description}
      </p>

      <p className="text-2xl font-bold text-green-600 mb-6">
        ₹{template.price}
      </p>

      {paid ? (

        <a
          href={template.video}
          download
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