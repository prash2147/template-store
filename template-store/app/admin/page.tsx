"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminPage() {

  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [download, setDownload] = useState("");

  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // load categories
  const loadCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // protect admin page
  if (status === "loading") {
    return <div className="p-10">Loading...</div>;
  }

  if (!session) {
    return <div className="p-10">Please login first</div>;
  }

  // upload template
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
        description,
        category,
        download
      })
    });

    await res.json();

    alert("Template Uploaded!");

    setTitle("");
    setPrice("");
    setVideo("");
    setDescription("");
    setCategory("");
  };

  // create new category
  const createCategory = async () => {

    if (!newCategory) return;

    await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newCategory })
    });

    setNewCategory("");
    loadCategories();
  };

  return (
    <main className="p-10 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Upload Template
      </h1>

      {/* TITLE */}
      <input
        className="border p-2 w-full mb-4"
        placeholder="Template Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* PRICE */}
      <input
        className="border p-2 w-full mb-4"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* CATEGORY DROPDOWN */}
      <select
        className="border p-2 w-full mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >

        <option value="">Select Category</option>

        {categories.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}

      </select>

      {/* ADD CATEGORY */}
      <div className="flex gap-2 mb-4">

        <input
          className="border p-2 w-full"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button
          onClick={createCategory}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>

      </div>

      {/* VIDEO FILE UPLOAD */}
      <input
        type="file"
        className="mb-4"
        onChange={async (e: any) => {

          const file = e.target.files[0];

          const reader = new FileReader();

          reader.onloadend = async () => {

            const res = await fetch("/api/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                video: reader.result
              })
            });

            const data = await res.json();

            setVideo(data.url);

          };

          reader.readAsDataURL(file);

        }}
      />

      {/* DESCRIPTION */}
      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* DOWNLOAD LINK */}
        <input
          className="border p-2 w-full mb-4"
          placeholder="Download Link (Google Drive / Cloudinary)"
          value={download}
          onChange={(e) => setDownload(e.target.value)}
        />

      {/* UPLOAD BUTTON */}
      <button
        onClick={uploadTemplate}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Upload Template
      </button>

    </main>
  );
}