import MainLayout from "@/layouts/MainLayout";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
     <MainLayout>

      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#09090B] px-6">

        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="w-full max-w-md">

          <AuthCard>

            <AuthHeader />

            <LoginForm />

          </AuthCard>

        </div>

      </section>

    </MainLayout>
  );
}