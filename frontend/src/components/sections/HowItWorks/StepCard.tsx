import type { ReactNode } from "react";

interface StepCardProps {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export default function StepCard({
  number,
  icon,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 sm:rounded-3xl sm:p-8">

      {/* Número */}
      <span className="absolute right-5 top-5 text-4xl font-bold text-zinc-800 transition group-hover:text-blue-500/20 sm:right-6 sm:top-6 sm:text-5xl">
        {number}
      </span>

      {/* Ícone */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
        {icon}
      </div>

      {/* Título */}
      <h3 className="text-lg font-semibold text-white sm:text-xl">
        {title}
      </h3>

      {/* Descrição */}
      <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
        {description}
      </p>

    </div>
  );
}