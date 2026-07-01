import Card from "@/components/ui/Card";
import { BarChart3, Ticket, Users, ShieldCheck, } from "lucide-react";

export default function DashboardMockup() {
  return (
    <Card className="mt-20 overflow-hidden p-0">

      <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
        <h3 className="font-semibold">
          Dashboard
        </h3>
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-4">

        <Card>
          <Ticket className="mb-3 text-blue-500" />

          <p className="text-zinc-400 text-sm">
            Tickets
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            152
          </h2>

        </Card>

        <Card>

          <Users className="mb-3 text-blue-500" />

          <p className="text-zinc-400 text-sm">
            Usuários
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            4.8k
          </h2>

        </Card>

        <Card>

          <ShieldCheck className="mb-3 text-blue-500" />

          <p className="text-zinc-400 text-sm">
            Bots
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            32
          </h2>

        </Card>

        <Card>

          <BarChart3 className="mb-3 text-blue-500" />

          <p className="text-zinc-400 text-sm">
            Crescimento
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            +38%
          </h2>

        </Card>

      </div>

    </Card>
  );
}