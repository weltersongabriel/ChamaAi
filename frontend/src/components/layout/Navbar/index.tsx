import { Link, useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import chama from "@/assets/chama.png";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleMyProfile() {
    try {
      const response = await api.get("/providers/me");

      // Usuário já possui perfil profissional
      navigate(`/provider/${response.data.id}/edit`);

    } catch (error: any) {
      // Usuário ainda não possui perfil profissional
      if (error.response?.status === 404) {
        navigate("/provider/create");
        return;
      }

      console.error("Erro ao verificar perfil profissional:", error);
      alert("Não foi possível verificar seu perfil.");
    }
  }

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
            <button
              onClick={handleMyProfile}
              className="text-zinc-300 transition hover:text-blue-400"
            >
              Sou Prestador
            </button>
          )}

        </nav>

        {/* Botões */}
        <div className="flex items-center gap-3">

          {isAuthenticated ? (
            <>
              {/* Dashboard */}
              <Link to="/dashboard">
                <Button>
                  Dashboard
                </Button>
              </Link>

              {/* Meu Perfil */}
              <Button
                variant="outline"
                onClick={handleMyProfile}
              >
                Meu Perfil
              </Button>

              {/* Logout */}
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link to="/login">
                <Button variant="outline">
                  Entrar
                </Button>
              </Link>

              {/* Cadastro */}
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