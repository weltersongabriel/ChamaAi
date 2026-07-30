import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/services/api";

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

interface Review {
  id: number;
  rating: number;
  comment: string;
  user_id: number;
}

export default function ProviderProfile() {
  const { id } = useParams();

  const [provider, setProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [sendingReview, setSendingReview] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      loadProvider();
      loadReviews();
    }
  }, [id]);

  async function loadProvider() {
    try {
      const response = await api.get(`/providers/${id}`);
      setProvider(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadReviews() {
    try {
      setLoadingReviews(true);

      const response = await api.get(
        `/reviews/provider/${id}`
      );

      setReviews(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingReviews(false);
    }
  }

  async function handleCreateReview() {
    if (!id) return;

    if (!comment.trim()) {
      alert("Escreva um comentário antes de enviar.");
      return;
    }

    try {
      setSendingReview(true);

      await api.post("/reviews/", {
        provider_id: Number(id),
        rating,
        comment: comment.trim(),
      });

      setComment("");
      setRating(5);

      await loadReviews();
      await loadProvider();

      alert("Avaliação enviada com sucesso!");
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.detail ||
        "Não foi possível enviar a avaliação.";

      alert(message);
    } finally {
      setSendingReview(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-zinc-400">
          Carregando perfil...
        </p>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Prestador não encontrado
          </h1>

          <p className="mt-2 text-zinc-400">
            O perfil que você está procurando não existe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">

      <div className="mx-auto max-w-4xl">

        {/* PERFIL */}
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">

          {/* Cabeçalho */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-600 p-8">

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="relative">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-100">
                    Perfil profissional
                  </p>

                  <h1 className="text-4xl font-bold text-white md:text-5xl">
                    {provider.nome}
                  </h1>

                  <p className="mt-2 text-xl font-medium text-blue-100">
                    {provider.categoria}
                  </p>

                </div>

                {/* Status */}
                <span
                  className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-semibold ${
                    provider.status === "ativo"
                      ? "bg-green-500/20 text-green-100"
                      : "bg-red-500/20 text-red-100"
                  }`}
                >
                  <span
                    className={`mr-2 h-2.5 w-2.5 rounded-full ${
                      provider.status === "ativo"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  />

                  {provider.status}
                </span>

              </div>

            </div>

          </div>

          {/* Conteúdo */}
          <div className="p-8">

            {/* Avaliação geral */}
            <div className="mb-8 flex flex-wrap items-center gap-4">

              <div className="flex items-center gap-2">

                <span className="text-3xl text-yellow-400">
                  ★
                </span>

                <span className="text-3xl font-bold text-white">
                  {provider.media_avaliacoes.toFixed(1)}
                </span>

              </div>

              <span className="text-zinc-600">
                •
              </span>

              <span className="text-zinc-400">
                {provider.total_avaliacoes}{" "}
                {provider.total_avaliacoes === 1
                  ? "avaliação"
                  : "avaliações"}
              </span>

            </div>

            {/* Sobre */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

              <h2 className="text-lg font-semibold text-white">
                Sobre o profissional
              </h2>

              <p className="mt-4 leading-7 text-zinc-300">
                {provider.bio}
              </p>

            </div>

            {/* Informações */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

                <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                  Localização
                </p>

                <p className="mt-3 text-lg font-semibold text-white">
                  📍 {provider.cidade} - {provider.estado}
                </p>

              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

                <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                  Especialidade
                </p>

                <p className="mt-3 text-lg font-semibold text-white">
                  🔧 {provider.categoria}
                </p>

              </div>

            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${provider.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white shadow-lg shadow-green-600/10 transition hover:bg-green-700 hover:shadow-green-600/20"
            >
              💬 Conversar pelo WhatsApp
            </a>

          </div>

        </div>

        {/* AVALIAÇÕES */}
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-white">
              Avaliações
            </h2>

            <p className="mt-2 text-zinc-400">
              Veja o que outros clientes estão dizendo sobre este profissional.
            </p>

          </div>

          {/* Formulário */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

            <h3 className="text-lg font-semibold text-white">
              Avaliar profissional
            </h3>

            {/* Estrelas */}
            <div className="mt-5">

              <p className="mb-3 text-sm text-zinc-400">
                Sua nota
              </p>

              <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map((star) => (

                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-zinc-700"
                    } hover:text-yellow-400`}
                  >
                    ★
                  </button>

                ))}

              </div>

            </div>

            {/* Comentário */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte como foi sua experiência..."
              rows={4}
              className="mt-5 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
            />

            <button
              type="button"
              onClick={handleCreateReview}
              disabled={sendingReview}
              className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sendingReview
                ? "Enviando..."
                : "Enviar avaliação"}
            </button>

          </div>

          {/* Lista */}
          <div className="mt-8">

            {loadingReviews ? (
              <p className="text-zinc-400">
                Carregando avaliações...
              </p>
            ) : reviews.length === 0 ? (

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">

                <p className="text-lg font-semibold text-white">
                  Ainda não existem avaliações.
                </p>

                <p className="mt-2 text-zinc-500">
                  Seja o primeiro a avaliar este profissional.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {reviews.map((review) => (

                  <div
                    key={review.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex gap-1">

                        {[1, 2, 3, 4, 5].map((star) => (

                          <span
                            key={star}
                            className={
                              star <= review.rating
                                ? "text-yellow-400"
                                : "text-zinc-700"
                            }
                          >
                            ★
                          </span>

                        ))}

                      </div>

                      <span className="text-xs text-zinc-500">
                        Usuário #{review.user_id}
                      </span>

                    </div>

                    <p className="mt-4 leading-6 text-zinc-300">
                      {review.comment}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}