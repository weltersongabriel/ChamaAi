import FeatureCard from "./FeatureCard";

import {
  Ticket,
  Users,
  ShieldCheck,
  Bell,
  BarChart3,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <Ticket size={28} />,
    title: "Gestão de Tickets",
    description:
      "Organize solicitações de forma simples e acompanhe cada atendimento em tempo real.",
  },
  {
    icon: <Users size={28} />,
    title: "Comunidades",
    description:
      "Gerencie comunidades, membros e equipes em um único lugar.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Segurança",
    description:
      "Autenticação segura e proteção dos dados dos usuários.",
  },
  {
    icon: <Bell size={28} />,
    title: "Notificações",
    description:
      "Receba avisos importantes sobre tickets e atividades.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Relatórios",
    description:
      "Visualize métricas e acompanhe o crescimento da sua comunidade.",
  },
  {
    icon: <Zap size={28} />,
    title: "Alta Performance",
    description:
      "Uma plataforma rápida e otimizada para oferecer a melhor experiência.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#09090B] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Recursos
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Tudo o que sua comunidade precisa.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            O Chama Aí reúne todas as ferramentas essenciais para organizar
            atendimentos, acompanhar indicadores e facilitar a comunicação.
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