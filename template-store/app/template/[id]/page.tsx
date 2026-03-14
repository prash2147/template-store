"use client";

import { useEffect, useState } from "react";

export default function TemplatePage({ params }: any) {

  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {

    fetch(`/api/templates`)
      .then(res => res.json())
      .then(data => {

        const found = data.find((t: any) => t._id === params.id);
        setTemplate(found);

      });

  }, [params.id]);

  if (!template) {
    return <div className="p-10">Loading...</div>;
  }

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

      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Buy Template
      </button>

    </main>
  );
}