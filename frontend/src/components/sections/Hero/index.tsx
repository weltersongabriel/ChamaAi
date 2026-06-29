import Button from "@/components/ui/Button";

export default function Hero() {
    return (
         <section className="relative overflow-hidden">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-950/30 via-zinc-950 to-zinc-950" />

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">
        {/* Texto */}
        <div className="max-w-2xl">
          <span className="rounded-full border border-violet-600/40 bg-violet-600/10 px-4 py-1 text-sm text-violet-400">
            Plataforma para gerenciamento de comunidades
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
            Gerencie sua comunidade com o{" "}
            <span className="text-violet-500">Chama Aí</span>.
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Centralize tickets, atendimento e organização da sua comunidade em
            uma plataforma moderna, rápida e intuitiva.
          </p>

          <div className="mt-10 flex gap-4">
            <Button>Criar conta</Button>

            <Button variant="outline">Ver demonstração</Button>
          </div>
        </div>

        {/* Preview do Dashboard */}
        <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
          <div className="mb-6 flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <div className="space-y-4">
            <div className="h-10 rounded-lg bg-zinc-800" />
            <div className="h-32 rounded-lg bg-zinc-800" />

            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 rounded-lg bg-zinc-800" />
              <div className="h-24 rounded-lg bg-zinc-800" />
            </div>

            <div className="h-16 rounded-lg bg-zinc-800" />
          </div>
        </div>
      </div>
    </section>
    );
}