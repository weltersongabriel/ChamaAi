import Button from "@/components/ui/Button";

import chama from "@/assets/chama.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <img
            src={chama}
            alt="Logo Chama Aí"
            className="h-10 w-auto"
            />

        {/* Menu */}
        <nav className="hidden gap-8 md:flex">
          <a href="#" className="text-zinc-300 transition hover:text-white">
            Recursos
          </a>

          <a href="#" className="text-zinc-300 transition hover:text-white">
            Planos
          </a>

          <a href="#" className="text-zinc-300 transition hover:text-white">
            FAQ
          </a>
        </nav>

        {/* Botões */}
        <div className="flex gap-3">
          <Button variant="outline">
            Entrar
          </Button>

          <Button>
            Criar conta
          </Button>
        </div>
      </div>
    </header>
  );
}