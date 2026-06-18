"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type FailedVideo = {
  id: number;
  title: string;
  status: string;
  video_url: string;
  scheduled_at: string;
};

export default function FailedVideosPage() {
  const [videos, setVideos] = useState<FailedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  async function rescheduleVideo(id: number) {
    const newDate = new Date();

    newDate.setHours(
      newDate.getHours() + 1
    );

    const { error } = await supabase
      .from("video_url")
      .update({
        status: "scheduled",
        scheduled_at: newDate.toISOString(),
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadFailedVideos();
  }

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

    loadFailedVideos();
  }

  async function loadFailedVideos() {
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
      .eq("status", "failed")
      .order("scheduled_at", {
        ascending: false,
      });

    if (!error && data) {
      setVideos(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadFailedVideos();
  }, []);

  return (
    <>
      <h2 className="text-4xl font-bold">
        Failed Videos
      </h2>

      <p className="mt-2 text-zinc-400">
        Videos that failed to publish.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-4 text-xl font-semibold">
          Failed Content
        </h3>

        {loading ? (
          <p className="text-zinc-500">
            Loading...
          </p>
        ) : videos.length === 0 ? (
          <p className="text-zinc-500">
            No failed videos.
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
                    Failed on{" "}
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
                        rescheduleVideo(video.id)
                      }
                      className="cursor-pointer text-sm text-yellow-400 hover:text-yellow-300"
                    >
                      Reschedule
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

                <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-400">
                  Failed
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}