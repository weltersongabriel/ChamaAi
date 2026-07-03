export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Layout */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-72 border-r border-zinc-800 bg-zinc-900">

          <div className="border-b border-zinc-800 p-6">

            <h1 className="text-2xl font-bold text-blue-500">
              Chama Aí
            </h1>

          </div>

          <nav className="space-y-2 p-6">

            <button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-left font-medium transition hover:bg-blue-700">
              Dashboard
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
              Tickets
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
              Comunidades
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
              Relatórios
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
              Configurações
            </button>

          </nav>

        </aside>

        {/* Conteúdo */}

        <main className="flex-1 p-10">

          <h2 className="text-4xl font-bold">

            Bom dia, Welterson 👋

          </h2>

          <p className="mt-2 text-zinc-400">

            Bem-vindo ao painel do Chama Aí.

          </p>

          {/* Cards */}

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-zinc-400">
                Tickets
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                152
              </h3>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-zinc-400">
                Usuários
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                4.825
              </h3>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-zinc-400">
                Comunidades
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                18
              </h3>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-zinc-400">
                Atendimentos Hoje
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                48
              </h3>
            </div>

          </div>

          {/* Linha inferior */}

          <div className="mt-10 grid gap-6 xl:grid-cols-3">

            {/* Gráfico */}

            <div className="col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <h3 className="text-xl font-semibold">
                Crescimento
              </h3>

              <div className="mt-8 flex h-72 items-end justify-around">

                <div className="w-10 rounded-t bg-blue-600" style={{ height: "35%" }} />

                <div className="w-10 rounded-t bg-blue-600" style={{ height: "65%" }} />

                <div className="w-10 rounded-t bg-blue-600" style={{ height: "55%" }} />

                <div className="w-10 rounded-t bg-blue-600" style={{ height: "90%" }} />

                <div className="w-10 rounded-t bg-blue-600" style={{ height: "75%" }} />

              </div>

            </div>

            {/* Atividades */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <h3 className="text-xl font-semibold">
                Atividades Recentes
              </h3>

              <div className="mt-6 space-y-4">

                <div>✅ Ticket #152 resolvido</div>

                <div>👤 Novo usuário cadastrado</div>

                <div>🎫 Ticket #153 criado</div>

                <div>📊 Relatório atualizado</div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}