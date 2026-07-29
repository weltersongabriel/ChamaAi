import { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroBadge from "./HeroBadge";
import FeaturedProviders from "../FeaturedProviders";

export default function Hero() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState("");
  const [cidade, setCidade] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();

    if (categoria.trim()) {
      params.append("categoria", categoria);
    }

    if (cidade.trim()) {
      params.append("cidade", cidade);
    }

    navigate(`/providers?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden bg-zinc-950">

      <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/30 via-zinc-950 to-zinc-950" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center px-6 py-24">

        <div className="mx-auto max-w-4xl text-center">

          <HeroBadge />

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">

            Encontre o profissional ideal

            <br />

            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              com o Chama Aí
            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">

            Encontre pedreiros, eletricistas, pintores,
            diaristas, encanadores e diversos profissionais
            próximos de você de forma rápida e segura.

          </p>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur">

            <div className="grid gap-4 md:grid-cols-3">

              <input
                type="text"
                placeholder="Categoria (Ex: Pedreiro)"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
              />

              <button
                onClick={handleSearch}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Buscar profissionais
              </button>

            </div>

          </div>

        </div>

        <div className="mt-24">
          <FeaturedProviders />
        </div>

      </div>

    </section>
  );
}