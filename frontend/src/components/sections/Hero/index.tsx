import Button from "@/components/ui/Button";
import HeroBadge from "./HeroBadge";
import DashboardMockup from "./DashboardMockup";

export default function Hero() {
    return (
         <section className="relative overflow-hidden">

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/30 via-zinc-950 to-zinc-950" />

      <div className="mx-auto max-w-7xl px-6 py-28">

        <div className="mx-auto max-w-4xl text-center">

          <HeroBadge />

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">

            Gerencie sua comunidade com o{" "}

            <span className="text-blue-500">
              Chama Aí
            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">

            Automatize tickets, organize atendimentos e acompanhe
            métricas da sua comunidade em uma única plataforma.

          </p>

          <div className="mt-10 flex justify-center gap-4">

            <Button>
              Criar conta
            </Button>

            <Button variant="outline">
              Ver demonstração
            </Button>

          </div>

        </div>

        <DashboardMockup />

      </div>

    </section>
  );
}