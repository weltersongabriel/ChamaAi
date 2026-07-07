import Button from "@/components/ui/Button";
import HeroBadge from "./HeroBadge";
import DashboardMockup from "./DashboardMockup";

export default function Hero() {
    return (
         <section className="relative overflow-hidden bg-[#09090B]">

          <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="absolute left-1/2 top-28 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/30 via-zinc-950 to-zinc-950" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center px-6 py-24">

        <div className="mx-auto max-w-4xl text-center">

          <HeroBadge />

          <h1 className="mt-8 max-w-5xl text-center text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              Gerencie sua comunidade
              <br />

              com o{" "}

              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Chama Aí
              </span>
            </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">

            Automatize tickets, organize atendimentos e acompanhe
            métricas da sua comunidade em uma única plataforma.

          </p>
          <br />

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">

            <Button>
              Criar conta
            </Button>

            <Button variant="outline">
              Ver demonstração
            </Button>

          </div>

        </div>

        <div className="mt-24">
            <DashboardMockup />
        </div>

      </div>

    </section>
  );
}