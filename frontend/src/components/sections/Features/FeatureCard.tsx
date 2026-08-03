import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-zinc-900 sm:rounded-3xl sm:p-8">

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