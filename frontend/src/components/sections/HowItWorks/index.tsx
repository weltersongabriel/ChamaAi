import { 
    UserPlus,
    Settings,
    LayoutDashboard,
} from "lucide-react";

import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const steps = [
    {
        icon: UserPlus,
        title: "Crie sua conta",
        description: "Cadastre-se gratuitamente e comece a gerenciar sua plataforma.",
    },
    {
        icon: Settings,
        title: "Configure seu servidor",
        description: "Personalize as configurações do seu servidor de acordo com suas necessidades.",
    },
    {
        icon: LayoutDashboard,
        title: "Acompanhe o desempenho",
        description: "Monitore o desempenho da sua comunidade e tome decisões informadas.",
    },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      <SectionTitle
        badge="Como funciona"
        title="Comece em apenas três passos"
        description="Criamos uma experiência simples para que você possa começar rapidamente."
      />

      <div className="mt-20 grid gap-8 md:grid-cols-3">

        {steps.map(({ icon: Icon, title, description }, index) => (

          <Card
            key={title}
            className="relative text-center"
          >

            <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">

              {index + 1}

            </div>

            <Icon
              size={42}
              className="mx-auto mt-6 text-blue-500"
            />

            <h3 className="mt-6 text-xl font-semibold">

              {title}

            </h3>

            <p className="mt-4 text-zinc-400">

              {description}

            </p>

          </Card>

        ))}

      </div>

    </section>
  );
}