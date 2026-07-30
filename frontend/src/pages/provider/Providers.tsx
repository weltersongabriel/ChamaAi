import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface Provider {
  id: number;
  nome: string;
  bio: string;
  categoria: string;
  cidade: string;
  estado: string;
  whatsapp: string;
  status: string;
  media_avaliacoes: number;
  total_avaliacoes: number;
}

export default function Providers() {
  const navigate = useNavigate();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoria, setCategoria] = useState("");
  const [cidade, setCidade] = useState("");

  useEffect(() => {
    loadProviders();
  }, []);

  async function loadProviders() {
    try {
      setLoading(true);

      const response = await api.get("/providers", {
        params: {
          categoria: categoria || undefined,
          cidade: cidade || undefined,
        },
      });

      setProviders(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">Carregando profissionais...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="mx-auto max-w-7xl px-6">

        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Profissionais
          </span>

          <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Encontre o profissional ideal
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Encontre profissionais qualificados próximos de você.
          </p>
        </div>

        {/* Busca */}
        <div className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">

          <div className="grid gap-4 md:grid-cols-3">

            <input
              type="text"
              placeholder="Categoria (Ex: Pedreiro)"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadProviders();
                }
              }}
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadProviders();
                }
              }}
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
            />

            <button
              onClick={loadProviders}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Buscar profissionais
            </button>

          </div>
        </div>

        {/* Nenhum resultado */}
        {providers.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
            <h2 className="text-2xl font-bold text-white">
              Nenhum profissional encontrado
            </h2>

            <p className="mt-3 text-zinc-400">
              Tente pesquisar outra categoria ou cidade.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {providers.map((provider) => (

            <div
              key={provider.id}
              className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-500/10"
            >

              {/* Topo */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6">

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <h2 className="truncate text-2xl font-bold text-white">
                      {provider.nome}
                    </h2>

                    <p className="mt-1 font-medium text-blue-100">
                      {provider.categoria}
                    </p>

                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      provider.status === "ativo"
                        ? "bg-green-500/20 text-green-200"
                        : "bg-red-500/20 text-red-200"
                    }`}
                  >
                    {provider.status}
                  </span>

                </div>

              </div>

              {/* Conteúdo */}
              <div className="p-6">

                {/* Avaliação */}
                <div className="mb-5 flex items-center gap-2">

                  <span className="text-yellow-400">
                    ★
                  </span>

                  <span className="font-semibold text-white">
                    {provider.media_avaliacoes.toFixed(1)}
                  </span>

                  <span className="text-sm text-zinc-500">
                    ({provider.total_avaliacoes}{" "}
                    {provider.total_avaliacoes === 1
                      ? "avaliação"
                      : "avaliações"})
                  </span>

                </div>

                {/* Bio */}
                <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-zinc-300">
                  {provider.bio}
                </p>

                {/* Localização */}
                <div className="mt-6 flex items-center gap-2 text-zinc-300">

                  <span className="text-lg">
                    📍
                  </span>

                  <span>
                    {provider.cidade} - {provider.estado}
                  </span>

                </div>

                {/* Botão */}
                <button
                  onClick={() =>
                    navigate(`/providers/${provider.id}`)
                  }
                  className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Ver perfil
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}