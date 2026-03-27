import React from "react";

export default function Home({ eventos }) {
  // ✅ Exercício Nível 1: total e próximo evento
  const total = eventos.length;
  const proximo = total > 0 ? eventos[0] : null;

  return (
    <section className="stack">
      <h2>Bem-vindos</h2>
      <p>Hoje vamos montar um mini sistema real usando componentes, rotas e estado.</p>

      <div className="box">
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>

      <div className="box">
        <strong>Próximo evento:</strong>{" "}
        {proximo ? proximo.titulo : <span className="muted">Nenhum evento cadastrado</span>}
      </div>
    </section>
  );
}
