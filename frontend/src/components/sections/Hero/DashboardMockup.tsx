import {
  Bell,
  Search,
  MapPin,
  Star,
  MessageCircle,
  Hammer,
  Zap,
} from "lucide-react";

export default function DashboardMockup() {
  return (
    <div className="mx-auto mt-24 max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">

        <h3 className="text-lg font-semibold text-white">
          Chama Aí
        </h3>

        <div className="flex items-center gap-4">

          <Bell size={18} className="text-zinc-400" />

          <div className="h-9 w-9 rounded-full bg-blue-600" />

        </div>

      </div>

      <div className="p-8">

        {/* Busca */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <div className="flex items-center gap-3">

            <Search className="text-blue-500" />

            <input
              disabled
              value="Pedreiro"
              className="w-full bg-transparent text-white outline-none"
            />

          </div>

        </div>

        {/* Profissionais */}

        <div className="mt-8 space-y-5">

          <ProviderCard
            icon={<Hammer className="text-blue-500" />}
            nome="Carlos Henrique"
            categoria="Pedreiro"
            cidade="Guanambi - BA"
            nota="4.9"
          />

          <ProviderCard
            icon={<Zap className="text-yellow-400" />}
            nome="João Santos"
            categoria="Eletricista"
            cidade="Caetité - BA"
            nota="5.0"
          />

        </div>

      </div>

    </div>
  );
}

function ProviderCard({
  icon,
  nome,
  categoria,
  cidade,
  nota,
}: {
  icon: React.ReactNode;
  nome: string;
  categoria: string;
  cidade: string;
  nota: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-blue-600">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10">
            {icon}
          </div>

          <div>

            <h3 className="text-lg font-bold text-white">
              {nome}
            </h3>

            <p className="text-zinc-400">
              {categoria}
            </p>

            <div className="mt-3 flex items-center gap-5 text-sm">

              <span className="flex items-center gap-1 text-zinc-400">
                <MapPin size={16} />
                {cidade}
              </span>

              <span className="flex items-center gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                {nota}
              </span>

            </div>

          </div>

        </div>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
          Disponível
        </span>

      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">

        <MessageCircle size={18} />

        Ver Perfil

      </button>

    </div>
  );
} 