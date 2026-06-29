import Button from "@/components/ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-violet-500">
          🔥 Chama Aí
        </h1>

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