import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function LoginForm() {
    return (
         <form className="space-y-5">

      <div>

        <label className="mb-2 block text-sm text-zinc-300">
          Email
        </label>

        <input
          type="email"
          placeholder="Digite seu email"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm text-zinc-300">
          Senha
        </label>

        <input
          type="password"
          placeholder="Digite sua senha"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

      </div>

      <Button className="w-full">
        Entrar
      </Button>

      <p className="text-center text-sm text-zinc-400">
        Não possui uma conta?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-500 hover:text-blue-400"
        >
          Criar conta
        </Link>
      </p>

    </form>
    );
}