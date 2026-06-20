"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
const [fullName, setFullName] = useState("");
const [autoPublish, setAutoPublish] = useState(false);
const [emailNotifications, setEmailNotifications] = useState(false);

const [tiktokConnected, setTiktokConnected] =
  useState(false);

useEffect(() => {
  async function loadUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    setEmail(session.user.email || "");

    const { data: profile } = await supabase
  .from("profiles")
  .select("full_name, tiktok_connected")
  .eq("id", session.user.id)
  .single();

if (profile) {
  console.log(profile);
  setFullName(profile.full_name || "");
  setTiktokConnected(profile.tiktok_connected || false);
}

    if (profile) {
      setFullName(profile.full_name || "");
    }
  }

  loadUser();
}, []);
  return (
    <>
      <h2 className="text-4xl font-bold">
        Settings
      </h2>

      <p className="mt-2 text-zinc-400">
        Manage your GPXFlow account and preferences.
      </p>
      {/* Account Information */}
<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

  <div className="flex items-center justify-between">

    <div>
      <h3 className="text-2xl font-bold">
        Account Information
      </h3>

      <p className="mt-1 text-sm text-zinc-400">
        Manage your account details and subscription.
      </p>
    </div>

    <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-4 text-right">

  <p className="text-xs uppercase tracking-wider text-zinc-400">
    Current Plan
  </p>

  <p className="mt-1 text-lg font-bold text-cyan-400">
    Free
  </p>

  <button className="mt-3 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500 transition">
    Upgrade Plan
  </button>

</div>

  </div>

  <div className="mt-8 grid gap-6 md:grid-cols-2">

    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Full Name
      </p>

      <p className="mt-2 text-lg font-semibold">
        {fullName || "Not Set"}
      </p>
    </div>

    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Email Address
      </p>

      <p className="mt-2 text-lg font-semibold break-all">
        {email || "Loading..."}
      </p>
    </div>

  </div>

</div>

      {/* Account */}
<div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

  <h3 className="text-2xl font-bold">
    TikTok Integration
  </h3>

  <p className="mt-1 text-sm text-zinc-400">
    Connect your TikTok account to enable automated publishing.
  </p>

  <div className="mt-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">

  <div className="flex items-center gap-2">

    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>

    <span
  className={`font-medium ${
    tiktokConnected
      ? "text-green-400"
      : "text-yellow-400"
  }`}
>
  {tiktokConnected
    ? "Connected"
    : "Not Connected"}
</span>

  </div>

  <p className="mt-2 text-sm text-zinc-400">
  {tiktokConnected
    ? "Your TikTok account is connected and ready for publishing."
    : "No TikTok account is currently connected to GPXFlow."}
</p>

</div>
<button
  onClick={() => {
    window.location.href = "/api/tiktok/login";
  }}
  className="mt-5 rounded-2xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
>
  Connect TikTok Account
</button>

      </div>

      {/* Timezone */}
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h3 className="text-2xl font-bold">
  Timezone
</h3>

<p className="mt-1 text-sm text-zinc-400">
  Used for scheduled publishing and content automation.
</p>
<p className="mt-4 text-sm font-medium text-cyan-400">
  Current Timezone
</p>

       <select className="mt-2 w-full rounded-xl border border-zinc-700 bg-black p-3">
          <option>UTC</option>
<option>Asia/Jakarta</option>
<option>Asia/Singapore</option>
<option>Asia/Tokyo</option>
<option>Asia/Seoul</option>
<option>Europe/London</option>
<option>Europe/Berlin</option>
<option>America/New_York</option>
<option>America/Los_Angeles</option>
<option>Australia/Sydney</option>
        </select>
        

      </div>

      {/* Publish Settings */}
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h3 className="text-2xl font-bold">
  Publish Settings
</h3>

<p className="mt-1 text-sm text-zinc-400">
  Configure how GPXFlow handles scheduled publishing and notifications.
</p>
        <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4">

  <div>
    <p className="font-medium">
      Auto Publish Scheduled Videos
    </p>

    <p className="mt-1 text-sm text-zinc-400">
      Automatically publish videos at their scheduled time.
    </p>
  </div>

  <button
  onClick={() => setAutoPublish(!autoPublish)}
  className={`relative h-7 w-14 rounded-full transition ${
    autoPublish
      ? "bg-cyan-500"
      : "bg-zinc-700"
  }`}
>
  <span
    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
      autoPublish
        ? "left-8"
        : "left-1"
    }`}
  />
</button>

</div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/30 p-4">

  <div>
    <p className="font-medium">
      Email Notifications
    </p>

    <p className="mt-1 text-sm text-zinc-400">
      Receive email updates about uploads, publishing status, and failures.
    </p>
  </div>

  <button
    onClick={() =>
      setEmailNotifications(!emailNotifications)
    }
    className={`relative h-7 w-14 rounded-full transition ${
      emailNotifications
        ? "bg-cyan-500"
        : "bg-zinc-700"
    }`}
  >
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
        emailNotifications
          ? "left-8"
          : "left-1"
      }`}
    />
  </button>

</div>

        </div>

      </div>
    </>
  );
}