"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    let finalScheduledAt = null;

    if (selectedDate && selectedTime) {
      finalScheduledAt = new Date(selectedDate);

      finalScheduledAt.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0
      );
    }

    if (!videoFile) {
      alert("Please select a video file");
      setLoading(false);
      return;
    }

    const fileExt = videoFile.name.split(".").pop();

    const fileName = `${user.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("videos")
      .upload(fileName, videoFile);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("videos")
      .getPublicUrl(fileName);

    const videoUrl = publicUrlData.publicUrl;

    const { error } = await supabase
      .from("video_url")
      .insert([
        {
          user_id: user.id,
          title,
          caption,
          status: finalScheduledAt ? "scheduled" : "draft",
          scheduled_at: finalScheduledAt,
          video_url: videoUrl,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Video uploaded successfully!");

    setTitle("");
    setCaption("");
    setVideoFile(null);

    setSelectedDate(null);
    setSelectedTime(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <h2 className="text-4xl font-bold">
        Upload Videos
      </h2>

      <p className="mt-2 text-zinc-400">
        Upload and schedule your TikTok content.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="mb-6 text-xl font-semibold">
          New Upload
        </h3>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video title"
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Caption
            </label>

            <textarea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your TikTok caption..."
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Video File
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={(e) =>
                setVideoFile(e.target.files?.[0] || null)
              }
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Schedule Date & Time
            </label>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  dateFormat="dd MMM yyyy"
                  placeholderText="📅 Select date"
                  minDate={new Date()}
                  className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white"
                />
              </div>

              <div className="w-40">
                <DatePicker
                  selected={selectedTime}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  placeholderText="🕒 Time"
                  className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105 hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </div>
    </>
  );
}