import MainLayout from "@/layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <section className="min-h-screen bg-[#09090B] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold">
            Bem-vindo ao Dashboard 🚀
          </h1>

          <p className="mt-4 text-zinc-400">
            Você está autenticado com sucesso no Chama Aí.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Chamados ativos</p>
              <h2 className="mt-2 text-3xl font-bold text-blue-500">12</h2>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Comunidades</p>
              <h2 className="mt-2 text-3xl font-bold text-blue-500">3</h2>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Atendimentos hoje</p>
              <h2 className="mt-2 text-3xl font-bold text-blue-500">27</h2>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}