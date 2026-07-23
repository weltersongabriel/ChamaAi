import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { api } from "@/services/api";

interface Ticket {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
}

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  async function carregarTickets() {
    const token = localStorage.getItem("chamaai.token");

    const response = await api.get("/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTickets(response.data);
  }

  useEffect(() => {
    carregarTickets();
  }, []);

  async function criarTicket(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("chamaai.token");

      await api.post(
        "/tickets",
        {
          titulo,
          descricao,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitulo("");
      setDescricao("");

      await carregarTickets();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar chamado");
    } finally {
      setLoading(false);
    }
  }

  async function alterarStatus(id: number, status: string) {
    const token = localStorage.getItem("chamaai.token");

    await api.patch(
      `/tickets/${id}/status?status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await carregarTickets();
  }

  function statusColor(status: string) {
    switch (status) {
      case "aberto":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "em_andamento":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "concluido":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-zinc-700 text-zinc-300 border-zinc-600";
    }
  }

  return (
    <MainLayout>
      <section className="min-h-screen bg-[#09090B] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Chamados 🎫</h1>
            <p className="mt-2 text-zinc-400">
              Abra e acompanhe os chamados da sua comunidade.
            </p>
          </div>

          {/* Formulário */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Novo chamado</h2>

            <form onSubmit={criarTicket} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Título
                </label>

                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Servidor offline"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Descrição
                </label>

                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o problema..."
                  rows={4}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
              >
                {loading ? "Criando..." : "Criar chamado"}
              </button>
            </form>
          </div>

          {/* Lista */}
          <div className="mt-8 space-y-4">
            {tickets.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
                Nenhum chamado encontrado.
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold">
                          {ticket.titulo}
                        </h3>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status.replace("_", " ")}
                        </span>
                      </div>

                      <p className="mt-3 text-zinc-400">
                        {ticket.descricao}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          alterarStatus(ticket.id, "em_andamento")
                        }
                        className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm text-blue-300 transition hover:bg-blue-500/20"
                      >
                        Em andamento
                      </button>

                      <button
                        onClick={() =>
                          alterarStatus(ticket.id, "concluido")
                        }
                        className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300 transition hover:bg-green-500/20"
                      >
                        Concluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}