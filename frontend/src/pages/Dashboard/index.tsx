import MainLayout from "@/layouts/MainLayout";
import { Users, Wrench, Clock, TrendingUp } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
    navigate("/login");
}
  return (
    <MainLayout>
      <section className="min-h-screen bg-[#09090B] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          {/* Cabeçalho */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-500">
                Dashboard
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Bem-vindo ao Chama Aí 🚀
              </h1>

              <p className="mt-3 text-zinc-400">
                Gerencie sua comunidade, acompanhe atendimentos e visualize
                métricas em tempo real.
              </p>
            </div>

            <Link
                to="/tickets"
                className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
              >
                Novo chamado
              </Link>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-zinc-700 px-5 py-3 font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Sair
            </button>
          </div>

          {/* Cards principais */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Chamados ativos</p>
                <Wrench className="text-blue-500" size={22} />
              </div>

              <h2 className="mt-4 text-3xl font-bold">12</h2>

              <p className="mt-2 text-sm text-green-400">
                +3 nas últimas 24h
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Comunidades</p>
                <Users className="text-blue-500" size={22} />
              </div>

              <h2 className="mt-4 text-3xl font-bold">3</h2>

              <p className="mt-2 text-sm text-zinc-400">
                2.430 membros monitorados
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Tempo médio</p>
                <Clock className="text-blue-500" size={22} />
              </div>

              <h2 className="mt-4 text-3xl font-bold">18 min</h2>

              <p className="mt-2 text-sm text-green-400">
                -12% em relação à semana passada
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Satisfação</p>
                <TrendingUp className="text-blue-500" size={22} />
              </div>

              <h2 className="mt-4 text-3xl font-bold">96%</h2>

              <p className="mt-2 text-sm text-green-400">
                +4% este mês
              </p>
            </div>
          </div>

          {/* Área principal */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Atividade recente */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Atividade recente</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Ver tudo
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  {
                    titulo: "Novo chamado aberto",
                    descricao: "Problema de acesso ao servidor principal",
                    tempo: "há 5 min",
                  },
                  {
                    titulo: "Chamado resolvido",
                    descricao: "Atualização de permissões concluída",
                    tempo: "há 18 min",
                  },
                  {
                    titulo: "Novo membro entrou",
                    descricao: "Comunidade Dev Guanambi",
                    tempo: "há 42 min",
                  },
                ].map((item) => (
                  <div
                    key={item.titulo}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">{item.titulo}</p>
                        <p className="mt-1 text-sm text-zinc-400">
                          {item.descricao}
                        </p>
                      </div>

                      <span className="text-xs text-zinc-500 whitespace-nowrap">
                        {item.tempo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo lateral */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold">Resumo rápido</h3>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Atendimento</span>
                    <span className="font-medium text-white">82%</span>
                  </div>

                  <div className="h-2 rounded-full bg-zinc-800">
                    <div className="h-2 w-[82%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Comunidade</span>
                    <span className="font-medium text-white">67%</span>
                  </div>

                  <div className="h-2 rounded-full bg-zinc-800">
                    <div className="h-2 w-[67%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Automação</span>
                    <span className="font-medium text-white">91%</span>
                  </div>

                  <div className="h-2 rounded-full bg-zinc-800">
                    <div className="h-2 w-[91%] rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                <p className="text-sm font-medium text-blue-300">
                  Sistema operacional
                </p>

                <p className="mt-1 text-sm text-blue-100">
                  Todos os serviços estão funcionando normalmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}