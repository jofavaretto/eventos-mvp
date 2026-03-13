import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import Home from "./pages/Home";
import Evento from "./pages/Evento";
import CadastroEvento from "./pages/CadastroEvento";
import EventoDetalhe from "./pages/EventoDetalhe";
import Checkout from "./pages/Checkout";

export default function App() {
  // ✅ Base de dados em memória (depois vira Postgres via API)
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Reunião do Projeto",
      data: "2026-02-12",
      local: "Sala 2",
      descricao: "Alinhar tarefas da sprint e pendências.",
      capacidadeTotal: 30,
      vagasRestantes: 30,
      mapaUrl: "https://www.google.com/maps?q=Chapec%C3%B3%20SC&output=embed",
      fotos: [
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
      ],
    },
    {
      id: 2,
      titulo: "Review da Sprint",
      data: "2026-02-13",
      local: "Auditório",
      descricao: "Apresentação do que foi desenvolvido e próximos passos.",
      capacidadeTotal: 10,
      vagasRestantes: 0, // exemplo lotado
      mapaUrl: "",
      fotos: [],
    },
  ]);

  // ✅ Nível 3: controle simples de edição (sem login)
  const [eventoEditando, setEventoEditando] = useState(null);

  // ✅ Create (criar)
  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  // ✅ Update (editar)
  function atualizarEvento(atualizado) {
    setEventos((lista) => lista.map((e) => (e.id === atualizado.id ? atualizado : e)));
  }

  function iniciarEdicao(evento) {
    setEventoEditando(evento);
  }

  function cancelarEdicao() {
    setEventoEditando(null);
  }

  // ✅ Delete (remover um)
  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  // ✅ Nível 2: remover todos
  function removerTodos() {
    setEventos([]);
  }

  // ✅ Parte IV: compra reduz vagas
  function comprarIngresso(eventoId, quantidade) {
    setEventos((lista) =>
      lista.map((e) => {
        if (e.id !== eventoId) return e;
        return { ...e, vagasRestantes: e.vagasRestantes - quantidade };
      })
    );
  }

  return (
    <div className="app">
      <Header />
      <Menu />

      <main className="conteudo-principal">
        <Routes>
          {/* ✅ Nível 1: Home agora recebe eventos para mostrar próximo evento */}
          <Route path="/" element={<Home eventos={eventos} />} />

          {/* Lista (vitrine) + busca/filtro + remover todos + editar */}
          <Route
            path="/evento"
            element={
              <Evento
                eventos={eventos}
                onRemover={removerEvento}
                onRemoverTodos={removerTodos}
                onEditar={iniciarEdicao}
              />
            }
          />

          {/* ✅ Cadastro/edição (admin) */}
          <Route
            path="/cadastrar"
            element={
              <CadastroEvento
                onAdd={adicionarEvento}
                eventoEditando={eventoEditando}
                onAtualizar={atualizarEvento}
                onCancelarEdicao={cancelarEdicao}
              />
            }
          />

          {/* ✅ Nível 3: detalhe */}
          <Route path="/evento/:id" element={<EventoDetalhe eventos={eventos} />} />

          {/* ✅ Parte IV: checkout */}
          <Route
            path="/evento/:id/checkout"
            element={<Checkout eventos={eventos} onComprar={comprarIngresso} />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
