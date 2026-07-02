"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Video = {
  id: number;
  title: string;
  caption: string;
  status: string;
  video_url: string;
  created_at: string;
};

export default function DraftVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    loadVideos();
  }, []);
async function moveToSchedule(id: number) {
  const scheduledDate = new Date();

  scheduledDate.setHours(
    scheduledDate.getHours() + 1
  );

  const { error } = await supabase
    .from("video_url")
    .update({
      status: "scheduled",
      scheduled_at: scheduledDate.toISOString(),
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadVideos();
}

async function publishNow(id: number) {
  const response = await fetch(
    "/api/tiktok/publish",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        videoId: id,
      }),
    }
  );

  const result =
    await response.json();

  console.log(result);

  if (!result.success) {
    alert("Publish failed");
    return;
  }

  alert("Video sent to TikTok");

  loadVideos();
}
  async function loadVideos() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("video_url")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "draft")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(data);
    }
  }

  return (
    <>
      <h2 className="text-4xl font-bold">
        Draft Videos
      </h2>

      <p className="mt-2 text-zinc-400">
        Videos waiting to be scheduled or published.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-xl font-semibold">
          Draft Content
        </h3>

        <div className="space-y-3">
          {videos.length === 0 ? (
            <p className="text-zinc-500">
              No draft videos.
            </p>
          ) : (
            videos.map((video) => (
  <div
    key={video.id}
    className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
  >
                <div>
  <div className="font-semibold">
    {video.title}
  </div>

  <div className="text-sm text-zinc-500">
    Created on{" "}
    {new Date(
      video.created_at
    ).toLocaleString()}
  </div>

  <div className="mt-1 flex gap-4">
    <a
      href={video.video_url}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer text-sm text-blue-400 hover:text-blue-300 hover:underline"
    >
      View Video
    </a>

    <button
  onClick={() =>
    moveToSchedule(video.id)
  }
  className="cursor-pointer text-sm text-yellow-400 hover:text-yellow-300"
>
  Schedule
</button>

    <button
  onClick={() =>
    publishNow(video.id)
  }
  className="cursor-pointer text-sm text-green-400 hover:text-green-300"
>
  Publish Now
</button>
  </div>
</div>

                <span className="rounded-full bg-zinc-700 px-3 py-1 text-sm text-zinc-300">
  Draft
</span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}