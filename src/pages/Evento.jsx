import React, { useMemo, useState } from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos, onRemover, onRemoverTodos, onEditar }) {
  // ✅ Exercícios Nível 2: busca e filtro
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [buscaLocal, setBuscaLocal] = useState("");

  const filtrados = useMemo(() => {
    const t = buscaTitulo.trim().toLowerCase();
    const l = buscaLocal.trim().toLowerCase();

    return eventos.filter((e) => {
      const okTitulo = !t || e.titulo.toLowerCase().includes(t);
      const okLocal = !l || e.local.toLowerCase().includes(l);
      return okTitulo && okLocal;
    });
  }, [buscaTitulo, buscaLocal, eventos]);

  return (
    <section className="stack">
      <div className="row">
        <h2>Eventos</h2>

        {/* ✅ Exercício Nível 2: remover todos */}
        <button className="btn danger" type="button" onClick={onRemoverTodos}>
          Remover todos
        </button>
      </div>

      <input
        className="input"
        placeholder="Buscar por título..."
        value={buscaTitulo}
        onChange={(e) => setBuscaTitulo(e.target.value)}
      />

      <input
        className="input"
        placeholder="Filtrar por local..."
        value={buscaLocal}
        onChange={(e) => setBuscaLocal(e.target.value)}
      />

      {filtrados.length === 0 ? (
        <p className="muted">Nenhum evento encontrado.</p>
      ) : (
        <div className="grid">
          {filtrados.map((e) => (
            <CardEvento
              key={e.id}
              evento={e}
              onRemover={onRemover}
              onEditar={onEditar}
            />
          ))}
        </div>
      )}
    </section>
  );
}
