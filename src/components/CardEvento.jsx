import React from "react";

export default function CardEvento({ evento, onRemover }) {
  return (
    <article className="card">
      <div>
        <h3>{evento.titulo}</h3>
        <p className="muted">
          {evento.data} • {evento.local} {evento.descricao && (
      <p className="descricao"> {evento.descricao}</p>
      )}   
        
      </div>

      <button className="btn danger" onClick={() => onRemover(evento.id)}>
        Remover
      </button>
    </article>
    
  );
}
