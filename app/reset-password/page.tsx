"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleUpdatePassword() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password updated successfully!");

    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-center text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mt-2 text-center text-zinc-400">
          Enter your new password below.
        </p>

        <div className="mt-8">
  <label className="mb-2 block text-sm">
    New Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full rounded-xl border border-zinc-700 bg-black p-3 pr-12"
      placeholder="New password"
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

        <div className="mt-5">
          <label className="mb-2 block text-sm">
            Confirm Password
          </label>

          <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full rounded-xl border border-zinc-700 bg-black p-3 pr-12"
    placeholder="Confirm password"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
  >
    {showConfirmPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>
</div>
</div>

        <button
          onClick={handleUpdatePassword}
          className="mt-8 w-full rounded-xl bg-white py-3 font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
        >
          Update Password
        </button>
      </div>
    </main>
  );
}