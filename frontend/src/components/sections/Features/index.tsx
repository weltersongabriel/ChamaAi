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
    icon: <Search size={28} />,
    title: "Encontre profissionais",
    description:
      "Pesquise rapidamente por pedreiros, eletricistas, pintores, diaristas e diversos outros profissionais.",
  },
  {
    icon: <MapPin size={28} />,
    title: "Busca por cidade",
    description:
      "Localize prestadores próximos da sua região para encontrar quem pode atender você com rapidez.",
  },
  {
    icon: <MessageCircle size={28} />,
    title: "Contato direto",
    description:
      "Converse diretamente com o profissional pelo WhatsApp, sem intermediários.",
  },
  {
    icon: <Star size={28} />,
    title: "Avaliações",
    description:
      "Veja a média das avaliações e escolha profissionais com mais confiança.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Perfis confiáveis",
    description:
      "Todos os profissionais possuem um perfil organizado com informações essenciais para facilitar sua escolha.",
  },
  {
    icon: <Clock3 size={28} />,
    title: "Economize tempo",
    description:
      "Encontre rapidamente o profissional certo sem precisar procurar em diversos lugares.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#09090B] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Vantagens
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Tudo o que você precisa para encontrar o profissional ideal.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            O Chama Aí conecta clientes e prestadores de serviços de forma
            simples, rápida e segura, facilitando o contato e economizando
            tempo.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

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