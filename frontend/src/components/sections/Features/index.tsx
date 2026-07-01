import Card from "@/components/ui/Card";
import { BarChart3, Ticket, Users, ShieldCheck, Zap, ChartColumn } from "lucide-react";

const features = [
    {
        icon: Ticket,
        title: "Gerenciamento de Tickets",
        description: "Organize e gerencie tickets de suporte de forma eficiente.",
    },
    {
        icon: BarChart3,
        title: "Dashboard",
        description: "Acompanhe métricas importantes da sua comunidade.",
    },
    {
        icon: Zap,
        title: "Automação",
        description: "Automatize tarefas repetitivas e economize tempo.",
    },
    {
        icon: Users,
        title: "Comunidade",
        description: "Gerencie membros e permissões da sua comunidade.",
    },
    {
        icon: ShieldCheck, 
        title: "Segurança",
        description: "Proteja sua comunidade com recursos de segurança avançados.",
    },
    {
        icon: ChartColumn,
        title: "Relatórios",
        description: "Gere relatórios detalhados para análise de desempenho.",
    },
];

export default function Features() {
    return (
    <section
      id="recursos"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="text-center">
        <span className="text-blue-500 font-semibold uppercase tracking-wider">
          Recursos
        </span>

        <h2 className="mt-4 text-4xl font-bold">
          Tudo o que você precisa para gerenciar sua comunidade
        </h2>

        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          Desenvolvido para facilitar o gerenciamento do seu servidor,
          economizando tempo e melhorando a organização.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <Icon
              size={36}
              className="mb-5 text-blue-500"
            />

            <h3 className="text-xl font-semibold">
              {title}
            </h3>

            <p className="mt-3 text-zinc-400">
              {description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}