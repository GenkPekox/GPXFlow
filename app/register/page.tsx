"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Registration successful! Please check your email to verify your account."
    );

    setFullName("");
    setEmail("");
    setPassword("");

    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-center text-zinc-400">
          Join GPXFlow
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-sm">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none"
            placeholder="Your full name"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div className="mt-5">
  <label className="mb-2 block text-sm">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full rounded-xl border border-zinc-700 bg-black p-3 pr-12 outline-none"
      placeholder="********"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
</div>

        <button
          onClick={handleRegister}
          className="mt-8 w-full rounded-xl bg-white py-3 font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
        >
          Register
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-white hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}