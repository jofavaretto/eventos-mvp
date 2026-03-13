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
          {evento.data} • {evento.local} {evento.descricao && <p className="descricao"> {evento.descricao}</p>}   
        </p>
      </div>

      <button className="btn danger" onClick={() => onRemover(evento.id)}>
        Remover
      </button>
    </article>
  );
}
