import type { CardProps } from "./types";

export default function Card({
    children,
    className = "",
    ...props
}: CardProps) {
    return (
        <div
      className={`
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:border-blue-600/40
        hover:shadow-blue-600/10
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
    );
}