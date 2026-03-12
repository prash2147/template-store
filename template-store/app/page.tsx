"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {

  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, []);

  return (
    <main>

      {/* HERO SECTION */}

      <section className="bg-black text-white py-20 text-center">

        <h1 className="text-5xl font-bold">
          Create Amazing VN Templates
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Download trending video templates instantly
        </p>

        <Link
          href="/templates"
          className="mt-6 inline-block bg-green-600 px-6 py-3 rounded text-lg"
        >
          Browse Templates
        </Link>

      </section>


      {/* TEMPLATE LIST */}

      <section className="p-10">

        <h2 className="text-2xl font-bold mb-6">
          Latest Templates
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {templates.map((template) => (

            <div
              key={template._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition"
            >

              <video controls className="w-full h-48 object-cover">
                <source src={template.video} type="video/mp4" />
              </video>

              <div className="p-4">

                <h3 className="text-lg font-semibold">
                  {template.title}
                </h3>

                <p className="text-green-600 font-bold mt-2">
                  ₹{template.price}
                </p>

                <Link
                  href={`/template/${template._id}`}
                  className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Preview
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}