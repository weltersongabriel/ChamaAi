import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

interface Category {
  id: number;
  name: string;
}

export default function EditProvider() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
    loadProvider();
  }, []);

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadProvider() {
    try {
      const response = await api.get("/providers/me");

      setBio(response.data.bio);
      setCategoryId(String(response.data.category_id));
      setCidade(response.data.cidade);
      setEstado(response.data.estado);
      setWhatsapp(response.data.whatsapp);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.put("/providers/me", {
        bio,
        category_id: Number(categoryId),
        cidade,
        estado,
        whatsapp,
      });

      alert("Perfil atualizado com sucesso!");

      navigate("/providers");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Editar Perfil Profissional
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <input
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Salvar Alterações
          </button>

        </form>

      </div>
    </div>
  );
}