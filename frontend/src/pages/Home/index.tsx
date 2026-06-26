import Button from "@/components/ui/Button";

export default function Home () {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-zinc-950 text-white">
          <h1 className="text-5lx font-bold">Chama Aí</h1>

          <Button>Começar</Button>
          <Button variant="secondary">Entrar</Button>
          <Button variant="outline">Saiba mais</Button>

        </div>
    );
}