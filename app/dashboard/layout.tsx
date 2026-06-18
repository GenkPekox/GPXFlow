"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState("");
const [fullName, setFullName] = useState("");
const [contentOpen, setContentOpen] = useState(true);
const [loading, setLoading] = useState(true);

const [draftCount, setDraftCount] = useState(0);
const [scheduledCount, setScheduledCount] = useState(0);
const [publishedCount, setPublishedCount] = useState(0);
const [failedCount, setFailedCount] = useState(0);
const [userId, setUserId] = useState("");

useEffect(() => {
  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    setEmail(session.user.email || "");
setUserId(session.user.id);

const { data: profile } = await supabase
  .from("profiles")
  .select("full_name")
  .eq("id", session.user.id)
  .single();

if (profile) {
  setFullName(profile.full_name || "");
}

await loadCounts(session.user.id);

setLoading(false);
  }

  checkUser();
}, [router]);

useEffect(() => {
  if (!userId) return;

  const channel = supabase
  .channel("video-counts")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "video_url",
    },
    (payload) => {
      console.log("Realtime event:", payload);

      loadCounts(userId);
    }
  )
  .subscribe((status) => {
    console.log("Realtime status:", status);
  });

  return () => {
    supabase.removeChannel(channel);
  };
}, [userId]);

  async function loadCounts(userId: string) {
  const { data } = await supabase
    .from("video_url")
    .select("status")
    .eq("user_id", userId);

  if (!data) return;

  setDraftCount(
    data.filter((v) => v.status === "draft").length
  );

  setScheduledCount(
    data.filter((v) => v.status === "scheduled").length
  );

  setPublishedCount(
    data.filter((v) => v.status === "published").length
  );

  setFailedCount(
    data.filter((v) => v.status === "failed").length
  );
}
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Upload Videos",
    href: "/dashboard/upload",
  },
];

const contentItems = [
  {
    name: "Draft Videos",
    href: "/dashboard/drafts",
    count: draftCount,
    color: "bg-zinc-700",
  },
  {
    name: "Schedule Queue",
    href: "/dashboard/schedule",
    count: scheduledCount,
    color: "bg-yellow-600",
  },
  {
    name: "Published Videos",
    href: "/dashboard/published",
    count: publishedCount,
    color: "bg-green-600",
  },
  {
    name: "Failed Videos",
    href: "/dashboard/failed",
    count: failedCount,
    color: "bg-red-600",
  },
];

const bottomItems = [
  {
    name: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];
if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      Loading...
    </div>
  );
}

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex">
        <aside className="w-64 border-r border-zinc-800 p-6">
          <Link
            href="/"
            className="mb-10 flex items-center gap-3"
          >
            <Image
              src="/LOGO3.png"
              alt="GPXFlow Logo"
              width={40}
              height={40}
            />

            <span className="text-2xl font-bold">
              GPXFlow
            </span>
          </Link>

          <nav className="space-y-3">

  {menuItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={`block rounded-lg px-4 py-3 transition ${
        pathname === item.href
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {item.name}
    </Link>
  ))}

  <div className="pt-6">

  <button
    onClick={() => setContentOpen(!contentOpen)}
    className="flex w-full items-center justify-between px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-white"
  >
    <span>Content</span>

    <span>
      {contentOpen ? "▼" : "▶"}
    </span>
  </button>

    {contentOpen && (
  <>
    {contentItems.map((item) => (
  <Link
    key={item.href}
    href={item.href}
    className={`flex items-center justify-between rounded-lg px-4 py-3 transition ${
      pathname === item.href
        ? "bg-zinc-800 text-white"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`}
  >
    <span>{item.name}</span>

    <span
      className={`rounded-full px-2 py-1 text-xs text-white ${item.color}`}
    >
      {item.count}
    </span>
  </Link>
))}
  </>
)}
  </div>

  <div className="pt-6">
  {bottomItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={`block rounded-lg px-4 py-3 transition ${
        pathname === item.href
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {item.name}
    </Link>
  ))}
</div>

</nav>

          <button
            onClick={handleLogout}
            className="mt-10 w-full rounded-xl border border-red-700 px-4 py-3 text-red-400 hover:bg-red-900/20"
          >
            Logout
          </button>
        </aside>

        <section className="flex-1">
          <header className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
            <div>
              <h2 className="text-2xl font-bold">
                GPXFlow Dashboard
              </h2>

              <p className="text-sm text-zinc-400">
                Manage your TikTok publishing workflow
              </p>
            </div>

            <div className="flex items-center gap-4">
  <button className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-800">
    🔔
  </button>

  <div className="flex items-center gap-3 rounded-xl border border-zinc-700 px-4 py-2">
    <Image
      src="/LOGO3.png"
      alt="GPXFlow"
      width={36}
      height={36}
      className="rounded-full"
    />

    <div>
      <div className="text-sm font-medium">
        {fullName || email || "Loading..."}
      </div>

      <div className="text-xs text-zinc-400">
        User
      </div>
    </div>
  </div>
</div>

</header>

<div className="p-8">
  {children}
</div>
        </section>
      </div>
    </main>
  );
}