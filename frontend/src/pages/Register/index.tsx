import MainLayout from "@/layouts/MainLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <MainLayout>
      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#09090B] px-6">

        {/* Glow */}
        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="w-full max-w-md">

          <AuthCard>

            <AuthHeader
              title="Crie sua conta 🚀"
              description="Comece agora e gerencie sua comunidade com o Chama Aí."
            />

            <RegisterForm />

          </AuthCard>

        </div>

      </section>
    </MainLayout>
  );
}