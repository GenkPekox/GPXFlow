"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type PublishedVideo = {
  id: number;
  title: string;
  status: string;
  video_url: string;
  scheduled_at: string;
};

export default function PublishedVideosPage() {
  const [videos, setVideos] = useState<PublishedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPublishedVideos() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("video_url")
      .select(
        "id, title, status, video_url, scheduled_at"
      )
      .eq("user_id", user.id)
      .eq("status", "published")
      .order("scheduled_at", {
        ascending: false,
      });

    if (!error && data) {
      setVideos(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPublishedVideos();
  }, []);

  return (
  <>
    <h2 className="text-4xl font-bold">
      Published Videos
    </h2>

    <p className="mt-2 text-zinc-400">
      Videos successfully published to TikTok.
    </p>

    <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-4 text-xl font-semibold">
        Published Content
      </h3>

      {loading ? (
        <p className="text-zinc-500">
          Loading...
        </p>
      ) : videos.length === 0 ? (
        <p className="text-zinc-500">
          No published videos.
        </p>
      ) : (
  <div className="space-y-4">
    {videos.map((video) => (
      <div
        key={video.id}
        className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
      >
        <div>
          <div className="font-semibold">
            {video.title}
          </div>

          <div className="text-sm text-zinc-500">
            Published on{" "}
            {new Date(
              video.scheduled_at
            ).toLocaleString()}
          </div>

          <div className="mt-1">
            <a
              href={video.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-sm text-blue-400 hover:text-blue-300 hover:underline"
            >
              View Video
            </a>
          </div>
        </div>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
          Published
        </span>
      </div>
    ))}
  </div>
)}

    </div>
  </>
  );
}