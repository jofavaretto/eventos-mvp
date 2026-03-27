
import React from "react";
// ✅ (CORREÇÃO) Remova o import do Link porque não está sendo usado.
// Isso evita o warning do ESLint: "'Link' is defined but never used"
// import { Link } from "react-router-dom";

export default function CardEvento({ evento, onRemover, onEditar }) {
  // ✅ Badge de status (aberto/lotado)
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

        {/* ✅ (CORREÇÃO) Não pode ter <p> dentro de <p>.
            Troquei a estrutura: um <p> para data/local e outro para descrição (condicional). */}
        <p className="muted">
          {evento.data} • {evento.local}
        </p>

        {evento.descricao && (
          <p className="descricao">{evento.descricao}</p>
        )}
      </div>

      {/* ✅ Remover continua igual */}
      <button className="btn danger" onClick={() => onRemover(evento.id)}>
        Remover
      </button>
    </article>
  );
}