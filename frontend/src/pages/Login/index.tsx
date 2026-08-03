import MainLayout from "@/layouts/MainLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <MainLayout>
      <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-[#09090B] px-4 py-10 sm:px-6 sm:py-12">

        {/* Glow */}
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[100px] sm:top-24 sm:h-[420px] sm:w-[420px] sm:blur-[140px]" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md">

          <AuthCard>

            <AuthHeader
              title="Bem-vindo de volta 👋"
              description="Faça login para acessar sua conta."
            />

            <LoginForm />

          </AuthCard>

        </div>

      </section>
    </MainLayout>
  );
}