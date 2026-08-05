import heroImage from "../../../assets/chama-ai-hero.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const [categoria] = useState("");
  const [cidade] = useState("");

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
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#050B1C]">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Decorative glow */}
      <div className="absolute -right-40 top-20 h-[500px] w-[700px] rounded-full bg-[#3154C8]/20 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-[400px] w-[600px] rounded-full bg-[#3154C8]/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-10 sm:px-8 lg:px-8 lg:py-16">

        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">

          {/* ========================= */}
          {/* TEXT - DESKTOP/TABLET */}
          {/* ========================= */}

          <div className="hidden max-w-2xl lg:block">

            {/* Badge */}
            <div className="animate-fade-up mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
              Profissionais de confiança
            </div>

            {/* Title */}
            <h1
              className="
                animate-fade-up
                text-5xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-white
                xl:text-7xl
              "
            >
              Encontre o profissional ideal com o{" "}
              <span className="text-[#3D6BFF]">Chama Aí</span>
            </h1>

            {/* Description */}
            <p
              className="
                animate-fade-up
                animation-delay-200
                mt-5
                max-w-xl
                text-lg
                leading-8
                text-white/70
              "
            >
              Serviços de confiança, perto de você e de forma simples.
            </p>

            {/* Button */}
            <div className="animate-fade-up animation-delay-300 mt-7">
              <button
                onClick={handleSearch}
                className="
                  rounded-xl
                  bg-blue-600
                  px-7
                  py-3.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                  active:scale-[0.98]
                "
              >
                Buscar profissionais
              </button>
            </div>

          </div>

          {/* ========================= */}
          {/* MOBILE */}
          {/* ========================= */}

          <div className="flex flex-col items-center lg:hidden">

            {/* Title */}
            <h1
              className="
                animate-fade-up
                text-2xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-white
                xl:text-5xl
              "
            >
              Encontre profissionais com o{" "}
              <span className="text-[#3D6BFF]">Chama Aí</span>
            </h1>

            {/* 3D Image */}
            <div className="animate-fade-in flex w-full justify-center">
              <img
                src={heroImage}
                alt="Encontre profissionais pelo Chama Aí"
                className="
                  w-[95%]
                  max-w-[380px]
                  object-contain
                  drop-shadow-2xl
                "
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="
                animate-fade-up
                animation-delay-200
                mt-5
                w-full
                max-w-[320px]
                rounded-xl
                bg-blue-600
                px-6
                py-3.5
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition
                hover:bg-blue-700
                active:scale-[0.98]
              "
            >
              Buscar profissionais
            </button>

            <button
              onClick={() => navigate("/login")}
              className="
                animate-fade-up
                animation-delay-300
                mt-4
                w-full
                max-w-[320px]
                rounded-xl
                bg-white
                px-6
                py-3.5
                font-semibold
                text-blue-600
                shadow-lg
                shadow-blue-600/20
                transition
                hover:bg-blue-100
                active:scale-[0.98]
              "
            >
              Fazer login
            </button>

          </div>

          {/* ========================= */}
          {/* DESKTOP IMAGE */}
          {/* ========================= */}

          <div className="hidden animate-fade-in justify-center lg:flex lg:justify-end">
            <img
              src={heroImage}
              alt="Encontre profissionais pelo Chama Aí"
              className="
                w-full
                max-w-xl
                object-contain
                drop-shadow-2xl
              "
            />
          </div>

        </div>
      </div>
    </section>
  );
}