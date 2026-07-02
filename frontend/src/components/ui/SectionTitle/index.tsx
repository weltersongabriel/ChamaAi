import type { SectionTitleProps } from './types';

export default function SectionTitle({ badge,
    title,
    description,
    center }: SectionTitleProps) {
    return (
        <div className={center ? "text-center" : ""}>
      {badge && (
        <span className="font-semibold uppercase tracking-wider text-blue-500">
          {badge}
        </span>
      )}

      <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
          {description}
        </p>
      )}
    </div>
    );
}