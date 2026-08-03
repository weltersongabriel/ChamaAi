import { Search, UserCheck, MessageCircle } from "lucide-react";
import StepCard from "./StepCard";

const steps = [
  {
    number: "01",
    icon: <Search size={26} />,
    title: "Pesquise um profissional",
    description:
      "Escolha a categoria e informe sua cidade para encontrar profissionais próximos de você.",
  },
  {
    number: "02",
    icon: <UserCheck size={26} />,
    title: "Escolha o profissional",
    description:
      "Compare os perfis, veja as avaliações e encontre o prestador de serviços ideal para sua necessidade.",
  },
  {
    number: "03",
    icon: <MessageCircle size={26} />,
    title: "Entre em contato",
    description:
      "Converse diretamente com o profissional pelo WhatsApp e combine todos os detalhes do serviço.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#09090B] py-20 sm:py-24 lg:py-28">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Cabeçalho */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Como funciona
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:mt-6 sm:text-4xl md:text-5xl">
            Encontre um profissional em apenas três passos.
          </h2>

          <p className="mt-5 text-base leading-7 text-zinc-400 sm:mt-6 sm:text-lg sm:leading-8">
            O Chama Aí conecta você aos melhores profissionais da sua região de
            forma rápida, simples e segura.
          </p>

        </div>

        {/* Etapas */}
        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-3 lg:gap-8">

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