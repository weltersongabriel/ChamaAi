import FeatureCard from "./FeatureCard";

import {
  Search,
  MapPin,
  MessageCircle,
  Star,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: <Search size={26} />,
    title: "Encontre profissionais",
    description:
      "Pesquise rapidamente por pedreiros, eletricistas, pintores, diaristas e diversos outros profissionais.",
  },
  {
    icon: <MapPin size={26} />,
    title: "Busca por cidade",
    description:
      "Localize prestadores próximos da sua região para encontrar quem pode atender você com rapidez.",
  },
  {
    icon: <MessageCircle size={26} />,
    title: "Contato direto",
    description:
      "Converse diretamente com o profissional pelo WhatsApp, sem intermediários.",
  },
  {
    icon: <Star size={26} />,
    title: "Avaliações",
    description:
      "Veja a média das avaliações e escolha profissionais com mais confiança.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Perfis confiáveis",
    description:
      "Todos os profissionais possuem um perfil organizado com informações essenciais para facilitar sua escolha.",
  },
  {
    icon: <Clock3 size={26} />,
    title: "Economize tempo",
    description:
      "Encontre rapidamente o profissional certo sem precisar procurar em diversos lugares.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#09090B] py-20 sm:py-24 lg:py-28">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Cabeçalho */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Vantagens
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:mt-6 sm:text-4xl md:text-5xl">
            Tudo o que você precisa para encontrar o profissional ideal.
          </h2>

          <p className="mt-5 text-base leading-7 text-zinc-400 sm:mt-6 sm:text-lg sm:leading-8">
            O Chama Aí conecta clientes e prestadores de serviços de forma
            simples, rápida e segura, facilitando o contato e economizando
            tempo.
          </p>

        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
}