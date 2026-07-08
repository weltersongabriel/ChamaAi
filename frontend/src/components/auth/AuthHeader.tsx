import logo from "@/assets/chama.png";

export default function AuthHeader() {
    return (
        <div className="mb-8 text-center">

      <img
        src={logo}
        alt="Chama Aí"
        className="mx-auto h-16"
      />

      <h1 className="mt-6 text-3xl font-bold text-white">
        Bem-vindo de volta 👋
      </h1>

      <p className="mt-2 text-zinc-400">
        Faça login para acessar sua conta.
      </p>

    </div>

    );
}