"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
  const [totalVideos, setTotalVideos] = useState(0);
  const [draftVideos, setDraftVideos] = useState(0);
  const [scheduledVideos, setScheduledVideos] =
    useState(0);
  const [publishedVideos, setPublishedVideos] =
    useState(0);
  const [failedVideos, setFailedVideos] =
    useState(0);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("video_url")
      .select("status")
      .eq("user_id", user.id);

    if (!data) return;

    setTotalVideos(data.length);

    setDraftVideos(
      data.filter(
        (video) => video.status === "draft"
      ).length
    );

    setScheduledVideos(
      data.filter(
        (video) => video.status === "scheduled"
      ).length
    );

    setPublishedVideos(
      data.filter(
        (video) => video.status === "published"
      ).length
    );

    setFailedVideos(
      data.filter(
        (video) => video.status === "failed"
      ).length
    );
  }

  const successRate =
    totalVideos === 0
      ? 0
      : Math.round(
          (publishedVideos / totalVideos) * 100
        );

  return (
    <>
      <h2 className="text-4xl font-bold">
        Analytics
      </h2>

      <p className="mt-2 text-zinc-400">
        Monitor your GPXFlow content pipeline.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Total Videos
          </div>

          <div className="mt-3 text-4xl font-bold">
            {totalVideos}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Draft Videos
          </div>

          <div className="mt-3 text-4xl font-bold">
            {draftVideos}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Scheduled Videos
          </div>

          <div className="mt-3 text-4xl font-bold">
            {scheduledVideos}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Published Videos
          </div>

          <div className="mt-3 text-4xl font-bold">
            {publishedVideos}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Failed Videos
          </div>

          <div className="mt-3 text-4xl font-bold">
            {failedVideos}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-500">
            Success Rate
          </div>

          <div className="mt-3 text-4xl font-bold">
            {successRate}%
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-xl font-semibold">
          Performance Overview
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 p-4">
            <div className="text-zinc-500">
              Published Content
            </div>

            <div className="mt-2 text-3xl font-bold text-green-400">
              {publishedVideos}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-4">
            <div className="text-zinc-500">
              Upcoming Scheduled
            </div>

            <div className="mt-2 text-3xl font-bold text-yellow-400">
              {scheduledVideos}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}