import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-6">
        <div className="max-w-3xl">
          <span className="rounded-full border border-violet-600/40 bg-violet-600/10 px-4 py-1 text-sm text-violet-400">
            Plataforma para gerenciamento de comunidades
          </span>

          <h1 className="mt-6 text-6xl font-extrabold leading-tight">
            Automatize o gerenciamento do seu servidor com o{" "}
            <span className="text-violet-500">Chama Aí</span>.
          </h1>

          <p className="mt-6 text-lg text-zinc-400">
            Centralize tickets, atendimentos e gerenciamento da sua comunidade
            em uma plataforma moderna, rápida e intuitiva.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}