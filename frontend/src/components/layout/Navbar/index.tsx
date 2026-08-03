import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Button from "@/components/ui/Button";
import chama from "@/assets/chama.png";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  async function handleMyProfile() {
    setMenuOpen(false);

    try {
      const response = await api.get("/providers/me");

      navigate(`/provider/${response.data.id}/edit`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        navigate("/provider/create");
        return;
      }

      console.error("Erro ao verificar perfil profissional:", error);
      alert("Não foi possível verificar seu perfil.");
    }
  }

  function handleLogout() {
    setMenuOpen(false);
    signOut();
    navigate("/");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center"
        >
          <img
            src={chama}
            alt="Logo Chama Aí"
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        {/* Menu Desktop */}
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
            <button
              onClick={handleMyProfile}
              className="text-zinc-300 transition hover:text-blue-400"
            >
              Sou Prestador
            </button>
          )}

        </nav>

        {/* Botões Desktop */}
        <div className="hidden items-center gap-3 md:flex">

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button>
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={handleMyProfile}
              >
                Meu Perfil
              </Button>

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

        {/* Botão Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white md:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>

      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-5 md:hidden">

          <nav className="flex flex-col gap-2">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-blue-400"
            >
              Início
            </Link>

            <Link
              to="/providers"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-blue-400"
            >
              Profissionais
            </Link>

            {isAuthenticated && (
              <>
                <button
                  onClick={handleMyProfile}
                  className="rounded-lg px-4 py-3 text-left text-zinc-300 transition hover:bg-zinc-900 hover:text-blue-400"
                >
                  Sou Prestador
                </button>

                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-blue-400"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleMyProfile}
                  className="rounded-lg px-4 py-3 text-left text-zinc-300 transition hover:bg-zinc-900 hover:text-blue-400"
                >
                  Meu Perfil
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-lg px-4 py-3 text-left text-zinc-300 transition hover:bg-zinc-900 hover:text-red-400"
                >
                  Sair
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className="mt-3 grid gap-3 border-t border-zinc-800 pt-4">

                <Link
                  to="/login"
                  onClick={closeMenu}
                >
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Entrar
                  </Button>
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                >
                  <Button className="w-full">
                    Criar Conta
                  </Button>
                </Link>

              </div>
            )}

          </nav>

        </div>
      )}

    </header>
  );
}