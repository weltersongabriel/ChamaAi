import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

interface Category {
  id: number;
  name: string;
}

export default function CreateProvider() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar categorias.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/providers", {
        bio,
        category_id: Number(categoryId),
        cidade,
        estado,
        whatsapp,
      });

      alert("Perfil profissional criado com sucesso!");

      navigate("/providers");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar perfil profissional.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Cadastro de Prestador
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Categoria
            </label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-blue-500"
            >
              <option value="">Selecione...</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}

            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Cidade
            </label>

            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Estado
            </label>

            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
              maxLength={2}
              placeholder="BA"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 uppercase text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              WhatsApp
            </label>

            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              placeholder="5577999999999"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Cadastrar Perfil"}
          </button>

        </form>

      </div>
    </div>
  );
}