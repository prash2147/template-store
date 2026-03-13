"use client";

import { useState } from "react";

export default function CategoriesPage() {

  const [name, setName] = useState("");

  const addCategory = async () => {

    await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    alert("Category Added");
    setName("");
  };

  return (
    <main className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Add Category
      </h1>

      <input
        className="border p-2 mr-3"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={addCategory}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>

    </main>
  );
}