import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import Button from "@/components/ui/Button";
import { api } from "@/services/api";

const registerSchema = z
  .object({
    nome: z.string().min(3, "Digite seu nome completo"),
    telefone: z.string().min(10, "Digite um telefone válido"),
    email: z.string().email("Digite um email válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      setApiError("");
      setSuccessMessage("");

      await api.post("/auth/register", {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      senha: data.password,
    });

      setSuccessMessage("Conta criada com sucesso! Redirecionando...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.error("ERRO COMPLETO:", error.response);

      const data = error.response?.data;

      let message = "Erro ao criar a conta.";

      if (typeof data === "string" && data.trim() !== "") {
        message = data;
      } else if (data?.detail) {
        message = data.detail;
      } else if (data?.message) {
        message = data.message;
      }

      setApiError(message);
    }
  } 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nome */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Nome completo
        </label>

        <input
          type="text"
          placeholder="Digite seu nome"
          {...register("nome")}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

        {errors.nome && (
          <p className="mt-2 text-sm text-red-400">
            {errors.nome.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Email
        </label>

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

      {/* Telefone */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Telefone
        </label>

        <input
          type="tel"
          placeholder="(77) 99999-9999"
          {...register("telefone")}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

        {errors.telefone && (
          <p className="mt-2 text-sm text-red-400">
            {errors.telefone.message}
          </p>
        )}
      </div>

      {/* Senha */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Senha
        </label>

        <input
          type="password"
          placeholder="Crie uma senha"
          {...register("password")}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

        {errors.password && (
          <p className="mt-2 text-sm text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirmar senha */}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Confirmar senha
        </label>

        <input
          type="password"
          placeholder="Confirme sua senha"
          {...register("confirmPassword")}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Mensagens */}
      {apiError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {apiError}
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
          {successMessage}
        </div>
      )}

      {/* Botão */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={18} />
            Criando conta...
          </span>
        ) : (
          "Criar conta"
        )}
      </Button>

      {/* Link */}
      <p className="text-center text-sm text-zinc-400">
        Já possui uma conta?{' '}
        <Link
          to="/login"
          className="font-medium text-blue-500 hover:text-blue-400"
        >
          Fazer login
        </Link>
      </p>
    </form>
  );
}