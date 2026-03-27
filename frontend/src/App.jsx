import React, { useEffect, useState } from "react"; // ✅ ADICIONADO: useEffect para buscar do backend
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import Home from "./pages/Home";
import Evento from "./pages/Evento";
import CadastroEvento from "./pages/CadastroEvento";
import EventoDetalhe from "./pages/EventoDetalhe";
import Checkout from "./pages/Checkout";

// ✅ ADICIONADO: URL base da API (backend Express)
const API_URL = "http://localhost:3001";

export default function App() {
  // ✅ ALTERADO: eventos começa vazio, porque quem manda agora é o BANCO
  const [eventos, setEventos] = useState([]);

  // ✅ Mantém: controle de edição (pode ser mantido, mas editar no banco fica para o PUT depois)
  const [eventoEditando, setEventoEditando] = useState(null);

  // ✅ ADICIONADO: estado de carregamento/erro (melhora UX e ajuda debug)
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // ✅ ADICIONADO: função que busca do banco (GET /eventos)
  async function carregarEventos() {
    try {
      setErro("");
      setCarregando(true);

      const res = await fetch(`${API_URL}/eventos`);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.erro || "Erro ao buscar eventos");
      setEventos(data); // ✅ SOMENTE o que vem do Postgres
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  // ✅ ADICIONADO: ao abrir o app, já carrega eventos do Postgres
  useEffect(() => {
    carregarEventos();
  }, []);

  // ✅ ALTERADO: Create agora é POST no backend
  async function adicionarEvento(novo) {
    try {
      setErro("");
      const res = await fetch(`${API_URL}/eventos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.erro || "Erro ao cadastrar evento");

      // ✅ Opção A (recomendada): recarrega do banco
      await carregarEventos();

      // ✅ Opção B (alternativa): setEventos((lista)=>[data, ...lista])
    } catch (e) {
      setErro(e.message);
      alert(e.message);
    }
  }

  // ✅ (PARA PRÓXIMO PASSO) Update com PUT no banco
  // Por enquanto, mantém em memória se quiser, mas o ideal é fazer PUT /eventos/:id
  function atualizarEvento(atualizado) {
    setEventos((lista) => lista.map((e) => (e.id === atualizado.id ? atualizado : e)));
  }

  function iniciarEdicao(evento) {
    setEventoEditando(evento);
  }

  function cancelarEdicao() {
    setEventoEditando(null);
  }

  // ✅ ALTERADO: Delete agora remove no banco (e depois recarrega)
  async function removerEvento(id) {
    try {
      setErro("");
      const res = await fetch(`${API_URL}/eventos/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.erro || "Erro ao remover evento");
      await carregarEventos();
    } catch (e) {
      setErro(e.message);
      alert(e.message);
    }
  }

  // ✅ ALTERADO: removerTodos agora chama uma rota do backend (se existir)
  // Se você ainda não criou DELETE /eventos (todos), pode desativar esse botão por enquanto.
  async function removerTodos() {
    alert("Remover todos: implementar no backend (DELETE /eventos) ou remover um por um.");
  }

  // ✅ (PARA PRÓXIMO PASSO) Compra reduz vagas deveria virar PUT no banco
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
        {/* ✅ ADICIONADO: feedback de carregamento/erro */}
        {carregando && <p className="muted">Carregando eventos do banco...</p>}
        {erro && <p className="erro">{erro}</p>}

        <Routes>
          <Route path="/" element={<Home eventos={eventos} />} />

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

          <Route
            path="/cadastrar"
            element={
              <CadastroEvento
                onAdd={adicionarEvento} // ✅ agora faz POST no banco
                eventoEditando={eventoEditando}
                onAtualizar={atualizarEvento} // (PUT no banco fica para depois)
                onCancelarEdicao={cancelarEdicao}
              />
            }
          />

          <Route path="/evento/:id" element={<EventoDetalhe eventos={eventos} />} />

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