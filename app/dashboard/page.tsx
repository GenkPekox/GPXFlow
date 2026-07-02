"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [scheduledCount, setScheduledCount] = useState(0);
const [draftCount, setDraftCount] = useState(0);
const [publishedCount, setPublishedCount] = useState(0);

useEffect(() => {
  fetchCounts();
}, []);

async function fetchCounts() {
  const { count: scheduled } = await supabase
    .from("video_url")
    .select("*", { count: "exact", head: true })
    .eq("status", "scheduled");

  const { count: draft } = await supabase
    .from("video_url")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");

  const { count: published } = await supabase
    .from("video_url")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  setScheduledCount(scheduled || 0);
  setDraftCount(draft || 0);
  setPublishedCount(published || 0);
}

  return (
    <>
      <h2 className="text-4xl font-bold">
        Dashboard
      </h2>

      <p className="mt-2 text-zinc-400">
        Manage your TikTok publishing workflow.
      </p>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Scheduled Posts
          </div>

          <div className="mt-3 text-4xl font-bold">
            {scheduledCount}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Draft Videos
          </div>

          <div className="mt-3 text-4xl font-bold">
            {draftCount}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Published
          </div>

          <div className="mt-3 text-4xl font-bold">
            {publishedCount}
          </div>
        </div>

      </div>

      {/* Connected Account */}
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="text-xl font-semibold">
          Connected TikTok Account
        </h3>

        <p className="mt-3 text-zinc-400">
          @creator_account
        </p>

        <p className="mt-2 text-green-400">
          ● Connected
        </p>
      </div>

      {/* Upcoming Posts */}
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-xl font-semibold">
          Upcoming Posts
        </h3>

        <div className="space-y-3">

          <div className="flex justify-between border-b border-zinc-800 pb-3">
            <span>SummerPromo.mp4</span>
            <span className="text-zinc-500">
              Jun 14 • 09:00
            </span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-3">
            <span>ProductLaunch.mp4</span>
            <span className="text-zinc-500">
              Jun 15 • 18:00
            </span>
          </div>

          <div className="flex justify-between">
            <span>BehindScenes.mp4</span>
            <span className="text-zinc-500">
              Jun 17 • 12:00
            </span>
          </div>

        </div>
      </div>
    </>
  );
}