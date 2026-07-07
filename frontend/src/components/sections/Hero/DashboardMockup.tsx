import { Bell, LayoutDashboard, Ticket, Users, Settings, TrendingUp } from "lucide-react";

export default function DashboardMockup() {
  return (
    <div className="mx-auto mt-24 max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">

        <h3 className="font-semibold text-white">
          Chama Aí
        </h3>

        <div className="flex items-center gap-4">

          <Bell size={18} className="text-zinc-400" />

          <div className="h-9 w-9 rounded-full bg-blue-600" />

        </div>

      </div>

      <div className="flex">

        {/* Sidebar */}

        <aside className="hidden w-56 border-r border-zinc-800 bg-zinc-900 lg:block">

          <nav className="space-y-2 p-5">

            <Item icon={<LayoutDashboard size={18} />} active>
              Dashboard
            </Item>

            <Item icon={<Ticket size={18} />}>
              Tickets
            </Item>

            <Item icon={<Users size={18} />}>
              Comunidades
            </Item>

            <Item icon={<Settings size={18} />}>
              Configurações
            </Item>

          </nav>

        </aside>

        {/* Conteúdo */}

        <main className="flex-1 p-6">

          {/* Cards */}

          <div className="grid gap-4 md:grid-cols-3">

            <Card
              title="Tickets"
              value="152"
            />

            <Card
              title="Usuários"
              value="4.825"
            />

            <Card
              title="Atendimentos"
              value="48"
            />

          </div>

          {/* Linha */}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* Gráfico */}

            <div className="col-span-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

              <div className="mb-6 flex items-center gap-2">

                <TrendingUp className="text-blue-500" />

                <span>Crescimento</span>

              </div>

              <div className="flex h-52 items-end justify-around">

                {[35, 65, 45, 85, 70, 95].map((height) => (
                  <div
                    key={height}
                    className="w-8 rounded-t-xl bg-blue-600"
                    style={{ height: `${height}%` }}
                  />
                ))}

              </div>

            </div>

            {/* Atividades */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

              <h4 className="font-semibold">
                Atividades
              </h4>

              <div className="mt-5 space-y-4 text-sm text-zinc-400">

                <p>✅ Ticket #152 resolvido</p>

                <p>👤 Novo usuário</p>

                <p>📈 Relatório atualizado</p>

                <p>🎫 Ticket criado</p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

    </div>
  );
}

function Item({
  children,
  icon,
  active = false,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}