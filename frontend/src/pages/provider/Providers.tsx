import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface Provider {
  id: number;
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

  useEffect(() => {
    loadProviders();
  }, []);

  async function loadProviders() {
    try {
      const response = await api.get("/providers");

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

      <p className="text-zinc-400">
        Nenhum profissional encontrado.
      </p>
    </div>
  );
}

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="mb-8 text-3xl font-bold">
        Profissionais disponíveis
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {providers.map((provider) => (

          <div
            key={provider.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >

            <h2 className="text-xl font-semibold">
              {provider.categoria}
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              {provider.bio}
            </p>

            <p className="mt-4">
              📍 {provider.cidade} - {provider.estado}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span className="text-green-400">
                {provider.status}
              </span>
            </p>

            <button
            onClick={() => navigate(`/providers/${provider.id}`)}
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
            Ver Perfil
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}