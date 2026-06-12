import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Navbar */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <Image
              src="/LOGO3.png"
              alt="GPXFlow Logo"
              width={60}
              height={60}
              priority
            />
            <span className="text-2xl font-bold">GPXFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-zinc-400">
            <a href="#" className="transition hover:text-white">
              Features
            </a>
            <a href="#" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#" className="transition hover:text-white">
              About
            </a>
          </div>

          <button className="rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:opacity-90">
            Login with TikTok
          </button>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center pt-20 text-center">

          <div className="mb-6 rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
            Professional TikTok Workflow Platform
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"></div>

            <Image
              src="/LOGO3.png"
              alt="GPXFlow"
              width={280}
              height={280}
              priority
              className="relative z-10"
            />
          </div>

          <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Manage TikTok Publishing
            <br />
            From One Professional Dashboard
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-zinc-400">
            Upload videos, organize content, schedule publishing,
            and manage your TikTok workflow from a single platform.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:opacity-90">
              Login with TikTok
            </button>

            <button className="rounded-xl border border-zinc-700 px-8 py-4 text-lg transition hover:bg-zinc-900">
              Watch Demo
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-24 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
            <div className="text-4xl font-bold">24/7</div>
            <div className="mt-3 text-zinc-400">
              Automated scheduling
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
            <div className="text-4xl font-bold">Unlimited</div>
            <div className="mt-3 text-zinc-400">
              Content organization
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
            <div className="text-4xl font-bold">1 Dashboard</div>
            <div className="mt-3 text-zinc-400">
              Manage your workflow
            </div>
          </div>

        </section>

        {/* Dashboard Preview */}
        <section className="py-24">
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">

            {/* Window Header */}
            <div className="flex items-center gap-2 border-b border-zinc-800 p-4">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>

            <div className="grid md:grid-cols-4">

              {/* Sidebar */}
              <div className="border-r border-zinc-800 p-6">
                <h3 className="mb-8 text-xl font-bold">
                  GPXFlow
                </h3>

                <div className="space-y-5 text-zinc-400">
                  <div>Dashboard</div>
                  <div>TikTok Upload</div>
                  <div>Schedule Queue</div>
                  <div>Published Videos</div>
                  <div>Analytics</div>
                  <div>Connected Accounts</div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-8 md:col-span-3">

                <div className="mb-6 rounded-2xl border border-zinc-800 bg-black p-6">
                  <div className="text-zinc-500">
                    Connected TikTok Account
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    @creator_account
                  </div>

                  <div className="mt-2 text-green-400">
                    ● Connected
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-3">

                  <div className="rounded-2xl bg-black p-6">
                    <div className="text-zinc-500">
                      Scheduled Today
                    </div>
                    <div className="mt-3 text-3xl font-bold">
                      12
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black p-6">
                    <div className="text-zinc-500">
                      Draft Videos
                    </div>
                    <div className="mt-3 text-3xl font-bold">
                      42
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black p-6">
                    <div className="text-zinc-500">
                      Published Videos
                    </div>
                    <div className="mt-3 text-3xl font-bold">
                      318
                    </div>
                  </div>

                </div>

                {/* Calendar */}
                <div className="mt-6 rounded-2xl bg-black p-6">

                  <div className="mb-4 text-xl font-semibold">
                    Content Calendar
                  </div>

                  <div className="grid grid-cols-7 gap-3 text-center text-sm">

                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>

                    <div className="rounded-lg border border-zinc-800 p-3">9</div>
                    <div className="rounded-lg border border-cyan-500 p-3">10</div>
                    <div className="rounded-lg border border-zinc-800 p-3">11</div>
                    <div className="rounded-lg border border-cyan-500 p-3">12</div>
                    <div className="rounded-lg border border-zinc-800 p-3">13</div>
                    <div className="rounded-lg border border-cyan-500 p-3">14</div>
                    <div className="rounded-lg border border-zinc-800 p-3">15</div>

                  </div>

                </div>

                {/* Upcoming Posts */}
                <div className="mt-6 rounded-2xl bg-black p-6">

                  <div className="mb-4 text-xl font-semibold">
                    Upcoming Posts
                  </div>

                  <div className="space-y-4">

                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 p-4">
                      <span>SummerPromo.mp4</span>
                      <span className="text-zinc-500">
                        Jun 14 • 09:00
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 p-4">
                      <span>ProductDemo.mp4</span>
                      <span className="text-zinc-500">
                        Jun 15 • 18:00
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 p-4">
                      <span>BehindScenes.mp4</span>
                      <span className="text-zinc-500">
                        Jun 17 • 12:00
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}