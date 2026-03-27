import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Checkout({ eventos, onComprar }) {
  // ✅ Parte IV: checkout em /evento/:id/checkout
  const { id } = useParams();
  const navigate = useNavigate();

  const evento = eventos.find((e) => String(e.id) === String(id));

  const [qtd, setQtd] = useState(1);
  const [erro, setErro] = useState("");

  if (!evento) {
    return (
      <section className="stack">
        <h2>Evento não encontrado</h2>
        <Link className="btn ghost" to="/evento">Voltar</Link>
      </section>
    );
  }

  function confirmar() {
    setErro("");
    const quantidade = Number(qtd);

    // ✅ validações “mundo real”
    if (!quantidade || quantidade <= 0) {
      setErro("Quantidade inválida.");
      return;
    }
    if (quantidade > evento.vagasRestantes) {
      setErro("Não há vagas suficientes.");
      return;
    }

    // ✅ chama a função do App que diminui vagasRestantes
    onComprar(evento.id, quantidade);

    // volta para detalhe
    navigate(`/evento/${evento.id}`);
  }

  return (
    <section className="stack">
      <Link className="btn ghost" to={`/evento/${evento.id}`}>
        Voltar para detalhes
      </Link>

      <h2>Checkout</h2>

      <div className="box">
        <strong>Evento:</strong> {evento.titulo}
        <br />
        <strong>Vagas restantes:</strong> {evento.vagasRestantes}
      </div>

      <label className="stack">
        Quantidade
        <input
          className="input"
          type="number"
          min={1}
          max={evento.vagasRestantes}
          value={qtd}
          onChange={(e) => setQtd(e.target.value)}
        />
      </label>

      {erro && <div className="box">{erro}</div>}

      <button className="btn" onClick={confirmar}>
        Confirmar compra
      </button>
    </section>
  );
}
