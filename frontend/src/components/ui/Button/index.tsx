import type { ButtonProps } from "./types";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-700 text-white",

    secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-white",

    outline:
      "border border-zinc-700 hover:bg-zinc-900 text-white",
  };

  return (
    <button
      className={`
        px-4
        py-2
        rounded-lg
        font-medium
        transition-colors
        duration-200
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}