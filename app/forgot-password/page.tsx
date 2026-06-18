"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  async function handleResetPassword() {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: "http://localhost:3000/reset-password",
      }
    );

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password reset link sent! Check your email.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-center text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-2 text-center text-zinc-400">
          Enter your email to receive a password reset link.
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-sm">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            placeholder="you@example.com"
          />
        </div>

        <button
          onClick={handleResetPassword}
          className="mt-8 w-full rounded-xl bg-white py-3 font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
        >
          Send Reset Link
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-white hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}