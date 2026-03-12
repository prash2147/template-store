"use client";

import { useState } from "react";

export default function AdminPage() {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");

  const uploadTemplate = async () => {

    const res = await fetch("/api/templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        video,
        description
      })
    });

    const data = await res.json();

    alert("Template Uploaded!");

    setTitle("");
    setPrice("");
    setVideo("");
    setDescription("");
  };

  return (
    <main className="p-10 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Upload Template
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Template Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Video URL"
        value={video}
        onChange={(e) => setVideo(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={uploadTemplate}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Upload Template
      </button>

    </main>
  );
}