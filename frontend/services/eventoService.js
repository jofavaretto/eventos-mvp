const API_URL = "http://localhost:3001";

export async function criarEvento(payload) {
  const res = await fetch(`${API_URL}/eventos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.erro || "Erro ao cadastrar evento");
  return data;
}
export async function listarEventos() {
  const res = await fetch(`${API_URL}/eventos`);
  return res.json();
}