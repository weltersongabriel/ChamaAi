export default function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-20 max-w-5xl">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">

        {/* Barra superior */}
        <div className="flex items-center gap-2 border-b border-zinc-800 p-4">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        <div className="flex">

          {/* Sidebar */}
          <aside className="w-60 border-r border-zinc-800 p-5 space-y-4">

            <div className="h-10 rounded-lg bg-zinc-800" />

            <div className="space-y-3">
              <div className="h-4 rounded bg-zinc-800" />
              <div className="h-4 rounded bg-zinc-800" />
              <div className="h-4 rounded bg-zinc-800" />
              <div className="h-4 rounded bg-zinc-800" />
            </div>

          </aside>

          {/* Conteúdo */}
          <main className="flex-1 p-8">

            <div className="grid grid-cols-3 gap-4">

              <div className="h-28 rounded-xl bg-zinc-800" />
              <div className="h-28 rounded-xl bg-zinc-800" />
              <div className="h-28 rounded-xl bg-zinc-800" />

            </div>

            <div className="mt-6 h-72 rounded-xl bg-zinc-800" />

          </main>

        </div>

      </div>
    </div>
  );
}