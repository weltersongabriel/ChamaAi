import {Link} from "react-router-dom";

import Button from "@/components/ui/Button";
import chama from "@/assets/chama.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={chama}
            alt="Logo Chama Aí"
            className="h-12 w-auto"
          />
        </Link>

        {/* Menu */}
        <nav className="hidden gap-8 md:flex">
          <Link to="/recursos" className="text-zinc-300 transition hover:text-white">
            Recursos
          </Link>

          <Link to="/planos" className="text-zinc-300 transition hover:text-white">
            Planos
          </Link>

          <Link to="/faq" className="text-zinc-300 transition hover:text-white">
            FAQ
          </Link>
        </nav>

        {/* Botões */}
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="outline">
              Entrar
            </Button>
          </Link>

          <Link to="/register">
            <Button>
              Criar conta
            </Button>
          </Link>

          <Link to="/provider/create">
            <Button variant="secondary">
              Seja um prestador
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}