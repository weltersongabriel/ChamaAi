import type { ReactNode } from 'react';

interface StepCardProps {
    number: string;
    icon: ReactNode;
    title: string;
    description: string;
}

export default function StepCard({ number, icon, title, description }:
    StepCardProps) {
    return (
        <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">

      <span className="absolute right-6 top-6 text-5xl font-bold text-zinc-800 transition group-hover:text-blue-500/20">
        {number}
      </span>

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-500">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-400">
        {description}
      </p>

    </div>

    );
}