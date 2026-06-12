export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 border-r border-zinc-800 p-6">
          <h1 className="mb-10 text-2xl font-bold">
            GPXFlow
          </h1>

          <nav className="space-y-4 text-zinc-400">
            <div className="text-white">Dashboard</div>
            <div>Upload Videos</div>
            <div>Schedule Queue</div>
            <div>Published Videos</div>
            <div>Analytics</div>
            <div>Settings</div>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-8">

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
                24
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-zinc-500">
                Draft Videos
              </div>

              <div className="mt-3 text-4xl font-bold">
                17
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="text-zinc-500">
                Published
              </div>

              <div className="mt-3 text-4xl font-bold">
                132
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

        </section>
      </div>
    </main>
  );
}