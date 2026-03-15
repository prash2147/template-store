"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TemplatesPage() {

  const [templates, setTemplates] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {

    fetch("/api/templates")
      .then(res => res.json())
      .then(data => setTemplates(data));

    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));

  }, []);

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter(t => t.category === selectedCategory);

  return (
    <main className="p-10">

      <h1 className="text-4xl font-bold text-white mb-8">
        Trending VN Templates
      </h1>

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 mb-8 flex-wrap">

        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "All"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
        All
        </button>

        {categories.map((cat) => (

        <button
          key={cat._id}
          onClick={() => setSelectedCategory(cat.name)}
          className={`px-4 py-2 rounded ${
            selectedCategory === cat.name
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
        {cat.name}
        </button>

        ))}

      </div>

      {/* TEMPLATE GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {filteredTemplates.map((template) => (

          <div
            key={template._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
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

              <Link
                href={`/template/${template._id}`}
                className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Preview
              </Link>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}