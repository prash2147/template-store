"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TemplatesPage() {

  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, []);

  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Video Templates
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {templates.map((template) => (

          <div
            key={template._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition"
          >

            <video controls className="w-full h-48 object-cover">
              <source src={template.video} type="video/mp4" />
            </video>

            <div className="p-4">

              <h2 className="text-lg font-semibold">
                {template.title}
              </h2>

              <p className="text-green-600 font-bold mt-2">
                ₹{template.price}
              </p>

              <div className="flex gap-2 mt-3">

                <Link
                  href={`/template/${template._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Preview
                </Link>

                <button className="bg-green-600 text-white px-3 py-1 rounded">
                  Buy
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}