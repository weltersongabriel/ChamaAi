import type { ButtonProps } from "./types";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",

    secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-white",

    outline:
      "border border-zinc-700 hover:border-blue-600 hover:text-blue-500 text-white bg-transparent",
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