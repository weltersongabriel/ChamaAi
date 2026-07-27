import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/services/api";

interface Provider {
  id: number;
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
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8">

        <h1 className="mb-6 text-3xl font-bold">
          Perfil do Profissional
        </h1>

        <div className="space-y-4">
          <p>
            <strong>Categoria:</strong> {provider.categoria}
          </p>

          <p>
            <strong>Bio:</strong> {provider.bio}
          </p>

          <p>
            <strong>Cidade:</strong> {provider.cidade}
          </p>

          <p>
            <strong>Estado:</strong> {provider.estado}
          </p>

          <p>
            <strong>Status:</strong> {provider.status}
          </p>
        </div>

        <a
          href={`https://wa.me/${provider.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Conversar no WhatsApp
        </a>

      </div>
    </div>
  );
}