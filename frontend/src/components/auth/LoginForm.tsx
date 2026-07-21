import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import Button from "@/components/ui/Button";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
  try {
    setApiError("");

    const response = await api.post("/auth/login", {
      email: data.email,
      senha: data.password,
    });

    signIn(response.data.access_token);

    navigate("/dashboard");
  } catch (error: any) {
    console.error(error.response?.data);

    const message =
      error.response?.data?.detail || "Email ou senha inválidos.";

    setApiError(message);
  }
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Email</label>

        <input
          type="email"
          placeholder="Digite seu email"
          {...register("email")}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Senha */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Senha</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            {...register("password")}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Erro da API */}
      {apiError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {apiError}
        </div>
      )}

      {/* Botão */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={18} />
            Entrando...
          </span>
        ) : (
          "Entrar"
        )}
      </Button>

      {/* Link */}
      <p className="text-center text-sm text-zinc-400">
        Não possui uma conta?{' '}
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