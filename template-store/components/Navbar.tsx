"use client";

import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        VN Templates
      </h1>

      <div className="flex gap-6">

        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>

        <Link href="/templates" className="hover:text-gray-300">
          Templates
        </Link>

        <Link href="/admin" className="hover:text-gray-300">
          Upload
        </Link>

      </div>

    </nav>
  );
}