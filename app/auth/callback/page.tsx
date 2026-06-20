"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");

  useEffect(() => {
    async function handleCallback() {
      if (!code) return;

      try {
        // Ambil user login
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        // Kirim code ke backend
        const response = await fetch(
          "/api/tiktok/token",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              code,
              userId: session.user.id,
            }),
          }
        );

        const data =
          await response.json();

        console.log(
          "TikTok callback success:",
          data
        );

        // Redirect ke settings
        router.push(
          "/dashboard/settings"
        );
      } catch (error) {
        console.error(
          "TikTok callback error:",
          error
        );
      }
    }

    handleCallback();
  }, [code, router]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Connecting TikTok...
      </h1>

      <p className="mt-4 text-zinc-400">
        Please wait while we connect
        your TikTok account.
      </p>
    </div>
  );
}

export default function TikTokCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10">
          Loading...
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}