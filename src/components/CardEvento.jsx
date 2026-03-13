import React from "react";
import { Link } from "react-router-dom";

export default function CardEvento({ evento, onRemover, onEditar }) {
  // ✅ Exercício Nível 3: badge de status (aberto/lotado)
  const temVagas = typeof evento.vagasRestantes === "number";
  const lotado = temVagas && evento.vagasRestantes === 0;

  return (
    <article className="card">
      <div>
        <h3>{evento.titulo}</h3>

        {/* ✅ Badge aparece só se o evento tiver vagas configuradas */}
        {temVagas && (
          <span className={lotado ? "badge lotado" : "badge aberto"}>
            {lotado ? "LOTADO" : "ABERTO"}
          </span>
        )}

        <p className="muted">
          {evento.data} • {evento.local}
        </p>

        {/* ✅ Exercício Nível 1: mostrar descrição no card */}
        {evento.descricao && <p className="descricao">{evento.descricao}</p>}

        <div className="row">
          {/* ✅ Exercício Nível 3: rota de detalhe /evento/:id */}
          <Link className="btn" to={`/evento/${evento.id}`}>
            Ver detalhes
          </Link>

          {/* ✅ Exercício Nível 3: botão editar (leva para /cadastrar preenchendo) */}
          {onEditar && (
            <button className="btn ghost" type="button" onClick={() => onEditar(evento)}>
              Editar
            </button>
          )}
        </div>
      </div>

      <button className="btn danger" onClick={() => onRemover(evento.id)}>
        Remover
      </button>
    </article>
  );
}
