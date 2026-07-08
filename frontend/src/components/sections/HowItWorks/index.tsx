import { UserPlus, Ticket, BarChart2 } from "lucide-react";
import StepCard from "./StepCard";

const steps = [
  {
    number: "01",
    icon: <UserPlus size={28} />,
    title: "Cadastrar sua comunidade",
    description: "Crie uma conta e registre sua comunidade para começar a gerenciar seus eventos.",
  },
  {
    number: "02",
    icon: <Ticket size={28} />,
    title: "Gerencie os atendimentos",
    description: "Receba tickets, organize filas e acompanhe o progresso dos atendimentos de forma eficiente.",
  },
  {
    number: "03",
    icon: <BarChart2 size={28} />,
    title: "Acompanhe os resultados",
    description: "Visualize relatórios detalhados e métricas para melhorar continuamente a experiência da sua comunidade.",
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
            Três passos para transformar sua comunidade.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            O Chama Aí simplifica a organização dos atendimentos com um fluxo
            intuitivo e eficiente.
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