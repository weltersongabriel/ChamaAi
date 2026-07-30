import { Search, Heart, Star, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Cabeçalho */}
        <div className="mb-10">

          <p className="text-sm font-medium text-blue-400">
            Painel
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            Olá! 👋
          </h1>

          <p className="mt-3 text-zinc-400">
            Encontre profissionais, acompanhe suas avaliações e gerencie
            sua conta.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Favoritos */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="flex items-center justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <Heart className="text-red-400" size={24} />
              </div>

              <span className="text-3xl font-bold text-white">
                0
              </span>

            </div>

            <h2 className="mt-5 font-semibold text-white">
              Favoritos
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Profissionais que você salvou.
            </p>

          </div>

          {/* Avaliações */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="flex items-center justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
                <Star className="text-yellow-400" size={24} />
              </div>

              <span className="text-3xl font-bold text-white">
                0
              </span>

            </div>

            <h2 className="mt-5 font-semibold text-white">
              Avaliações
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Avaliações que você realizou.
            </p>

          </div>

          {/* Perfil */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="flex items-center justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <User className="text-blue-400" size={24} />
              </div>

              <span className="text-sm font-medium text-green-400">
                Ativo
              </span>

            </div>

            <h2 className="mt-5 font-semibold text-white">
              Minha conta
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Gerencie seus dados pessoais.
            </p>

          </div>

        </div>

        {/* Ações */}
        <div className="mt-10">

          <h2 className="text-xl font-bold text-white">
            O que você deseja fazer?
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            {/* Buscar */}
            <button
              onClick={() => navigate("/providers")}
              className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition hover:border-blue-500/50 hover:bg-zinc-900/80"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <Search className="text-blue-400" size={24} />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    Encontrar profissionais
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    Encontre profissionais próximos de você.
                  </p>

                </div>

              </div>

              <ArrowRight
                size={20}
                className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-blue-400"
              />

            </button>

            {/* Favoritos */}
            <button
              className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition hover:border-red-500/30 hover:bg-zinc-900/80"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <Heart className="text-red-400" size={24} />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    Meus favoritos
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    Veja os profissionais que você salvou.
                  </p>

                </div>

              </div>

              <ArrowRight
                size={20}
                className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-red-400"
              />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}