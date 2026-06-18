"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

        <h1 className="text-center text-3xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-center text-zinc-400">
          Welcome back to GPXFlow
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

        <div className="mt-5">
  <div className="mb-2 flex items-center justify-between">
    <label className="text-sm">
      Password
    </label>

    <Link
      href="/forgot-password"
      className="text-xs text-zinc-400 hover:text-white"
    >
      Forgot Password?
    </Link>
  </div>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full rounded-xl border border-zinc-700 bg-black p-3 pr-12"
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
  onClick={handleLogin}
  className="mt-8 w-full rounded-xl bg-white py-3 font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
>
  Login
</button>
<p className="mt-6 text-center text-sm text-zinc-400">
  Don't have an account?{" "}
  <Link
    href="/register"
    className="font-medium text-white hover:underline"
  >
    Sign up
  </Link>
</p>

      </div>
    </main>
  );
}