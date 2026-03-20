"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminPage() {

  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [orders, setOrders] = useState<any[]>([]);
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.amount || 0),
    0
  );
    const [uploading, setUploading] = useState(false);

  // load data
  useEffect(() => {
    loadCategories();
    loadOrders();
  }, []);

  const loadCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const loadOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  // protect admin page
  if (status === "loading") {
    return <div className="p-10">Loading...</div>;
  }

  if (!session) {
    return <div className="p-10">Please login first</div>;
  }

  // upload template
  const uploadTemplate = async () => {

    // ✅ NEW: prevent early click
    if (uploading) {
      alert("Please wait, video is uploading...");
      return;
    }

    if (!video) {
      alert("Please upload video first!");
      return;
    }

    if (!downloadLink) {
      alert("Please add download link!");
      return;
    }

    if (!category) {
      alert("Please select category!");
      return;
    }

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
        downloadLink
      })
    });

    await res.json();

    alert("Template Uploaded!");

    // reset
    setTitle("");
    setPrice("");
    setVideo("");
    setDescription("");
    setCategory("");
    setDownloadLink("");
  };

  // create category
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

      {/* SALES DASHBOARD */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 text-white">
        <h2 className="text-lg font-bold">Sales Dashboard</h2>
        <p>Total Orders: {orders.length}</p>
        <p>Total Revenue: ₹{totalRevenue}</p>
      </div>

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

      {/* CATEGORY */}
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

      {/* VIDEO UPLOAD */}
      <input
        type="file"
        className="mb-4"
        onChange={async (e: any) => {
          try {
            const file = e.target.files[0];
            if (!file) return;

            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "vn_templates");

            const res = await fetch(
              "https://api.cloudinary.com/v1_1/dnimbwwsh/video/upload",
              {
                method: "POST",
                body: formData
              }
            );

            const data = await res.json();

            if (!res.ok) {
              alert("Upload failed: " + data.error?.message);
              return;
            }

            setVideo(data.secure_url);

            alert("Video uploaded!");

          } catch (err) {
            console.error(err);
            alert("Upload error");
          }

          // ✅ MOVE THIS OUTSIDE finally
          setUploading(false);
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
        placeholder="Download Link"
        value={downloadLink}
        onChange={(e) => setDownloadLink(e.target.value)}
      />

      {/* BUTTON */}
      <button
        onClick={uploadTemplate}
        disabled={uploading || !video || !downloadLink || !category}
        className="bg-green-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload Template"}
      </button>

    </main>
  );
}
