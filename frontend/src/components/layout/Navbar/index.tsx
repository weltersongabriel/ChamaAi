import { Link, useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import chama from "@/assets/chama.png";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate("/");
  }

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
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-zinc-300 transition hover:text-blue-400"
          >
            Início
          </Link>

          <Link
            to="/providers"
            className="text-zinc-300 transition hover:text-blue-400"
          >
            Profissionais
          </Link>

          {isAuthenticated && (
            <Link
              to="/provider/create"
              className="text-zinc-300 transition hover:text-blue-400"
            >
              Sou Prestador
            </Link>
          )}

        </nav>

        {/* Botões */}
        <div className="flex items-center gap-3">

          {isAuthenticated ? (
            <>
              <Link to="/provider/create">
                <Button>
                  Meu Perfil
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">
                  Entrar
                </Button>
              </Link>

              <Link to="/register">
                <Button>
                  Criar Conta
                </Button>
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}