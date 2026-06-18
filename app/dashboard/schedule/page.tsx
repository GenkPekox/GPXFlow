"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ScheduledVideo = {
  id: number;
  title: string;
  status: string;
  scheduled_at: string;
  video_url: string;
};

export default function SchedulePage() {
  const [videos, setVideos] = useState<ScheduledVideo[]>([]);
  const [loading, setLoading] = useState(true);

  async function moveToDraft(id: number) {
  const { error } = await supabase
    .from("video_url")
    .update({
      status: "draft",
      scheduled_at: null,
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadScheduledVideos();
}

async function publishNow(id: number) {
  const { error } = await supabase
    .from("video_url")
    .update({
      status: "published",
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadScheduledVideos();
}

async function editSchedule(id: number) {
  const newDate = prompt(
    "Enter new schedule date (YYYY-MM-DD HH:MM)"
  );

  if (!newDate) return;

  const { error } = await supabase
    .from("video_url")
    .update({
      scheduled_at: new Date(newDate).toISOString(),
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadScheduledVideos();
}

async function loadScheduledVideos() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("video_url")
      .select("id, title, status, scheduled_at, video_url")
      .eq("user_id", user.id)
      .eq("status", "scheduled")
      .order("scheduled_at", { ascending: true });

    if (!error && data) {
      setVideos(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadScheduledVideos();
  }, []);

  return (
    <>
      <h2 className="text-4xl font-bold">
        Schedule Queue
      </h2>

      <p className="mt-2 text-zinc-400">
        Manage upcoming TikTok posts.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-xl font-semibold">
          Scheduled Content
        </h3>

        {loading ? (
          <p className="text-zinc-500">
            Loading...
          </p>
        ) : videos.length === 0 ? (
          <p className="text-zinc-500">
            No scheduled videos.
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
                    Scheduled for{" "}
                    {new Date(
                      video.scheduled_at
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
    editSchedule(video.id)
  }
  className="cursor-pointer text-sm text-yellow-400 hover:text-yellow-300"
>
  Edit Schedule
</button>

<button
  onClick={() =>
    publishNow(video.id)
  }
  className="cursor-pointer text-sm text-green-400 hover:text-green-300"
>
  Publish Now
</button>

                    <button
  onClick={() =>
    moveToDraft(video.id)
  }
  className="cursor-pointer text-sm text-red-400 hover:text-red-300"
>
  Move to Draft
</button>
                  </div>
                </div>

                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-400">
                  {video.status.charAt(0).toUpperCase() +
                    video.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}