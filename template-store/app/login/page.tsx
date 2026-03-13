"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/admin"
    });

  };

  return (
    <main className="p-10 max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Admin Login
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mb-4"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Login
      </button>

    </main>
  );
}