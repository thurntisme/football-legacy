"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, clearError } from "@/store/slices/authSlice";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
