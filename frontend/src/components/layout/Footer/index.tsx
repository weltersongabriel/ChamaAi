export default function Footer() {
    return (
         <footer className="border-t border-zinc-800 py-6">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Chama Aí. Todos os direitos reservados.
      </div>
    </footer>
    );
}