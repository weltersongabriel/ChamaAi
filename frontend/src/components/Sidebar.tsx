export default function Sidebar() {
    return (
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-4">
      <nav className="space-y-3">
        <a href="#" className="block text-zinc-300 hover:text-white">
          Dashboard
        </a>

        <a href="#" className="block text-zinc-300 hover:text-white">
          Projetos
        </a>

        <a href="#" className="block text-zinc-300 hover:text-white">
          Configurações
        </a>
      </nav>
    </aside>
    );
}