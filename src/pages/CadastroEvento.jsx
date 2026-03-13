import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroEvento({
  onAdd,
  eventoEditando,
  onAtualizar,
  onCancelarEdicao,
}) {
  const navigate = useNavigate();

  // ✅ Nível 1: campos básicos + descrição
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");

  // ✅ Parte IV: capacidade + mapa + fotos (URLs)
  const [capacidadeTotal, setCapacidadeTotal] = useState(0);
  const [mapaUrl, setMapaUrl] = useState("");
  const [fotosTexto, setFotosTexto] = useState("");

  // ✅ Nível 3: quando clicar em Editar, o form vem preenchido
  useEffect(() => {
    if (eventoEditando) {
      setTitulo(eventoEditando.titulo || "");
      setData(eventoEditando.data || "");
      setLocal(eventoEditando.local || "");
      setDescricao(eventoEditando.descricao || "");

      setCapacidadeTotal(Number(eventoEditando.capacidadeTotal || 0));
      setMapaUrl(eventoEditando.mapaUrl || "");
      setFotosTexto((eventoEditando.fotos || []).join("\n"));
    }
  }, [eventoEditando]);

  // ✅ Nível 1: botão limpar formulário
  function limpar() {
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setCapacidadeTotal(0);
    setMapaUrl("");
    setFotosTexto("");
  }

  function cancelar() {
    limpar();
    if (eventoEditando) onCancelarEdicao();
    navigate("/evento");
  }

  function handleSubmit(e) {
    e.preventDefault();

    // ✅ validação mínima
    if (!titulo || !data || !local || !descricao) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const cap = Number(capacidadeTotal);
    if (!cap || cap <= 0) {
      alert("Capacidade total precisa ser maior que 0.");
      return;
    }

    // ✅ transforma o textarea (1 URL por linha) em array de fotos
    const fotos = fotosTexto
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);

    if (eventoEditando) {
      // ✅ modo editar: atualiza o evento existente
      const atualizado = {
        ...eventoEditando,
        titulo,
        data,
        local,
        descricao,
        capacidadeTotal: cap,
        // garante que vagas não fique maior que a capacidade
        vagasRestantes: Math.min(eventoEditando.vagasRestantes ?? cap, cap),
        mapaUrl,
        fotos,
      };

      onAtualizar(atualizado);
      onCancelarEdicao();
    } else {
      // ✅ modo criar: vagasRestantes começa igual a capacidadeTotal
      onAdd({
        titulo,
        data,
        local,
        descricao,
        capacidadeTotal: cap,
        vagasRestantes: cap,
        mapaUrl,
        fotos,
      });
    }

    limpar();
    navigate("/evento");
  }

  return (
    <section className="stack">
      <h2>{eventoEditando ? "Admin: Editar Evento" : "Admin: Cadastrar Evento"}</h2>

      <form className="form stack" onSubmit={handleSubmit}>
        <label>
          Título
          <input className="input" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>

        <label>
          Data
          <input className="input" type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>

        <label>
          Local
          <input className="input" value={local} onChange={(e) => setLocal(e.target.value)} />
        </label>

        <label>
          Descrição
          <input className="input" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </label>

        <label>
          Capacidade total
          <input
            className="input"
            type="number"
            min={1}
            value={capacidadeTotal}
            onChange={(e) => setCapacidadeTotal(e.target.value)}
            placeholder="Ex: 50"
          />
        </label>

        <label>
          Link do mapa (Google Maps embed)
          <input
            className="input"
            value={mapaUrl}
            onChange={(e) => setMapaUrl(e.target.value)}
            placeholder="Cole um link com output=embed"
          />
        </label>

        <label>
          Fotos (1 URL por linha)
          <textarea
            className="input"
            rows={4}
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
            placeholder={"https://...\nhttps://...\nhttps://..."}
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">
            {eventoEditando ? "Salvar alterações" : "Salvar"}
          </button>

          <button className="btn ghost" type="button" onClick={limpar}>
            Limpar Formulário
          </button>

          <button className="btn ghost" type="button" onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
