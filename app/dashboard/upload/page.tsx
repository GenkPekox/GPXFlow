"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [videoData, setVideoData] = useState<
  {
    title: string;
    caption: string;
    publishType: string;
    date: Date | null;
    time: Date | null;
  }[]
>([]);
  const [actionType, setActionType] = useState("publish");
  const [videoPreview, setVideoPreview] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [loading, setLoading] = useState(false);
  const [publishType, setPublishType] = useState("publish");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive } =
  useDropzone({
    accept: {
      "video/*": [],
    },

    multiple: true,

    onDrop: (acceptedFiles) => {
  if (acceptedFiles.length > 0) {
    setVideoFiles(acceptedFiles);
    setVideoData(
  acceptedFiles.map(() => ({
    title: "",
    caption: "",
    publishType: "published",
    date: null,
    time: null,
  }))
);

    // sementara tetap pakai video pertama
    setVideoFile(acceptedFiles[0]);
    setVideoPreview(URL.createObjectURL(acceptedFiles[0]));
  }
},
  });

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

    if (videoFiles.length === 0) {
  alert("Please select at least one video");
  setLoading(false);
  return;
}

  for (const [index, file] of videoFiles.entries()) {
    let finalScheduledAt = null;

if (videoData[index].date && videoData[index].time) {
  finalScheduledAt = new Date(videoData[index].date);

  finalScheduledAt.setHours(
    videoData[index].time!.getHours(),
    videoData[index].time!.getMinutes(),
    0,
    0
  );
}
  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("videos")
    .upload(fileName, file);

  if (uploadError) {
    alert(uploadError.message);
    continue;
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
          title: videoData[index].title,
caption: videoData[index].caption,
          status:
  videoData[index].publishType === "scheduled"
    ? "scheduled"
    : "published",
    scheduled_at:
  videoData[index].publishType === "scheduled"
    ? finalScheduledAt
    : null,
          video_url: videoUrl,
        },
      ]);

      if (error) {
  alert(error.message);
  continue;
}
}

    alert("Video uploaded successfully!");

    setVideoFile(null);
setVideoFiles([]);
setVideoData([]);

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

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 max-w-7xl">

<div className="space-y-6">

  {/* Facebook Style Layout nanti disini */}

  {videoFiles.length > 0 && (
  <>
    {videoFiles.map((file, index) => (
      <div
        key={index}
        className="mb-6 overflow-hidden rounded-xl border border-zinc-700"
      >
        {/* 🔥 INI YANG DIMAKSUD "IDENTITAS VID DI ATASNYA" */}
<div className="px-5 pt-4 flex items-center gap-2">
  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
    VID {String(index + 1).padStart(2, "0")}
  </span>

  <span className="text-xs text-zinc-500 break-all">
  {file.name}
</span>
</div>
        <div className="grid grid-cols-[1.2fr_1.2fr_180px_180px_180px] gap-6 p-5 items-start">

          <div>
            <p className="mb-2 text-xs text-zinc-400">
              Title
            </p>

            <input
  type="text"
  placeholder="Video title"
  value={videoData[index]?.title || ""}
  onChange={(e) => {
    const updated = [...videoData];
    updated[index].title = e.target.value;
    setVideoData(updated);
  }}
  className="h-12 w-full rounded-lg border border-zinc-700 bg-black px-3 text-white"
/>
          </div>

          <div>
            <p className="mb-2 text-xs text-zinc-400">
              Caption
            </p>

            <textarea
  rows={1}
  placeholder="Caption..."
  value={videoData[index]?.caption || ""}
  onChange={(e) => {
    const updated = [...videoData];
    updated[index].caption = e.target.value;
    setVideoData(updated);
  }}
  className="h-12 w-full resize-none rounded-lg border border-zinc-700 bg-black px-3 py-3 text-white"
/>
          </div>

          <div>
            <p className="mb-2 text-xs text-zinc-400">
              Publish
            </p>

            <select
  value={videoData[index]?.publishType || "published"}
  onChange={(e) => {
    const updated = [...videoData];
    updated[index].publishType = e.target.value;
    setVideoData(updated);
  }}
  className="h-12 w-full rounded-lg border border-zinc-700 bg-black px-3 text-white"
>
  <option value="published">Publish Now</option>
  <option value="scheduled">Schedule</option>
</select>
          </div>

          <div>
            <p className="mb-2 text-xs text-zinc-400">
              Date
            </p>

            <DatePicker
  selected={videoData[index]?.date}
  onChange={(date: Date | null) => {
    const updated = [...videoData];
    updated[index].date = date;
    setVideoData(updated);
  }}
  dateFormat="dd MMM yyyy"
  minDate={new Date()}
  placeholderText="Select date"
  className="h-12 w-full rounded-lg border border-zinc-700 bg-black px-3 text-white"
/>
          </div>

          <div>
            <p className="mb-2 text-xs text-zinc-400">
              Time
            </p>

            <DatePicker
  selected={videoData[index]?.time}
  onChange={(date: Date | null) => {
    const updated = [...videoData];
    updated[index].time = date;
    setVideoData(updated);
  }}
  showTimeSelect
  showTimeSelectOnly
  timeIntervals={15}
  timeFormat="HH:mm"
  dateFormat="HH:mm"
  placeholderText="Select time"
  className="h-12 w-full rounded-lg border border-zinc-700 bg-black px-3 text-white"
/>
          </div>

        </div>
      </div>
    ))}
  </>
)}

{!videoFile ? (
  <div
    {...getRootProps()}
    className="cursor-pointer rounded-2xl border-2 border-dashed border-zinc-700 bg-black py-24 text-center transition hover:border-white"
  >
    <input {...getInputProps()} />

    {isDragActive ? (
      <p className="text-white">
        Drop the video here...
      </p>
    ) : (
      <div>
  <p className="text-2xl font-bold text-white">
    Select videos to upload
  </p>

  <p className="mt-2 text-sm text-zinc-400">
    Or drag and drop them here. You can upload up to 50 videos.
  </p>

  <button
  type="button"
  className="mt-6 cursor-pointer rounded-lg bg-pink-600 px-8 py-3 font-semibold text-white"
>
  Select videos
</button>
</div>
    )}
  </div>
) : (
  <div className="mt-8 flex justify-end border-t border-zinc-800 pt-6">
    <button
      onClick={handleUpload}
      disabled={loading}
      className="rounded-lg bg-pink-600 px-8 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Uploading..." : "Upload Video"}
    </button>
  </div>
)}

{/* Schedule nanti dipindah ke Facebook Style Layout */}

        </div>
      </div>
    </>
  );
}