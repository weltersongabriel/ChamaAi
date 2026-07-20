import logo from "@/assets/chama.png"

interface AuthHeaderProps {
  title: string;
  description: string;
}

export default function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">

      <img
        src={logo}
        alt="Chama Aí"
        className="mx-auto h-16"
      />

      <h1 className="mt-6 text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-2 text-zinc-400">
        {description}
      </p>

    </div>
  );
}