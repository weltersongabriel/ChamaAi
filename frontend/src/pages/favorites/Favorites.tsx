import { useEffect, useState } from "react";
import { Heart, MapPin, ArrowRight, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

interface Favorite {
  favorite_id: number;
  provider_id: number;
  nome?: string;
  categoria: string | null;
  cidade: string;
  estado: string;
  status: string;
}

export default function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const response = await api.get("/favorites/");

      setFavorites(response.data);
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeFavorite(favoriteId: number) {
    try {
      setRemovingId(favoriteId);

      await api.delete(`/favorites/${favoriteId}`);

      setFavorites((currentFavorites) =>
        currentFavorites.filter(
          (favorite) => favorite.favorite_id !== favoriteId
        )
      );
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    } finally {
      setRemovingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-zinc-400">
          Carregando favoritos...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Cabeçalho */}
        <div className="mb-10">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
              <Heart
                size={24}
                className="fill-red-400 text-red-400"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-400">
                Minha conta
              </p>

              <h1 className="text-3xl font-bold text-white">
                Meus favoritos
              </h1>
            </div>

          </div>

          <p className="mt-4 text-zinc-400">
            Profissionais que você salvou para encontrar novamente.
          </p>

        </div>

        {/* Nenhum favorito */}
        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">

              <Heart
                size={30}
                className="text-red-400"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Você ainda não possui favoritos
            </h2>

            <p className="mx-auto mt-3 max-w-md text-zinc-400">
              Encontre um profissional e salve-o nos favoritos
              para acessá-lo rapidamente depois.
            </p>

            <button
              onClick={() => navigate("/providers")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Encontrar profissionais

              <ArrowRight size={18} />
            </button>

          </div>
        ) : (

          <>
            {/* Contador */}
            <div className="mb-6">

              <p className="text-sm text-zinc-400">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "profissional salvo"
                  : "profissionais salvos"}
              </p>

            </div>

            {/* Lista */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {favorites.map((favorite) => (

                <div
                  key={favorite.favorite_id}
                  className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-blue-500/50"
                >

                  {/* Cabeçalho do card */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h2 className="text-xl font-bold text-white">
                          {favorite.nome || "Profissional"}
                        </h2>

                        <p className="mt-1 font-medium text-blue-100">
                          {favorite.categoria || "Categoria não informada"}
                        </p>

                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">

                        <Heart
                          size={19}
                          className="fill-white text-white"
                        />

                      </div>

                    </div>

                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">

                    <div className="flex items-center gap-2 text-zinc-300">

                      <MapPin
                        size={18}
                        className="text-blue-400"
                      />

                      <span>
                        {favorite.cidade} - {favorite.estado}
                      </span>

                    </div>

                    {/* Status */}
                    <div className="mt-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          favorite.status === "ativo"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {favorite.status}
                      </span>

                    </div>

                    {/* Ações */}
                    <div className="mt-6 flex gap-3">

                      <button
                        onClick={() =>
                          navigate(`/providers/${favorite.provider_id}`)
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
                          removeFavorite(favorite.favorite_id)
                        }
                        disabled={
                          removingId === favorite.favorite_id
                        }
                        title="Remover dos favoritos"
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={19} />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          </>

        )}

      </div>

    </div>
  );
}