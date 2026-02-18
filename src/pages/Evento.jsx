import React from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos, onRemover }) {
  return (
    <section className="stack">
      <h2>Eventos</h2>

      {eventos.length === 0 ? (
        <p className="muted">Nenhum evento cadastrado. Vá em “Cadastrar”.</p>
      ) : (
        <div className="grid">
          {eventos.map((e) => (
            <CardEvento key={e.id} evento={e} onRemover={onRemover} />
          ))}
        </div>
      )}
    </section>
  );
}