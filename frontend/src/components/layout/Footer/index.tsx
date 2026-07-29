import { Link } from "react-router-dom";
import chama from "@/assets/chama.png";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">

        {/* Logo */}

        <div>

          <img
            src={chama}
            alt="Chama Aí"
            className="h-12"
          />

          <p className="mt-5 max-w-sm leading-7 text-zinc-400">
            Conectando clientes aos melhores profissionais da sua região de
            forma rápida, simples e segura.
          </p>

        </div>

        {/* Links */}

        <div>

          <h3 className="mb-5 text-lg font-semibold text-white">
            Navegação
          </h3>

          <div className="space-y-3">

            <Link
              to="/"
              className="block text-zinc-400 hover:text-blue-400"
            >
              Início
            </Link>

            <Link
              to="/providers"
              className="block text-zinc-400 hover:text-blue-400"
            >
              Profissionais
            </Link>

            <Link
              to="/provider/create"
              className="block text-zinc-400 hover:text-blue-400"
            >
              Sou Prestador
            </Link>

          </div>

        </div>

        {/* Contato */}

        <div>

          <h3 className="mb-5 text-lg font-semibold text-white">
            Contato
          </h3>

          <p className="text-zinc-400">
            weltersongabriel.ti@gmail.com
          </p>

          <p className="mt-3 text-zinc-400">
            Guanambi • Bahia
          </p>

        </div>

      </div>

      <div className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">

        © 2026 Chama Aí • Todos os direitos reservados.

      </div>

    </footer>
  );
}