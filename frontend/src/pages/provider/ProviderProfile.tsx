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
};


export default function ProviderProfile() {
  const { id } = useParams();

  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProvider();
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

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Carregando...
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex justify-center py-20">
        Prestador não encontrado.
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-zinc-950 py-12 px-6">

    <div className="mx-auto max-w-4xl">

      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8">

          <h1 className="text-4xl font-bold text-white">
            {provider.nome}
          </h1>

          <h1 className="text-4xl font-bold text-white">  
            {provider.categoria}
          </h1>

          <p className="mt-2 text-blue-100">
            Perfil do profissional
          </p>

        </div>

        <div className="p-8">

          <div className="mb-8 inline-flex items-center rounded-full bg-green-500/20 px-4 py-2">

            <span className="mr-2 h-3 w-3 rounded-full bg-green-400"></span>

            <span className="font-medium text-green-400">
              {provider.status}
            </span>

          </div>

          <div className="grid gap-5">

            <div className="rounded-xl bg-zinc-800 p-5">

              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Sobre
              </h2>

              <p className="text-zinc-100">
                {provider.bio}
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="rounded-xl bg-zinc-800 p-5">

                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Cidade
                </h2>

                <p className="text-lg font-semibold text-white">
                  📍 {provider.cidade}
                </p>

              </div>

              <div className="rounded-xl bg-zinc-800 p-5">

                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Estado
                </h2>

                <p className="text-lg font-semibold text-white">
                  🇧🇷 {provider.estado}
                </p>

              </div>

            </div>

          </div>

          <a
            href={`https://wa.me/${provider.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex w-full items-center justify-center rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
          >
            Conversar pelo WhatsApp
          </a>

        </div>

      </div>

    </div>

  </div>
);
}