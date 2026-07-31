import { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  Heart,
  ArrowRight,
} from "lucide-react";
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

interface Favorite {
  favorite_id: number;
  provider_id: number;
  nome: string;
  categoria: string | null;
  cidade: string;
  estado: string;
  status: string;
}

export default function Providers() {
  const navigate = useNavigate();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [favorites, setFavorites] = useState<
    Record<number, number>
  >({});

  const [loading, setLoading] = useState(true);
  const [favoriteLoading, setFavoriteLoading] = useState<number | null>(
    null
  );

  const [categoria, setCategoria] = useState("");
  const [cidade, setCidade] = useState("");

  useEffect(() => {
    loadProviders();
    loadFavorites();
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
      console.error("Erro ao carregar profissionais:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadFavorites() {
    const token = localStorage.getItem("chamaai.token");

    if (!token) {
      return;
    }

    try {
      const response = await api.get("/favorites/");

      const favoriteMap: Record<number, number> = {};

      response.data.forEach((favorite: Favorite) => {
        favoriteMap[favorite.provider_id] = favorite.favorite_id;
      });

      setFavorites(favoriteMap);
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  }

  async function toggleFavorite(providerId: number) {
    const token = localStorage.getItem("chamaai.token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setFavoriteLoading(providerId);

      const favoriteId = favorites[providerId];

      if (favoriteId) {
        await api.delete(`/favorites/${favoriteId}`);

        setFavorites((current) => {
          const updated = { ...current };
          delete updated[providerId];
          return updated;
        });
      } else {
        const response = await api.post("/favorites/", {
          provider_id: providerId,
        });

        await loadFavorites();

        console.log(response.data);
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    } finally {
      setFavoriteLoading(null);
    }
  }

  function clearFilters() {
    setCategoria("");
    setCidade("");

    setTimeout(() => {
      loadProviders();
    }, 0);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-zinc-400">
          Carregando profissionais...
        </p>
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

          {(categoria || cidade) && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-zinc-400 transition hover:text-white"
            >
              Limpar filtros
            </button>
          )}

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

          {providers.map((provider) => {

            const isFavorite =
              Boolean(favorites[provider.id]);

            const isFavoriteLoading =
              favoriteLoading === provider.id;

            return (
              <div
                key={provider.id}
                className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-blue-500/10"
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

                  {/* Avaliações */}
                  <div className="mb-5 flex items-center gap-2">

                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />

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

                    <MapPin
                      size={18}
                      className="text-blue-400"
                    />

                    <span>
                      {provider.cidade} - {provider.estado}
                    </span>

                  </div>

                  {/* Ações */}
                  <div className="mt-8 flex gap-3">

                    <button
                      onClick={() =>
                        navigate(`/providers/${provider.id}`)
                      }
                      className="group/button flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      Ver perfil

                      <ArrowRight
                        size={17}
                        className="transition group-hover/button:translate-x-1"
                      />
                    </button>

                    <button
                      onClick={() =>
                        toggleFavorite(provider.id)
                      }
                      disabled={isFavoriteLoading}
                      title={
                        isFavorite
                          ? "Remover dos favoritos"
                          : "Adicionar aos favoritos"
                      }
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${
                        isFavorite
                          ? "border-red-500/50 bg-red-500/10 text-red-400"
                          : "border-zinc-700 text-zinc-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                      } ${
                        isFavoriteLoading
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <Heart
                        size={19}
                        className={
                          isFavorite
                            ? "fill-current"
                            : ""
                        }
                      />
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}