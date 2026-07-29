import { Search, UserCheck, MessageCircle } from "lucide-react";
import StepCard from "./StepCard";

const steps = [
  {
    number: "01",
    icon: <Search size={28} />,
    title: "Pesquise um profissional",
    description:
      "Escolha a categoria e informe sua cidade para encontrar profissionais próximos de você.",
  },
  {
    number: "02",
    icon: <UserCheck size={28} />,
    title: "Escolha o profissional",
    description:
      "Compare os perfis, veja as avaliações e encontre o prestador de serviços ideal para sua necessidade.",
  },
  {
    number: "03",
    icon: <MessageCircle size={28} />,
    title: "Entre em contato",
    description:
      "Converse diretamente com o profissional pelo WhatsApp e combine todos os detalhes do serviço.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#09090B] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Como funciona
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Encontre um profissional em apenas três passos.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            O Chama Aí conecta você aos melhores profissionais da sua região de
            forma rápida, simples e segura.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
}