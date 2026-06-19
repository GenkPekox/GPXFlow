"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CallbackContent() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        TikTok Callback
      </h1>

      <div className="mt-6">
        <p>
          <strong>State:</strong> {state}
        </p>

        <p className="mt-4">
          <strong>Code:</strong>
        </p>

        <textarea
          className="w-full border p-2 mt-2"
          rows={8}
          value={code || ""}
          readOnly
        />
      </div>
    </div>
  );
}

export default function TikTokCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}