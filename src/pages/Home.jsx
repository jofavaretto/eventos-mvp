import React from "react";

export default function Home({ total }) {
  return (
    <section className="stack">
      <h2>Bem-vindos </h2>
      <p>Hoje vamos montar um mini sistema real usando componentes, rotas e estado.</p>
      <div className="box">
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>
    </section>
  );
}