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

    const response = await api.get("/providers", {
      params: {
        categoria,
        cidade,
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
      <div className="flex justify-center py-20">
        Carregando...
      </div>
    );
  }

  if (providers.length === 0) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Profissionais disponíveis
      </h1>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

        <h2 className="text-2xl font-bold text-white">
          Nenhum profissional encontrado
        </h2>

        <p className="mt-3 text-zinc-400">
          Tente pesquisar outra categoria ou cidade.
        </p>

      </div>
    </div>
  );
}

  return (
  <div className="min-h-screen bg-zinc-950 py-12">

    <div className="mx-auto max-w-7xl px-6">

      <div className="mb-12 text-center">

        <h1 className="text-5xl font-bold text-white">
          Encontre o profissional ideal
        </h1>

        <p className="mt-4 text-lg text-zinc-400">
          Busque profissionais qualificados próximos de você.
        </p>

      </div>

      <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

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
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
          />

          <button
            onClick={loadProviders}
            className="rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
          >
            Buscar
          </button>

        </div>

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {providers.map((provider) => (

          <div
            key={provider.id}
            className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-blue-500/20"
          >

            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-white">
                  {provider.nome}
                </h2>

                <h2 className="text-2xl font-bold text-white">
                  {provider.categoria}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    provider.status === "ativo"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {provider.status}
                </span>

              </div>

            </div>

            <div className="p-6">

              <div className="mb-6">

                <p className="text-2xl font-bold text-white">
                  {provider.nome}
                </p>

                <p className="line-clamp-3 text-zinc-300">
                  {provider.bio}
                </p>

              </div>

              <div className="space-y-3">

                <div className="flex items-center gap-2 text-zinc-300">

                  <span>📍</span>

                  <span>
                    {provider.cidade} - {provider.estado}
                  </span>

                </div>

              </div>

              <button
                onClick={() => navigate(`/providers/${provider.id}`)}
                className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Ver Perfil
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>
);
}