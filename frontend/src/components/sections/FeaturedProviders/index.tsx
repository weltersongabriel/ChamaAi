import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

import { api } from "@/services/api";

interface Provider {
  id: number;
  categoria: string;
  bio: string;
  cidade: string;
  estado: string;
  status: string;
  media_avaliacoes: number;
  total_avaliacoes: number;
}

export default function FeaturedProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviders();
  }, []);

  async function loadProviders() {
    try {
      const response = await api.get("/providers?limit=3");

      setProviders(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return null;

  return (
    <section className="bg-[#09090B] py-24">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-12 text-center">

            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Profissionais
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white">
            Encontre o profissional ideal
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
            Pesquise profissionais qualificados da sua região e entre em contato
            diretamente pelo WhatsApp.
            </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {providers.map((provider) => (

            <div
              key={provider.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-blue-600 hover:-translate-y-1"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold text-white">
                  {provider.categoria}
                </h3>

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                  {provider.status}
                </span>

              </div>

              <p className="mt-4 line-clamp-3 text-zinc-400">
                {provider.bio}
              </p>

              <div className="mt-5 flex items-center gap-2 text-zinc-400">

                <MapPin size={18} />

                {provider.cidade} - {provider.estado}

              </div>

              <div className="mt-3 flex items-center gap-2 text-yellow-400">

                <Star size={18} fill="currentColor" />

                {provider.media_avaliacoes}

                <span className="text-zinc-500">
                  ({provider.total_avaliacoes} avaliações)
                </span>

              </div>

              <Link
                to={`/providers/${provider.id}`}
                className="mt-6 inline-flex w-full justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Ver Perfil
              </Link>

            </div>

          ))}

        </div>

        <div className="mt-14 text-center">

          <Link
            to="/providers"
            className="rounded-xl border border-blue-600 px-8 py-3 font-semibold text-blue-400 transition hover:bg-blue-600 hover:text-white"
          >
            Ver todos os profissionais
          </Link>

        </div>

      </div>

    </section>
  );
}